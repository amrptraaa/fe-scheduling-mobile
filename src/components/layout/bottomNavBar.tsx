"use client";

import React from "react";
import { Home, PlusCircle, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: Home, href: "/home" },
    { label: "Add", icon: PlusCircle, href: "/attendance" },
    { label: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center py-2 z-50">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <button
            key={idx}
            onClick={() => router.push(item.href)}
            className={`flex flex-col items-center ${
              isActive ? "text-[#039155]" : "text-gray-500"
            }`}
          >
            <Icon className={idx === 1 ? "w-10 h-10" : "w-6 h-6"} />
            {idx !== 1 && ( // jangan kasih label untuk tombol Add biar sesuai desain
              <span className="text-xs mt-1">{item.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
