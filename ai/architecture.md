# Velora Nexus Architecture

Project structure:

src/

app/
   dashboard
   clients
   leads
   projects
   team
   analytics
   finance
   automation
   chatbot
   settings

components/
   ui
   dashboard
   modals
   charts

lib/
   supabase
   helpers
   analytics

types/

---

Database: Supabase

Tables:

users
clients
leads
projects
tasks
invoices
automations

Relationships:

clients → projects
clients → invoices
leads → clients
projects → tasks
