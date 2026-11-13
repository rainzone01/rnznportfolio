---
title: "Bobon Katarungang Pambarangay System"
description: "Barangay justice, dispute mediation, and incident docketing platform for the Municipality of Bobon."
longDescription: "A digital governance and dispute resolution system engineered for local barangay officials in Bobon, Northern Samar. Replaces manual blotter paper logbooks with automated hearing scheduling, mediation agreement tracking, and statutory compliance monitoring."
category: "Government & Legal Tech"
tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "HTML"]
featured: true
order: 1
stats:
  "Cases Docketed": "500+"
  "Resolution Rate": "92%"
  "Record Retrieval": "< 1.2s"
problem: "Barangay secretariats and Lupon Tagapamayapa mediators previously managed dispute blotters and mediation hearing dates in handwritten ledger books. This led to misfiled case numbers, delayed notice of hearings to parties, and difficulty tracking compliance with mediation settlement terms."
solution: "Developed a centralized database-driven case management system built with PHP and MySQL. Features an automated docket numbering generator, summons letter generation with printable templates, hearing calendar reminders, and confidential role-based access control for Lupon members."
features:
  - "Automated incident docketing with auto-incremented ordinance case IDs"
  - "Amicable settlement agreement generation and digital signature archiving"
  - "Lupon Tagapamayapa hearing calendar with summons date reminders"
  - "Confidential role-based access control protecting citizen dispute records"
  - "Audit log and municipal reporting export (PDF / Excel)"
architecture: "Modular PHP architecture with prepared PDO statements against a normalized MySQL database, styled with Tailwind CSS for clean responsiveness across barangay office desktops and mobile tablets."
---

## Executive Overview
The **Bobon Katarungang Pambarangay System** is a purpose-built dispute resolution and case docketing platform crafted for local government administration in Bobon, Northern Samar. It digitizes the entire Katarungang Pambarangay legal mediation lifecycle—from the initial complaint filing and summons issuance to conciliation sessions and amicable settlement documentation.

## Core Architectural Highlights
- **Normalized Relational Schema**: Designed a relational model isolating Complainant, Respondent, Mediation Sessions, and Settlement Contracts, ensuring strict referential integrity.
- **Automated Hearing Workflow**: Tracks statutory mediation timelines (15-day conciliation periods) and generates printable summons letters for barangay peace officers to serve.
- **Role-Based Security**: Built tiered access partitions ensuring confidential mediation proceedings can only be inspected by authorized Lupon Tagapamayapa officers and the Punong Barangay.

```sql
-- Case hearing docket index & query
SELECT 
  c.case_number, 
  c.incident_title, 
  c.status,
  h.hearing_date, 
  h.venue,
  p.first_name, 
  p.last_name
FROM barangay_cases c
JOIN case_hearings h ON c.id = h.case_id
JOIN case_participants p ON c.id = p.case_id
WHERE c.barangay_code = 'BOBON-01'
  AND h.hearing_date >= CURRENT_DATE
ORDER BY h.hearing_date ASC;
```
