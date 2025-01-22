  import React from "react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { EyeOff, Eye, CircleX } from "lucide-react";
  import { NavLink } from "react-router-dom";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Form } from "antd";
  import { LoadingOutlined } from "@ant-design/icons";
  import { useLogin } from "@/hooks/use-login";
  import { SocialLoginButtons } from "./SocialLoginButton";
  import { usePasswordVisibility } from "@/hooks/use-password-visibility";
  import { useToast } from "@/hooks/use-toast";

  const Login = () => {
    const { isPasswordVisible, togglePasswordVisibility } =
      usePasswordVisibility();
    const { form, isSubmitting, handleSubmit, handleRoleChange, role } =
      useLogin();

    const { toast } = useToast();

    const handleFormFailed = (errorInfo) => {
      if (errorInfo.errorFields.length > 0) {
        toast({
          title: (
            <span className="flex items-center justify-center w-fit gap-2">
              <span className="rounded-full bg-brilliantRed text-white">
                <CircleX/>
              </span>
              <span>Login Failed!</span>
            </span>
          ),
          description: "Please check your Email, Password, or Role.",
        });
      }
    };

    return (
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-color-950">Welcome back</h2>
            <p className="text-color-900 mt-2">
              Don't have an account?{" "}
              <NavLink
                to="/auth/registration"
                className="text-color-500 hover:text-color-600 hover:underline"
              >
                Sign Up
              </NavLink>
            </p>
          </div>

          <Form
            form={form}
            className="space-y-6"
            initialValues={{
              email: "",
              password: "",
            }}
            onFinishFailed={handleFormFailed} // Handle failed validation
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-color-950"
              >
                Email address <span className="text-red-500">*</span>
              </label>
              <Form.Item
                name="email"
                rules={[{ required: true, message: null }]}
                validateTrigger="onBlur"
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-color-950"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: null }]}
                >
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                  />
                </Form.Item>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-color-500 hover:text-color-600"
                >
                  {isPasswordVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-color-500 hover:text-color-600 block text-right"
              >
                Forgot password?
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="role-architect"
                checked={role === "architect"}
                onCheckedChange={handleRoleChange}
              />
              <label
                htmlFor="role-architect"
                className="text-sm leading-none text-color-950"
              >
                I am an Architect
              </label>
            </div>

            <Button
              onClick={() => {
                console.log(`Logging in as: ${role}`);
                handleSubmit();
              }}
              className="w-full bg-color-500 hover:bg-color-600 text-white py-3 rounded-lg"
            >
              {isSubmitting ? (
                <LoadingOutlined />
              ) : (
                `Log in as ${role.charAt(0).toUpperCase() + role.slice(1)}`
              )}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-color-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-color-900">OR</span>
              </div>
            </div>

            <SocialLoginButtons />
          </Form>
        </div>
      </div>
    );
  };

  export default Login;
