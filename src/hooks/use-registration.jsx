import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { getDataPrivate, registerAPI } from "@/utils/api";
import { jwtStorage } from "@/utils/jwt_storage";
import { CircleCheck, CircleX } from "lucide-react";
import { Form } from "antd";
import { AuthContext } from "@/providers/AuthProvider";

export const useRegistration = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile, login } = useContext(AuthContext);


  const [clientFormData, setClientFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [architectFormData, setArchitectFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    price: "",
    experience_years: "",
    education_list: [{ institution: "", degree: "", graduation_year: "" }],
    companyId: "",
    company_website: "",
    company_address: "",
    status: "available",
  });

  const updateFormData = (field, value) => {
    if (role === "architect") {
      setArchitectFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setClientFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleRoleChange = (role) => {
    setRole(role);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      if (role === "architect") {
        formData.append("name", architectFormData.name);
        formData.append("email", architectFormData.email);
        formData.append("password", architectFormData.password);
        formData.append("phone", architectFormData.phone);
        formData.append("bio", architectFormData.bio);
        formData.append("price", architectFormData.price);
        formData.append("experience_years", architectFormData.experience_years);
        architectFormData.education_list.forEach((education, index) => {
          formData.append(
            `education[${index}][institution]`,
            education.institution
          );
          formData.append(`education[${index}][degree]`, education.degree);
          formData.append(
            `education[${index}][graduation_year]`,
            education.graduation_year
          );
        });
        formData.append("company_id", architectFormData.companyId);
        formData.append("status", architectFormData.status);
      } else {
        formData.append("name", clientFormData.name);
        formData.append("email", clientFormData.email);
        formData.append("password", clientFormData.password);
        formData.append("phone", clientFormData.phone);
        formData.append("address", clientFormData.address);
      }
      formData.append("role", role);
      console.log("ini isi form data sebelum dikirim", formData);
      const resp = await registerAPI("/api/v1/auth/register", formData);

      if (resp?.access_token) {
        await jwtStorage.storeToken(resp?.access_token);
        await login(resp?.access_token);
        toast({
          title: (
            <span className="flex items-center justify-center w-fit gap-2">
              <span className="rounded-full bg-brilliantGreen text-white">
                <CircleCheck />
              </span>
              <span>Registration Success!</span>
            </span>
          ),
          description: `You are successfully registered as ${userProfile.username}`,
        });

        navigate("/home", { replace: true });
        form.resetFields();
      } else {
        toast({
          title: (
            <span className="flex items-center justify-center w-fit gap-2">
              <span className="rounded-full bg-brilliantRed text-white">
                <CircleX />
              </span>
              <span>Registration Failed!</span>
            </span>
          ),
          description: "Please check your details or try again later.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to register. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    role,
    clientFormData,
    architectFormData,
    updateFormData,
    handleSubmit,
    handleRoleChange,
  };
};
