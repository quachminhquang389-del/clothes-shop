"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/lib/products";
import type { Dispatch, SetStateAction } from "react";
import { ChevronDown } from "lucide-react";

interface ProductFiltersProps {
  sizes: string[];
  colors: string[];
  filters: {
    category: string;
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
  };
  setFilters: Dispatch<
    SetStateAction<{
      category: string;
      sizes: string[];
      colors: string[];
      priceRange: [number, number];
    }>
  >;
  onClear: () => void;
}

export function ProductFilters({
  sizes,
  colors,
  filters,
  setFilters,
  onClear,
}: ProductFiltersProps) {
  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleSizeChange = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorChange = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  return (
    <div className="sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-headline">Filters</h2>
        <Button
          variant="link"
          onClick={onClear}
          className="p-0 h-auto text-muted-foreground hover:text-primary"
        >
          Clear all
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground">
            Category
          </label>
          <Select
            value={filters.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 justify-between">
                Size{" "}
                {filters.sizes.length > 0 && `(${filters.sizes.length})`}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Sizes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sizes.map((size) => (
                <DropdownMenuCheckboxItem
                  key={size}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={() => handleSizeChange(size)}
                   onSelect={(e) => e.preventDefault()}
                >
                  {size}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 justify-between">
                Color{" "}
                {filters.colors.length > 0 && `(${filters.colors.length})`}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Colors</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {colors.map((color) => (
                <DropdownMenuCheckboxItem
                  key={color}
                  checked={filters.colors.includes(color)}
                  onCheckedChange={() => handleColorChange(color)}
                   onSelect={(e) => e.preventDefault()}
                >
                  {color}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">
            Price Range
          </label>
          <div className="p-2 pt-4">
            <Slider
              min={0}
              max={500}
              step={10}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
