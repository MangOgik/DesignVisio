import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Image } from "antd";
import { Toaster } from "@/components/ui/toaster";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/home";

  if (isLoggedIn) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-color-50 p-12 flex-col justify-around">
        <div className="">
          <div className="flex items-center space-x-2 mb-8">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-color-500">
              <img
                src={`/LogoDesignVisioWhite.svg`}
                alt="Design Visio Logo"
                className="w-6 h-6 ml-[0.1rem]"
              />
            </div>
            <span className="text-2xl font-bold text-color-500">
              DesignVisio
            </span>
          </div>
          <h1 className="text-4xl font-bold text-color-950 mb-4">
            Welcome to DesignVisio
          </h1>
          <p className="text-xl text-color-900">
            Streamline your architectural projects, collaborate seamlessly, and
            bring your visions to life.
          </p>
        </div>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-white p-2 rounded-full">
              <Image
                src="https://img.icons8.com/?size=100&id=AQrleQ9jsN9E&format=png&color=000000"
                width={32}
                height={32}
                alt="Feature icon"
              />
            </div>
            <div>
              <h3 className="font-semibold text-color-950">Find Architects</h3>
              <p className="text-color-900">
                Discover professional architects tailored to your project needs.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-white p-2 rounded-full">
              <Image
                src="https://img.icons8.com/?size=100&id=fW5sOXrIOGqO&format=png&color=000000"
                width={32}
                height={32}
                alt="Feature icon"
              />
            </div>
            <div>
              <h3 className="font-semibold text-color-950">
                Seamless Collaboration
              </h3>
              <p className="text-color-900">
                Work effortlessly with architects and clients.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-white p-2 rounded-full">
              <Image
                src="https://img.icons8.com/?size=100&id=31090&format=png&color=000000"
                width={32}
                height={32}
                alt="Feature icon"
              />
            </div>
            <div>
              <h3 className="font-semibold text-color-950">
                Transparent Pricing
              </h3>
              <p className="text-color-900">
                Access clear and upfront pricing for every architectural
                project.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Button
            onClick={() => navigate("/")}
            className="bg-color-500 hover:bg-color-600 text-white"
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Outlet />
      <Toaster />
    </div>
  );
};

export default Auth;
