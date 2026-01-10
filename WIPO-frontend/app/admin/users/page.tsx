import type { Metadata } from "next";
import UsersClient from "./UsersClient";

export const metadata: Metadata = {
  title: "Admin Users | WIPO",
  description: "Manage all users from the admin panel",
};

export default function UsersPage() {
  return <UsersClient />;
}
