import React, { useContext, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  ArrowRight,
  Trash2,
  Edit,
  CircleCheck,
} from "lucide-react";
import { capitalizeFirstLetter } from "@/utils/ui";
import { formatDate } from "@/utils/time";
import { NavLink } from "react-router-dom";
import { Form, Tag } from "antd";
import useProjectStore from "@/stores/project-store";
import { LoadingOutlined } from "@ant-design/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AuthContext } from "@/providers/AuthProvider";
import useBookingStore from "@/stores/booking-store";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const StatusBadgeColors = {
  pending: "gold",
  in_progress: "blue",
  completed: "green",
};

const ProjectCard = ({ item }) => {
  const [form] = Form.useForm();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { userProfile } = useContext(AuthContext);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const setSelectedProject = useProjectStore(
    (state) => state.setSelectedProject
  );
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const updateProjectImage = useProjectStore(
    (state) => state.updateProjectImage
  );
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    await deleteProject(item.id, userProfile.id);
    await fetchBookings(userProfile.role, userProfile.id);
    await fetchProjects(userProfile.role, userProfile.id);
    setIsDeleting(false);
    closeConfirmationDialog();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result); // Store the image preview URL
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleEditProjectImage = (projectId) => {
    setIsSubmitting(true);
    let formData = new FormData();
    let data = null;

    if (!selectedProjectId) {
      closeEditDialog();
      return;
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    let request = updateProjectImage(
      selectedProjectId,
      formData,
      userProfile.id
    );

    request
      .then((resp) => {
        if (resp) {
          toast({
            title: (
              <span className="flex items-center justify-center w-fit gap-2">
                <span className="rounded-full bg-brilliantGreen text-white">
                  <CircleCheck />
                </span>
                <span>Image successfully updated!</span>
              </span>
            ),
            description: "You have successfully update the image!",
          });
          closeEditDialog();
          fetchProjects(userProfile.role, userProfile.id);
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
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const openEditDialog = (projectId) => {
    setIsEditDialogOpen(true);
    setSelectedProjectId(projectId);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const openConfirmationDialog = () => {
    setIsConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false);
  };

  return (
    <Card
      className="mb-4 rounded-lg p-2 border-2 border-transparent transition-all duration-200 hover:shadow-lg"
      onClick={() => setSelectedProject(item)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] overflow-hidden gap-4">
        <div className="relative h-52 sm:h-full group">
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 rounded-md z-10" />
          <img
            src={
              item.image
                ? `http://localhost:5000/static/show_image/${item.image}`
                : "https://images.unsplash.com/photo-1668277280345-f3949c1b6aa2?w=700&auto=format&fit=crop&q=60"
            }
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover rounded-md transition-transform duration-200"
          />
        </div>

        <div className="pr-4 pl-3 flex flex-col gap-3">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-color-950 transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-color-900 mt-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(item.start_date, 4) ?? ""} -{" "}
                    {formatDate(item.end_date, 4) ?? ""}
                  </span>
                </CardDescription>
              </div>
              <Tag color={StatusBadgeColors[item.status]}>
                {capitalizeFirstLetter(item.status.replace("_", " "))}
              </Tag>
            </div>
          </CardHeader>

          <p className="text-color-900 line-clamp-2 text-sm leading-relaxed">
            {item.description}
          </p>

          <div className="mt-4 pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-color-100">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center text-sm text-color-900 hover:text-color-500 transition-colors">
                <User className="mr-1.5 h-4 w-4" />
                {item.architect_name}
              </span>

              <span className="flex items-center text-sm text-color-900">
                <Calendar className="mr-1.5 h-4 w-4" />
                {formatDate(item.created_at, 3)}
              </span>
            </div>
            <div className="flex flex-row gap-2">
              {userProfile.role === "client" && item.current_phase < 2 ? (
                <Button
                  onClick={openConfirmationDialog}
                  variant="outline"
                  className="group border-brilliantRed bg-brilliantRed text-white hover:bg-brilliantRedDarker hover:text-white transition-all duration-200 w-full sm:w-auto"
                >
                  Delete Project
                  <Trash2 className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              ) : null}
              {userProfile.role === "client" ? (
                <Button
                  onClick={() => openEditDialog(item.id)}
                  variant="outline"
                  className="group border-color-500 text-color-500 hover:bg-color-500 hover:text-white transition-all duration-200 w-full sm:w-auto"
                >
                  Edit Project Image
                  <Edit className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              ) : null}

              <NavLink
                to={`${encodeURIComponent(
                  item.title
                    .replace(/[^a-zA-Z0-9 ]/g, "")
                    .replace(/\s+/g, "-")
                    .toLowerCase()
                )}`}
                className="block transition-transform duration-200"
              >
                <Button
                  variant="outline"
                  className="group border-color-500 text-color-500 hover:bg-color-500 hover:text-white transition-all duration-200 w-full sm:w-auto"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={isEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="font-semibold text-color-950">
              Edit Project Image
            </AlertDialogTitle>
            <AlertDialogDescription className="text-color-950 text-opacity-80">
              <div>
                {/* <Label htmlFor="image" className="text-color-950 ">
                  Upload Image (Optional)
                </Label> */}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full h-10 p-2 text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setIsEditDialogOpen(false)}
              className="w-1/4 text-color-950 bg-white hover:bg-color-100 hover:text-color-900 border border-color-100"
            >
              Cancel
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleEditProjectImage}
              className="w-1/4 bg-color-500 hover:bg-color-600"
            >
              {isSubmitting ? <LoadingOutlined /> : "Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isConfirmationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="font-semibold text-color-950">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-color-950 text-opacity-80">
              This action cannot be undone. This will permanently delete this
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setIsConfirmationDialogOpen(false)}
              className="w-1/4 text-color-950 bg-white hover:bg-color-100 hover:text-color-900 border border-color-100"
            >
              Cancel
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="w-1/4 bg-brilliantRed hover:bg-brilliantRedDarker"
            >
              {isDeleting ? <LoadingOutlined /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ProjectCard;
