'use client';

import { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Eye,
  Share2,
  Filter,
  Search,
  Grid,
  List,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockSavedProperties = [
  {
    id: 1,
    title: 'Modern 3BR Apartment in Downtown',
    price: 450000,
    pricePerSqft: 375,
    location: 'Downtown, City',
    address: '123 Main Street, Downtown',
    image: '/properties/property-1.jpg',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    yearBuilt: 2020,
    propertyType: 'Apartment',
    status: 'For Sale',
    savedDate: '2024-01-10',
    lastViewed: '2024-01-12',
    views: 45,
    bmvScore: 85,
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah@noornest.com'
    },
    features: ['Parking', 'Balcony', 'Gym', 'Pool'],
    description: 'Beautiful modern apartment with stunning city views. Recently renovated with high-end finishes.'
  },
  {
    id: 2,
    title: 'Luxury Villa with Pool',
    price: 850000,
    pricePerSqft: 340,
    location: 'Suburbs, City',
    address: '456 Oak Avenue, Suburbs',
    image: '/properties/property-2.jpg',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    yearBuilt: 2018,
    propertyType: 'House',
    status: 'For Sale',
    savedDate: '2024-01-08',
    lastViewed: '2024-01-11',
    views: 78,
    bmvScore: 72,
    agent: {
      name: 'Mike Chen',
      phone: '+1 (555) 987-6543',
      email: 'mike@noornest.com'
    },
    features: ['Pool', 'Garden', 'Garage', 'Fireplace'],
    description: 'Stunning luxury villa with private pool and beautifully landscaped garden.'
  },
  {
    id: 3,
    title: 'Cozy 2BR Condo',
    price: 320000,
    pricePerSqft: 356,
    location: 'Midtown, City',
    address: '789 Pine Street, Midtown',
    image: '/properties/property-3.jpg',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 900,
    yearBuilt: 2019,
    propertyType: 'Condo',
    status: 'For Sale',
    savedDate: '2024-01-05',
    lastViewed: '2024-01-09',
    views: 32,
    bmvScore: 68,
    agent: {
      name: 'Emily Davis',
      phone: '+1 (555) 456-7890',
      email: 'emily@noornest.com'
    },
    features: ['Parking', 'Balcony', 'Storage'],
    description: 'Charming condo in a quiet neighborhood, perfect for first-time buyers.'
  },
  {
    id: 4,
    title: 'Penthouse with City Views',
    price: 1200000,
    pricePerSqft: 600,
    location: 'Uptown, City',
    address: '321 Skyline Drive, Uptown',
    image: '/properties/property-4.jpg',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2000,
    yearBuilt: 2021,
    propertyType: 'Penthouse',
    status: 'For Sale',
    savedDate: '2024-01-03',
    lastViewed: '2024-01-07',
    views: 156,
    bmvScore: 91,
    agent: {
      name: 'David Wilson',
      phone: '+1 (555) 321-0987',
      email: 'david@noornest.com'
    },
    features: ['Parking', 'Balcony', 'Gym', 'Concierge', 'Rooftop'],
    description: 'Exclusive penthouse with panoramic city views and luxury amenities.'
  }
];

export default function SavedPropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('savedDate');
  const [filterType, setFilterType] = useState('all');

  const handleSelectProperty = (propertyId: number) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map(p => p.id));
    }
  };

  const handleRemoveSelected = () => {
    // TODO: Implement API call to remove selected properties
    console.log('Removing properties:', selectedProperties);
    setSelectedProperties([]);
  };

  const filteredProperties = mockSavedProperties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || property.propertyType.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'priceAsc':
          return a.price - b.price;
        case 'savedDate':
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
        case 'lastViewed':
          return new Date(b.lastViewed).getTime() - new Date(a.lastViewed).getTime();
        case 'bmvScore':
          return b.bmvScore - a.bmvScore;
        default:
          return 0;
      }
    });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Properties</h1>
          <p className="text-gray-600">
            {filteredProperties.length} saved properties
            {selectedProperties.length > 0 && ` • ${selectedProperties.length} selected`}
          </p>
        </div>
        
        {selectedProperties.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleRemoveSelected}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Selected
            </Button>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savedDate">Recently Saved</SelectItem>
                  <SelectItem value="lastViewed">Last Viewed</SelectItem>
                  <SelectItem value="price">Price: High to Low</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="bmvScore">BMV Score</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select All */}
      {filteredProperties.length > 0 && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedProperties.length === filteredProperties.length}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select all properties
          </label>
        </div>
      )}

      {/* Properties Grid/List */}
      {filteredProperties.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No properties match your search criteria.' : 'Start saving properties you like to see them here.'}
            </p>
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                {/* Property Image */}
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-blue-400" />
                  </div>
                </div>

                {/* BMV Score Badge */}
                <Badge 
                  className="absolute top-3 left-3"
                  variant={property.bmvScore >= 80 ? 'default' : property.bmvScore >= 60 ? 'secondary' : 'destructive'}
                >
                  BMV: {property.bmvScore}
                </Badge>

                {/* Select Checkbox */}
                <div className="absolute top-3 right-3">
                  <Checkbox
                    checked={selectedProperties.includes(property.id)}
                    onCheckedChange={() => handleSelectProperty(property.id)}
                  />
                </div>

                {/* Action Menu */}
                <div className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/properties/${property.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/bookings/new?property=${property.id}`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Viewing
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove from Saved
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Price and Title */}
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${property.pricePerSqft}/sqft
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                      {property.title}
                    </h3>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Agent Info */}
                  <div className="pt-2 border-t">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Agent:</span> {property.agent.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Saved on {formatDate(property.savedDate)} • Last viewed {formatDate(property.lastViewed)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/properties/${property.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/bookings/new?property=${property.id}`}>
                        <Calendar className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

