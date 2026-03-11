# Velora Nexus SaaS Product Roadmap

## Phase 1: Core Foundation & Tracking (Completed)
- [x] Initial Next.js App Router setup with Tailwind CSS
- [x] Supabase Authentication integration (Email/Password)
- [x] Database Schema design & RLS Policies (`clients`, `leads`, `projects`)
- [x] Live Dashboard with dynamic stats
- [x] Real-time Modals for adding Leads, Clients, and Projects
- [x] Analytics Dashboard integration (Google Sheets / Recharts)
- [x] Protected routes and Session security
- [x] AI guiding principles initialized (`/ai` logic files)

## Phase 2: Advanced Data & Interaction (Current Focus)
- [ ] Migrate Analytics from Google Sheets to Supabase tables
- [ ] Implement Edit & Delete functionality for all tables
- [ ] Client Portal view (Read-only access for clients)
- [ ] Multi-tenant Workspaces feature
- [ ] Team Members page with Role-Based Access Control (RBAC)

## Phase 3: Financial & Invoice module
- [ ] Connect Stripe API
- [ ] Automated invoice generation
- [ ] Recurring billing / MRR tracking dashboard improvements
- [ ] Finance analytics charts

## Phase 4: Automation & AI Agents
- [ ] Supabase Webhooks for Zapier/Make integrations
- [ ] Basic workflow automations
- [ ] Chatbot integration (Internal AI Helper for team)
