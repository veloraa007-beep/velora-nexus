# Velora Operating System
**Core Features & Architectural Plan**

The Velora Operating System (Velora OS) serves as the central Nervous System for the agency, designed to remove friction from day-to-day operations and centralize growth, management, and tracking mechanisms.

Below is the structured plan outlining the essential modules and their functionalities to ensure maximum scalability and visibility:

---

## 1. Velora HQ Dashboard
**Purpose:** The central command center providing an immediate, high-level overview of business health, operations, and urgent actionable items.

**Key Information & Metrics:**
*   **Active Clients:** Total count of currently retained or active accounts.
*   **Leads Pipeline Value:** Estimated monetary value of all prospects currently in the sales pipeline.
*   **Monthly Recurring Revenue (MRR):** Real-time financial representation of predictable monthly income.
*   **Recent Activity Feed:** A chronological log of critical events (e.g., "Invoice Paid by Client X," "New Lead Captured," "Automation Failed").
*   **Critical Alerts & Tasks:** Overdue deliverables, failing automations, or immediate client messages requiring attention.

## 2. Client Intelligence System
**Purpose:** A unified, dynamic CRM directory providing absolute clarity on every active and past client relationship.

**Key Information & Metrics:**
*   **Business Details:** Client company name, industry, primary contact person, website, and physical/billing address.
*   **Active Services:** The specific services/retainers currently being fulfilled for the client.
*   **Health Score:** A quick RAG (Red, Amber, Green) status indicating client satisfaction or retention risk.
*   **Project History:** A timeline of completed deliverables, past campaigns, and historical metrics.
*   **Communications Log:** Quick links to their Slack/WhatsApp channels, recent emails, and scheduled Calendly meetings.

## 3. Lead Pipeline Tracker
**Purpose:** A structured Kanban-style system to govern the sales process, ensuring prospects are consistently nurtured from discovery to close.

**Key Information & Stages:**
*   **New Inquiries:** Fresh leads automatically captured from the website contact forms or chatbot.
*   **Discovery Call Booked:** Leads with an active Calendly appointment scheduled.
*   **Proposal Sent:** Leads who have received a custom strategy or pricing tier.
*   **Negotiation:** Active discussions regarding terms or scope.
*   **Closed Won:** Successfully onboarded clients (triggers handover automation).
*   **Closed Lost:** Leads that did not convert, with an archived reason for future re-engagement.

## 4. Project Management System
**Purpose:** A streamlined execution environment replacing external tools, tracking deliverables directly against client accounts.

**Key Information & Metrics:**
*   **Client Association:** Direct link to the Client Intelligence record.
*   **Project Status:** Setup, In Progress, In Review, Completed, Blocked.
*   **Task Breakdown:** Individual checklist items assigned to specific internal team members.
*   **Deadlines:** Hard due dates and internal milestones.
*   **Deliverables:** Links to final assets (Figma files, Google Docs, deployed URLs).

## 5. Automation Monitor
**Purpose:** The central dashboard overseeing all n8n workflows and integrations running silently in the background.

**Key Information & Metrics:**
*   **Workflow Name:** e.g., "New Lead to Slack Alert" or "Monthly Invoice Generator".
*   **Current Status:** Active, Paused, or Error State.
*   **Execution Logs:** Success/failure rates of recent runs.
*   **Last Activity Timestamp:** Exact time the automation was last triggered.
*   **Error Details:** If an automation fails (e.g., API key expired), providing immediate context for debugging.

## 6. Knowledge Base / SOP Library
**Purpose:** An internal wiki centralizing Standard Operating Procedures (SOPs) to ensure consistent service delivery and rapid team onboarding.

**Key Information & Documents:**
*   **Onboarding Workflows:** Step-by-step guides for setting up new clients.
*   **Service Delivery SOPs:** Documented processes for executing specific agency services (e.g., "How to launch a Google Ads Campaign").
*   **Brand Guidelines:** Internal and client-specific design parameters.
*   **Tech Stack Documentation:** Internal guides on utilizing Velora OS and connected tools.

## 7. AI Assistant
**Purpose:** An integrated LLM-powered assistant (via OpenAI/Anthropic APIs) to accelerate mundane tasks and provide strategic leverage.

**Key Functionalities:**
*   **Draft Generation:** Automatically drafting proposals, contracts, or follow-up emails based on lead context.
*   **Data Summarization:** Summarizing long client email threads or call transcripts into actionable bullet points.
*   **Querying the Database:** Natural language interaction (e.g., "Show me all clients with overdue invoices" or "What is our MRR for this month?").
*   **SOP Retrieval:** Instantly fetching specific procedural instructions from the Knowledge Base (e.g., "How do I onboard a new SEO client?").
