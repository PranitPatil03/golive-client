"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Share, Settings } from "lucide-react";

interface LiveStreamProps {
  streamId: string;
  title: string;
  streamerName: string;
  viewerCount: number;
  category: string;
  thumbnail: string;
  isLive: boolean;
}

export const LiveStreamCard = ({ 
  streamId, 
  title, 
  streamerName, 
  viewerCount, 
  category, 
  thumbnail, 
  isLive 
}: LiveStreamProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div 
      className="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.location.href = `/watch/${streamId}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
        )}

        {/* Viewer count */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-xs flex items-center gap-1">
          <Users size={12} />
          {formatViewerCount(viewerCount)}
        </div>

        {/* Category */}
        <Badge className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-700">
          {category}
        </Badge>

        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary">
                <Heart size={16} className="mr-1" />
                Like
              </Button>
              <Button size="sm" variant="secondary">
                <Share size={16} className="mr-1" />
                Share
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Stream info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-2">{streamerName}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {formatViewerCount(viewerCount)} watching
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
            <Settings size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamCard;
