"use client";

import React from "react";
import { Calendar } from "lucide-react";
import BottomNavBar from "@/components/layout/bottomNavBar";

export default function HomePage() {
  const schedules = [
    {
      title: "Persiapan Acara Pernikahan",
      project: "Wedding Event - Hotel Santika",
      team: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
      date: "24 Oktober 2025",
    },
    {
      title: "Dekorasi dan Sound System",
      project: "Konser Amal - Stadion Jati",
      team: [
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
        "https://i.pravatar.cc/40?img=6",
      ],
      date: "25 Oktober 2025",
    },
    {
      title: "Koordinasi Vendor dan Catering",
      project: "Festival Kuliner Pati",
      team: [
        "https://i.pravatar.cc/40?img=7",
        "https://i.pravatar.cc/40?img=8",
        "https://i.pravatar.cc/40?img=9",
      ],
      date: "27 Oktober 2025",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="text-white p-6 rounded-b-3xl shadow-md"
        style={{ backgroundColor: "#039155" }}
      >
        <p className="text-sm opacity-90">Selamat Bekerja!</p>
        <h1 className="text-2xl font-bold tracking-tight mt-1">
          Tim Event Organizer
        </h1>
      </div>

      {/* Jadwal kerja */}
      <div className="px-6 mt-6 flex-1">
        <p className="text-gray-800 font-semibold mb-4 text-lg">
          Jadwal Pekerjaan
        </p>

        <div className="space-y-5 pb-24">
          {schedules.map((job, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Proyek - {job.project}
                  </p>

                  <div className="flex items-center mt-3 space-x-2">
                    {job.team.slice(0, 3).map((src, j) => (
                      <img
                        key={j}
                        src={src}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      />
                    ))}
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                      +3
                    </span>
                  </div>

                  <div className="flex items-center mt-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-[#039155]" />
                    {job.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
