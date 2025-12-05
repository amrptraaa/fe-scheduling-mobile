"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ClockInPage() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      setShowCamera(true);
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  useEffect(() => {
    if (showCamera && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setPhoto(imageData);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setShowCamera(false);
      setShowSuccess(true);
    }
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <div
        className="w-full h-[180px] flex items-center justify-center text-white font-semibold text-2xl"
        style={{ backgroundColor: "#039155" }}
      >
        Clock In
      </div>

      {/* Card Section */}
      <div className="w-full max-w-md -mt-8 px-4">
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 flex flex-col gap-4">
            <h2
              className="text-center font-medium"
              style={{ color: "#039155" }}
            >
              Ambil Selfie untuk Absen
            </h2>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Catatan (opsional)
              </label>
              <Textarea
                placeholder="Tambahkan catatan..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <Button
              onClick={handleOpenCamera}
              className="w-full text-white rounded-xl transition"
              style={{ backgroundColor: "#039155" }}
            >
              <Camera className="mr-2 h-4 w-4" />
              Buka Kamera
            </Button>

            {photo && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Foto terakhir diambil:
                </p>
                <img
                  src={photo}
                  alt="Selfie hasil absen"
                  className="rounded-xl border border-gray-300"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Camera Modal */}
      <Dialog open={showCamera} onOpenChange={setShowCamera}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ambil Foto Absensi</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded-lg w-full bg-black"
            />
            <canvas ref={canvasRef} className="hidden" />
            <Button
              onClick={handleTakePhoto}
              className="text-white rounded-xl transition"
              style={{ backgroundColor: "#039155" }}
            >
              Ambil Selfie
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Popup */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Absen Berhasil</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-700">
            Selfie berhasil disimpan. Absensi masuk sudah tercatat.
          </p>
          {photo && (
            <img
              src={photo}
              alt="Hasil selfie"
              className="rounded-xl border border-gray-300 mt-3"
            />
          )}
          <DialogFooter>
            <Button
              onClick={handleSuccessOk}
              className="text-white rounded-xl transition"
              style={{ backgroundColor: "#039155" }}
            >
              Oke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
