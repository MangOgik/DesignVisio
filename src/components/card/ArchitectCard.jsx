import React from "react";
import { Tag } from "antd";
import { capitalizeFirstLetter } from "@/utils/ui";
import { formatDate } from "@/utils/time";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Highlight from "react-highlight-words";
import {
  Dot,
  Clock,
  Mail,
  Phone,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import useArchitectStore from "@/stores/architect-store";

const ArchitectCard = ({ item, searchText }) => {
  const isAvailable = item.status === "available";

  const setSelectedArchitect = useArchitectStore(
    (state) => state.setSelectedArchitect
  );

  let altUser = item.name
    ? item.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "YP";

  return (
    <NavLink
      to={`${encodeURIComponent(
        item.name
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()
      )}`}
    >
      <Card
        className={`p-4 pt-2 cursor-pointer hover:shadow-lg hover:shadow-slate-400 border-b-8 border-x-0 border-t-0 ${
          isAvailable ? "border-brilliantGreen" : "border-brilliantRed"
        }`}
        onClick={() => setSelectedArchitect(item)}
      >
        <CardHeader className="flex flex-col justify-between items-start p-0 pt-2 mb-1">
          <div className="flex justify-between items-start w-full">
            <Avatar className="h-14 w-14 rounded-full">
              <AvatarImage
                src={
                  "https://avatarfiles.alphacoders.com/375/thumb-350-375295.webp"
                }
                alt={item.name}
              />
              <AvatarFallback className="rounded-lg">{altUser}</AvatarFallback>
            </Avatar>
            <Tag
              color={isAvailable ? "#87d068" : "#f50"}
              className="flex justify-center items-center rounded-xl w-24 p-0 pr-2 mr-0"
            >
              <Dot strokeWidth={5} className="" />
              {isAvailable ? "Available" : "Unavailable"}
            </Tag>
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <CardTitle className="text-color-950">
              <Highlight
                searchWords={[searchText]}
                textToHighlight={item.name}
              />
            </CardTitle>
            <div className="mb-1">
              <Tag color="blue">Building</Tag>
              <Tag color="gold">Landscape</Tag>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center px-0 pb-3">
          <Card className="grid grid-cols-2 rounded-md w-full">
            <div className="flex flex-col items-start gap-0.5 p-2">
              <CardDescription className="text-color-900 flex items-center gap-1 text-xs">
                <Clock size={12} className="text-color-900 " /> Experience
              </CardDescription>
              <CardTitle className=" text-xs line-clamp-1 text-color-950">
                {item.experience_years} Years
              </CardTitle>
            </div>
            <div className="flex flex-col items-start gap-0.5 p-2">
              <CardDescription className="text-color-900 flex items-center gap-1 text-xs">
                <Star size={12} className="text-color-900 " /> Rating
              </CardDescription>
              <CardTitle className=" text-xs line-clamp-1 text-color-950">
                4.5
              </CardTitle>
            </div>
            <div className="flex flex-col items-start gap-0.5 p-2 col-span-2">
              <CardDescription className="text-color-900 flex items-center gap-1 text-xs">
                <Mail size={12} className="text-color-900 " /> Email
              </CardDescription>
              <CardTitle className="w-full text-xs text-color-950">
                <span className="line-clamp-1">{item.email}</span>
              </CardTitle>
            </div>
            <div className="flex flex-col items-start gap-0.5 p-2 col-span-2">
              <CardDescription className="text-color-900 flex items-center gap-1 text-xs">
                <Phone size={12} className="text-color-900 " /> Phone
              </CardDescription>
              <CardTitle className=" text-xs line-clamp-1 text-color-950">
                {item.phone}
              </CardTitle>
            </div>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-1 py-0">
          <div className="flex justify-center items-center gap-1">
            <CardDescription className="text-xs text-color-alternative-gray">
              Joined at
            </CardDescription>
            <CardTitle className=" text-xs text-color-alternative-black">
              {formatDate(item.created_at, 2)}
            </CardTitle>
          </div>
          <Button
            variant="link"
            className="flex items-center h-4 justify-center gap-1 text-xs text-color-alternative-black p-0"
          >
            <span className="flex items-center text-color-alternative-black">
              View Details
            </span>
            <ChevronRight
              style={{
                width: "0.75rem",
                height: "0.75rem",
                lineHeight: "1rem",
              }}
              className="text-color-alternative-black"
            />
          </Button>
        </CardFooter>
      </Card>
    </NavLink>
  );
};

export default ArchitectCard;
