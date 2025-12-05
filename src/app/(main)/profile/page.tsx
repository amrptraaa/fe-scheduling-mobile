"use client";

import { useState } from "react";
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

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setOpen(false);
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fafff2] to-[#039155]">
      {/* Header */}
      <div className="bg-[#039155] text-white py-8 text-center shadow-md rounded-b-3xl">
        <h1 className="text-2xl font-semibold tracking-wide">
          Profil Pengguna
        </h1>
        <p className="text-white text-sm">Informasi akun kamu</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center px-4 py-6">
        <div className="w-full max-w-md">
          <Card className="rounded-3xl shadow-xl border-none bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col gap-5">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#039155] shadow-md">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Budi Irawan
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <User className="w-4 h-4 text-[#039155]" /> Pekerja
                  </p>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Tanggal Lahir
                  </label>
                  <Input
                    type="date"
                    defaultValue="2000-01-01"
                    className="mt-1 border-gray-300 focus:ring-[#039155] focus:border-[#039155] rounded-lg"
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    No HP
                  </label>
                  <Input
                    defaultValue="+62 812 3456 7890"
                    className="mt-1 border-gray-300 focus:ring-[#039155] focus:border-[#039155] rounded-lg"
                    readOnly
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

      {/* Logout Confirmation Dialog */}
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

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
