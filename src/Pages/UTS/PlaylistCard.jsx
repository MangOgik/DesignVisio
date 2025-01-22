import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/ui";
import { Image } from "antd";
import Highlight from "react-highlight-words";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MoreHorizontal,
  Trash2,
  CircleAlert,
  PencilLine,
  ExternalLink,
  Dot,
} from "lucide-react";
import { getTimeAgo } from "@/utils/time";

const PlaylistCard = ({ item, deleteFunction, editFunction, searchText }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  let genre = capitalizeFirstLetter(item.play_genre);

  const handleDelete = () => {
    deleteFunction(item.id_play);
    setIsDeleteAlertOpen(false);
  };

  const handleEdit = () => {
    editFunction(item);
  };

  return (
    <Card className="p-0 hover:shadow-lg hover:shadow-slate-400">
      <CardHeader className="flex flex-row items-start space-y-0 pt-3 pb-0 px-3">
        <div className="flex-1 min-w-0 pr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardTitle className="truncate leading-6">
                <Highlight
                    searchWords={[searchText]}
                    textToHighlight={item.play_name}
                  />
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] whitespace-normal">
                {item.play_name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CardDescription className="flex items-center gap-0 truncate max-w-full overflow-hidden">
            {genre}
            <Dot size={15} className="flex-shrink-0 mx-0.5" />
            <span className="truncate">{getTimeAgo(item.created_at)}</span>
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-5 h-5 p-0"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" side="right" align="start">
            <NavLink
              to={`${encodeURIComponent(
                item.play_name
                  .replace(/[^a-zA-Z0-9 ]/g, "")
                  .replace(/\s+/g, "-")
                  .toLowerCase()
              )}`}
              state={{ playlist: item }}
            >
              <DropdownMenuItem>
                <CircleAlert className="text-slate-500 dark:text-slate-400" />
                <span>Details</span>
              </DropdownMenuItem>
            </NavLink>
            <DropdownMenuItem onClick={handleEdit}>
              <PencilLine className="text-slate-500 dark:text-slate-400" />
              <span>Edit Playlist</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDeleteAlertOpen(true)}>
              <Trash2 className="text-slate-500 dark:text-slate-400 w-full" />
              <span>Delete Playlist</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent className="text-color-alternative-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              playlist and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Separator orientation="horizontal" className="my-2" />
      <CardContent className="px-3 pb-0 gap-2 flex flex-col items-center justify-center">
        <Image
          src={item.play_thumbnail}
          className="w-full aspect-video "
          height="100%"
          width="100%"
          preview={false}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardDescription className="line-clamp-2 h-10 text-left w-full">
                {item.play_description}
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] whitespace-normal">
              {item.play_description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <Separator orientation="horizontal" className="my-2" />
      <CardFooter className="flex justify-end space-y-0 pb-3 pt-0 px-3">
        <a
          href={item.play_url}
          rel="noopener noreferrer"
          className="no-underline"
          target="_blank"
        >
          <Button className="bg-geekBlue hover:bg-customBlueSecondary flex gap-2 h-8">
            Go to link <ExternalLink />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default PlaylistCard;
