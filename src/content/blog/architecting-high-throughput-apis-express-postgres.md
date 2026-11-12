---
title: "Architecting High-Throughput APIs with Node.js, Express & PostgreSQL"
description: "How to eliminate bottlenecks, handle connection pool starvation, and achieve 10,000 req/sec on modest server hardware."
pubDate: 2026-09-15
tags: ["Node.js", "Express", "PostgreSQL", "Architecture", "Performance"]
readingTime: "7 min read"
featured: true
author: "Lorenzon Emmanuel S. Ahorro"
---

Building scalable APIs is often perceived as a challenge requiring distributed microservices, Kubernetes clusters, and costly cloud architectures. In reality, a well-tuned monolith or clean modular service running **Node.js, Express, and PostgreSQL** can handle tens of thousands of requests per second with sub-10ms response times.

In this deep dive, we'll examine the core bottlenecks that bring Express and Postgres applications to their knees under load—and how to engineer around them.

## 1. Connection Pool Starvation & PgBouncer

The most common failure mode in Node.js + PostgreSQL architectures isn't CPU exhaustion; it's database connection exhaustion. Each PostgreSQL connection spawns a dedicated backend process that consumes roughly 10MB of RAM and incurs OS context-switching overhead.

When 500 concurrent Express requests fire off queries, attempting to open 500 direct connections to PostgreSQL will cripple the database engine.

```typescript
// db/pool.ts - Optimal connection pool configuration
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Keep pool tight to match CPU core parallelism
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000, // Fail fast rather than stacking hung requests
});
```

> **Pro Tip**: Place **PgBouncer** in transaction pooling mode between your Express instances and PostgreSQL. PgBouncer multiplexes thousands of incoming client requests over a lean pool of 10-20 actual PostgreSQL server connections.

## 2. Eliminating N+1 Query Traps with JSON Aggregation

Instead of making one query for an order and subsequent queries in a loop for order items, leverage PostgreSQL's native `json_agg` and `json_build_object`:

```sql
SELECT 
  o.id,
  o.customer_name,
  o.total_cents,
  COALESCE(
    json_agg(
      json_build_object(
        'item_id', i.id,
        'sku', i.sku,
        'quantity', i.quantity,
        'price_cents', i.unit_price_cents
      )
    ) FILTER (WHERE i.id IS NOT NULL), '[]'
  ) AS items
FROM orders o
LEFT JOIN order_items i ON o.id = i.order_id
WHERE o.merchant_id = $1
GROUP BY o.id
LIMIT 50;
```

This single query transforms multiple roundtrips over the network into one atomic database operation, letting the Postgres C engine handle JSON formatting in memory.

## 3. Asynchronous Non-Blocking Workers for Heavy Payloads

Never generate PDFs, hash complex files, or dispatch external HTTP webhooks directly in your Express request-response cycle. Push the task to a lightweight queue table or Redis stream:

```javascript
// Express route controller
app.post('/api/v1/reports', async (req, res) => {
  const { reportType, dateRange } = req.body;
  
  // Enqueue report job in PostgreSQL queue table
  const job = await pool.query(`
    INSERT INTO background_jobs (job_type, payload, status)
    VALUES ($1, $2, 'PENDING')
    RETURNING id;
  `, [reportType, JSON.stringify({ dateRange, requestedBy: req.user.id })]);

  return res.status(202).json({
    status: 'ACCEPTED',
    jobId: job.rows[0].id,
    message: 'Report is generating in the background.'
  });
});
```

## Summary Checklist
- Set connection pool sizes based on PostgreSQL hardware cores, not Express server count.
- Use `EXPLAIN (ANALYZE, BUFFERS)` to verify index usage.
- Offload non-critical side effects to background workers.
- Add structured rate limiting at your reverse proxy.
