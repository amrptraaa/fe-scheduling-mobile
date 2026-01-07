"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Input from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import BottomNavBar from "@/components/layout/bottomNavBar";
import { LogOut, User } from "lucide-react";
import api from "@/lib/axios";

/* ================= TYPES ================= */

type UserType = {
  id: number;
  nama: string;
  email?: string;
  no_hp?: string;
  jabatan?: string;
  foto_profil?: string;
};

/* ================= PAGE ================= */

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  /* ================= FETCH PROFILE ================= */

  const fetchProfile = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const loginUser = JSON.parse(storedUser);

      const res = await api.get("/users");

      const foundUser = res.data.find(
        (u: UserType) => u.id === loginUser.id
      );

      setUser(foundUser || null);
    } catch (err) {
      console.error("Gagal fetch profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
    router.push("/login");
  };

  /* ================= UI ================= */

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fafff2] to-[#039155]">
      {/* Header */}
      <div className="bg-[#039155] text-white py-8 text-center shadow-md rounded-b-3xl">
        <h1 className="text-2xl font-semibold tracking-wide">
          Profil Pengguna
        </h1>
        <p className="text-white text-sm">Informasi akun kamu</p>
      </div>

      {/* Main */}
      <div className="flex-1 flex justify-center items-center px-4 py-6">
        <div className="w-full max-w-md">
          <Card className="rounded-3xl shadow-xl border-none bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col gap-5">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#039155] shadow-md">
                  <img
                    src={
                      user?.foto_profil && user.foto_profil !== ""
                        ? user.foto_profil
                        : "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {user?.nama || "-"}
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <User className="w-4 h-4 text-[#039155]" />
                    {user?.jabatan || "Pekerja"}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-4 mt-4">
                {/* EMAIL (GANTI TANGGAL LAHIR) */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <Input
                    value={user?.email || "-"}
                    readOnly
                    className="mt-1 border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    No HP
                  </label>
                  <Input
                    value={user?.no_hp || "-"}
                    readOnly
                    className="mt-1 border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Logout */}
              <Button
                className="mt-6 w-full bg-[#039155] hover:bg-[#28A771] text-white font-medium py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                onClick={() => setOpen(true)}
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Konfirmasi Logout
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-center">
            Apakah kamu yakin ingin keluar dari akun ini?
          </p>
          <DialogFooter className="flex gap-2 justify-center mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-xl"
            >
              Batal
            </Button>
            <Button
              className="bg-[#039155] hover:bg-[#28A771] text-white rounded-xl"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavBar />
    </div>
  );
}
