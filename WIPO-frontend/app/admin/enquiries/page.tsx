"use client"; // <--- Yeh line sabse zaruri hai build pass karne ke liye

import React from "react";

export default function EnquiriesPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Admin Enquiries
        </h1>
        <p className="text-gray-600">
          View and manage all user enquiries from here.
        </p>
      </section>

      {/* Enquiries List */}
      <section className="max-w-6xl mx-auto space-y-6">
        {/* Enquiry Card */}
        <div className="border border-green-100 rounded-xl p-6 bg-green-50/40 hover:shadow-md transition">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-green-700">
                Aman Kumar
              </h2>
              <p className="text-sm text-gray-600">
                aman@example.com
              </p>
              <p className="mt-2 text-gray-700">
                I want more information about the WIPO platform features.
              </p>
            </div>

            {/* Action buttons (Now safe for build) */}
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                onClick={() => {
                  console.log("Reply clicked");
                }}
              >
                Reply
              </button>

              <button
                type="button"
                className="px-4 py-2 text-sm rounded-lg border border-green-600 text-green-700 hover:bg-green-50 transition"
                onClick={() => {
                  console.log("Mark as resolved");
                }}
              >
                Resolve
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}