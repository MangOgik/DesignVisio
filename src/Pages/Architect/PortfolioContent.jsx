import React from "react";
import {
  Building2,
  Calendar,
  MapPin,
  Award,
  Briefcase,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Image } from "antd";

const portfolioData = {
  projects: [
    {
      id: 1,
      title: "Eco-Friendly Villa Complex",
      description:
        "Luxury villa complex with sustainable features including solar panels and rainwater harvesting",
      year: 2023,
      location: "Bali",
      type: "residential",
      area: 5000,
      budget: 15000000000,
      duration: 18,
      status: "completed",
      imageUrl:
        "https://images.unsplash.com/photo-1728050829052-2d1514f1d168?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsaSUyMHZpbGxhfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      title: "Urban Green Office Tower",
      description:
        "30-story office building with vertical gardens and energy-efficient design",
      year: 2022,
      location: "Jakarta",
      type: "commercial",
      area: 25000,
      budget: 75000000000,
      duration: 24,
      status: "completed",
      imageUrl:
        "https://images.unsplash.com/photo-1668277280345-f3949c1b6aa2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGJhbGklMjB2aWxsYXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ],
  statistics: {
    total_projects: 45,
    total_clients: 120,
    awards: [
      {
        title: "Green Building Excellence Award",
        year: 2023,
        issuer: "Green Building Council",
      },
      {
        title: "Best Residential Project",
        year: 2022,
        issuer: "Architecture Association",
      },
    ],
    cities_worked: ["Jakarta", "Bali", "Surabaya", "Yogyakarta", "Bandung"],
  },
};

const PortfolioContent = () => (
  <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
    {/* Statistics */}
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 text-center">
        <Briefcase className="h-6 w-6 mx-auto mb-2 text-color-500" />
        <div className="text-2xl font-bold text-color-950">
          {portfolioData.statistics.total_projects}+
        </div>
        <div className="text-sm text-color-900">Projects</div>
      </Card>
      <Card className="p-4 text-center">
        <Users className="h-6 w-6 mx-auto mb-2 text-color-500" />
        <div className="text-2xl font-bold text-color-950">
          {portfolioData.statistics.total_clients}+
        </div>
        <div className="text-sm text-color-900">Clients</div>
      </Card>
    </div>

    {/* Featured Projects */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-color-950 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-color-500" />
        Featured Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioData.projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              className="object-cover aspect-video"
            />
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-medium text-color-950">{project.title}</h4>
                <p className="text-sm text-color-900 mt-1">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-color-900">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-color-500" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-color-500" />
                  <span>{project.location}</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {project.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default PortfolioContent;
