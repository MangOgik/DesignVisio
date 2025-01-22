import React, { useContext, useEffect, useState } from "react";
import { Layout, Tag } from "antd";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  CircleCheck,
} from "lucide-react";
import { capitalizeFirstLetter } from "@/utils/ui";
import { formatDate } from "@/utils/time";
import useProjectStore from "@/stores/project-store";
import { AuthContext } from "@/providers/AuthProvider";
import { useParams } from "react-router-dom";
import ProjectDetailsSkeleton from "@/components/skeleton/ProjectDetailsSkeleton";
import ProjectProgressDialog from "./ProjectProgressDialog";


const projectPhases = [
  {
    id: 1,
    name: "Conceptualization & Planning",
    description:
      "Understanding client needs, site analysis, and initial concept creation",
  },
  {
    id: 2,
    name: "Schematic Design",
    description:
      "Developing initial design concepts, sketches, and client reviews",
  },
  {
    id: 3,
    name: "Design Development",
    description:
      "Refining the design with detailed plans, material selection, and engineering integration",
  },
  {
    id: 4,
    name: "Construction Documentation",
    description:
      "Technical drawings and specifications have been finalized and are ready for construction",
  },
];

const ProjectDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const selectedProject = useProjectStore((state) => state.selectedProject);

  const fetchProjectBySlug = useProjectStore(
    (state) => state.fetchProjectBySlug
  );
  const updateProject = useProjectStore((state) => state.updateProject);

  const { userProfile } = useContext(AuthContext);
  const { projectSlug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedProject) {
        await fetchProjectBySlug(projectSlug, userProfile.role, userProfile.id);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [projectSlug]);

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

  const updateTimeline = async (phase) => {
    setIsUpdating(true);
    await updateProject(
      selectedProject.id,
      { current_phase: phase },
      userProfile.id
    );
    setIsUpdating(false);
    closeProgressDialog();
  };

  const openProgressDialog = () => {
    setIsProgressDialogOpen(true);
  };

  const closeProgressDialog = () => {
    setIsProgressDialogOpen(false);
  };

  return (
    <Layout className="w-full h-fit pb-4 bg-color-50 text-color-950 flex justify-center items-center px-4">
      {isLoading ? (
        <ProjectDetailsSkeleton />
      ) : (
        <Card className="overflow-hidden shadow-lg p-0 rounded-lg w-full">
          <ProjectProgressDialog
            isOpen={isProgressDialogOpen}
            onClose={closeProgressDialog}
            handleUpdate={updateTimeline}
            isUpdating={isUpdating}
            currentPhase={selectedProject.current_phase}
          />
          <div className="w-full h-64 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1668277280345-f3949c1b6aa2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGJhbGklMjB2aWxsYXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Luxurious Beachfront Villa Render"
              className="w-full h-full object-cover"
            />
          </div>

          <CardHeader className="flex flex-row justify-between items-center px-6 pt-2 pb-0">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-color-950">
                {selectedProject.title}
              </h1>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-0 flex flex-col gap-y-4">
            <div>
              <p className="text-color-900 mt-2">
                {selectedProject.description}
              </p>
            </div>
            <div className="grid gap-y-4 md:grid-cols-2">
              <div className="flex items-center gap-x-2 text-color-900">
                <Calendar className="h-5 w-5" />
                <span>Start : {formatDate(selectedProject.start_date, 1)}</span>
                <span>|</span>
                <span>End : {formatDate(selectedProject.end_date, 1)}</span>
              </div>
              <div className="flex items-center gap-x-2 text-color-900">
                <Clock className="h-5 w-5" />
                <span>
                  Updated : {formatDate(selectedProject.updated_at, 1)}
                </span>
              </div>
              <div className="flex items-center gap-x-2 text-color-900">
                <CircleCheck className="h-5 w-5" />
                <span>
                  Status :{" "}
                  <Tag color={getStatusColor(selectedProject.status)}>
                    {capitalizeFirstLetter(
                      selectedProject.status.replace("_", " ")
                    )}
                  </Tag>
                </span>
              </div>
            </div>
            <Separator className="bg-color-200" />
            <div>
              <h3 className="text-lg font-semibold text-color-950 mb-4">
                Project Timeline
              </h3>
              <div className="relative">
                {projectPhases.map((phase, index) => (
                  <div key={phase.id} className="flex items-start relative">
                    {index < projectPhases.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-px h-full bg-color-200 z-0"></div>
                    )}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-4 z-10 relative ${
                        phase.id < selectedProject.current_phase
                          ? "bg-color-500 border-color-500"
                          : phase.id === selectedProject.current_phase
                          ? "bg-color-500 border-color-200"
                          : "bg-color-100 border-color-200"
                      } flex items-center justify-center`}
                    >
                      {phase.id < selectedProject.current_phase && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="ml-4 flex-grow pb-4">
                      <div className="flex items-center">
                        <h4
                          className={`font-semibold ${
                            phase.id <= selectedProject.currentPhase
                              ? "text-color-950"
                              : "text-color-900"
                          }`}
                        >
                          {phase.name}
                        </h4>
                        {phase.id === selectedProject.current_phase && (
                          <Badge
                            variant="outline"
                            className="border-color-300 ml-2 bg-color-100 text-color-800"
                          >
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-color-900 mt-1">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-color-200" />

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="flex flex-col gap-2 items-start rounded-md p-2 px-4 bg-color-50 border-l-8 border-l-color-500 border-y-0 border-r-0">
                <span className="text-lg line-clamp-1 text-color-950 font-semibold">
                  Architect
                </span>
                <span className="text-sm line-clamp-1 text-color-900  flex flex-col gap-2">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{selectedProject.architect_name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{selectedProject.architect_email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{selectedProject.architect_phone}</span>
                  </div>
                </span>
              </Card>
              <Card className="flex flex-col gap-2 items-start rounded-md p-2 px-4 bg-color-50 border-l-8 border-l-color-500 border-y-0 border-r-0">
                <span className="text-lg line-clamp-1 text-color-950 font-semibold">
                  Client
                </span>
                <span className="text-sm line-clamp-1 text-color-900  flex flex-col gap-2">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{selectedProject.client_name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{selectedProject.client_email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{selectedProject.client_phone}</span>
                  </div>
                </span>
              </Card>
            </div>
            <CardFooter className="flex justify-end p-0 mb-4">
              {userProfile.role === "architect" &&
              selectedProject.current_phase < 5 ? (
                <div className="flex justify-end gap-2">
                  <Button
                    className="bg-color-500 text-white hover:bg-color-600"
                    onClick={openProgressDialog}
                  >
                    Edit Project Timeline
                  </Button>
                </div>
              ) : null}
            </CardFooter>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default ProjectDetails;
