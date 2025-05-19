export interface RowData {
  id: string | number;
  customer: string;
  status: "completed" | "cancelled" | "processing" | "pending";
  date: string;
  total: number;
}

export const mockData: RowData[] = [
  {
    id: "ORD-001",
    customer: "John Smith",
    status: "completed",
    date: "2023-05-15",
    total: 125.99,
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    status: "processing",
    date: "2023-05-16",
    total: 89.5,
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    status: "pending",
    date: "2023-05-16",
    total: 245.75,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    status: "completed",
    date: "2023-05-14",
    total: 178.25,
  },
  {
    id: "ORD-005",
    customer: "David Wilson",
    status: "cancelled",
    date: "2023-05-13",
    total: 65.99,
  },
  {
    id: "ORD-006",
    customer: "Jennifer Taylor",
    status: "completed",
    date: "2023-05-12",
    total: 312.5,
  },
  {
    id: "ORD-007",
    customer: "Robert Martinez",
    status: "processing",
    date: "2023-05-15",
    total: 189.99,
  },
  {
    id: "ORD-008",
    customer: "Lisa Anderson",
    status: "pending",
    date: "2023-05-16",
    total: 145.25,
  },
  {
    id: "ORD-009",
    customer: "James Thomas",
    status: "completed",
    date: "2023-05-14",
    total: 78.5,
  },
  {
    id: "ORD-010",
    customer: "Patricia Jackson",
    status: "processing",
    date: "2023-05-15",
    total: 267.75,
  },
];
