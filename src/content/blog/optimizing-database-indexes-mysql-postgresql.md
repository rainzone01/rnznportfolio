---
title: "The Pragmatic Guide to Database Indexing in MySQL & PostgreSQL"
description: "Mastering B-Tree, Compound Indexes, Covering Indexes, and GIN/GIST for 100x query speedups."
pubDate: 2026-10-28
tags: ["PostgreSQL", "MySQL", "Databases", "SQL", "Performance"]
readingTime: "5 min read"
featured: false
author: "Lorenzon Emmanuel S. Ahorro"
---

Nothing degrades application responsiveness faster than table scans on tables with hundreds of thousands or millions of rows. Yet, indexing is often treated like guesswork: developers add single-column indexes on every foreign key and hope the query planner figures it out.

Understanding how B-Trees operate and how compound indexes require strict column ordering is essential for every full-stack software engineer.

## The Leftmost Prefix Rule in Compound Indexes

Imagine you have a query searching for orders by `tenant_id`, filtering by `status`, and ordering by `created_at`:

```sql
SELECT id, total_cents 
FROM customer_orders 
WHERE tenant_id = 42 
  AND status = 'COMPLETED' 
ORDER BY created_at DESC 
LIMIT 20;
```

If you create an index on `(created_at, status, tenant_id)`, the database engine **cannot** use the index effectively for filtering `tenant_id = 42`. The index is ordered first by `created_at`.

### The Optimal Index Order:
1. **Equality columns first**: `tenant_id`, `status`
2. **Range or Sort columns second**: `created_at`

```sql
CREATE INDEX idx_orders_tenant_status_date 
ON customer_orders (tenant_id, status, created_at DESC);
```

With this compound index:
- The database engine seeks directly to `tenant_id = 42` and `status = 'COMPLETED'`.
- The matching rows are *already sorted* in disk/memory in descending order of `created_at`.
- Zero disk sorting (`Using filesort` in MySQL or `Sort Method: quicksort` in Postgres) is required.

## Covering Indexes: Avoiding the Heap Read

In a standard index lookup, PostgreSQL or MySQL looks up the pointer in the index, then visits the main table storage (the heap) to retrieve the required row columns.

A **covering index** stores the queried data directly within the index leaves:

```sql
-- PostgreSQL covering index syntax
CREATE INDEX idx_orders_covering 
ON customer_orders (tenant_id, status) 
INCLUDE (id, total_cents);
```

When executing:
```sql
SELECT id, total_cents 
FROM customer_orders 
WHERE tenant_id = 42 AND status = 'COMPLETED';
```

The database executes an **Index Only Scan**. It never touches the table heap, eliminating random I/O reads.

## Inspecting Execution Plans
Always verify index usage before shipping to production:

```sql
-- PostgreSQL
EXPLAIN (ANALYZE, BUFFERS) 
SELECT ...

-- MySQL
EXPLAIN FORMAT=JSON 
SELECT ...
```

Look for:
- `Seq Scan` (Postgres) or `type: ALL` (MySQL) - Indicates missing indexes.
- High `Rows Removed by Filter` - Indicates the index found too many non-matching rows.
- `Index Only Scan` - The holy grail of read query performance.
