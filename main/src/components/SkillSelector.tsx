import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  Lightbulb, 
  Crown, 
  Monitor, 
  BarChart3, 
  Headphones, 
  Megaphone, 
  PenTool, 
  Code, 
  Palette, 
  Search, 
  Calculator, 
  Briefcase 
} from 'lucide-react';

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  language: 'en' | 'hi';
}

const skillOptions = [
  { name: 'Communication', icon: MessageCircle, hindi: 'संवाद कौशल' },
  { name: 'Teamwork', icon: Users, hindi: 'टीम वर्क' },
  { name: 'Problem Solving', icon: Lightbulb, hindi: 'समस्या समाधान' },
  { name: 'Leadership', icon: Crown, hindi: 'नेतृत्व' },
  { name: 'Digital Literacy', icon: Monitor, hindi: 'डिजिटल साक्षरता' },
  { name: 'Data Analysis', icon: BarChart3, hindi: 'डेटा विश्लेषण' },
  { name: 'Customer Service', icon: Headphones, hindi: 'ग्राहक सेवा' },
  { name: 'Marketing', icon: Megaphone, hindi: 'मार्केटिंग' },
  { name: 'Content Writing', icon: PenTool, hindi: 'लेखन कौशल' },
  { name: 'Programming', icon: Code, hindi: 'प्रोग्रामिंग' },
  { name: 'Design', icon: Palette, hindi: 'डिज़ाइन' },
  { name: 'Research', icon: Search, hindi: 'अनुसंधान' },
  { name: 'Financial Analysis', icon: Calculator, hindi: 'वित्तीय विश्लेषण' },
  { name: 'Project Management', icon: Briefcase, hindi: 'परियोजना प्रबंधन' }
];

export function SkillSelector({ selectedSkills, onSkillToggle, language }: SkillSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {skillOptions.map((skill) => {
        const isSelected = selectedSkills.includes(skill.name);
        const IconComponent = skill.icon;
        
        return (
          <Badge
            key={skill.name}
            variant={isSelected ? "default" : "outline"}
            className={`
              flex items-center space-x-2 p-3 cursor-pointer transition-all h-auto
              ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
            `}
            onClick={() => onSkillToggle(skill.name)}
          >
            <IconComponent className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? skill.name : skill.hindi}
            </span>
          </Badge>
        );
      })}
    </div>
  );
}