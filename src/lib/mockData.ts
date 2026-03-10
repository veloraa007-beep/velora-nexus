export interface ClientLead {
  id: string;
  clientName: string;
  phoneNumber: string;
  email: string;
  businessName: string;
  businessType: string;
  cityLocation: string;
  leadSource: string;
  inquiryDate: string;
  whatClientWants: string;
  notes: string;
  dealStage: string;
  serviceType: string;
  estimatedDealValue: string;
  finalDealValue: string;
  projectStatus: string;
  assignedTeamMember: string;
  startDate: string;
  endDate: string;
  deadline: string;
  invoiceNumber: string;
  paymentStatus: string;
  paymentMethod: string;
  leadScorePriority: string;
}

export const mockLeadsAndClients: ClientLead[] = [
  {
    id: "CL-1029",
    clientName: "Tony Stark",
    phoneNumber: "+1 555-0198",
    email: "tony@starkindustries.com",
    businessName: "Stark Industries",
    businessType: "Technology & Defense",
    cityLocation: "New York",
    leadSource: "Referral",
    inquiryDate: "2024-10-20",
    whatClientWants: "Platform modernization and AI integration",
    notes: "Requires high security clearance. Priority client.",
    dealStage: "Closed Won",
    serviceType: "Custom SaaS Development",
    estimatedDealValue: "₹12,500",
    finalDealValue: "₹12,500",
    projectStatus: "In Progress",
    assignedTeamMember: "Harshit Gowda",
    startDate: "2024-10-24",
    endDate: "",
    deadline: "2025-06-01",
    invoiceNumber: "INV-001",
    paymentStatus: "Paid",
    paymentMethod: "Wire Transfer",
    leadScorePriority: "High",
  },
  {
    id: "CL-1030",
    clientName: "Bruce Wayne",
    phoneNumber: "+1 555-0100",
    email: "bruce@wayneenterprises.com",
    businessName: "Wayne Enterprises",
    businessType: "Conglomerate",
    cityLocation: "Gotham",
    leadSource: "Direct Traffic",
    inquiryDate: "2024-11-05",
    whatClientWants: "Logistics tracking system",
    notes: "Strict NDA required.",
    dealStage: "Closed Won",
    serviceType: "Logistics SaaS",
    estimatedDealValue: "₹18,000",
    finalDealValue: "₹18,000",
    projectStatus: "Setup",
    assignedTeamMember: "John Doe",
    startDate: "2024-11-12",
    endDate: "",
    deadline: "2025-08-15",
    invoiceNumber: "INV-002",
    paymentStatus: "Pending",
    paymentMethod: "Credit Card",
    leadScorePriority: "High",
  },
  {
    id: "CL-1031",
    clientName: "Norman Osborn",
    phoneNumber: "+1 555-0212",
    email: "norman@oscorp.com",
    businessName: "Oscorp",
    businessType: "Biotech",
    cityLocation: "New York",
    leadSource: "Cold Email",
    inquiryDate: "2025-01-02",
    whatClientWants: "Data analytics dashboard",
    notes: "Budget sensitive.",
    dealStage: "Proposal Sent",
    serviceType: "Data Analytics",
    estimatedDealValue: "₹5,200",
    finalDealValue: "",
    projectStatus: "Not Started",
    assignedTeamMember: "Harshit Gowda",
    startDate: "",
    endDate: "",
    deadline: "",
    invoiceNumber: "",
    paymentStatus: "",
    paymentMethod: "",
    leadScorePriority: "Medium",
  },
  {
    id: "CL-1032",
    clientName: "Diana Prince",
    phoneNumber: "+1 555-0344",
    email: "diana@themyscira.com",
    businessName: "Future Vision",
    businessType: "Consulting",
    cityLocation: "London",
    leadSource: "LinkedIn",
    inquiryDate: "2025-02-15",
    whatClientWants: "CRM Implementation",
    notes: "Looking to scale team rapidly.",
    dealStage: "Negotiation",
    serviceType: "CRM & Automation",
    estimatedDealValue: "₹8,400",
    finalDealValue: "",
    projectStatus: "Not Started",
    assignedTeamMember: "Sarah Connor",
    startDate: "",
    endDate: "",
    deadline: "",
    invoiceNumber: "",
    paymentStatus: "",
    paymentMethod: "",
    leadScorePriority: "High",
  },
  {
    id: "CL-1033",
    clientName: "Charlie Davis",
    phoneNumber: "+1 555-0988",
    email: "charlie@startupinc.com",
    businessName: "Startup Inc",
    businessType: "Software",
    cityLocation: "San Francisco",
    leadSource: "Organic Search",
    inquiryDate: "2025-02-28",
    whatClientWants: "MVP Development",
    notes: "Requires fast turnaround.",
    dealStage: "New Inquiry",
    serviceType: "Web Development",
    estimatedDealValue: "₹3,500",
    finalDealValue: "",
    projectStatus: "Not Started",
    assignedTeamMember: "Unassigned",
    startDate: "",
    endDate: "",
    deadline: "",
    invoiceNumber: "",
    paymentStatus: "",
    paymentMethod: "",
    leadScorePriority: "Low",
  }
];
