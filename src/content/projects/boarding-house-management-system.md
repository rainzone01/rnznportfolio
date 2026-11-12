---
title: "Boarding House Management System"
description: "Room occupancy tracking, tenant leases, and utility billing platform for rental properties."
longDescription: "A streamlined property and boarding house administration platform designed to manage student and working-professional accommodations. Handles room assignments, rent collection ledgers, utility bill splits, and digital receipts."
category: "Property Management"
tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"]
featured: false
order: 4
liveUrl: "#"
githubUrl: "https://github.com/rainzone01/boarding-house-management-system"
stats:
  "Tenants Managed": "120+"
  "Rent Collection": "98%"
  "Audit Time": "< 5 mins"
problem: "Property managers managing multiple boarding houses struggled with informal logbooks, unrecorded utility shares, late rental collections, and confusion over bed and room vacancies."
solution: "Built a centralized web portal providing visual room floor occupancy layouts, automated monthly rent invoicing, utility bill calculators (water & electricity per head), and digital payment receipts."
features:
  - "Interactive room and bed occupancy visualizer with real-time status"
  - "Automated monthly rent billing and printable digital payment receipts"
  - "Utility bill sub-meter calculator with proportional occupant splitting"
  - "Tenant directory with emergency contact details and boarding agreements"
architecture: "Normalized relational database design in MySQL guaranteeing payment ledger consistency, with a responsive PHP interface optimized for mobile landlord use."
---

## Executive Overview
The **Boarding House Management System** provides property owners with end-to-end oversight over rental rooms, bed spaces, and monthly tenant obligations. It addresses the common pain points of shared accommodations: utility sharing calculation, overdue rent reminders, and room occupancy status.

## Core Architectural Highlights
- **Room & Bed Slot Matrix**: Maps facilities into multi-occupancy rooms with individual bed availability states (Occupied, Reserved, Maintenance).
- **Proportional Utility Billing**: Automatically distributes electric and water sub-meter totals equally among registered tenants residing during the billing cycle.
- **Payment Reconciliation**: Generates timestamped digital receipts and exports monthly income statements for landlord bookkeeping.

```sql
-- Monthly tenant balance calculation
SELECT 
  t.id AS tenant_id,
  CONCAT(t.first_name, ' ', t.last_name) AS tenant_name,
  r.room_number,
  r.monthly_rate AS base_rent,
  COALESCE(u.electric_share, 0) + COALESCE(u.water_share, 0) AS total_utilities,
  (r.monthly_rate + COALESCE(u.electric_share, 0) + COALESCE(u.water_share, 0)) AS total_due
FROM tenants t
JOIN rooms r ON t.room_id = r.id
LEFT JOIN monthly_utilities u ON u.tenant_id = t.id AND u.billing_month = '2026-11'
WHERE t.lease_status = 'ACTIVE';
```
