import React, { useContext, useEffect, useState } from "react";
import { Layout, List } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { NotebookPen, Plus, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import FilterButton from "@/components/button/FilterButton";

import ProjectCard from "@/components/card/ProjectCard";
import useProjectStore from "@/stores/project-store";
import { AuthContext } from "@/providers/AuthProvider";
import ProjectCardSkeleton from "@/components/skeleton/ProjectCardSkeleton";
import ProjectInputDialog from "./ProjectInputDialog";

const ProjectList = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const { userProfile } = useContext(AuthContext);
  const projects = useProjectStore((state) => state.projects);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const [filters, setFilters] = useState({
    status: { available: true, unavailable: true },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!hasAttemptedFetch && userProfile && !projects.length) {
        setIsLoading(true);
        try {
          await fetchProjects(userProfile.role, userProfile.id);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setIsLoading(false);
          setHasAttemptedFetch(true);
        }
      }
    };

    fetchData();
  }, [fetchProjects, userProfile, hasAttemptedFetch, projects.length]);

  const openInputDialog = () => {
    setIsInputDialogOpen(true);
  };

  const closeInputDialog = () => {
    setIsInputDialogOpen(false);
  };

  const handleSearch = (searchInput) => {
    setSearchText(searchInput.toLowerCase());
  };

  let filteredProject = projects.filter((item) => {
    return (
      item?.title.toLowerCase().includes(searchText) &&
      item?.status !== "completed"
    );
  });

  const skeletonData = Array(8).fill({});

  return (
    <Layout className="mt-6 h-full w-full bg-color-50">
      <div className="flex gap-2 items-center px-4">
        <div className="flex flex-1 gap-2">
          <div className="relative w-full max-w-sm">
            <Input
              type="text"
              placeholder="Search project..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 py-2 border bg-white border-color-alternative-gray rounded-md text-color-alternative-gray placeholder:text-color-alternative-gray"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 select-none opacity-50 text-color-alternative-black" />
          </div>
          <Button className="bg-color-500">
            <Search />
          </Button>
        </div>
        {userProfile.role === "client" ? (
          <Button
            className="bg-color-500 hover:bg-color-600 text-xs"
            onClick={openInputDialog}
          >
            <NotebookPen className="text-white" />
            Create new project
          </Button>
        ) : null}
      </div>
      <ProjectInputDialog
        isOpen={isInputDialogOpen}
        handleClose={closeInputDialog}
      />
      <List
        itemLayout="vertical"
        size="large"
        className="my-2 mt-4 px-4"
        locale={{
          emptyText: (
            <div className="flex flex-col justify-center items-center p-36 gap-4">
              <span className="text-3xl font-bold text-color-900">
                No project yet
              </span>
              <span className="text-xl text-color-alternative-gray">
                {userProfile.role === "client"
                  ? "You haven't created any projects yet. Start a new project based on the bookings you've made and bring your ideas to life!"
                  : "Clients haven't created any projects for you yet. You can wait for a client to initiate a project based on the booking they made with you. Stay ready to bring their vision to life!"}
              </span>
              {userProfile.role === "client" ? (
                <Button
                  className="bg-color-500 hover:bg-color-600 text-sm w-1/4"
                  onClick={openInputDialog}
                >
                  <Plus className="text-white" />
                  New project
                </Button>
              ) : null}
            </div>
          ),
        }}
        dataSource={isLoading ? skeletonData : filteredProject}
        renderItem={(item) => {
          return isLoading ? (
            <ProjectCardSkeleton />
          ) : (
            <ProjectCard item={item} />
          );
        }}
      />
    </Layout>
  );
};

export default ProjectList;
