"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; // optional icon
  className?: string; // extra tailwind classes
}

export default function StatsCard({
  title,
  value,
  icon,
  className = "",
}: StatsCardProps) {
  return (
    <div
      className={`bg-green-50/40 border border-green-100 rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition ${className}`}
    >
      {icon && (
        <div className="text-green-700 text-3xl">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-gray-600 text-sm">{title}</span>
        <span className="text-green-700 font-bold text-xl">{value}</span>
      </div>
    </div>
  );
}
