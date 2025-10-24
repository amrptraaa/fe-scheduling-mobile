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

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setOpen(false);
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 flex justify-center items-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <h1 className="text-xl font-semibold text-center mb-6">Profile</h1>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 flex flex-col gap-4">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <Input defaultValue="Budi Irawan" className="mt-1" readOnly />
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Tanggal Lahir
                </label>
                <Input
                  type="date"
                  defaultValue="2000-01-01"
                  className="mt-1"
                  readOnly
                />
              </div>

              {/* Posisi */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Posisi
                </label>
                <Input defaultValue="Pekerja" className="mt-1" readOnly />
              </div>

              {/* No HP */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  No HP
                </label>
                <Input
                  defaultValue="+62 812 3456 7890"
                  className="mt-1"
                  readOnly
                />
              </div>

              {/* Logout Button */}
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                onClick={() => setOpen(true)}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Konfirmasi Logout</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">Apakah kamu yakin ingin keluar?</p>
          <DialogFooter className="flex gap-2 justify-end mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
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
