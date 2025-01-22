import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  X,
  Download,
  EllipsisVertical,
  User,
  CalendarDays,
} from "lucide-react";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Tag } from "antd";
import { Checkbox } from "@/components/ui/checkbox";
import useBookingStore from "@/stores/booking-store";
import { capitalizeFirstLetter } from "@/utils/ui";
import { AuthContext } from "@/providers/AuthProvider";
import BookingDetailsPopup from "./BookingDetailsPopup";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BookingList = () => {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const { userProfile } = useContext(AuthContext);
  const bookings = useBookingStore((state) => state.bookings);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasAttemptedFetch && userProfile) {
        setIsLoading(true);
        try {
          await fetchBookings(userProfile.role, userProfile.id);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setIsLoading(false);
          setHasAttemptedFetch(true);
        }
      }
    };

    fetchData();
  }, [fetchBookings, userProfile, hasAttemptedFetch]);

  const toggleAll = (checked) => {
    if (checked) {
      setSelectedBookings(bookings.map((booking) => booking.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const toggleProjects = (bookingId) => {
    setSelectedBookings((prev) => {
      if (prev.includes(bookingId)) {
        return prev.filter((id) => id !== bookingId);
      } else {
        return [...prev, bookingId];
      }
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

  useEffect(() => {
    if (!isUpdating) {
      setIsAlertOpen(false);
    }
  }, [isUpdating]);

  const handleAction = (bookingId, status) => {
    setIsAlertOpen(true);
    setStatus(status);
    setSelectedBookingId(bookingId);
  };

  const updateStatus = async () => {
    setIsUpdating(true);
    await updateBooking(selectedBookingId, { status: status }, userProfile.id);
    setIsUpdating(false);
  };

  const handleDeleteBooking = async (bookingId) => {
    setIsDeleting(true);
    await deleteBooking(bookingId);
    await fetchBookings(userProfile.role, userProfile.id);
    setIsDeleting(false);
    setSelectedBookings([]);
    closeConfirmationDialog();
  };

  const openConfirmationDialog = () => {
    setIsConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false);
  };

  return (
    <Layout className={`mx-4 ${selectedBookings.length > 0 ? "mt-0" : "mt-6"}`}>
      {selectedBookings.length > 0 ? (
        <div className="w-full bg-color-200 mb-2 p-1 rounded-full flex justify-start items-center gap-1 text-color-900">
          <Button
            variant="ghost"
            className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            onClick={() => toggleAll(false)}
          >
            <X />
          </Button>
          <div className="w-fit flex justify-center items-center gap-3">
            <span>{selectedBookings.length} selected</span>
            <Button
              variant="ghost"
              className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            >
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={openConfirmationDialog}
              className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            >
              <Trash2 />
            </Button>
            <Button
              variant="ghost"
              className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            >
              <EllipsisVertical />
            </Button>
          </div>
        </div>
      ) : null}

      <Table className="rounded-md overflow-hidden border border-color-200">
        <TableHeader className="bg-color-500">
          {!bookings.length ? (
            <TableRow className="border border-color-500 hover:bg-transparent rounded-md flex justify-center items-center">
              <TableCell>Booking List</TableCell>
            </TableRow>
          ) : (
            <TableRow className="border border-color-500 hover:bg-transparent rounded-md">
              <TableHead className="w-12">
                <Checkbox
                  className="border border-color-50"
                  checked={selectedBookings.length === bookings.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="text-white">Client</TableHead>
              <TableHead className="text-white">Architect</TableHead>
              <TableHead className="text-white">Booking Date</TableHead>
              <TableHead className="text-white">Total Price</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white ">Notes</TableHead>
              <TableHead className="text-white flex items-center justify-center">
                Action
              </TableHead>
            </TableRow>
          )}
        </TableHeader>
        <TableBody className="text-color-900 bg-white">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                <LoadingOutlined className="text-lg text-gray-500" /> Loading
                bookings...
              </TableCell>
            </TableRow>
          ) : bookings.length === 0 && hasAttemptedFetch ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                No bookings data yet.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="cursor-pointer hover:bg-color-50 hover:text-color-950"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedBookings.includes(booking.id)}
                    onCheckedChange={() => toggleProjects(booking.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{booking.client_name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {booking.architect_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>Rp. {booking.total_price}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Tag color={getStatusColor(booking.status)}>
                    {capitalizeFirstLetter(booking.status)}
                  </Tag>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="truncate max-w-[200px]">
                      {booking.notes}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <BookingDetailsPopup
                    booking={booking}
                    role={userProfile.role}
                    handleAction={handleAction}
                    isUpdated={!(booking.status === "pending")}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="p-4 border-t bg-color-100">
        <div className="text-sm text-color-900">
          Results from {bookings.length} projects
        </div>
      </div>
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
              onClick={closeConfirmationDialog}
              className="w-1/4 text-color-950 bg-white hover:bg-color-100 hover:text-color-900 border border-color-100"
            >
              Cancel
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => handleDeleteBooking(selectedBookings[0])}
              className="w-1/4 bg-brilliantRed hover:bg-brilliantRedDarker"
            >
              {isDeleting ? <LoadingOutlined /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="font-semibold text-color-950">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-color-950 text-opacity-80">
              This action cannot be undone. This will permanently set the status
              to{" "}
              <span className="font-bold text-md">
                {capitalizeFirstLetter(status)}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setIsAlertOpen(false)}
              className="w-1/4 text-color-950 bg-white hover:bg-color-100 hover:text-color-900 border border-color-100"
            >
              Cancel
            </AlertDialogAction>
            <AlertDialogAction
              onClick={updateStatus}
              className="w-1/4 bg-color-500 hover:bg-color-600"
            >
              {isUpdating ? <LoadingOutlined /> : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default BookingList;
