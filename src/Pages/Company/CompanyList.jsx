import React from "react";
import { useEffect, useState, useMemo } from "react";
import { List, Layout } from "antd";
import { Input } from "@/components/ui/input";
import { Building2, Search } from "lucide-react";
import FilterButton from "@/components/button/FilterButton";
import CompanyCard from "../../components/card/CompanyCard";
import useCompanyStore from "@/stores/company-store";
import CompanyCardSkeleton from "@/components/skeleton/CompanyCardSkeleton";
import { Button } from "@/components/ui/button";

const CompanyList = () => {
  const [searchText, setSearchText] = useState("");
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
  const [isLoading, setIsLoading] = useState(false);

  const companies = useCompanyStore((state) => state.companies);
  const fetchCompanies = useCompanyStore((state) => state.fetchCompanies);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchCompanies();
      setIsLoading(false);
    };
    if (!companies.length) {
      fetchData();
    }
  }, [companies, fetchCompanies]);

  const handleSearch = (searchInput) => {
    setSearchText(searchInput.toLowerCase());
  };

  const handleFilterChange = (filterName, updatedFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: updatedFilter,
    }));
  };

  const companyDataFiltered = useMemo(() => {
    return companies.filter((item) => {
      const nameMatch = item?.name.toLowerCase().includes(searchText);
      const filterMatch = Object.entries(filters.tags).some(([key, value]) => {
        if (value) {
          return key === item.tags;
        }
      });
      return nameMatch && true;
    });
  }, [companies, searchText]);

  const skeletonData = Array(8).fill({});

  return (
    <Layout className="h-full w-full bg-color-50">
      <div className="flex flex-col gap-2 items-center px-4 my-5 justify-center">
        <h1 className="text-color-950 font-semibold text-4xl flex flex-row justify-center items-center gap-4 leading-none">
          Find Your Company <Building2 className="w-9 h-9" />
        </h1>
        <p className="text-color-800 text-lg">
          Browse companies to connect with professional architects.
        </p>
        <div className="relative w-full lg:w-1/2 gap-2 flex flex-row">
          <Input
            type="text"
            placeholder="Search company..."
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
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={isLoading ? skeletonData : companyDataFiltered ?? []}
        renderItem={(item, index) => (
          <List.Item className="w-full">
            {isLoading ? (
              <CompanyCardSkeleton key={index} />
            ) : (
              <CompanyCard item={item} searchText={searchText} />
            )}
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default CompanyList;
