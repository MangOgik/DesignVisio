import { Form } from "antd";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { loginAPI } from "@/utils/api";
import { CircleCheck, CircleX } from "lucide-react";
import { AuthContext } from "@/providers/AuthProvider";

export const useLogin = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState("client");
  const { userProfile, login } = useContext(AuthContext);

  const { toast } = useToast();

  const handleRoleChange = (checked) => {
    setRole(checked ? "architect" : "client");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", role);

      const resp = await loginAPI("/api/v1/auth/login", formData);

      if (resp?.access_token) {
        login(resp?.access_token);
        toast({
          title: (
            <span className="flex items-center justify-center w-fit gap-2">
              <span className="rounded-full bg-brilliantGreen text-white">
                <CircleCheck />
              </span>
              <span>Login Success!</span>
            </span>
          ),
          description: `You are successfully logged in as ${userProfile.name}`,
        });
        form.resetFields();
      } else {
        toast({
          title: (
            <span className="flex items-center justify-center w-fit gap-2">
              <span className="rounded-full bg-brilliantRed text-white">
                <CircleX />
              </span>
              <span>Login Failed!</span>
            </span>
          ),
          description: "Please check your Email, Password, or Role",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to login",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    handleSubmit,
    handleRoleChange,
    role,
  };
};
