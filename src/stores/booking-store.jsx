import { create } from "zustand";
import {
  deleteDataPrivateJSON,
  editDataPrivate,
  getDataPrivate,
  sendDataPrivate,
} from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";

const useBookingStore = create((set, get) => ({
  bookings: [],

  fetchBookings: async (role, id) => {
    try {
      const response = await getDataPrivate(
        `/api/v1/booking/readByRole/${role}/${id}`
      );
      if (response) {
        console.log(response.datas);
        set({ bookings: response.datas });
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  },

  createBooking: async (bookingData, userId) => {
    try {
      const response = await sendDataPrivate(
        "/api/v1/booking/create",
        bookingData
      );
      if (response) {
        get().fetchBookings("client", userId);
      }
      return response;
    } catch (error) {
      console.error("Error creating booking:", error);
      return null;
    }
  },

  updateBooking: async (bookingId, updatedData, userId) => {
    try {
      const response = await editDataPrivate(
        `/api/v1/booking/update/${bookingId}`,
        updatedData
      );
      if (response) {
        console.log("this is running");
        get().fetchBookings("architect", userId);
      }
      return response;
    } catch (error) {
      console.error("Error updating booking:", error);
      return null;
    }
  },

  deleteBooking: async (bookingId) => {
    try {
      deleteDataPrivateJSON(`/api/v1/booking/delete/${bookingId}`)
        .then((resp) => {
          if (resp) {
            console.log("resp", resp);
            toast({
              title: (
                <span className="flex items-center justify-center w-fit gap-2">
                  <span className="rounded-full bg-brilliantGreen text-white">
                    <CircleCheck />
                  </span>
                  <span>Booking successfully deleted!</span>
                </span>
              ),
              description: "You have successfully delete a booking!",
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
            description: "Unable to delete booking",
          });
        });
      get().fetchBookings("client", bookingId);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  },

  reset: () =>
    set({
      bookings: [],
    }),
}));

export default useBookingStore;
