"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/admin/DataTable";

interface Referral {
  id: string;
  user: string;
  referredUser: string;
  reward: number;
  date: string;
}

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setReferrals([
          { id: "r1", user: "Amit Kumar", referredUser: "Rahul", reward: 500, date: "2026-01-01" },
          { id: "r2", user: "Neha Sharma", referredUser: "Sneha", reward: 300, date: "2026-01-02" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  // --- ERROR FIXED HERE ---
  // 1. Array of objects banaya
  // 2. Type define kiya 'keyof Referral' taaki accessor properties se match kare
  const columns: { header: string; accessor: keyof Referral }[] = [
    { header: "User", accessor: "user" },
    { header: "Referred User", accessor: "referredUser" },
    { header: "Reward", accessor: "reward" },
    { header: "Date", accessor: "date" },
  ];

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Referrals</h1>
      
      {/* 3. Updated columns variable pass kiya */}
      <DataTable data={referrals} columns={columns} />
    </section>
  );
}