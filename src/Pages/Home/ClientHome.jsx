import { useContext, useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Users,
  Briefcase,
  DollarSign,
  User,
  Menu,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";
import { WaveBackground } from "@/layout/MainLayout";
import useCompanyStore from "@/stores/company-store";
import useArchitectStore from "@/stores/architect-store";
import useProjectStore from "@/stores/project-store";
import { AuthContext } from "@/providers/AuthProvider";
import { Tag } from "antd";
import { capitalizeFirstLetter } from "@/utils/ui";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function ClientHome() {
  const { toggleSidebar } = useSidebar();
  const { userProfile } = useContext(AuthContext);
  const companies = useCompanyStore((state) => state.companies);
  const architects = useArchitectStore((state) => state.architects);
  const projects = useProjectStore((state) => state.projects);
  const fetchCompanies = useCompanyStore((state) => state.fetchCompanies);
  const fetchArchitects = useArchitectStore((state) => state.fetchArchitects);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const setSelectedArchitect = useArchitectStore(
    (state) => state.setSelectedArchitect
  );
  const setSelectedCompany = useCompanyStore(
    (state) => state.setSelectedCompany
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCompanies();
    fetchArchitects();
    fetchProjects("client", userProfile.id);
  }, []);

  const companiesFiltered = companies.filter((item, index) => {
    if (!searchQuery) {
      return index < 3;
    } else {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      );
    }
  });

  const architectsFiltered = architects.filter((item, index) => {
    if (!searchQuery) {
      return index < 4;
    } else {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      );
    }
  });

  const projectsFiltered = projects.filter((item, index) => {
    if (!searchQuery) {
      return index < 3;
    } else {
      return (
        item.title
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      );
    }
  });

  return (
    <div className="h-full w-full bg-color-50 text-color-950">
      {/* Hero Section */}
      <WaveBackground className="bg-color-800">
        <div className="mx-auto px-4 pb-10 h-full">
          <div className="">
            <Menu
              size={48}
              onClick={toggleSidebar}
              className="text-white cursor-pointer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
            Find Your Perfect Architect
          </h1>
          <p className="text-xl text-center mb-8 text-color-100">
            Connect with top architectural firms and professionals
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search architects, companies, or projects..."
                className="pl-10 h-12 bg-white text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </WaveBackground>
      {/* Featured Companies */}
      <div className="py-8 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Companies </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companiesFiltered.map((company) => (
            <NavLink
              to={`/company/${encodeURIComponent(
                company.name
                  .replace(/[^a-zA-Z0-9 ]/g, "")
                  .replace(/\s+/g, "-")
                  .toLowerCase()
              )}`}
            >
              <Card
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-color-100 text-color-600">
                        {company.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg line-clamp-1">
                        {company.name}
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {company.address.split("\n")[1]}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {company.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      <Users className="h-4 w-4 mr-1" />
                      {company.architect_count} Architects
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </NavLink>
          ))}
        </div>
      </div>
      {/* Top Architects */}
      <div className="py-5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Top Architects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectsFiltered.map((architect) => (
              <NavLink
                to={`/architect/${encodeURIComponent(
                  architect.name
                    .replace(/[^a-zA-Z0-9 ]/g, "")
                    .replace(/\s+/g, "-")
                    .toLowerCase()
                )}`}
              >
                <Card
                  key={architect.id}
                  onClick={() => setSelectedArchitect(architect)}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-color-100 text-color-600">
                          {architect.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg line-clamp-1">
                          {architect.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {architect.company_name}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        {architect.experience_years} years experience
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(architect.price)}
                      </div>
                      <Tag
                        className="mt-2"
                        color={
                          architect.status === "available" ? "#87d068" : "#f50"
                        }
                      >
                        {capitalizeFirstLetter(architect.status)}
                      </Tag>
                    </div>
                  </CardContent>
                </Card>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Projects */}
      <div className="py-5 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsFiltered.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow"
            >
              <img
                src="https://images.unsplash.com/photo-1668277280345-f3949c1b6aa2?w=700&auto=format&fit=crop&q=60"
                alt={project.title}
                className="h-48 w-full rounded-t-lg object-cover"
              />

              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  by {project.architect_name}
                </p>
                <Tag color="#87d068">
                  {capitalizeFirstLetter(project.status)}
                </Tag>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientHome;
