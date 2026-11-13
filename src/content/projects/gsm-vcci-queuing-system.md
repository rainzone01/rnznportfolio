---
title: "GSM-VCCI Queuing System"
description: "High-throughput ticketing, counter routing, and real-time public queuing display for GSM-VCCI."
longDescription: "A customer flow management and queuing system engineered for GSM-VCCI service centers. Organizes customer service lines via ticket dispensing, multi-counter priority routing, audio chime calling, and real-time waiting room displays."
category: "Operations & Queuing"
tags: ["JavaScript", "Node.js", "Express.js", "MySQL", "HTML", "CSS"]
featured: true
order: 3
githubUrl: "https://github.com/rainzone01/GSM-VCCI-Distribution-System"
stats:
  "Daily Tickets": "1,200+"
  "Avg Wait Reduction": "35%"
  "Display Sync": "< 50ms"
problem: "Peak office hours generated long, disorganized lines, customer confusion, and uneven teller workloads. Lack of visibility into counter throughput prevented managers from reassigning staff to bottlenecked transaction windows."
solution: "Engineered an interactive ticket management and queue visualizer. Service tellers call, transfer, or defer tickets with a single click, while a central monitor displays active numbers, counter assignments, and triggers audio chimes."
features:
  - "Digital ticket dispensing with transaction-specific service codes"
  - "Multi-counter teller terminal with Next, Recall, and Transfer controls"
  - "High-resolution TV display screen with real-time ticket animations"
  - "Comprehensive teller analytics: average service time and customer volume logs"
architecture: "High-throughput request dispatcher pairing Express/Node and PHP with MySQL queue status tables, ensuring instant broadcast to waiting room monitors."
---

## Executive Overview
The **GSM-VCCI Queuing System** modernizes in-branch customer flow across service counters. It streamlines the customer journey from the kiosk ticket generation to teller window announcement, significantly curbing waiting times and eliminating physical queue crowding.

## Core Architectural Highlights
- **Real-Time Waiting Room Broadcast**: Low-latency polling and event dispatch that updates public lobby displays with active ticket numbers and counter announcements in under 50ms.
- **Dynamic Teller Workload Balancing**: Supports priority categories (Senior, PWD, Express) while intelligently distributing general transactions across active windows.
- **Throughput Analytics**: Provides management with hourly volume trends, peak congestion periods, and teller service speed metrics.

```javascript
// Queue ticket state transition handler
async function callNextTicket(counterId, tellerId) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [ticket] = await connection.query(
      `SELECT id, ticket_code, priority_level 
       FROM queue_tickets 
       WHERE status = 'WAITING' 
       ORDER BY priority_level DESC, created_at ASC 
       LIMIT 1 FOR UPDATE`
    );

    if (!ticket.length) return null;

    await connection.query(
      `UPDATE queue_tickets 
       SET status = 'CALLED', counter_id = ?, teller_id = ?, called_at = NOW() 
       WHERE id = ?`,
      [counterId, tellerId, ticket[0].id]
    );

    await connection.commit();
    return ticket[0];
  } finally {
    connection.release();
  }
}
```
