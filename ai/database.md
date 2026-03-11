# Velora Database Schema

Table: clients

id
company_name
client_id
contact_name
email
phone
status
mrr
join_date
deadline
notes

---

Table: leads

id
company
contact
email
phone
stage
value

Stages

New Inquiry
Discovery Call Booked
Proposal Sent
Negotiation
Closed Won
Closed Lost

---

Table: projects

id
project_name
client
service_type
status
progress
deadline
team_members
