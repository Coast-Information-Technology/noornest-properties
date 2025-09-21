// components/ui/PropertySearchBoxExamples.tsx
// This file shows different ways to use the PropertySearchBox component

import PropertySearchBox from "./PropertySearchBox";

// Example 1: Basic search box
export function BasicSearchBox() {
  return (
    <PropertySearchBox
      onSearch={(searchData) => {
        console.log("Search submitted:", searchData);
        // Handle search logic here
      }}
    />
  );
}

// Example 2: Search box with initial tab set to rent
export function RentalSearchBox() {
  return (
    <PropertySearchBox
      initialTab="rent"
      onSearch={(searchData) => {
        console.log("Rental search:", searchData);
        // Handle rental search logic
      }}
      onTabChange={(tab) => {
        console.log("Tab changed to:", tab);
      }}
    />
  );
}

// Example 3: Search box with custom styling
export function CustomStyledSearchBox() {
  return (
    <PropertySearchBox
      className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-2xl"
      containerClassName="shadow-2xl"
      formClassName="bg-white/90 backdrop-blur-sm"
      onSearch={(searchData) => {
        console.log("Custom search:", searchData);
      }}
    />
  );
}

// Example 4: Search box for properties page
export function PropertiesPageSearchBox() {
  return (
    <PropertySearchBox
      className="py-8"
      containerClassName="shadow-lg border border-gray-200"
      onSearch={(searchData) => {
        // Redirect to properties page with search params
        const params = new URLSearchParams({
          tab: searchData.tab,
          keyword: searchData.keyword,
          location: searchData.location,
          bedrooms: searchData.bedrooms,
          budget: searchData.budget,
        });
        window.location.href = `/properties?${params.toString()}`;
      }}
    />
  );
}

// Example 5: Search box with advanced functionality
export function AdvancedSearchBox() {
  const handleSearch = (searchData: any) => {
    // Advanced search logic
    console.log("Advanced search:", searchData);

    // Example: Filter properties based on search criteria
    // const filteredProperties = properties.filter(property => {
    //   const matchesKeyword = property.title.toLowerCase().includes(searchData.keyword.toLowerCase()) ||
    //                         property.description.toLowerCase().includes(searchData.keyword.toLowerCase());
    //   const matchesLocation = searchData.location === "All Cities" || property.location.includes(searchData.location);
    //   const matchesBedrooms = searchData.bedrooms === "Any Bedrooms" ||
    //                          (searchData.bedrooms === "3+ Bedrooms" ? property.bedrooms >= 3 :
    //                           property.bedrooms === parseInt(searchData.bedrooms));
    //   return matchesKeyword && matchesLocation && matchesBedrooms;
    // });

    // Update state or trigger search results
  };

  const handleTabChange = (tab: "sale" | "rent") => {
    console.log("Tab changed to:", tab);
    // Update UI based on tab change
    // Example: Update property listings, change pricing display, etc.
  };

  return (
    <PropertySearchBox
      onSearch={handleSearch}
      onTabChange={handleTabChange}
      className="bg-white border-t border-gray-200"
      containerClassName="shadow-none border border-gray-300"
    />
  );
}

// Example 6: Minimal search box
export function MinimalSearchBox() {
  return (
    <PropertySearchBox
      className="py-4"
      containerClassName="shadow-sm"
      formClassName="gap-2"
      onSearch={(searchData) => {
        // Simple search logic
        console.log("Minimal search:", searchData);
      }}
    />
  );
}
