import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, CircleCheck, FileText, Ticket } from "lucide-react";
import { Form, DatePicker, Tag } from "antd";
import useBookingStore from "@/stores/booking-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils/time";
import { capitalizeFirstLetter } from "@/utils/ui";
import { AuthContext } from "@/providers/AuthProvider";
import { LoadingOutlined } from "@ant-design/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useProjectStore from "@/stores/project-store";
import { toast } from "@/hooks/use-toast";

const { RangePicker } = DatePicker;

const ProjectInputDialog = ({ isOpen, handleClose }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userProfile } = useContext(AuthContext);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const createProject = useProjectStore((state) => state.createProject);
  const bookings = useBookingStore((state) => state.bookings);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);

  useEffect(() => {
    getDataBookings();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSelectedBooking(null);
    }
  }, [isOpen]);

  const getDataBookings = async () => {
    setIsLoading(true);
    try {
      await fetchBookings(userProfile.role, userProfile.id);
    } catch (e) {
      console.error("Error fetching bookings:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    const selected = bookings.find(
      (booking) => booking.id.toString() === value
    );
    setSelectedBooking(selected);
    form.setFieldsValue({ booking: value });
  };

  // const handleSubmit = async () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       setIsSubmitting(true);
  //       let formData = new FormData();

  //       const [startDate, endDate] = values.dateRange || [];
  //       const formattedStartDate = startDate
  //         ? startDate.format("YYYY-MM-DD")
  //         : "";
  //       const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : "";

  //       console.log("start date", startDate);
  //       console.log("end date", endDate);
  //       console.log("formatted start date", formattedStartDate);
  //       console.log("formatted end date", formattedEndDate);

  //       formData.append("title", values.title);
  //       formData.append("description", values.description);
  //       formData.append("start_date", formattedStartDate);
  //       formData.append("end_date", formattedEndDate);
  //       formData.append("booking_id", values.booking);

  //       let request = createProject(formData, userProfile.id);

  //       request
  //         .then((resp) => {
  //           if (resp) {
  //             toast({
  //               title: (
  //                 <span className="flex items-center justify-center w-fit gap-2">
  //                   <span className="rounded-full bg-brilliantGreen text-white">
  //                     <CircleCheck />
  //                   </span>
  //                   <span>Project successfully created!</span>
  //                 </span>
  //               ),
  //               description: "You have successfully created a project!",
  //             });
  //             form.resetFields();
  //             handleClose();
  //             getDataBookings();
  //           } else {
  //             throw new Error("Response was not successful");
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           toast({
  //             variant: "destructive",
  //             title: "Uh oh! Something went wrong.",
  //             description: "Unable to create project",
  //           });
  //         })
  //         .finally(() => {
  //           setIsSubmitting(false);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log("Validation failed:", err);
  //     });
  // };

  const handleSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        setIsSubmitting(true);
        let formData = new FormData();

        const [startDate, endDate] = values.dateRange || [];
        const formattedStartDate = startDate
          ? startDate.format("YYYY-MM-DD")
          : "";
        const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : "";

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("start_date", formattedStartDate);
        formData.append("end_date", formattedEndDate);
        formData.append("booking_id", values.booking);

        // Append image file if selected
        if (imageFile) {
          console.log("image ni bos", imageFile);
          formData.append("image", imageFile);
        }

        let request = createProject(formData, userProfile.id);

        request
          .then((resp) => {
            if (resp) {
              toast({
                title: (
                  <span className="flex items-center justify-center w-fit gap-2">
                    <span className="rounded-full bg-brilliantGreen text-white">
                      <CircleCheck />
                    </span>
                    <span>Project successfully created!</span>
                  </span>
                ),
                description: "You have successfully created a project!",
              });
              form.resetFields();
              handleClose();
              getDataBookings();
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
      })
      .catch((err) => {
        console.log("Validation failed:", err);
      });
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

  const handleCloseWithReset = () => {
    form.resetFields();
    setSelectedBooking(null);
    handleClose();
  };

  let bookingsFiltered = (bookings || []).filter((item) => {
    const statusMatch = item?.status.toLocaleLowerCase() === "approved";
    const projectCountMatch = item?.project_count < item?.total_project;
    return statusMatch && projectCountMatch;
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Form
          form={form}
          layout="vertical"
          className="space-y-4"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="booking"
            rules={[{ required: true, message: "Please select a booking" }]}
          >
            <Label htmlFor="booking" className="text-color-950">
              Select Booking
            </Label>
            <Select
              onValueChange={handleSelectChange}
              value={form.getFieldValue("booking")}
            >
              <SelectTrigger className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500">
                <SelectValue placeholder="Select your booking">
                  {selectedBooking
                    ? selectedBooking.architect_name +
                      " (Ref No." +
                      selectedBooking.id +
                      ")"
                    : "Select your booking"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[300px]" position="popper">
                <SelectGroup>
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <LoadingOutlined className="text-lg text-gray-500" />
                    </div>
                  ) : (
                    bookingsFiltered.map((booking) => (
                      <SelectItem
                        key={booking.id}
                        value={booking.id.toString()}
                        className="py-3 px-2 cursor-pointer focus:bg-color-50 text-color-950"
                      >
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-lg">
                              {booking.architect_name}
                            </span>
                            <div className="text-sm">
                              <Tag color="green">
                                {capitalizeFirstLetter(booking.status)}
                              </Tag>
                            </div>
                          </div>
                          <div className="flex items-center text-sm">
                            <Ticket className="w-4 h-4 mr-2" />
                            Ref No. {booking.id}
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(booking.booking_date, 2)}
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              Project Available:{" "}
                              {booking.total_project - booking.project_count}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Label htmlFor="title" className="text-color-950">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={form.getFieldValue("title")}
              onChange={(e) => form.setFieldsValue({ title: e.target.value })}
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Label htmlFor="description" className="text-color-950">
              Description
            </Label>
            <Textarea
              id="description"
              value={form.getFieldValue("description")}
              onChange={(e) =>
                form.setFieldsValue({ description: e.target.value })
              }
              placeholder="Enter project description"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </Form.Item>

          <Form.Item
            name="dateRange"
            rules={[
              { required: true, message: "Please select project duration" },
            ]}
          >
            <Label htmlFor="dateRange" className="text-color-950">
              Project Date
            </Label>
            <RangePicker
              id="dateRange"
              value={form.getFieldValue("dateRange")}
              onChange={(dates) => form.setFieldsValue({ dateRange: dates })}
              style={{ width: "100%" }}
              placeholder={["Start Date", "End Date"]}
              suffixIcon={<Calendar className="h-4 w-4 text-gray-400" />}
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </Form.Item>

          <div>
            <Label htmlFor="image" className="text-color-950 ">
              Upload Image (Optional)
            </Label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full h-10 p-2 text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseWithReset}
              className="border text-color-500 hover:text-color-600 hover:bg-color-50 border-color-200 flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-color-500 hover:bg-color-600 flex-1"
            >
              {isSubmitting ? <LoadingOutlined /> : "Create Project"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectInputDialog;
