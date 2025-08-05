"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent ,CardHeader,CardTitle} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Video, 
  Users, 
  Calendar, 
  Clock, 
  Eye, 
  Globe, 
  Lock, 
  EyeOff,
  Play,
  Copy,
  Settings
} from "lucide-react";
import { format } from "date-fns";

interface GoLiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  streamData: {
    title: string;
    description: string;
    category: string;
    visibility: string;
    scheduledDate: string;
    scheduledTime: string;
  };
  onGoLive: () => void;
}

export function GoLiveDialog({ 
  open, 
  onOpenChange, 
  streamData, 
  onGoLive 
}: GoLiveDialogProps) {
  const getVisibilityIcon = () => {
    switch (streamData.visibility) {
      case "public":
        return <Globe className="h-4 w-4" />;
      case "unlisted":
        return <EyeOff className="h-4 w-4" />;
      case "private":
        return <Lock className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getVisibilityText = () => {
    switch (streamData.visibility) {
      case "public":
        return "Public";
      case "unlisted":
        return "Unlisted";
      case "private":
        return "Private";
      default:
        return "Public";
    }
  };

  const copyStreamKey = () => {
    const streamKey = "rtmp://x.rtmp.youtube.com/live2?backup=1";
    navigator.clipboard.writeText(streamKey);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-5xl! max-h-[95vh] overflow-y-auto p-0">
        <Card className="w-full mx-auto border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Video className="h-6 w-6" />
              Ready to Go Live
            </CardTitle>
            <p className="text-muted-foreground">
              Connect your streaming software to go live. Review your stream details below.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stream Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Stream Preview</h3>
                <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Connect streaming software to go live</p>
                    <p className="text-sm opacity-75">Viewers will be able to find your stream once you go live</p>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      LIVE
                    </Badge>
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
                      <Button size="sm" variant="ghost" onClick={copyStreamKey}>
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

            {/* Stream Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Stream Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Title:</span>
                  <p className="text-muted-foreground mt-1">{streamData.title || "Untitled Stream"}</p>
                </div>
                
                {streamData.description && (
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-muted-foreground mt-1 line-clamp-3">{streamData.description}</p>
                  </div>
                )}
                
                <div>
                  <span className="font-medium">Visibility:</span>
                  <div className="flex items-center gap-1 mt-1">
                    {getVisibilityIcon()}
                    <span className="text-muted-foreground">{getVisibilityText()}</span>
                  </div>
                </div>

                {streamData.scheduledDate && streamData.scheduledTime && (
                  <div>
                    <span className="font-medium">Scheduled:</span>
                    <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{streamData.scheduledDate}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{streamData.scheduledTime}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>


            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-12"
                onClick={onGoLive}
              >
                <Play className="h-5 w-5 mr-2" />
                GO LIVE
              </Button>
                 <p className="text-sm text-muted-foreground mt-2">
                Viewers will be able to find your stream once you go live
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
