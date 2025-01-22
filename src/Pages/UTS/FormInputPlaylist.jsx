import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Form } from "antd";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
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
import { sendDataUTS } from "@/utils/apiuts";

const FormInputPlaylist = ({ isEdit, item, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState({
    name: 0,
    description: 0,
    url: 0,
    thumbnail: 0,
  });

  const [form] = Form.useForm();
  const { toast } = useToast();

  useEffect(() => {
    console.log(isEdit, item);
    if (isEdit && item) {
      form.setFieldsValue({
        name: item.play_name,
        description: item.play_description,
        genre: item.play_genre,
        url: item.play_url,
        thumbnail: item.play_thumbnail,
      });
      setCharCount({
        name: item.play_name ? item.play_name.length : 0,
        description: item.play_description ? item.play_description.length : 0,
        url: item.play_url ? item.play_url.length : 0,
        thumbnail: item.play_thumbnail ? item.play_thumbnail.length : 0,
      });
    }
  }, [isEdit, item]);

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        setIsSubmitting(true);
        let formData = new FormData();
        formData.append("play_name", values.name);
        formData.append("play_description", values.description || "");
        formData.append("play_genre", values.genre);
        formData.append("play_url", values.url);
        formData.append("play_thumbnail", values.thumbnail);

        let url = isEdit
          ? "/api/playlist/update/" + item.id_play
          : "/api/playlist/23";
        let request = sendDataUTS(url, formData);

        request
          .then((resp) => {
            if (resp) {
              toast({
                title: `Playlist is successfully ${
                  isEdit ? "updated" : "created"
                }`,
                description: `Playlist successfully ${
                  isEdit ? "updated" : "created"
                }`,
              });
              form.resetFields();
              onSubmit();
            } else {
              throw new Error("Response was not successful");
            }
          })
          .catch((err) => {
            console.log(err);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: `Unable to ${isEdit ? "update" : "create"} playlist`,
            });
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      })
      .catch((err) => {
        console.log("Validation failed:", err);
      });
  };

  const cancelForm = () => {
    form.resetFields();

    if (onCancel) {
      onCancel();
    }
  };

  const handleInputChange = (item) => {
    if (item && item.field && item.value) {
      setCharCount((prev) => ({
        ...prev,
        [item.field]: item.value.length,
      }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit playlist" : "Create playlist"}</CardTitle>
        <CardDescription>
          {isEdit
            ? "Edit your playlist in one-click."
            : "Create your playlist in one-click."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} layout="vertical">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>

              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Name is required" },
                  { max: 40, message: "Name cannot exceed 40 characters" },
                ]}
              >
                <Input
                  id="name"
                  placeholder="Name of your playlist"
                  maxLength={40}
                  onChange={(e) =>
                    handleInputChange({ field: "name", value: e.target.value })
                  }
                />
              </Form.Item>
              <p className="text-xs mt-1 text-gray-500 text-right">
                {charCount.name}/40
              </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Form.Item
                name="description"
                rules={[
                  {
                    max: 200,
                    message: "Description cannot exceed 200 characters",
                  },
                ]}
              >
                <Textarea
                  id="description"
                  placeholder="Enter your description here"
                  maxLength={200}
                  onChange={(e) =>
                    handleInputChange({
                      field: "description",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <p className="text-xs mt-1 text-gray-500 text-right">
                {charCount.description}/200
              </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="genre">Genre</Label>
              <Form.Item
                name="genre"
                rules={[{ required: true, message: "Please select a genre" }]}
              >
                <Select
                  value={form.getFieldValue("genre")}
                  onValueChange={(value) =>
                    form.setFieldsValue({ genre: value })
                  }
                >
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="song">Song</SelectItem>
                    <SelectItem value="movie">Movie</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </Form.Item>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">URL</Label>
              <Form.Item
                name="url"
                rules={[
                  {
                    required: true,
                    message: "URL is required",
                  },
                  {
                    type: "url",
                    message: "Please enter a valid URL",
                  },
                  {
                    max: 500,
                    message: "URL cannot exceed 500 characters",
                  },
                ]}
              >
                <Input
                  id="url"
                  placeholder="Enter your URL here"
                  maxLength={500}
                  onChange={(e) =>
                    handleInputChange({ field: "url", value: e.target.value })
                  }
                />
              </Form.Item>
              <p className="text-xs mt-1 text-gray-500 text-right">
                {charCount.url}/500
              </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Form.Item
                name="thumbnail"
                rules={[
                  {
                    required: true,
                    message: "Thumbnail URL is required",
                  },
                  {
                    type: "url",
                    message: "Please enter a valid thumbnail URL",
                  },
                  {
                    max: 500,
                    message: "Thumbnail URL cannot exceed 500 characters",
                  },
                ]}
              >
                <Input
                  id="thumbnail"
                  placeholder="Enter your thumbnail URL here"
                  maxLength={500}
                  onChange={(e) =>
                    handleInputChange({
                      field: "thumbnail",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <p className="text-xs text-gray-500 text-right">
                {charCount.thumbnail}/500
              </p>
            </div>
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-4 justify-end">
        <Button
          variant="outline"
          className={`${
            isEdit ? "w-28" : "w-24"
          } flex items-center justify-center`}
          onClick={cancelForm}
        >
          Cancel
        </Button>
        <Button
          className={`${
            isEdit ? "w-28" : "w-24"
          } flex items-center justify-center`}
          onClick={submitForm}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : isEdit ? (
            "Save Changes"
          ) : (
            "Create"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormInputPlaylist;
