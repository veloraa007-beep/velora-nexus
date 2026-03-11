# System Instructions — Velora Nexus

Velora Nexus is a SaaS operating system for digital agencies.

The platform manages:
- Clients
- Leads
- Projects
- Team members
- Automations
- Analytics
- Finance and invoices

The stack used:

Frontend
- Next.js 14 (App Router)
- TailwindCSS
- ShadCN UI

Backend
- Supabase (PostgreSQL)
- Supabase Auth

Hosting
- Vercel

Analytics
- Google Sheets
- Recharts for dashboards

---

## Coding Rules

1. Always follow modular architecture.
2. Use reusable components.
3. Use TypeScript everywhere.
4. Avoid server-side crashes.
5. Use Supabase queries instead of mock data.

---

## Project Modules

Velora Nexus contains these modules:

Dashboard
Clients
Leads
Projects
Team
Analytics
Finance
Automation
Chatbot
Settings

Each module should have:

- List view
- Create modal
- Edit modal
- Delete option
- Supabase integration

---

## UI Design Rules

Velora design style:

- Minimal SaaS dashboard
- Clean whitespace
- Dark + Light theme
- Rounded cards
- Subtle animations

Use Tailwind utility classes only.

Avoid inline CSS.

---

## Security Rules

- Only CEO and Co-founder can access workspace settings
- Team members cannot delete workspace
- Role based permissions must exist

Roles:

CEO
Co-Founder
Admin
Employee
