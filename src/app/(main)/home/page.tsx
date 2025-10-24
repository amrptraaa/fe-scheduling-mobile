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
      progress: 90,
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
      progress: 75,
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
      progress: 60,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6 rounded-b-3xl">
        <p className="text-sm">Selamat Bekerja!</p>
        <h1 className="text-2xl font-bold">Tim Event Organizer</h1>
      </div>

      {/* Jadwal kerja */}
      <div className="px-6 mt-6 flex-1">
        <p className="text-gray-700 font-semibold mb-3">Jadwal Pekerjaan</p>

        <div className="space-y-4">
          {schedules.map((job, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-500">Proyek - {job.project}</p>

                <div className="flex items-center mt-3 space-x-2">
                  {job.team.slice(0, 2).map((src, j) => (
                    <img
                      key={j}
                      src={src}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    +3
                  </span>
                </div>

                <div className="flex items-center mt-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {job.date}
                </div>
              </div>

              {/* Progress circle */}
              {/* <div className="mt-4 sm:mt-0">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="28"
                      stroke="#E5E7EB"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="28"
                      stroke="#F97316"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={
                        2 * Math.PI * 28 * (1 - job.progress / 100)
                      }
                      fill="transparent"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">
                      {job.progress}%
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
