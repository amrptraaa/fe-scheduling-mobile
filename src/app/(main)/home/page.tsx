"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import BottomNavBar from "@/components/layout/bottomNavBar";
import api from "@/lib/axios";

/* ================= TYPES ================= */

type JadwalType = {
  id: number;
  user_id: number;
  tanggal: string;
  keterangan: string;
  nama_shift: string;
};

/* ================= PAGE ================= */

export default function HomePage() {
  const [schedules, setSchedules] = useState<JadwalType[]>([]);

  /* ================= FETCH JADWAL ================= */

  const fetchJadwal = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      const res = await api.get("/jadwal");

      // FILTER: hanya jadwal user login
      const filtered = res.data.filter(
        (j: JadwalType) => j.user_id === user.id
      );

      setSchedules(filtered);
    } catch (error) {
      console.error("Gagal fetch jadwal:", error);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  /* ================= FORMAT TANGGAL ================= */

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  /* ================= UI ================= */

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
              key={job.id}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {job.keterangan}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Shift - {job.nama_shift}
                  </p>

                  {/* avatar dummy (UI tetap) */}
                  <div className="flex items-center mt-3 space-x-2">
                    <img
                      src="https://i.pravatar.cc/40?img=1"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                    <img
                      src="https://i.pravatar.cc/40?img=2"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                    <img
                      src="https://i.pravatar.cc/40?img=3"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                      +3
                    </span>
                  </div>

                  <div className="flex items-center mt-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-[#039155]" />
                    {formatDate(job.tanggal)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* jika tidak ada jadwal */}
          {schedules.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              Belum ada jadwal untuk kamu
            </p>
          )}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}
