"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/lib/products";
import type { Dispatch, SetStateAction } from "react";

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
            <Button variant="link" onClick={onClear} className="p-0 h-auto text-muted-foreground hover:text-primary">
                Clear all
            </Button>
        </div>
      <Accordion type="multiple" defaultValue={["category", "size", "color", "price"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleCategoryChange("all")}
                  className={`text-sm ${filters.category === "all" ? 'font-bold text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  All
                </button>
              </div>
              {categories.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleCategoryChange(category.name)}
                    className={`text-sm ${filters.category === category.name ? 'font-bold text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger className="font-semibold">Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={() => handleSizeChange(size)}
                  />
                  <Label htmlFor={`size-${size}`} className="font-normal">{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger className="font-semibold">Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => handleColorChange(color)}
                  />
                  <Label htmlFor={`color-${color}`} className="font-normal">{color}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold">Price</AccordionTrigger>
          <AccordionContent>
            <div className="p-2">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
