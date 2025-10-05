import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'hi';
  onLanguageChange: (language: 'en' | 'hi') => void;
}

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex bg-muted rounded-lg p-1">
        <Button
          size="sm"
          variant={currentLanguage === 'en' ? 'default' : 'ghost'}
          onClick={() => onLanguageChange('en')}
          className="h-8 px-3 text-xs"
        >
          English
        </Button>
        <Button
          size="sm"
          variant={currentLanguage === 'hi' ? 'default' : 'ghost'}
          onClick={() => onLanguageChange('hi')}
          className="h-8 px-3 text-xs"
        >
          हिंदी
        </Button>
      </div>
    </div>
  );
}