import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { List, Layout, Tag } from "antd";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  LayoutGrid,
  LayoutList,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import FilterButton from "@/components/button/FilterButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArchitectCardSkeleton from "@/components/skeleton/ArchitectCardSkeleton";
import ArchitectCard from "../../components/card/ArchitectCard";
import { capitalizeFirstLetter } from "@/utils/ui";
import useCompanyStore from "@/stores/company-store";
import useArchitectStore from "@/stores/architect-store";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns = [
  {
    title: " Architect Name",
    dataIndex: "name",
    key: "name",
    width: "30%",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "35%",
    ellipsis: true,
  },
  {
    title: "Experience",
    dataIndex: "experience_years",
    key: "experience_years",
    width: "15%",
    align: "center",
    render: (_, { experience_years }) => {
      let suffix = experience_years > 1 ? "Years" : "Year";
      return `${experience_years} ${suffix}`;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
    align: "center",
    render: (_, { status }) => {
      let color = status === "available" ? "#87d068" : "#f50";
      return (
        <Tag color={color} key={status}>
          {capitalizeFirstLetter(status)}
        </Tag>
      );
    },
  },
];

const CompanyDetails = () => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    status: { available: true, unavailable: true },
    tags: {
      Building: true,
      Landscape: true,
      Interior: true,
      Environment: true,
      Urban: true,
      Commercial: true,
      Residential: true,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  const { companySlug } = useParams();
  const navigate = useNavigate();

  const architects = useArchitectStore((state) => state.architects);
  const setSelectedArchitect = useArchitectStore(
    (state) => state.setSelectedArchitect
  );
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);
  const fetchCompanyBySlug = useCompanyStore(
    (state) => state.fetchCompanyBySlug
  );
  const fetchArchitects = useArchitectStore((state) => state.fetchArchitects);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCompany) {
        await fetchCompanyBySlug(companySlug);
      }
      await fetchArchitects();
      setIsLoading(false);
    };
    fetchData();
  }, [companySlug]);

  const handleSearch = (searchInput) => {
    setSearchText(searchInput.toLowerCase());
  };

  const handleFilterChange = (filterName, updatedFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: updatedFilter,
    }));
  };

  const dataSourceFiltered = useMemo(() => {
    return architects.filter((item) => {
      const companyMatch = item?.company_id === selectedCompany.id;
      const nameMatch = item?.name.toLowerCase().includes(searchText);
      const filterMatch = Object.entries(filters.status).some(
        ([key, value]) => {
          if (value) {
            return key === item.status;
          }
        }
      );
      return companyMatch && nameMatch && filterMatch;
    });
  }, [architects, filters.status, searchText]);

  const skeletonData = Array(8).fill({});

  return (
    <Layout className="flex flex-row px-4 h-full w-full gap-4 bg-color-50">
      <Tabs defaultValue="grid" className="w-full">
        <div className="w-full h-full transition-all duration-300 ease-in-out">
          {isLoading ? (
            <Skeleton className="h-20 w-20" />
          ) : (
            <div className="flex items-center bg-white p-5 rounded-lg rounded-l-full shadow-sm">
              <Avatar className="h-40 w-40 rounded-full overflow-hidden mr-4">
                <AvatarImage
                  src={
                    selectedCompany?.image ||
                    "https://img.freepik.com/free-photo/low-angle-shot-modern-glass-skyscrapers-against-cloudy-sky_181624-51675.jpg?uid=R175130914&ga=GA1.1.1029277144.1707224485&semt=ais_hybrid"
                  }
                  alt={selectedCompany?.name || "Company"}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-full"></AvatarFallback>
              </Avatar>
              <Card className="flex-grow p-4 bg-color-50 border-l-8 border-l-color-500 border-y-0 border-r-0">
                <h2 className="text-2xl font-bold text-color-950">
                  {selectedCompany.name}
                </h2>
                <p className="text-color-900 font-sm mb-2 line-clamp-3">
                  {selectedCompany.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-4">
                  <div className="flex items-center font-medium text-color-900">
                    <MapPin className="w-4 h-4 mr-2 text-color-500 shrink-0" />
                    <span className="line-clamp-1">
                      {selectedCompany.address}
                    </span>
                  </div>
                  <div className="flex items-center font-medium text-color-900">
                    <Phone className="w-4 h-4 mr-2 text-color-500 shrink-0" />
                    <span className="line-clamp-1">
                      {selectedCompany.phone}
                    </span>
                  </div>
                  <div className="flex items-center font-medium text-color-900">
                    <Mail className="w-4 h-4 mr-2 text-color-500 shrink-0" />
                    <span className="line-clamp-1">
                      {selectedCompany.email}
                    </span>
                  </div>
                  <div className="flex items-center font-medium text-color-900">
                    <Globe className="w-4 h-4 mr-2 text-color-500 shrink-0" />
                    <a
                      href={selectedCompany.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline line-clamp-1"
                    >
                      {selectedCompany.website}
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="flex flex-1 gap-2 justify-between items-center w-full py-2 mt-2">
            <div className="flex gap-2 items-center flex-grow">
              <div className="relative w-full max-w-sm">
                <Input
                  type="text"
                  placeholder="Search architect..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 border bg-white border-color-alternative-gray rounded-md text-color-alternative-gray"
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 select-none opacity-50 text-color-alternative-black" />
              </div>
              <FilterButton
                iconSize={0.8}
                buttonStyles="p-3"
                textStyles="text-xs"
                filterName="status"
                filter={filters.status}
                onFilterChange={handleFilterChange}
              />
              <FilterButton
                iconSize={0.8}
                buttonStyles="p-3"
                textStyles="text-xs"
                filterName="tags"
                filter={filters.tags}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Tabs Section */}
            <div className="">
              <TabsList className="bg-white text-color-900 p-1">
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-color-500 data-[state=active]:text-color-50"
                >
                  <LayoutList />
                </TabsTrigger>
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-color-500 data-[state=active]:text-color-50"
                >
                  <LayoutGrid />
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* List Data */}
          <TabsContent value="grid">
            <List
              className="my-2 w-full"
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 6,
              }}
              dataSource={isLoading ? skeletonData : dataSourceFiltered ?? []}
              renderItem={(item, index) => (
                <List.Item className="w-full">
                  {isLoading ? (
                    <ArchitectCardSkeleton key={index} />
                  ) : (
                    <ArchitectCard item={item} searchText={searchText} />
                  )}
                </List.Item>
              )}
            />
          </TabsContent>
          <TabsContent value="list">
            <Table className="rounded-md overflow-hidden border border-color-200">
              <TableHeader className="bg-color-500">
                <TableRow className="border border-color-500 hover:bg-transparent rounded-md">
                  <TableHead className="text-white px-4">Name</TableHead>
                  <TableHead className="text-white px-4">Email</TableHead>
                  <TableHead className="text-white px-4">Experience</TableHead>
                  <TableHead className="text-white px-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-color-900 bg-white">
                {dataSourceFiltered.map((architect) => {
                  return (
                    <TableRow
                      key={architect.id}
                      onClick={async () => {
                        await setSelectedArchitect(architect);
                        navigate(
                          `${encodeURIComponent(
                            architect.name
                              .replace(/[^a-zA-Z0-9 ]/g, "")
                              .replace(/\s+/g, "-")
                              .toLowerCase()
                          )}`
                        );
                      }}
                      className="cursor-pointer hover:bg-color-50 hover:text-color-950"
                    >
                      <TableCell className="font-medium p-4">
                        {architect.name}
                      </TableCell>
                      <TableCell className="p-4">{architect.email}</TableCell>
                      <TableCell className="p-4">
                        {architect.experience_years}{" "}
                        {architect.experience_years > 1 ? "Years" : "Year"}
                      </TableCell>
                      <TableCell className="p-4">
                        <Tag
                          color={
                            architect.status === "available" ? "green" : "red"
                          }
                        >
                          {capitalizeFirstLetter(architect.status)}
                        </Tag>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>
        </div>
      </Tabs>
    </Layout>
  );
};

export default CompanyDetails;
