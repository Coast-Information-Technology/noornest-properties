'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { propertyCardHover } from '@/lib/animations';
import AnimatedImage from '@/components/ui/AnimatedImage';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  bmvScore: number;
  isFavorite?: boolean;
}

interface AnimatedPropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function AnimatedPropertyCard({
  property,
  onFavorite,
  onViewDetails,
}: AnimatedPropertyCardProps) {
  const {
    id,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    image,
    bmvScore,
    isFavorite = false,
  } = property;

  return (
    <motion.div
      variants={propertyCardHover}
      initial="rest"
      whileHover="hover"
      className="group"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          <AnimatedImage
            src={image}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          
          {/* BMV Score Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant={bmvScore >= 80 ? "default" : bmvScore >= 60 ? "secondary" : "destructive"}
              className="bg-background/90 backdrop-blur-sm"
            >
              BMV: {bmvScore}/100
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm hover:bg-background"
            onClick={() => onFavorite?.(id)}
          >
            <Heart 
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`} 
            />
          </Button>
        </div>

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">£{price.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {bedrooms}
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {bathrooms}
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                {area} sq ft
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => onViewDetails?.(id)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
