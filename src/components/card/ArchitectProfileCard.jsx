import {
  Mail,
  Phone,
  Briefcase,
  Calendar,
  UserCog,
  DollarSign,
  GraduationCap,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/time";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Tag } from "antd";

const ArchitectProfileCard = ({ openInputDialog }) => {
  const { userProfile } = useContext(AuthContext);
  return (
    <Card className="w-full shadow-lg text-color-950">
      <CardHeader className="pb-10">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              //   src={`https://api.dicebear.com/6.x/initials/svg?seed=${userProfile.name}`}
              src={""}
              alt={userProfile.name}
            />
            <AvatarFallback className="bg-color-500 text-3xl text-white">
              {userProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">
              {userProfile.name}
            </CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mt-1">
                <UserCog className="w-3 h-3 mr-1" />
                {userProfile.role.charAt(0).toUpperCase() +
                  userProfile.role.slice(1)}
              </Badge>
              <Tag
                color={userProfile.status === "available" ? "#87d068" : "#f50"}
                className="ml-2 mt-1"
              >
                {userProfile.status.charAt(0).toUpperCase() +
                  userProfile.status.slice(1)}
              </Tag>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileItem
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={userProfile.email}
          />
          <ProfileItem
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={userProfile.phone}
          />
          <ProfileItem
            icon={<Briefcase className="w-4 h-4" />}
            label="Experience"
            value={`${userProfile.experience_years} years`}
          />
          <ProfileItem
            icon={<DollarSign className="w-4 h-4" />}
            label="Price"
            value={`Rp ${userProfile.price.toLocaleString()}`}
          />
        </div>
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p className="text-sm">{userProfile.bio}</p>
        </div>
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">Education</h3>
          {userProfile.education_list.map((edu, index) => (
            <div key={index} className="mb-2">
              <ProfileItem
                icon={<GraduationCap className="w-4 h-4" />}
                label={edu.degree}
                value={`${edu.institution}, ${edu.graduation_year}`}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <ProfileItem
            icon={<Briefcase className="w-4 h-4" />}
            label="Company"
            value={userProfile.company_name}
          />
          <ProfileItem
            icon={<Globe className="w-4 h-4" />}
            label="Website"
            value={userProfile.company_website}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <ProfileItem
            icon={<Calendar className="w-4 h-4" />}
            label="Member Since"
            value={formatDate(userProfile.created_at, 3)}
          />
          <ProfileItem
            icon={<Calendar className="w-4 h-4" />}
            label="Last Updated"
            value={formatDate(userProfile.updated_at, 3)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          className="bg-color-500 hover:bg-color-600"
          onClick={openInputDialog}
        >
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArchitectProfileCard;

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-shrink-0 w-8 h-8 bg-color-100 rounded-full flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm text-color-900">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
