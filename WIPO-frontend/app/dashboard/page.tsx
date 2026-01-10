"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

interface DashboardStats {
  totalInvested: number;
  activeProperties: number;
  totalReferrals: number;
  referralEarnings: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 🔗 Backend API ready (replace later)
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setStats({
          totalInvested: 1250000,
          activeProperties: 3,
          totalReferrals: 18,
          referralEarnings: 45000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="container py-12 space-y-10">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your investments and activities
          </p>
        </div>

        {/* FIX: Removed asChild and wrapped Link around Button for build safety */}
        <Link href="/properties">
          <Button>Explore Properties</Button>
        </Link>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invested"
          value={`₹${stats?.totalInvested.toLocaleString("en-IN")}`}
        />
        <StatCard
          title="Active Properties"
          value={stats?.activeProperties.toString() || "0"}
        />
        <StatCard
          title="Total Referrals"
          value={stats?.totalReferrals.toString() || "0"}
        />
        <StatCard
          title="Referral Earnings"
          value={`₹${stats?.referralEarnings.toLocaleString("en-IN")}`}
        />
      </div>

      {/* ===== Quick Actions ===== */}
      <div className="grid gap-6 md:grid-cols-3">
        <QuickAction
          title="My Properties"
          desc="View and manage your invested properties"
          href="/properties"
        />
        <QuickAction
          title="Refer & Earn"
          desc="Invite friends and earn referral rewards"
          href="/refer-earn"
        />
        <QuickAction
          title="Investment Committees"
          desc="Join or track group investments"
          href="/committees"
        />
      </div>
    </section>
  );
}

/* ===== Reusable Components (local to this page) ===== */

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-2">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function QuickAction({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
    >
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </Link>
  );
}