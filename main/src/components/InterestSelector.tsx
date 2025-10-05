import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Heart, 
  GraduationCap, 
  Building2, 
  Megaphone, 
  Shield, 
  HandHeart, 
  Leaf, 
  Wheat, 
  Factory, 
  MapPin, 
  Tv 
} from 'lucide-react';

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestToggle: (interest: string) => void;
  language: 'en' | 'hi';
}

const interestOptions = [
  { name: 'Technology', icon: Smartphone, hindi: 'प्रौद्योगिकी' },
  { name: 'Healthcare', icon: Heart, hindi: 'स्वास्थ्य सेवा' },
  { name: 'Education', icon: GraduationCap, hindi: 'शिक्षा' },
  { name: 'Finance', icon: Building2, hindi: 'वित्त' },
  { name: 'Marketing', icon: Megaphone, hindi: 'मार्केटिंग' },
  { name: 'Government', icon: Shield, hindi: 'सरकारी' },
  { name: 'Non-Profit', icon: HandHeart, hindi: 'गैर-लाभकारी' },
  { name: 'Environment', icon: Leaf, hindi: 'पर्यावरण' },
  { name: 'Agriculture', icon: Wheat, hindi: 'कृषि' },
  { name: 'Manufacturing', icon: Factory, hindi: 'विनिर्माण' },
  { name: 'Tourism', icon: MapPin, hindi: 'पर्यटन' },
  { name: 'Media', icon: Tv, hindi: 'मीडिया' }
];

export function InterestSelector({ selectedInterests, onInterestToggle, language }: InterestSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {interestOptions.map((interest) => {
        const isSelected = selectedInterests.includes(interest.name);
        const IconComponent = interest.icon;
        
        return (
          <Badge
            key={interest.name}
            variant={isSelected ? "default" : "outline"}
            className={`
              flex items-center space-x-2 p-3 cursor-pointer transition-all h-auto
              ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
            `}
            onClick={() => onInterestToggle(interest.name)}
          >
            <IconComponent className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? interest.name : interest.hindi}
            </span>
          </Badge>
        );
      })}
    </div>
  );
}