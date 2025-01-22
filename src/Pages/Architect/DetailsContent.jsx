import React from "react";

import {
  Building2,
  Clock,
  Mail,
  Phone,
  Globe,
  MapPin,
  Users,
  GraduationCap,
  Tags,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tag } from "antd";

const education = [
  {
    degree: "Master of Architecture",
    institution: "Harvard Graduate School of Design",
    year: 2015,
  },
  {
    degree: "Bachelor of Architecture",
    institution: "Institut Teknologi Bandung",
    year: 2011,
  },
];

const DetailsContent = ({ architect }) => (
  <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
    {/* Personal Info Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
        <Users className="h-5 w-5 text-color-500" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-color-500" />
          <span className="text-sm line-clamp-1">{architect.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-color-500" />
          <span className="text-sm">{architect.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-color-500" />
          <span className="text-sm">
            {architect.experience_years} Years of Experience
          </span>
        </div>
        <div className="flex items-center gap-2 ">
          <Tags className="h-4 w-4 text-color-500 shrink-0" />
          <span className="text-sm flex-1 flex flex-wrap gap-1">
            <Tag color="blue">Building</Tag>
            <Tag color="gold">Landscape</Tag>
            <Tag color="red">Interior</Tag>
            <Tag color="green">Environment</Tag>
            <Tag color="purple">Urban</Tag>
            <Tag color="cyan">Commercial</Tag>
            <Tag color="magenta">Residential</Tag>
          </span>
        </div>
      </div>
    </div>

    {/* Education*/}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-color-500" />
        Education
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {architect.education_list.map((edu, index) => {
          return (
            <Card key={index} className="p-3 bg-color-50">
              <div className="font-medium text-color-950">{edu.degree}</div>
              <div className="text-sm text-color-900">{edu.institution}</div>
              <div className="text-sm text-color-500">
                {edu.graduation_year}
              </div>
            </Card>
          );
        })}
      </div>
    </div>

    {/* Company Info Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-color-500" />
        Company Information
      </h3>
      <Card className="p-4 bg-color-50">
        <div className="space-y-3">
          <div className="font-medium text-color-950">
            {architect.company_name}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-color-500" />
            <span className="text-color-900">{architect.company_address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-color-500" />
            <a
              href={architect.company_website}
              className="text-color-500 hover:underline"
            >
              {architect.company_website}
            </a>
          </div>
        </div>
      </Card>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-color-950">About</h3>
      <p className="text-sm text-color-900 leading-relaxed">{architect.bio}</p>
    </div>
  </div>
);

export default DetailsContent;
