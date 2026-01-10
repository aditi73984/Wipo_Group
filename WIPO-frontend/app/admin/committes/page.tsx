"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";

// 1. Interface (Data ka structure)
interface Committee {
  id: string;
  name: string;
  members: number;
  targetAmount: number;
  status: "Open" | "Closed";
}

export default function AdminCommitteesPage() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setCommittees([
          { id: "c1", name: "Smart City Fund", members: 42, targetAmount: 5000000, status: "Open" },
          { id: "c2", name: "Commercial Growth", members: 30, targetAmount: 8000000, status: "Closed" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommittees();
  }, []);

  // --- ERROR SOLVED HERE ---
  // Maine columns ko explicit type diya hai: { header: string; accessor: keyof Committee }[]
  // Iska matlab accessor wahi ho sakta hai jo Committee interface mein key hai.
  const columns: { header: string; accessor: keyof Committee }[] = [
    { header: "Name", accessor: "name" },
    { header: "Members", accessor: "members" },
    { header: "Target Amount", accessor: "targetAmount" },
    { header: "Status", accessor: "status" },
  ];

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Manage Committees</h1>
      
      {/* Ab columns variable perfectly pass hoga aur build pass ho jayegi */}
      <DataTable data={committees} columns={columns} />
    </section>
  );
}