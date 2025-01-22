import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "antd";
import { NavLink } from "react-router-dom";
import { Building2, Calendar, Tags, Users } from "lucide-react";
import { formatDate } from "@/utils/time";
import useCompanyStore from "@/stores/company-store";

const CompanyCard = ({ item }) => {
  const setSelectedCompany = useCompanyStore(
    (state) => state.setSelectedCompany
  );
  return (
    <NavLink
      to={`${encodeURIComponent(
        item.name
          .replace(/[^a-zA-Z0-9 ]/g, " ")
          .replace(/\s+/g, "-")
          .toLowerCase()
      )}`}
    >
      <Card
        className={`cursor-pointer hover:shadow-lg hover:shadow-slate-40`}
        onClick={() => setSelectedCompany(item)}
      >
        <CardHeader className="p-0 h-36">
          <div className="w-full h-full flex items-end rounded-t-xl bg-cover bg-center bg-opacity-5 bg-[url('https://img.freepik.com/free-photo/low-angle-shot-modern-glass-skyscrapers-against-cloudy-sky_181624-51675.jpg?uid=R175130914&ga=GA1.1.1029277144.1707224485&semt=ais_hybrid')]">
            <div className="h-full w-full bg-gradient-to-t from-color-800 to-transparent via-color-800/40 px-2 py-1 flex flex-col justify-end gap-1">
              <CardTitle className=" text-color-50 text-lg leading-none flex gap-1 items-end">
                <Building2 size={20} /> {item.name}
              </CardTitle>
              <CardDescription className="text-xs line-clamp-2 text-color-50">
                A top architecture firm specializing in innovative, sustainable
                modern spaces
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 py-3">
          <div className="w-full h-full grid grid-cols-2 gap-y-3 gap-x-2">
            <Card className="flex flex-col gap-0.5 items-start rounded-md p-2 px-4 bg-color-50 border-l-4 border-l-color-500 border-y-0 border-r-0">
              <div className="flex items-center text-color-900 gap-1">
                <Users className="text-color-900 shrink-0" size={12} />
                <span className="text-xs line-clamp-1 text-color-900">
                  Available Architects
                </span>
              </div>
              <span className=" text-xs line-clamp-1 font-semibold text-color-950">
                {item.architect_count} Architects
              </span>
            </Card>
            <Card className="flex flex-col gap-0.5 items-start rounded-md p-2 px-4 bg-color-50 border-l-4 border-l-color-500 border-y-0 border-r-0">
              <div className="flex items-center text-color-900 gap-1">
                <Calendar className="shrink-0 text-color-900" size={12} />
                <span className="text-xs line-clamp-1 text-color-900">
                  Date joined
                </span>
              </div>
              <span className="text-xs line-clamp-1 font-semibold text-color-950">
                {formatDate(item.created_at, 3)}
              </span>
            </Card>
            <Card className="flex flex-col items-start rounded-md p-2 px-2 col-span-2 gap-2">
              <div className="text-xs h-12 overflow-hidden line-clamp-2">
                <div className="flex flex-wrap items-center gap-1">
                  <div className="flex items-center pr-1 text-color-900 gap-1 shrink-0">
                    <Tags className="text-color-900 shrink-0" size={12} />
                    <span className="text-xs text-color-900">Tags :</span>
                  </div>
                  <Tag color="blue">Building</Tag>
                  <Tag color="gold">Landscape</Tag>
                  <Tag color="red">Interior</Tag>
                  <Tag color="green">Environment</Tag>
                  <Tag color="purple">Urban</Tag>
                  <Tag color="cyan">Commercial</Tag>
                  <Tag color="magenta">Residential</Tag>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  );
};

export default CompanyCard;
