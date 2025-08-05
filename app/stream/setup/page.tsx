"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StreamSetupForm } from "@/components/stream/stream-setup-form";
import { GoLiveDialog } from "@/components/stream/go-live-dialog";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function StreamSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [streamData, setStreamData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: "public",
    scheduledDate: "",
    scheduledTime: "",
  });
  const [showGoLiveDialog, setShowGoLiveDialog] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setShowGoLiveDialog(true);
  };

  const handleGoLive = () => {
    // Here you would typically create the stream and redirect to the streaming page
    console.log("Going live with data:", streamData);
    router.push("/stream/live");
  };

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header with Logo */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Image
              src={theme === "dark" ? "/golive-white.svg" : "/logo.svg"}
              alt="GoLive"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <StreamSetupForm
            currentStep={currentStep}
            streamData={streamData}
            setStreamData={setStreamData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFinish={handleFinish}
          />
        </div>
      </div>

      <GoLiveDialog
        open={showGoLiveDialog}
        onOpenChange={setShowGoLiveDialog}
        streamData={streamData}
        onGoLive={handleGoLive}
      />
    </div>
  );
}
