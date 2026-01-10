"use client";

// ERROR FIXED: Metadata export yahan se hata di gayi hai
import React from "react";

type Refferal = {
  id: number;
  name: string;
  email: string;
  referredBy: string;
  status: "Pending" | "Approved";
};

const DUMMY_REFFERALS: Refferal[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    referredBy: "Aman Kumar",
    status: "Pending",
  },
  {
    id: 2,
    name: "Neha Verma",
    email: "neha@example.com",
    referredBy: "Admin",
    status: "Approved",
  },
];

export default function RefferalsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Admin Refferals
        </h1>
        <p className="text-gray-600">
          View and manage all user refferals in one place.
        </p>
      </section>

      {/* Refferals Table */}
      <section className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full border border-green-100 rounded-xl overflow-hidden">
          <thead className="bg-green-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">
                Name
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">
                Email
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">
                Referred By
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">
                Status
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {DUMMY_REFFERALS.map((ref) => (
              <tr
                key={ref.id}
                className="border-t border-green-100 hover:bg-green-50/40 transition"
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {ref.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {ref.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {ref.referredBy}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ref.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ref.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    onClick={() => {
                      console.log("Action on refferal", ref.id);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}