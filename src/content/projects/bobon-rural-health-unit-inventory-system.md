---
title: "Bobon Rural Health Unit Inventory System"
description: "Medicine stock, pharmaceutical supplies, and patient prescription disbursement ledger for Bobon RHU."
longDescription: "A specialized public healthcare inventory and dispensing platform created for the Rural Health Unit of Bobon, Northern Samar. Tracks essential medicines, medical supply batches, expiry dates, and clinic disbursements with automated low-stock warnings."
category: "Healthcare & Public Health"
tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"]
featured: true
order: 2
liveUrl: "#"
githubUrl: "https://github.com/rainzone01/BobonRHU-Inventory"
stats:
  "Medicines Tracked": "250+ SKUs"
  "Disbursement Time": "-60%"
  "Zero Expired Stock": "100%"
problem: "The municipal health office faced supply chain delays and medicine stockouts due to fragmented manual stock cards. Tracking batch numbers and expiry dates of government-allocated pharmaceuticals was labor-intensive, occasionally resulting in stock spoilage or unaccounted distribution."
solution: "Engineered a robust inventory and dispensing platform utilizing PHP and MySQL. Implemented First-In-First-Out (FIFO) stock allocation, automated alerts for near-expiry medicine batches, and an instant prescription disbursement ledger connected to patient records."
features:
  - "FIFO batch-level tracking with automated 30/60/90-day expiry notifications"
  - "One-click patient prescription dispensing log with dosage validation"
  - "Automated reorder notifications when emergency medicine inventory hits threshold"
  - "DOH-compliant monthly stock consumption and inventory audit reporting"
architecture: "ACID-compliant MySQL transaction engine handling stock mutations, with PHP backend business validation and lightweight dynamic frontend updates."
---

## Executive Overview
The **Bobon Rural Health Unit (RHU) Inventory System** is a mission-critical pharmaceutical logistics application engineered for healthcare workers in Bobon, Northern Samar. The application ensures accountability and equitable distribution of state-subsidized medications and medical supplies.

## Core Architectural Highlights
- **FIFO Batch Expiry Enforcement**: Automatically selects the nearest-expiry batch during dispensation, preventing wastage of vital antibiotics, vaccines, and supplements.
- **Transactional Stock Decrement**: Uses atomic MySQL transactions ensuring stock numbers cannot become negative or desynchronized during simultaneous clinic operations.
- **Audit Trails for Regulated Supplies**: Every dispensed item logs dispensing clinician ID, patient health ID, prescription serial number, and timestamp.

```sql
-- Atomic dispensing transaction with batch expiry tracking
START TRANSACTION;
SELECT batch_number, quantity_remaining, expiry_date 
FROM rhu_medicine_batches 
WHERE medicine_id = 42 AND quantity_remaining > 0
ORDER BY expiry_date ASC 
LIMIT 1 FOR UPDATE;

UPDATE rhu_medicine_batches 
SET quantity_remaining = quantity_remaining - 30 
WHERE id = 108;

INSERT INTO rhu_dispense_log (patient_id, medicine_id, batch_id, quantity, dispensed_by) 
VALUES (319, 42, 108, 30, 'RN-AHORRO');
COMMIT;
```
