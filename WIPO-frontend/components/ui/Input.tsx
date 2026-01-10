"use client";

import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  );
}
