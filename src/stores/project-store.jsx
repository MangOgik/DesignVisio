import { create } from "zustand";
import {
  deleteDataPrivateJSON,
  editDataPrivate,
  editDataPrivateNotJSON,
  getDataPrivate,
  sendDataPrivate,
} from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";

const useProjectStore = create((set, get) => ({
  projects: [],
  selectedProject: null, // Menambahkan selectedProject

  fetchProjects: async (role, id) => {
    try {
      const response = await getDataPrivate(
        `/api/v1/project/readByRole/${role}/${id}`
      );
      if (response) {
        set({ projects: response.datas });

        const currentSelected = get().selectedProject;
        if (currentSelected) {
          const updatedProject = response.datas.find(
            (project) => project.id === currentSelected.id
          );
          if (updatedProject) {
            set({ selectedProject: updatedProject });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  },

  // fetchProjects: async (role, id) => {
  //   try {
  //     const response = await getDataPrivate(
  //       `/api/v1/project/readByRole/${role}/${id}`
  //     );
  //     if (response) {
  //       console.log(response.datas);
  //       set({ projects: response.datas });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching projects:", error);
  //   }
  // },

  fetchProjectBySlug: async (slug, role, userId) => {
    console.log("fetch by slug", slug, role, userId);
    try {
      if (get().projects.length === 0) {
        await get().fetchProjects(role, userId);
      }

      const existingProject = get().projects.find((project) => {
        const encodedTitle = encodeURIComponent(
          project.title
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()
        );
        return encodedTitle === slug;
      });

      if (existingProject) {
        set({ selectedProject: existingProject });
        return existingProject;
      }

      return null;
    } catch (error) {
      console.error("Error fetching project by slug:", error);
      return null;
    }
  },

  createProject: async (projectData, userId) => {
    try {
      const response = await sendDataPrivate(
        "/api/v1/project/create",
        projectData
      );
      if (response) {
        get().fetchProjects("client", userId);
      }
      return response;
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    }
  },

  updateProject: async (projectId, updatedData, userId) => {
    try {
      const response = await editDataPrivate(
        `/api/v1/project/update_phase/${projectId}`,
        updatedData
      );
      if (response) {
        get().fetchProjects("architect", userId);
      }
      return response;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  },

  updateProjectImage: async (projectId, updatedData, userId) => {
    try {
      const response = await editDataPrivateNotJSON(
        `/api/v1/project/update_image/${projectId}`,
        updatedData
      );
      if (response) {
        get().fetchProjects("client", userId);
      }
      return response;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  },

  deleteProject: async (projectId, userId) => {
    try {
      deleteDataPrivateJSON(`/api/v1/project/delete/${projectId}`)
        .then((resp) => {
          if (resp) {
            console.log("resp", resp);
            toast({
              title: (
                <span className="flex items-center justify-center w-fit gap-2">
                  <span className="rounded-full bg-brilliantGreen text-white">
                    <CircleCheck />
                  </span>
                  <span>Project successfully deleted!</span>
                </span>
              ),
              description: "You have successfully created a project!",
            });
          } else {
            throw new Error("Response was not successful");
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Unable to create project",
          });
        });
      get().fetchProjects("client", userId);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  },

  setSelectedProject: (project) => {
    set({ selectedProject: project });
  },

  reset: () =>
    set({
      projects: [],
      selectedProject: null, // Reset selectedProject
    }),
}));

export default useProjectStore;
