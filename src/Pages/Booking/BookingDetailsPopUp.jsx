import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, BadgeIcon, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Tag } from "antd";

const BookingDetailsPopup = ({ booking, role, handleAction, isUpdated }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "gold";
      case "approved":
        return "green";
      case "rejected":
        return "red";
      default:
        return "gold";
    }
  };

  const isArchitect = role === "architect";

  return (
    <Dialog>
      <div className="flex justify-center items-center gap-x-1">
        {!isArchitect || isUpdated ? (
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className=" border-color-500 text-color-500 hover:bg-color-500 hover:text-white transition-all duration-200"
            >
              View Details
            </Button>
          </DialogTrigger>
        ) : null}

        {isArchitect && !isUpdated ? (
          <>
            <Button
              asChild
              onClick={() => handleAction(booking.id, "approved")}
            >
              <Tag color="#87d068" className="p-0 m-0">
                Approved
              </Tag>
            </Button>
            <Button
              asChild
              onClick={() => handleAction(booking.id, "rejected")}
            >
              <Tag color="#f50" className="p-0 m-0">
                Reject
              </Tag>
            </Button>
          </>
        ) : null}
      </div>
      <DialogContent className="sm:max-w-[600px] text-black ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Booking Details
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Ref No. {booking.id}</h3>
              <p className="text-sm text-muted-foreground">
                Created on {formatDate(booking.created_at)}
              </p>
            </div>
            <Tag color={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Tag>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Client Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">{booking.client_name}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">{booking.client_phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">{booking.client_email}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">
                Architect Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">{booking.architect_name}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">{booking.architect_phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">{booking.architect_email}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Booking Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(booking.booking_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium">Total Project</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.total_project}{" "}
                    {booking.total_project > 1 ? "projects" : "project"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium">Total Price</p>
                  <p className="text-sm text-muted-foreground">
                    Rp. {booking.total_price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Notes</h4>
            <div className="bg-muted rounded-md">
              <p className="text-sm">{booking.notes}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsPopup;
