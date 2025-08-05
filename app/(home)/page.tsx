"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Eye, Users, Play } from "lucide-react";

// Comprehensive dummy data for live streams
const generateLiveStreams = () => [
  {
    id: 1,
    title: "Epic Gaming Marathon - Elden Ring Boss Fights",
    streamerName: "GamerPro2024",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
    viewerCount: 12847,
    category: "Gaming",
    isLive: true,
    duration: "2h 34m"
  },
  {
    id: 2,
    title: "Cooking Master Class: Italian Pasta from Scratch",
    streamerName: "ChefMaria",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=225&fit=crop",
    viewerCount: 3421,
    category: "Cooking",
    isLive: true,
    duration: "1h 12m"
  },
  {
    id: 3,
    title: "Late Night Music Jam Session - Guitar & Vocals",
    streamerName: "MelodyMaker",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
    viewerCount: 8392,
    category: "Music",
    isLive: true,
    duration: "3h 45m"
  },
  {
    id: 4,
    title: "Digital Art Speed Drawing - Cyberpunk Character",
    streamerName: "PixelArtist",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=225&fit=crop",
    viewerCount: 5634,
    category: "Art",
    isLive: true,
    duration: "45m"
  },
  {
    id: 5,
    title: "Fitness Morning Routine - Full Body Workout",
    streamerName: "FitTrainer",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    viewerCount: 2187,
    category: "Fitness",
    isLive: true,
    duration: "1h 30m"
  },
  {
    id: 6,
    title: "React Development Tutorial - Building a Chat App",
    streamerName: "CodeWithSam",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    viewerCount: 7923,
    category: "Programming",
    isLive: true,
    duration: "2h 15m"
  },
  {
    id: 7,
    title: "Travel Vlog - Exploring Tokyo Street Food",
    streamerName: "WorldExplorer",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    viewerCount: 15432,
    category: "Travel",
    isLive: true,
    duration: "4h 20m"
  },
  {
    id: 8,
    title: "Photography Workshop - Portrait Lighting Techniques",
    streamerName: "PhotoPro",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=225&fit=crop",
    viewerCount: 4567,
    category: "Photography",
    isLive: true,
    duration: "1h 55m"
  },
  {
    id: 9,
    title: "Chess Tournament Finals - Grandmaster Match",
    streamerName: "ChessMaster",
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=225&fit=crop",
    viewerCount: 9876,
    category: "Games",
    isLive: true,
    duration: "2h 40m"
  },
  {
    id: 10,
    title: "DIY Home Improvement - Building Custom Shelves",
    streamerName: "HandyBuilder",
    profileImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=225&fit=crop",
    viewerCount: 3298,
    category: "DIY",
    isLive: true,
    duration: "3h 10m"
  },
  {
    id: 11,
    title: "Meditation & Mindfulness - Evening Relaxation",
    streamerName: "ZenMaster",
    profileImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
    viewerCount: 1876,
    category: "Wellness",
    isLive: true,
    duration: "1h 00m"
  },
  {
    id: 12,
    title: "Stand-up Comedy Open Mic Night",
    streamerName: "ComedyKing",
    profileImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=225&fit=crop",
    viewerCount: 6543,
    category: "Comedy",
    isLive: true,
    duration: "2h 25m"
  }
];

const formatViewerCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const StreamCard = ({ stream }) => {
  const router = useRouter();
  
  const handleStreamClick = () => {
    router.push(`/watch/${stream.id}`);
  };

  return (
    <div 
      className="rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105"
      onClick={handleStreamClick}
    >
      <div className="relative">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-48 object-cover transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          LIVE
        </div>
      </div>
      
      <div className="p-4 border rounded-bl-xl rounded-br-xl">
        <div className="flex items-start gap-3">
          <img
            src={stream.profileImage}
            alt={stream.streamerName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 mb-1 transition-colors">
              {stream.title}
            </h3>
            <p className="text-gray-400 text-sm mb-1">{stream.streamerName}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1 font-bold">
                <Users size={12} />
                {formatViewerCount(stream.viewerCount)} watching
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StreamCardSkeleton = () => (
  <div className="rounded-xl overflow-hidden border">
    <div className="relative">
      <Skeleton className="w-full h-48" />
      <div className="absolute top-3 left-3">
        <Skeleton className="w-12 h-6 rounded" />
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  </div>
);

export default function RootPage() {
  const { data: session, isPending } = useSession();
  type Stream = {
    id: number;
    title: string;
    streamerName: string;
    profileImage: string;
    thumbnail: string;
    viewerCount: number;
    category: string;
    isLive: boolean;
    duration: string;
  };

  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreStreams = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStreams = generateLiveStreams().map(stream => ({
      ...stream,
      id: stream.id + (page - 1) * 12,
    }));
    
    setStreams(prev => [...prev, ...newStreams]);
    setPage(prev => prev + 1);
    
    // Simulate end of data after 3 pages
    if (page >= 3) {
      setHasMore(false);
    }
    
    setLoading(false);
    setInitialLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadMoreStreams();
  }, [loadMoreStreams]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreStreams();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreStreams]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen font-mono">
      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Live Streams</span>
            </div>
            <div className="text-gray-400 text-sm">
              {initialLoading ? (
                <Skeleton className="h-4 w-32" />
              ) : (
                `${streams.length} streams currently live`
              )}
            </div>
          </div>
          
        </div>

        {/* Stream Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-6">
          {initialLoading ? (
            // Show skeleton cards during initial loading
            Array.from({ length: 12 }).map((_, index) => (
              <StreamCardSkeleton key={index} />
            ))
          ) : (
            streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))
          )}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-6 h-6 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
              <span>Loading more streams...</span>
            </div>
          </div>
        )}

        {/* End of results */}
        {!hasMore && streams.length > 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>You&apos;ve reached the end of live streams</p>
          </div>
        )}

        {/* Empty state */}
        {streams.length === 0 && !loading && (
          <div className="text-center py-20">
            <Play size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Live Streams</h3>
            <p className="text-gray-500">Check back later for new live content</p>
          </div>
        )}
      </main>
    </div>
  );
}