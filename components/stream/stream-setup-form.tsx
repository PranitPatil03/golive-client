"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Video, Eye, Settings, Webcam, Copy } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface StreamSetupFormProps {
  currentStep: number;
  streamData: {
    title: string;
    description: string;
    category: string;
    visibility: string;
    scheduledDate: string;
    scheduledTime: string;
  };
  setStreamData: (data: {
    title: string;
    description: string;
    category: string;
    visibility: string;
    scheduledDate: string;
    scheduledTime: string;
  }) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
}

const categories = [
  "Gaming",
  "Music",
  "Art & Crafts",
  "Technology",
  "Education",
  "Fitness",
  "Cooking",
  "Travel",
  "Talk Shows",
  "Sports",
  "News & Politics",
  "Entertainment",
  "Science & Nature",
  "Business"
];

export function StreamSetupForm({
  currentStep,
  streamData,
  setStreamData,
  onNext,
  onPrevious,
  onFinish,
}: StreamSetupFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const updateStreamData = (key: string, value: string) => {
    setStreamData({ ...streamData, [key]: value });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2",
              currentStep >= 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground bg-muted text-muted-foreground"
            )}
          >
            <Video className="h-5 w-5" />
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Details</span>
        </div>

        {/* Connector */}
        <div
          className={cn(
            "h-1 w-12 rounded",
            currentStep > 1 ? "bg-primary" : "bg-muted"
          )}
        />

        {/* Step 2 */}
        <div className="flex items-center">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2",
              currentStep >= 2
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground bg-muted text-muted-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Customisation</span>
        </div>

        {/* Connector */}
        <div
          className={cn(
            "h-1 w-12 rounded",
            currentStep > 2 ? "bg-primary" : "bg-muted"
          )}
        />

        {/* Step 3 */}
        <div className="flex items-center">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2",
              currentStep >= 3
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground bg-muted text-muted-foreground"
            )}
          >
            <Eye className="h-5 w-5" />
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Visibility</span>
        </div>

        {/* Connector */}
        <div
          className={cn(
            "h-1 w-12 rounded",
            currentStep > 3 ? "bg-primary" : "bg-muted"
          )}
        />

        {/* Step 4 */}
        <div className="flex items-center">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2",
              currentStep >= 4
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground bg-muted text-muted-foreground"
            )}
          >
            <Webcam className="h-5 w-5" />
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Stream Setup</span>
        </div>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Add a title that describes your stream (type @ to mention a channel)"
            value={streamData.title}
            onChange={(e) => updateStreamData("title", e.target.value)}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell viewers more about your stream (type @ to mention a channel)"
            value={streamData.description}
            onChange={(e) => updateStreamData("description", e.target.value)}
            className="min-h-[120px] text-base resize-none"
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              How do you want to go live?
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Choose a broadcast type for your stream
            </p>
            <div className="border rounded-lg p-4 bg-muted/20">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Webcam className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Webcam</p>
                  <p className="text-sm text-muted-foreground">Stream directly from your webcam</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <p className="text-sm text-muted-foreground">
              Add your stream to a category so that viewers can find it more easily
            </p>
            <Select value={streamData.category} onValueChange={(value) => updateStreamData("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} disabled={!streamData.title.trim()}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCustomisationStep = () => (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Customisation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
            <Settings className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Stream Customisation</h3>
          <p className="text-muted-foreground mb-6">
            Configure your stream settings and layout preferences
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Enable chat</span>
              <div className="w-10 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Allow donations</span>
              <div className="w-10 h-6 bg-muted rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Record stream</span>
              <div className="w-10 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Back
          </Button>
          <Button onClick={onNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderVisibilityStep = () => (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Visibility</CardTitle>
        <p className="text-muted-foreground">
          Choose when to go live and who can see your stream. Remember to follow YouTube&apos;s copyright rules.{" "}
          <a href="#" className="text-primary hover:underline">
            Learn more
          </a>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <RadioGroup
            value={streamData.visibility}
            onValueChange={(value) => updateStreamData("visibility", value)}
            className="space-y-4"
          >
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="private" id="private" />
                <div className="flex-1">
                  <Label htmlFor="private" className="font-medium cursor-pointer">
                    Private
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Only you and people you choose can watch your stream
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="unlisted" id="unlisted" />
                <div className="flex-1">
                  <Label htmlFor="unlisted" className="font-medium cursor-pointer">
                    Unlisted
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Anyone with the stream link can watch your stream
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-primary/5">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="public" id="public" />
                <div className="flex-1">
                  <Label htmlFor="public" className="font-medium cursor-pointer">
                    Public
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Everyone can watch your stream
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Schedule</Label>
          <p className="text-sm text-muted-foreground">
            Select the date and time when you want to go live
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={streamData.scheduledTime}
                  onChange={(e) => updateStreamData("scheduledTime", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Back
          </Button>
          <Button onClick={onNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStreamSetupStep = () => (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Webcam className="h-6 w-6" />
          Stream Setup
        </CardTitle>
        <p className="text-muted-foreground">
          Connect your streaming software to go live. Copy the stream key and URL below.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stream Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stream Preview</h3>
            <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center">
              <div className="text-white text-center">
                <Webcam className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Connect streaming software to go live</p>
                <p className="text-sm opacity-75">Viewers will be able to find your stream once you go live</p>
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Waiting...
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">{streamData.title || "Untitled Stream"}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{streamData.visibility.charAt(0).toUpperCase() + streamData.visibility.slice(1)}</span>
                </div>
                {streamData.category && (
                  <Badge variant="secondary">
                    {streamData.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stream Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Stream Key</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="flex-1 text-sm font-mono text-muted-foreground">
                    ••••••••••••••••••••••••••••••••
                  </code>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Keep your stream key private
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Stream URL</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="flex-1 text-sm font-mono">
                    rtmp://x.rtmp.youtube.com/live2
                  </code>
                  <Button size="sm" variant="ghost">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Backup URL</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="flex-1 text-sm font-mono">
                    rtmp://x.rtmp.youtube.com/live2?backup=1
                  </code>
                  <Button size="sm" variant="ghost">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Stream setup help
              </Button>
            </div>
          </div>
        </div>

        {/* Stream Latency Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stream Latency</h3>
          <RadioGroup defaultValue="normal" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="normal" id="normal" />
                <div className="flex-1">
                  <Label htmlFor="normal" className="font-medium cursor-pointer">
                    Normal latency
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Higher resilience, 15-60s delay
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-primary/5">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="low" id="low" />
                <div className="flex-1">
                  <Label htmlFor="low" className="font-medium cursor-pointer">
                    Low-latency
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Fast interaction, 2-5s delay
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="ultra" id="ultra" />
                <div className="flex-1">
                  <Label htmlFor="ultra" className="font-medium cursor-pointer">
                    Ultra low-latency
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Near real-time, under 2s delay
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Back
          </Button>
          <Button onClick={onFinish} className="bg-red-600 hover:bg-red-700 text-white">
            GO LIVE
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {renderStepIndicator()}
      
      {currentStep === 1 && renderDetailsStep()}
      {currentStep === 2 && renderCustomisationStep()}
      {currentStep === 3 && renderVisibilityStep()}
      {currentStep === 4 && renderStreamSetupStep()}
    </div>
  );
}
