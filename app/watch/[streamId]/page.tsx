"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  MoreVertical, 
  Users, 
  Eye,
  Send,
  Smile,
  Gift,
  Settings,
  Maximize,
  Volume2,
  VolumeX,
  Play,
  Pause
} from "lucide-react";

// Dummy stream data
const getStreamData = (id: string) => {
  const streams = [
    {
      id: "1",
      title: "Epic Gaming Marathon - Elden Ring Boss Fights",
      streamerName: "GamerPro2024",
      profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      viewerCount: 12847,
      category: "Gaming",
      isLive: true,
      duration: "2h 34m",
      description: "Join me for an epic gaming session as we take on the toughest bosses in Elden Ring! Today we're focusing on perfecting our strategies and hopefully finally beating Malenia. Come hang out and enjoy the madness!",
      tags: ["Gaming", "Elden Ring", "Boss Fights", "Action RPG"],
      subscriberCount: 1770000,
      isSubscribed: false,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: "2",
      title: "Cooking Master Class: Italian Pasta from Scratch",
      streamerName: "ChefMaria",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=100&h=100&fit=crop&crop=face",
      viewerCount: 3421,
      category: "Cooking",
      isLive: true,
      duration: "1h 12m",
      description: "Learn to make authentic Italian pasta from scratch! Today we're making fresh tagliatelle with a classic Bolognese sauce.",
      tags: ["Cooking", "Italian", "Pasta", "Tutorial"],
      subscriberCount: 850000,
      isSubscribed: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    }
  ];
  
  return streams.find(stream => stream.id === id) || streams[0];
};

// Dummy chat messages
const generateChatMessages = () => [
  {
    id: 1,
    username: "jayshree desai",
    message: "not you dil kiwi ko bol rahe",
    timestamp: new Date(Date.now() - 10000),
    isSubscriber: false,
    badges: []
  },
  {
    id: 2,
    username: "Sagar",
    message: "Sssssscience",
    timestamp: new Date(Date.now() - 15000),
    isSubscriber: true,
    badges: []
  },
  {
    id: 3,
    username: "Vibhor",
    message: "lol",
    timestamp: new Date(Date.now() - 20000),
    isSubscriber: true,
    badges: ["#1"]
  },
  {
    id: 4,
    username: "Hyperop",
    message: "kiwi is anya for real",
    timestamp: new Date(Date.now() - 25000),
    isSubscriber: true,
    badges: ["#3"]
  },
  {
    id: 5,
    username: "jayshree desai",
    message: "kiwiiii jiii 😂 😂 😂 😂 😂",
    timestamp: new Date(Date.now() - 30000),
    isSubscriber: false,
    badges: []
  },
  {
    id: 6,
    username: "VISHAL | SINHA",
    message: "B4",
    timestamp: new Date(Date.now() - 35000),
    isSubscriber: false,
    badges: []
  },
  {
    id: 7,
    username: "Lokendra Singh Rathore",
    message: "WHERE IS SENSEI ???",
    timestamp: new Date(Date.now() - 40000),
    isSubscriber: false,
    badges: []
  },
  {
    id: 8,
    username: "Ashar Siddiqui",
    message: "khul jayega with scouts pass",
    timestamp: new Date(Date.now() - 45000),
    isSubscriber: false,
    badges: []
  }
];

type ChatMessageType = {
  id: number;
  username: string;
  message: string;
  timestamp: Date;
  isSubscriber: boolean;
  badges: string[];
};

const formatViewerCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const ChatMessage = ({ message }: { message: ChatMessageType }) => (
  <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
    <div className="flex items-center gap-2 min-w-0">
      {message.badges.map((badge: string, index: number) => (
        <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
          {badge}
        </Badge>
      ))}
      <span className={`text-sm font-semibold truncate ${
        message.isSubscriber ? 'text-purple-500' : 'text-foreground'
      }`}>
        {message.username}:
      </span>
    </div>
    <span className="text-sm text-muted-foreground flex-1 min-w-0 break-words">
      {message.message}
    </span>
  </div>
);

export default function WatchPage() {
  const params = useParams();
  const streamId = params.streamId as string;
  
  const [stream] = useState(() => getStreamData(streamId));
  const [chatMessages, setChatMessages] = useState(generateChatMessages());
  const [chatMessage, setChatMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(stream.isSubscribed);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      username: "You",
      message: chatMessage,
      timestamp: new Date(),
      isSubscriber: true,
      badges: []
    };
    
    setChatMessages(prev => [newMessage, ...prev]);
    setChatMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-[calc(100vh-80px)] gap-6 p-6">
        {/* Video Player Section */}
        <div className="flex-1 flex flex-col max-w-[calc(100%-24rem)] gap-4">
          {/* Video Player */}
          <div className="relative bg-black rounded-lg overflow-hidden shadow-lg flex-1 min-h-[60vh]">
            <video
              className="w-full h-full object-cover"
              src={stream.videoUrl}
              autoPlay
              muted={isMuted}
              controls={false}
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
            </div>

            {/* Viewer Count */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Eye size={14} />
                {formatViewerCount(stream.viewerCount)}
              </div>
            </div>
          </div>

          {/* Stream Info Card */}
          <div className="bg-card rounded-lg border shadow-sm flex-shrink-0">
            {/* Stream Title and Actions */}
            <div className="p-4 border-b">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-4">
                  <h1 className="text-xl font-bold mb-2 leading-tight">{stream.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {formatViewerCount(stream.viewerCount)} watching
                    </span>
                    <span>Started {stream.duration} ago</span>
                    <Badge variant="secondary" className="text-xs">
                      {stream.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant={isSubscribed ? "secondary" : "default"}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className="flex items-center gap-2"
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart size={16} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share size={16} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {stream.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Channel Info and Description in single row for desktop */}
            <div className="p-4 bg-muted/30 flex gap-6">
              <div className="flex items-center gap-4 flex-shrink-0">
                <Avatar className="w-12 h-12 ring-2 ring-border">
                  <AvatarImage src={stream.profileImage} alt={stream.streamerName} />
                  <AvatarFallback className="text-lg font-semibold">
                    {stream.streamerName[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold">{stream.streamerName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatViewerCount(stream.subscriberCount)} subscribers
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold mb-2 text-sm">About this stream</h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {stream.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-96 bg-card rounded-lg border shadow-sm flex flex-col overflow-hidden h-full">
          {/* Chat Header */}
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Live Chat</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users size={14} />
                  {formatViewerCount(stream.viewerCount)}
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-2">
              {chatMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-3 border-t bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Say something..."
                  className="pr-16 bg-background"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                    <Smile size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                    <Gift size={14} />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
