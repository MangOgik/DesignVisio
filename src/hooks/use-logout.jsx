import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { CircleCheck } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useArchitectStore from "@/stores/architect-store";
import useCompanyStore from "@/stores/company-store";
import useBookingStore from "@/stores/booking-store";
import useProjectStore from "@/stores/project-store";

const useLogout = () => {
  const resetArchitect = useArchitectStore((state) => state.reset);
  const resetCompany = useCompanyStore((state) => state.reset);
  const resetBooking = useBookingStore((state) => state.reset);
  const resetProject = useProjectStore((state) => state.reset);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const reset = () => {
    resetArchitect();
    resetCompany();
    resetBooking();
    resetProject();
  };

  const handleLogout = async () => {
    try {
      logout();
      reset();
      toast({
        title: (
          <span className="flex items-center justify-center w-fit gap-2">
            <span className="rounded-full bg-brilliantGreen text-white">
              <CircleCheck />
            </span>
            <span>Logout Success!</span>
          </span>
        ),
        description: "You are successfully logged out",
      });

      // Finally navigate
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "There was a problem logging out. Please try again.",
      });
    }
  };

  return handleLogout;
};

export default useLogout;
