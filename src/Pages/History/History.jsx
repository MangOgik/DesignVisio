import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Search,
  Trash2,
  Star,
  X,
  Download,
  EllipsisVertical,
} from "lucide-react";
import { Layout, Tag } from "antd";
import { Input } from "@/components/ui/input";
import FilterButton from "@/components/button/FilterButton";
import { Checkbox } from "@/components/ui/checkbox";

const campaigns = [
  {
    id: 1,
    isOn: true,
    name: "Summer Collection Campaign",
    delivery: "Active",
    isHighPerforming: true,
    budget: "Using ad set budget",
    results: 81,
    resultType: "Messaging conver...",
    costPerResult: "Rp3,352",
    costType: "Per messaging c...",
  },
  {
    id: 2,
    isOn: true,
    name: "Instagram Profile Visits",
    delivery: "Active",
    isHighPerforming: false,
    budget: "Using ad set budget",
    results: 465,
    resultType: "Instagram profile vi...",
    costPerResult: "Rp215",
    costType: "Cost per Instagram...",
  },
  {
    id: 3,
    isOn: true,
    name: "Messenger Campaign Q4",
    delivery: "Active",
    isHighPerforming: true,
    budget: "Using ad set budget",
    results: 29,
    resultType: "Messaging conver...",
    costPerResult: "Rp2,927",
    costType: "Per messaging c...",
  },
  {
    id: 4,
    isOn: false,
    name: "Brand Awareness Campaign",
    delivery: "Off",
    isHighPerforming: false,
    budget: "Using ad set budget",
    results: "-",
    resultType: "Messaging convers...",
    costPerResult: "-",
    costType: "Per messaging con...",
  },
];

const History = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [filters, setFilters] = useState({
    status: { available: true, unavailable: true },
  });

  const handleSearch = (searchInput) => {
    setSearchText(searchInput.toLowerCase());
  };

  const handleFilterChange = (filterName, updatedFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: updatedFilter,
    }));
  };

  const toggleAll = (checked) => {
    if (checked) {
      setSelectedProjects(campaigns.map((campaign) => campaign.id));
    } else {
      setSelectedProjects([]);
    }
  };

  const toggleProjects = (campaignId) => {
    setSelectedProjects((prev) => {
      if (prev.includes(campaignId)) {
        return prev.filter((id) => id !== campaignId);
      } else {
        return [...prev, campaignId];
      }
    });
  };

  return (
    <Layout className="mx-4 mt-6">
      <div
        className={`flex gap-2 items-center ${
          selectedProjects.length > 0 ? "mb-2" : "mb-4"
        }`}
      >
        <div className="relative w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search project..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 py-2 border bg-white border-color-alternative-gray rounded-md text-color-alternative-gray placeholder:text-color-alternative-gray"
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
      </div>
      {selectedProjects.length > 0 ? (
        <div className="w-full bg-color-200 mb-2 p-1 rounded-full flex justify-start items-center gap-1 text-color-900">
          <Button
            variant="ghost"
            className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            onClick={() => toggleAll(false)}
          >
            <X />
          </Button>
          <div className="w-fit flex justify-center items-center gap-3">
            <span>{selectedProjects.length} selected</span>
            <Button
              variant="ghost"
              className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            >
              <Download />
            </Button>
            <Button
              variant="ghost"
              className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            >
              <Trash2 />
            </Button>
            <Button
              variant="ghost"
              className="rounded-full w-4 h-4 p-4 hover:bg-color-300 hover:text-white"
            >
              <EllipsisVertical />
            </Button>
          </div>
        </div>
      ) : null}

      <Table className="rounded-md overflow-hidden border border-color-200">
        <TableHeader className="bg-color-500">
          <TableRow className="border border-color-500 hover:bg-transparent rounded-md">
            <TableHead className="w-12">
              <Checkbox
              className="border border-color-50"
                checked={selectedProjects.length === campaigns.length}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead className="text-white">Project Name</TableHead>
            <TableHead className="text-white">Architect</TableHead>
            <TableHead className="text-white">Budget</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-color-900 bg-white">
          {campaigns.map((campaign) => (
            <TableRow
              key={campaign.id}
              className="cursor-pointer hover:bg-color-50 hover:text-color-950"
            >
              <TableCell>
                <Checkbox
                  checked={selectedProjects.includes(campaign.id)}
                  onCheckedChange={() => toggleProjects(campaign.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>Mang Ogik</TableCell>
              <TableCell>Rp. 200.000</TableCell>
              <TableCell>
                <Tag color="green">Completed</Tag>
              </TableCell>
              <TableCell>
                <div className="flex">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t bg-color-100">
        <div className="text-sm text-color-900">
          Results from {campaigns.length} projects
        </div>
      </div>
    </Layout>
  );
};

export default History;
