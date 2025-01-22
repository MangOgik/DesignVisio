import React from "react";
import { useEffect, useState, useMemo } from "react";
import { List, Layout } from "antd";
import { Input } from "@/components/ui/input";
import { Search, UserRoundSearchIcon } from "lucide-react";
import FilterButton from "@/components/button/FilterButton";
import ArchitectCardSkeleton from "@/components/skeleton/ArchitectCardSkeleton";
import useArchitectStore from "@/stores/architect-store";
import ArchitectCard from "@/components/card/ArchitectCard";
import { Button } from "@/components/ui/button";

const ArchitectList = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
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

  const architects = useArchitectStore((state) => state.architects);
  const fetchArchitects = useArchitectStore((state) => state.fetchArchitects);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchArchitects();
      setIsLoading(false);
    };
    if (!architects.length) {
      fetchData();
    }
  }, [architects, fetchArchitects]);

  const handleSearch = (searchInput) => {
    setSearchText(searchInput.toLowerCase());
  };

  const handleFilterChange = (filterName, updatedFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: updatedFilter,
    }));
  };

  const architectsFiltered = useMemo(() => {
    return architects.filter((item) => {
      const nameMatch = item?.name.toLowerCase().includes(searchText);
      const filterMatch = Object.entries(filters.tags).some(([key, value]) => {
        if (value) {
          return key === item.tags;
        }
      });
      return nameMatch && true;
    });
  }, [architects, searchText]);

  const skeletonData = Array(8).fill({});

  return (
    <Layout className="h-full w-full bg-color-50">
      <div className="flex flex-col gap-2 items-center px-4 my-5 justify-center">
        <h1 className="text-color-950 font-semibold text-4xl flex flex-row justify-center items-center gap-4 leading-none">
          Find Your Architect <UserRoundSearchIcon className="w-9 h-9" />
        </h1>
        <p className="text-color-800 text-lg">
          Discover professional architects tailored to your project needs.
        </p>
        <div className="relative w-full lg:w-1/2 gap-2 flex flex-row">
          <Input
            type="text"
            placeholder="Search architect..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 py-2 border bg-white border-color-alternative-gray rounded-md text-color-alternative-gray placeholder:text-color-alternative-gray"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-5 -translate-y-1/2 select-none opacity-50 text-color-alternative-black" />
          <Button className="bg-color-500">
            <Search />
          </Button>
        </div>
      </div>
      <List
        className="my-2 mt-4 px-4"
        grid={{
          gutter: 18,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={isLoading ? skeletonData : architectsFiltered ?? []}
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
    </Layout>
  );
};

export default ArchitectList;
