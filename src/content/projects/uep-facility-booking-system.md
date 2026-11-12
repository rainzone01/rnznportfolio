---
title: "UEP Facility Booking System"
description: "Campus venue reservations, schedule conflict prevention, and approval workflow for UEP."
longDescription: "An institutional campus facility reservation and scheduling platform built for the University of Eastern Philippines (UEP). Manages booking requests for university auditoriums, gymnasium, function halls, and multimedia laboratories with automated collision checks."
category: "Academic & Campus Tech"
tags: ["React", "Next.js", "PHP", "MySQL", "Tailwind CSS"]
featured: false
order: 5
liveUrl: "#"
githubUrl: "https://github.com/rainzone01/uep-facility-booking-system"
stats:
  "Facilities Managed": "40+"
  "Booking Collisions": "0"
  "Approval Speed": "3x Faster"
problem: "University departments, student organizations, and external partners suffered from paper reservation routing that took weeks to process, frequently resulting in double-booked auditoriums and last-minute event cancellations."
solution: "Constructed a multi-tier reservation engine where users view real-time facility calendar availability and submit booking requests with supporting attachments. Department heads and facility administrators review and approve requests via a centralized dashboard."
features:
  - "Interactive calendar showing booked, pending, and open university facilities"
  - "Algorithmic schedule collision detection preventing double-booking overlaps"
  - "Multi-stage hierarchical approval workflow (Dean, Facilities Director, VP)"
  - "Automated email/SMS status notifications and printable permit slips"
architecture: "Interactive calendar UI built with React & Next.js communicating with a robust PHP/MySQL backend handling reservation validation and timestamp conflict checking."
---

## Executive Overview
The **UEP (University of Eastern Philippines) Facility Booking System** streamlines how students, faculty, and academic departments reserve campus resources. By replacing paper-based endorsement routing with a transparent digital portal, event planning becomes swift and predictable.

## Core Architectural Highlights
- **Strict Collision Prevention**: Employs timestamp boundary overlap algorithms (`start_time < existing_end AND end_time > existing_start`) to prevent double bookings.
- **Hierarchical Approval Gates**: Requests advance through structured status stages (`PENDING_DEAN`, `PENDING_DIRECTOR`, `APPROVED`, `REJECTED`) with automated notification triggers.
- **Interactive Schedule Grid**: Real-time visual schedule calendar displaying day, week, and month views of all campus facilities.

```sql
-- Schedule overlap collision detection
SELECT id, facility_id, event_title, start_datetime, end_datetime
FROM uep_facility_bookings
WHERE facility_id = 3
  AND status IN ('CONFIRMED', 'PENDING')
  AND (start_datetime < '2026-11-20 17:00:00' 
  AND end_datetime > '2026-11-20 13:00:00');
```
