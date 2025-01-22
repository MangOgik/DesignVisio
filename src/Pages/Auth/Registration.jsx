import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  GraduationCap,
  User,
  Phone,
  MapPin,
  User2,
  Check,
  KeyRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ConfigProvider, Form, Steps } from "antd";
import { useRegistration } from "@/hooks/use-registration";
import { LoadingOutlined } from "@ant-design/icons";

const architectSteps = [
  { title: "Personal Info", icon: User },
  { title: "Contact", icon: Phone },
  { title: "Education", icon: GraduationCap },
  { title: "Company", icon: Building2 },
  { title: "Account", icon: KeyRound },
];

const clientSteps = [
  { title: "Personal Info", icon: User },
  { title: "Contact", icon: Phone },
  { title: "Address", icon: MapPin },
  { title: "Account", icon: KeyRound },
];

const Registration = () => {
  // const [role, setRole] = useState("client" | "architect" | null);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    form,
    isSubmitting,
    role,
    clientFormData,
    architectFormData,
    updateFormData,
    handleSubmit,
    handleRoleChange,
  } = useRegistration();

  const updateEducation = (index, field, value) => {
    const newEducationList = [...architectFormData.education_list];
    newEducationList[index] = { ...newEducationList[index], [field]: value };
    updateFormData("education_list", newEducationList);
  };

  const addEducation = () => {
    updateFormData("education_list", [
      ...architectFormData.education_list,
      { institution: "", degree: "", graduation_year: "" },
    ]);
  };

  const renderClientSteps = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="name"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="name" className="text-color-950">
                  Full Name
                </Label>
                <Input
                  placeholder="Enter your full name"
                  value={clientFormData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="email"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="email" className="text-color-950">
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={clientFormData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
            <div className="space-y-2">
              <Form.Item
                name="phone"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="phone" className="text-color-950">
                  Phone Number
                </Label>
                <Input
                  placeholder="Enter your phone number"
                  value={clientFormData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="address"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="address" className="text-color-950">
                  Address
                </Label>
                <Textarea
                  placeholder="Enter your address"
                  value={clientFormData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="password"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="password" className="text-color-950">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={clientFormData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
            <div className="space-y-2">
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="password" className="text-color-950">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter your password again"
                  value={clientFormData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderArchitectSteps = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="name"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="name" className="text-color-950">
                  Full Name
                </Label>
                <Input
                  placeholder="Enter your full name"
                  value={architectFormData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
            <div className="space-y-2">
              <Form.Item name="bio" rules={[{ required: true, message: null }]}>
                <Label htmlFor="bio" className="text-color-950">
                  Bio
                </Label>
                <Textarea
                  placeholder="Tell us about yourself"
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full min-h-[100px] p-3 rounded-lg border text-color-900 border-color-200 focus:ring-color-500 focus:border-color-500"
                  value={architectFormData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="space-y-2">
              <Form.Item
                name="price"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="price" className="text-color-950">
                  Price
                </Label>
                <Input
                  placeholder="Input your price"
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                  value={architectFormData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="space-y-2">
              <Form.Item
                name="experience_yearso"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="experience" className="text-color-950">
                  Years of Experience
                </Label>
                <Input
                  type="number"
                  placeholder="Years of experience"
                  value={architectFormData.experience_years}
                  onChange={(e) =>
                    updateFormData("experience_years", e.target.value)
                  }
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="email"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="email" className="text-color-950">
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={architectFormData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
            <div className="space-y-2">
              <Form.Item
                name="phone"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="phone" className="text-color-950">
                  Phone Number
                </Label>
                <Input
                  placeholder="Enter your phone number"
                  value={architectFormData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>

            <div className="space-y-2">
              <Form.Item
                name="status"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="status" className="text-color-950">
                  Status
                </Label>
                <Select
                  value={architectFormData.status}
                  onValueChange={(value) => updateFormData("status", value)}
                >
                  <SelectTrigger className="text-color-alternative-gray border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500">
                    <SelectValue placeholder="Select your status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="available"
                      className="text-color-900 focus:bg-color-100 focus:text-color-950"
                    >
                      Available
                    </SelectItem>
                    <SelectItem
                      value="unavailable"
                      className="text-color-900 focus:bg-color-100 focus:text-color-950"
                    >
                      Unavailable
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Form.Item>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {architectFormData.education_list.map((edu, index) => (
              <div key={index} className="space-y-4">
                {index > 0 && <Separator className="my-4 bg-color-200" />}

                <div className="space-y-2">
                  <Form.Item
                    name={`education_list[${index}].institution`}
                    rules={[{ required: true, message: null }]}
                  >
                    <Label className="text-color-950">Institution</Label>
                    <Input
                      placeholder="Enter institution name"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                      className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                    />
                  </Form.Item>
                </div>

                <div className="space-y-2">
                  <Form.Item
                    name={`education_list[${index}].degree`}
                    rules={[{ required: true, message: null }]}
                  >
                    <Label className="text-color-950">Degree</Label>
                    <Input
                      placeholder="Enter degree name"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                    />
                  </Form.Item>
                </div>

                <div className="space-y-2">
                  <Form.Item
                    name={`education_list[${index}].graduation_year`}
                    rules={[{ required: true, message: null }]}
                  >
                    <Label className="text-color-950">Graduation Year</Label>
                    <Input
                      type="number"
                      placeholder="Enter graduation year"
                      value={edu.graduation_year}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          "graduation_year",
                          e.target.value
                        )
                      }
                      className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                    />
                  </Form.Item>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className={`w-full bg-color-500 hover:bg-color-600 text-color-50 hover:text-color-50 ${
                architectFormData.education_list.length === 2 ? "hidden" : ""
              }`}
              onClick={addEducation}
            >
              Add Another Education
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="companyId"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="companyId" className="text-color-950">
                  Company Code
                </Label>
                <Input
                  placeholder="Enter company code"
                  value={architectFormData.companyId}
                  onChange={(e) => updateFormData("companyId", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Form.Item
                name="password"
                rules={[{ required: true, message: null }]}
              >
                <Label htmlFor="password" className="text-color-950">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={architectFormData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
                />
              </Form.Item>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!role) {
    return (
      <Card className="w-full lg:w-1/2 h-screen px-8 shadow-none rounded-none border-none flex items-center justify-center flex-col">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl font-bold text-color-950">
            Choose Your Role
          </CardTitle>
          <CardDescription className="text-color-900">
            Select how you want to use our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="p-6 cursor-pointer hover:border-color-500 transition-all"
              onClick={() => handleRoleChange("client")}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-color-50 flex items-center justify-center">
                  <User2 className="w-8 h-8 text-color-500" />
                </div>
                <h3 className="text-xl font-semibold text-color-950">Client</h3>
                <p className="text-color-900 text-center">
                  Looking to connect with architects and bring your project to
                  life
                </p>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:border-color-500 transition-all"
              onClick={() => handleRoleChange("architect")}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-color-50 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-color-500" />
                </div>
                <h3 className="text-xl font-semibold text-color-950">
                  Architect
                </h3>
                <p className="text-color-900 text-center">
                  Showcase your expertise and connect with potential clients
                </p>
              </div>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="">
          <p className="text-color-900 mt-2 text-sm">
            Already have an account?{" "}
            <NavLink
              to="/auth/login"
              className="text-color-500 hover:text-color-600 hover:underline"
            >
              Sign In
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    );
  }

  const steps = role === "architect" ? architectSteps : clientSteps;

  return (
    <Card className="w-full lg:w-1/2 h-screen px-8 shadow-none rounded-none border-none overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-color-950">
          {role === "architect" ? "Architect" : "Client"} Registration
        </CardTitle>
        <CardDescription>
          Complete your profile in a few simple steps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <ConfigProvider
            theme={{
              components: {
                Steps: {
                  colorPrimary: "#b17d41",
                  colorTextDescription: "rgba(108, 103, 100, 0.5)",
                  colorText: "#331b15",
                },
              },
            }}
          >
            <Steps
              current={currentStep}
              labelPlacement="vertical"
              items={steps.map((step, index) => ({
                title: step.title,
                className: `
                  ${index < currentStep ? "ant-steps-item-finish" : ""}
                  ${index === currentStep ? "ant-steps-item-process" : ""}
                  ${index > currentStep ? "ant-steps-item-wait" : ""}
                  ${index > currentStep ? "text-color-200" : "text-color-950"}
                `,
                icon:
                  index < currentStep ? (
                    <div className="bg-color-500 rounded-full p-2 w-9 h-9 flex items-center justify-center">
                      <Check className="text-color-50" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-color-50 p-1 w-9 h-9 flex items-center justify-center">
                      <step.icon className="text-color-500 w-5 h-5" />
                    </div>
                  ),
              }))}
            />
          </ConfigProvider>
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
              <div
                className="h-1 bg-primary transition-all duration-300"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
        <Form form={form} onFinish={handleSubmit}>
          {role === "client" ? renderClientSteps() : renderArchitectSteps()}
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-color-900 mt-2 text-sm">
          Already have an account?{" "}
          <NavLink
            to="/auth/login"
            className="text-color-500 hover:text-color-600 hover:underline"
          >
            Sign In
          </NavLink>
        </p>

        <div className="flex gap-4 w-1/3">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 0) {
                handleRoleChange(null);
              } else {
                setCurrentStep((prev) => prev - 1);
              }
            }}
            className="border text-color-500 hover:text-color-600 hover:bg-color-50 border-color-200 flex-1"
          >
            {currentStep === 0 ? "Change Role" : "Previous"}
          </Button>
          <Button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit();
              } else {
                setCurrentStep((prev) => prev + 1);
              }
            }}
            className="bg-color-500 hover:bg-color-600 flex-1"
          >
            {currentStep === steps.length - 1 ? (
              isSubmitting ? (
                <LoadingOutlined />
              ) : (
                <span className="">Submit</span>
              )
            ) : (
              <span>Next</span>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Registration;
