export interface Committee {
  id: string;
  title: string;
  description: string;
  members: number;
  tenure: string;
  status: "active" | "upcoming" | "closed";
  createdAt: string;
}
