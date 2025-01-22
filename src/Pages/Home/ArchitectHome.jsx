import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { WaveBackground } from "@/layout/MainLayout";
import { AuthContext } from "@/providers/AuthProvider";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Building2,
  Users,
  Clock,
  Wallet,
  Album,
  FolderOpen,
} from "lucide-react";
import { getData, getDataPrivate } from "@/utils/api";
import { NavLink } from "react-router-dom";
import { Image, Layout, List, Tag } from "antd";
import useProjectStore from "@/stores/project-store";
import ProjectCard from "@/components/card/ProjectCard";
import ProjectCardSkeleton from "@/components/skeleton/ProjectCardSkeleton";
import { capitalizeFirstLetter } from "@/utils/ui";
import { formatDate } from "@/utils/time";

const projectData = [
  { month: "Jan", projects: 4 },
  { month: "Feb", projects: 6 },
  { month: "Mar", projects: 5 },
  { month: "Apr", projects: 8 },
  { month: "May", projects: 7 },
  { month: "Jun", projects: 9 },
];

function ArchitectHome() {
  const { toggleSidebar } = useSidebar();
  const { userProfile } = useContext(AuthContext);
  const [dataDashboard, setDataDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const projects = useProjectStore((state) => state.projects);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const setSelectedProject = useProjectStore(
    (state) => state.setSelectedProject
  );
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getDataDashboard();
    fetchProjects(userProfile.role, userProfile.id);
  }, []);

  const getDataDashboard = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/architect/dashboard/" + userProfile.id)
      .then((resp) => {
        setIsLoading(false);
        if (resp) {
          setDataDashboard(resp.dashboard);

          // Transform project_per_date data for the chart
          const formattedChartData = resp.dashboard.project_per_date.map(
            (item) => ({
              date: new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              projects: item.total_per_date,
            })
          );

          setChartData(formattedChartData);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in_progress":
        return "blue";
      case "completed":
        return "green";
      default:
        return "gold";
    }
  };

  let completedProjects = projects.filter((item) => {
    return item.status.toLowerCase().includes("completed");
  });

  const skeletonData = Array(8).fill({});

  return (
    <div className="h-screen w-full bg-color-50 text-color-950">
      <WaveBackground className="bg-color-700 min-h-screen flex flex-col">
        <h1 className="text-3xl md:text-4xl font-semibold text-left text-white ml-6">
          Welcome, {userProfile.name}
        </h1>
        <div className="w-full h-full bg-background p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Left Column */}
            <div className="flex flex-col flex-1 gap-6 col-span-4">
              {/* Top Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                  <NavLink to="/booking">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Bookings
                        </p>
                        <h3 className="text-xl font-bold flex items-center gap-2 line-clamp-1">
                          <Album size={18} />
                          {isLoading
                            ? "Loading..."
                            : dataDashboard.total_booking ?? 0}
                        </h3>
                      </div>
                    </div>
                  </NavLink>
                </Card>

                <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                  <NavLink to="/project">
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Projects
                        </p>
                        <h3 className="text-xl font-bold flex items-center gap-2 line-clamp-1">
                          <FolderOpen size={18} />
                          {isLoading
                            ? "Loading..."
                            : dataDashboard.total_project ?? 0}
                        </h3>
                      </div>
                    </div>
                  </NavLink>
                </Card>

                <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                  <NavLink to="/booking">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <h3 className="text-xl font-bold flex items-center gap-2 line-clamp-1">
                          <Wallet size={18} />
                          <span className="line-clamp-1">
                            {isLoading ? "" : "Rp. "}
                            {isLoading
                              ? "Loading..."
                              : dataDashboard.total_price ?? 0}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </NavLink>
                </Card>
              </div>

              {/* Project Timeline Chart */}
              <Card className="flex-1 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Most Loyal Client
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataDashboard.client_list || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="client_name"
                        tick={{ fontSize: 12 }}
                        textAnchor="middle"
                        interval={0}
                        // padding={{ left: 10, right: 10 }}
                      />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(value, name, props) => [
                          `${value}`,
                          "Total Bookings",
                        ]}
                      />
                      <Bar
                        dataKey="total_booking"
                        fill="hsl(var(--primary))"
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 col-span-2">
              <Card className="p-6 hover:shadow-lg transition-shadow flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Projects Progress
                      </p>
                      <h3 className="text-xl font-bold flex items-center gap-2 line-clamp-1">
                        <Album size={18} />
                        {isLoading ? "" : completedProjects.length ?? "0"}
                        {isLoading ? "" : "/"}
                        {isLoading
                          ? "Loading..."
                          : dataDashboard?.total_project ?? "0"}
                      </h3>
                    </div>
                  </div>
                  <Progress
                    value={
                      isLoading
                        ? 0
                        : (completedProjects.length /
                            dataDashboard.total_project) *
                          100
                    }
                    className=""
                  />
                </div>
                <div className="h-96 overflow-y-auto">
                  {projects.length < 1
                    ? "You have no project yet"
                    : projects.map((item, index) => {
                        console.log(item);
                        return (
                          <NavLink
                            to={`/project/${encodeURIComponent(
                              item.title
                                .replace(/[^a-zA-Z0-9 ]/g, "")
                                .replace(/\s+/g, "-")
                                .toLowerCase()
                            )}`}
                            className="block transition-transform duration-200"
                          >
                            <Card
                              key={item.id}
                              onClick={() => setSelectedProject(item)}
                              className="p-4 text-color-950 my-2 space-y-1"
                            >
                              <CardTitle className="text-md flex justify-between">
                                {item.title}{" "}
                                <Tag
                                  color={getStatusColor(item.status)}
                                  className="font-normal"
                                >
                                  {capitalizeFirstLetter(
                                    item.status.replace("_", " ")
                                  )}
                                </Tag>
                              </CardTitle>
                              <CardDescription className="text-color-900">
                                End Date : {formatDate(item.end_date, 2)}
                              </CardDescription>
                            </Card>
                          </NavLink>
                        );
                      })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </WaveBackground>
    </div>
  );
}

export default ArchitectHome;
