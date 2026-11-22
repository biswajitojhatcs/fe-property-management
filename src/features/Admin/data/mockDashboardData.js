export const mockDashboardData = {
  kpis: [
    {
      id: "occupancy",
      title: "Total Occupancy",
      value: "42 / 50",
      subtitle: "84% units occupied",
      isAlert: false,
    },
    {
      id: "rentCollected",
      title: "Monthly Rent Collected",
      value: "₹7,60,000",
      subtitle: "Target: ₹9,00,000",
      isAlert: false,
    },
    {
      id: "pendingDues",
      title: "Pending Dues",
      value: "₹1,40,000",
      subtitle: "6 tenants overdue",
      isAlert: true,
    },
    {
      id: "openTickets",
      title: "Open Tickets",
      value: "5",
      subtitle: "2 high priority",
      isAlert: true,
    },
  ],
  recentTenants: [
    { id: 1, name: "Rohan Das", unit: "Flat 101", rent: "₹18,000", status: "Paid" },
    { id: 2, name: "Ananya Sen", unit: "Flat 204", rent: "₹22,000", status: "Due" },
    { id: 3, name: "Vikram Nair", unit: "Room 3B", rent: "₹12,500", status: "Paid" },
    { id: 4, name: "Priya Sharma", unit: "Flat 402", rent: "₹20,000", status: "Due" },
  ],
};