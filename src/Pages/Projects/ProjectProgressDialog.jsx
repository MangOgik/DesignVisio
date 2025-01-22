import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoadingOutlined } from "@ant-design/icons";
import { Check, CheckIcon, X } from "lucide-react";
import { ConfigProvider, Steps } from "antd";

const steps = [
  { id: 1, title: "Conceptualization & Planning" },
  { id: 2, title: "Schematic Design" },
  { id: 3, title: "Design Development" },
  { id: 4, title: "Construction Documentation" },
  { id: 5, title: "Complete" },
];

const ProjectProgressDialog = ({
  isOpen,
  onClose,
  handleUpdate,
  isUpdating,
  currentPhase,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(currentPhase);
  }, []);

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
    handleUpdate(currentStep + 1);
  };

  return (
    <Dialog open={isOpen} className="w-full">
      <DialogContent className="max-w-4xl p-6 text-color-950">
        <DialogHeader>
          <DialogTitle className="text-2xl w-full flex justify-between items-center">
            Update Project Timeline
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-between mb-4 gap-2">
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
                    index === currentStep - 1 ? (
                      <div className="bg-color-500 rounded-full p-2 w-9 h-9 flex items-center justify-center">
                        <div className="text-color-500 size-5 rounded-full" />
                      </div>
                    ) : index < currentStep ? (
                      <div className="bg-color-500 rounded-full p-2 w-9 h-9 flex items-center justify-center">
                        <Check className="text-color-50" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-color-50 p-1 w-9 h-9 flex items-center justify-center">
                        <div className="text-color-500 size-5 rounded-full" />
                      </div>
                    ),
                }))}
              />
            </ConfigProvider>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <h3 className="text-lg font-medium">Step {currentStep}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {steps[currentStep - 1].title}
            </p>
          </div>
        </div>
        <DialogFooter className="w-full flex justify-end">
          <div className="flex w-1/2 gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border text-color-500 hover:text-color-600 hover:bg-color-50 border-color-200 flex-1"
            >
              Cancel
            </Button>
            {currentStep !== 4 ? (
              <Button
                onClick={handleNext}
                className="bg-color-500 hover:bg-color-600 flex-1"
              >
                {isUpdating ? <LoadingOutlined /> : "Complete This Step"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-color-500 hover:bg-color-600 flex-1"
              >
                Complete Project
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectProgressDialog;
