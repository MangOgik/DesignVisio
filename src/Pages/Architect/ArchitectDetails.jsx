import useArchitectStore from "@/stores/architect-store";
import { Layout } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  Building2,
  Calendar,
  CircleCheck,
  Minus,
  NotebookPen,
  Plus,
} from "lucide-react";
import { Image } from "antd";
import { Input } from "@/components/ui/input";
import DetailsContent from "./DetailsContent";
import PortfolioContent from "./PortfolioContent";
import ArchitectDetailsSkeleton from "@/components/skeleton/ArchitectDetailsSkeleton";
import { Form } from "antd";
import useBookingStore from "@/stores/booking-store";
import { AuthContext } from "@/providers/AuthProvider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { LoadingOutlined } from "@ant-design/icons";
import { useToast } from "@/hooks/use-toast"

const ArchitectDetails = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notesCharCount, setNotesCharCount] = useState(0);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const { toast } = useToast();
  const { architectSlug } = useParams();
  const createBooking = useBookingStore((state) => state.createBooking);
  const selectedArchitect = useArchitectStore(
    (state) => state.selectedArchitect
  );
  const fetchArchitectBySlug = useArchitectStore(
    (state) => state.fetchArchitectBySlug
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedArchitect) {
        await fetchArchitectBySlug(architectSlug);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [architectSlug]);

  const [quantity, setQuantity] = useState(1);
  const maxProjects = 2;

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxProjects) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return <ArchitectDetailsSkeleton />;
  }

  const closeBookingDialog = () => {
    setIsBookingDialogOpen(false);
  };

  const openBookingDialog = () => {
    setIsBookingDialogOpen(true);
  };

  const handleBooking = async () => {
    form
      .validateFields()
      .then((values) => {
        setIsSubmitting(true);
        let formData = new FormData();
        formData.append("client_id", userProfile.id);
        formData.append("architect_id", selectedArchitect.id);
        formData.append("notes", values.notes);
        formData.append("total_project", quantity);

        let request = createBooking(formData, userProfile.id);

        request
          .then((resp) => {
            if (resp) {
              toast({
                title: (
                  <span className="flex items-center justify-center w-fit gap-2">
                    <span className="rounded-full bg-brilliantGreen text-white">
                      <CircleCheck />
                    </span>
                    <span>Booking Success!</span>
                  </span>
                ),
                description: "You have successfully booked the architect! Please wait for approval.",
              });
              form.resetFields();
            } else {
              throw new Error("Response was not successful");
            }
          })
          .catch((err) => {
            console.log(err);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Unable to book",
            });
          })
          .finally(() => {
            setIsSubmitting(false);
            closeBookingDialog();
          });
      })
      .catch((err) => {
        console.log("Validation failed:", err);
      });
  };

  return (
    <Layout className="mt-6 w-full h-fit pb-4 bg-color-50 text-color-alternative-black flex justify-center items-center px-4">
      <Dialog open={isBookingDialogOpen}>
        <DialogContent className="sm:max-w-[500px] border-none">
          <DialogTitle>
            <div className="bg-color-500 -mx-6 -mt-6 p-6 rounded-t-lg">
              <div className="flex items-center gap-3">
                <NotebookPen className="h-6 w-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Confirm Booking
                </h2>
              </div>
            </div>
          </DialogTitle>
          <div className="space-y-6 py-4">
            <div className="grid gap-6">
              <div className="space-y-4">
                <div className="bg-color-50 p-4 rounded-lg">
                  <Label className="text-sm font-semibold text-color-700">
                    Architect
                  </Label>
                  <p className="text-color-900 mt-1">
                    {selectedArchitect.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-color-50 p-4 rounded-lg">
                    <Label className="text-sm font-semibold text-color-700">
                      Total Projects
                    </Label>
                    <p className="text-color-900 mt-1">{quantity}</p>
                  </div>
                  <div className="bg-color-50 p-4 rounded-lg">
                    <Label className="text-sm font-semibold text-color-700">
                      Total Price
                    </Label>
                    <p className="text-color-900 mt-1">
                      Rp. {(quantity * selectedArchitect.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-color-100" />

              <Form form={form} layout="vertical">
                <Form.Item name="notes">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Additional Notes</Label>
                    <Form.Item
                      name="notes"
                      rules={[
                        {
                          max: 200,
                          message:
                            "Additional notes cannot exceed 200 characters",
                        },
                      ]}
                    >
                      <Textarea
                        id="notes"
                        className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                        placeholder="Enter any additional notes here"
                        maxLength={200}
                        onChange={(e) =>
                          setNotesCharCount(e.target.value.length)
                        }
                      />
                    </Form.Item>
                    <p className="text-xs mt-1 text-gray-500 text-right">
                      {notesCharCount}/200
                    </p>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="w-1/4 text-color-950 hover:bg-color-100 hover:text-color-900"
              onClick={closeBookingDialog}
            >
              Cancel
            </Button>
            <Button
              className="w-1/4 bg-color-500 hover:bg-color-600 text-white"
              onClick={handleBooking}
            >
              {isSubmitting ? <LoadingOutlined /> : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="h-full grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
        <div className="md:col-span-2 flex flex-col">
          <Image
            src="https://avatarfiles.alphacoders.com/375/thumb-350-375295.webp"
            alt={selectedArchitect?.name || "Architect"}
            className="w-full aspect-square rounded-lg"
          />
          <Card className="p-3 select-none rounded-lg mt-4 flex flex-col">
            <CardHeader className="p-0 flex-grow">
              <h2 className="font-semibold text-color-950 mb-1">
                Set Projects Quantity
              </h2>
            </CardHeader>

            <CardContent className="px-0 py-2 flex flex-col gap-3 justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-color-500 text-color-950 hover:bg-color-50"
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4 text-color-900" />
                  </Button>
                  <Input
                    value={quantity}
                    onChange={(e) => updateQuantity(Number(e.target.value))}
                    className="h-8 w-20 text-center border-color-500 text-color-950"
                    min={1}
                    max={maxProjects}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-color-500 text-color-950 hover:bg-color-50"
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={quantity >= maxProjects}
                  >
                    <Plus className="h-4 w-4 text-color-900" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-color-900 leading-2 line-clamp-2">
                Max. {maxProjects} projects per hiring
              </p>
              <div className="flex flex-col gap-2 bg-color-500 bg-opacity-5 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-color-500" />
                  <span className="text-sm text-color-900">
                    Professional Consultation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-color-500" />
                  <span className="text-sm text-color-900">
                    Flexible Scheduling
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm text-color-900">
                  <span>Base Price</span>
                  <span>Rp {selectedArchitect.price}/project</span>
                </div>
                <div className="flex items-center justify-between border-t border-color-500 border-opacity-20 pt-2">
                  <span className="text-md font-medium text-color-900">
                    Total Price
                  </span>
                  <span className="text-lg font-bold text-color-950">
                    Rp {(quantity * selectedArchitect.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-1.5 p-0 mt-4">
              <Button
                onClick={openBookingDialog}
                className="flex-1 w-full bg-color-500 text-white hover:bg-color-600"
              >
                Book Architect
              </Button>
              <Button
                variant="outline"
                className="flex-1 w-full border-color-500 text-color-900 hover:text-color-950 hover:bg-color-alternative-color hover:bg-opacity-5"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Save For Later
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-4 flex flex-col">
          <h1 className="text-3xl font-bold text-color-900 leading-none mb-4">
            {selectedArchitect.name || "Architect Name"}
          </h1>

          <Tabs defaultValue="detail" className="w-full flex-1 flex flex-col">
            <TabsList className="grid w-full h-fit p-0 grid-cols-2 bg-white text-color-950">
              <TabsTrigger
                value="detail"
                className="data-[state=active]:bg-color-500 data-[state=active]:text-color-50 p-1.5"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-color-500 data-[state=active]:text-color-50 p-1.5"
              >
                Portfolio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detail" className="flex-1 mt-4">
              <Card className="h-full w-full p-6">
                <DetailsContent architect={selectedArchitect} />
              </Card>
            </TabsContent>

            <TabsContent value="info" className="flex-1 mt-4">
              <Card className="h-full w-full p-6">
                <PortfolioContent />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ArchitectDetails;
