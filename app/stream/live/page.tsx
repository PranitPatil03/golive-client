"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Users, 
  Heart, 
  MessageCircle, 
  Settings, 
  Mic, 
  MicOff,
  VideoOff,
  Square,
  Share2,
  Eye,
  Clock
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";

export default function LiveStreamPage() {
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(12);
  const [duration, setDuration] = useState("00:05:23");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const mockComments = [
    { user: "StreamFan123", message: "Great stream! 🎉", time: "1m" },
    { user: "GamerGirl", message: "Love the setup!", time: "2m" },
    { user: "TechEnthusiast", message: "What software are you using?", time: "3m" },
    { user: "ViewerOne", message: "First! 🔥", time: "5m" },
  ];

  const endStream = () => {
    setIsLive(false);
    // Handle stream ending logic here
  };

    const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
              <Image
                 src={theme === "dark" ? "/golive-white.svg" : "/logo.svg"}
                 alt="GoLive"
                 width={10}
                 height={10}
                 className="h-5 md:h-7 w-auto"
               />
              </div>

            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={endStream}
                className="bg-red-600 hover:bg-red-700"
              >
                <Square className="h-4 w-4 mr-2" />
                End Stream
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 pt-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Stream Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Stream Video */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg aspect-video overflow-hidden">
                  {isVideoOff ? (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="bg-white/10 rounded-full p-6 mb-4 mx-auto w-fit backdrop-blur-sm">
                          <VideoOff className="h-12 w-12 opacity-70" />
                        </div>
                        <p className="text-xl font-medium mb-2">Camera is off</p>
                        <p className="text-sm opacity-75">Enable your camera to start streaming</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="bg-white/10 rounded-full p-8 mb-4 mx-auto w-fit backdrop-blur-sm">
                          <Video className="h-16 w-16 opacity-70" />
                        </div>
                        <p className="text-2xl font-medium mb-2">Live Stream Preview</p>
                        <p className="text-base opacity-75">This is where your stream content would appear</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none"></div>
                  
                  {/* Stream Stats - Top Right */}
                  <div className="absolute top-6 right-6 flex gap-3">
                    <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm border-white/20">
                      <Users className="h-3 w-3 mr-1" />
                      {viewerCount}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm border-white/20">
                      <Clock className="h-3 w-3 mr-1" />
                      {duration}
                    </Badge>
                  </div>

                  {/* Stream Controls - Bottom */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-3 bg-black/60 backdrop-blur-md rounded-full p-3 border border-white/20">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className={`rounded-full h-10 w-10 p-0 text-white hover:bg-white/20 ${
                          isMuted ? "bg-red-600 hover:bg-red-700" : ""
                        }`}
                      >
                        {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`rounded-full h-10 w-10 p-0 text-white hover:bg-white/20 ${
                          isVideoOff ? "bg-red-600 hover:bg-red-700" : ""
                        }`}
                      >
                        {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full h-10 w-10 p-0 text-white hover:bg-white/20"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stream Info */}
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold leading-tight">
                      Playing Minecraft || First Day || Let&apos;s go
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span className="font-medium text-foreground">{viewerCount}</span>
                        <span className="text-sm">viewers</span>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        Gaming
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 dark:bg-green-950">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                        Live
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Started {duration} ago
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="sm:hidden">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stream Analytics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{viewerCount}</p>
                    <p className="text-sm text-muted-foreground">Live Viewers</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{duration}</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockComments.length}</p>
                    <p className="text-sm text-muted-foreground">Messages</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="xl:col-span-1">
            <Card className="h-[700px] flex flex-col shadow-lg">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  Live Chat
                  <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
                    {mockComments.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4 py-2">
                  <div className="space-y-4">
                    {mockComments.map((comment, index) => (
                      <div key={index} className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-purple-500/20">
                            {comment.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-primary">{comment.user}</span>
                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                          </div>
                          <p className="text-sm break-words leading-relaxed">{comment.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t bg-muted/20">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Say something nice..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 bg-background"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && chatMessage.trim()) {
                          // Handle sending message
                          setChatMessage("");
                        }
                      }}
                    />
                    <Button 
                      size="sm" 
                      disabled={!chatMessage.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Be respectful and follow community guidelines
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
