export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  status: "available" | "sold" | "upcoming";
  createdAt: string;
}
