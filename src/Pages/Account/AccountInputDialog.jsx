import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "antd";
import { AuthContext } from "@/providers/AuthProvider";
import { LoadingOutlined } from "@ant-design/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { editDataPrivate } from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheck } from "lucide-react";

const AccountInputDialog = ({ isOpen, handleClose }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userProfile } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (isOpen && userProfile) {
      const initialClientValues = {
        name: userProfile.name,
        address: userProfile.address,
        phone: userProfile.phone,
      };
      const initialArchitectValues = {
        name: userProfile.name,
        bio: userProfile.bio,
        phone: userProfile.phone,
        status: userProfile.status,
        experience_years: userProfile.experience_years,
        price: userProfile.price,
      };
      form.setFieldsValue(
        userProfile.role === "client"
          ? initialClientValues
          : initialArchitectValues
      );
      setFormValues(
        userProfile.role === "client"
          ? initialClientValues
          : initialArchitectValues
      );
    }
  }, [isOpen, userProfile, form]);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      let url =
        userProfile.role === "client"
          ? "/api/v1/client/update/"
          : "/api/v1/architect/update/";
      const resp = await editDataPrivate(url + userProfile.id, values);

      if (resp) {
        toast({
          title: (
            <span className="flex items-center justify-center w-fit gap-2">
              <span className="rounded-full bg-brilliantGreen text-white">
                <CircleCheck />
              </span>
              <span>Profile successfully updated!</span>
            </span>
          ),
          description: "Your account details have been saved.",
        });
        handleClose();
      } else {
        throw new Error("Response was not successful");
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Unable to update account",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseWithReset = () => {
    form.resetFields();
    handleClose();
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    form.setFieldValue(field, value);
  };

  const renderClientFields = () => (
    <>
      <div className="mb-4">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formValues.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your name"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
      <div className="mb-4">
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formValues.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter your address"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
      <div className="mb-4">
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formValues.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
    </>
  );

  const renderArchitectFields = () => (
    <>
      <div className="mb-4">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formValues.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your name"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
      <div className="mb-4">
        <Form.Item
          name="bio"
          rules={[{ required: true, message: "Please enter your bio" }]}
        >
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formValues.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Enter your name"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
      <div className="mb-4">
        <Form.Item
          name="status"
          rules={[{ required: true, message: "Please enter your status" }]}
        >
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={formValues.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger className="w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Form.Item>
      </div>
      <div className="mb-4">
        <Form.Item
          name="experience_years"
          rules={[{ required: true, message: "Please enter your experience" }]}
        >
          <div>
            <Label htmlFor="experience_years">Experience</Label>
            <Input
              id="experience_years"
              value={formValues.experience_years}
              onChange={(e) =>
                handleInputChange("experience_years", e.target.value)
              }
              placeholder="Enter your experience (years)"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
      <div className="mb-4">
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formValues.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
      <div className="mb-4">
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please enter your price" }]}
        >
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={formValues.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="Enter your price"
              className="placeholder:text-color-alternative-gray placeholder:text-opacity-50 w-full p-3 border text-color-900 border-color-200 rounded-lg focus:ring-color-500 focus:border-color-500"
            />
          </div>
        </Form.Item>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] text-color-950">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          {userProfile?.role === "client"
            ? renderClientFields()
            : renderArchitectFields()}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseWithReset}
              className="border text-color-500 hover:text-color-600 hover:bg-color-50 border-color-200 flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-color-500 hover:bg-color-600 flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingOutlined /> : "Save Changes"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountInputDialog;
