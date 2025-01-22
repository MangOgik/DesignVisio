import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Image } from "antd";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { capitalizeFirstLetter } from "@/utils/ui";
import { formatDate } from "@/utils/time";

const PlaylistDetails = () => {
  const location = useLocation();
  const locationState = location.state || {};
  const playlist = locationState.playlist;
  const isMobile = useIsMobile();

  return (
    <Card
      className={`${
        isMobile ? "h-full" : "h-100vh"
      } rounded-md border flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <CardHeader className="sticky px-4 py-3 top-0 z-10">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold truncate max-w-96 text-color-alternative-black mr-4">
            {playlist.play_name}
          </CardTitle>
          <NavLink to="/uts">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="shrink-0 h-8 w-8 rounded-full"
            >
              <X
                style={{ height: "1.5rem", width: "1.5rem" }}
                className="text-color-alternative-black"
              />
            </Button>
          </NavLink>
        </div>
      </CardHeader>
      <ScrollArea className="h-5/6 flex-1">
        {" "}
        <CardContent className="pt-2 pb-10 px-4">
          <div className="flex flex-col gap-3">
            <Image
              src={playlist.play_thumbnail}
              className="w-full aspect-video rounded-md"
              height="100%"
              width="100%"
              preview={false}
            />
            <CardTitle className="text-lg">Playlist Details</CardTitle>
            <div>
              <CardTitle className="text-md">Name</CardTitle>
              <CardDescription>{playlist.play_name}</CardDescription>
            </div>
            <div>
              <CardTitle className="text-md">Genre</CardTitle>
              <CardDescription>
                {capitalizeFirstLetter(playlist.play_genre)}
              </CardDescription>
            </div>
            <div>
              <CardTitle className="text-md">URL</CardTitle>
              <CardDescription>{playlist.play_url}</CardDescription>
            </div>
            <div>
              <CardTitle className="text-md">Description</CardTitle>
              <CardDescription>{playlist.play_description}</CardDescription>
            </div>
            <div>
              <CardTitle className="text-md">Created</CardTitle>
              <CardDescription>
                {formatDate(playlist.created_at, 1)}
              </CardDescription>
            </div>
            <div>
              <CardTitle className="text-md text-color-alternative-black">Modified</CardTitle>
              <CardDescription>
                {formatDate(playlist.updated_at, 1)}
              </CardDescription>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default PlaylistDetails;
