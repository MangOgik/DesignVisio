import { Button } from "@/components/ui/button";
import { Image } from "antd";

export const SocialLoginButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="w-full border-color-200 hover:bg-color-50 text-color-950"
      >
        <Image
          src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
          alt="Google"
          width={20}
          height={20}
          preview={false}
          className="mr-2"
        />
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full border-color-200 hover:bg-color-50 text-color-950"
      >
        <Image
          src="https://img.icons8.com/?size=100&id=118467&format=png&color=0866ff"
          alt="Apple"
          width={20}
          height={20}
          preview={false}
          className="mr-2"
        />
        Facebook
      </Button>
    </div>
  );
};
