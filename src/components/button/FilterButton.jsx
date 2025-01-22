import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeFirstLetter } from "@/utils/ui";

const FilterButton = ({
  filterName,
  filter,
  onFilterChange,
  buttonStyles,
  iconStyles,
  iconSize,
  textStyles,
}) => {
  const [localFilter, setLocalFilter] = useState({});

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter, filterName, onFilterChange]);

  const handleCheckboxChange = (filterKey, checked) => {
    const updatedFilter = { ...localFilter, [filterKey]: checked };
    setLocalFilter(updatedFilter);
    onFilterChange(filterName, updatedFilter);
  };

  const title = capitalizeFirstLetter(filterName);

  const dropdownMenuItems = Object.entries(localFilter).map(([key, value]) => (
    <DropdownMenuCheckboxItem
      key={key}
      checked={value}
      onCheckedChange={(checked) => handleCheckboxChange(key, checked)}
    >
      {capitalizeFirstLetter(key)}
    </DropdownMenuCheckboxItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`bg-color-500 hover:bg-color-600 ${buttonStyles}`}>
          <Filter
            style={
              iconSize
                ? { width: `${iconSize}rem`, height: `${iconSize}rem` }
                : {}
            }
            className={iconStyles}
          />
          <span className={textStyles}>{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 text-color-alternative-black">
        <DropdownMenuLabel className="text-center">
          Select {title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownMenuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;
