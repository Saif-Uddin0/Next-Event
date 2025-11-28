import Link from "next/link";
import React from "react";

export default function Banner({ title, subtitle }) {
  return (
    <div
      className="w-full h-[300px] md:h-[350px] relative flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/bg-1-3.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative text-center text-white">
        <div className="h-1 w-8 bg-red-500 mx-auto mb-3"></div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-sm opacity-80"><Link href={'/'}>Home </Link><span className="text-primary">/ {subtitle}</span></p>
      </div>
    </div>
  );
}
