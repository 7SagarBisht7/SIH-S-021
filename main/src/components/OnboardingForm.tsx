import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { SkillSelector } from './SkillSelector';
import { InterestSelector } from './InterestSelector';

interface OnboardingFormProps {
  onComplete: (data: UserProfile) => void;
}

export interface UserProfile {
  name: string;
  education: string;
  fieldOfStudy: string;
  skills: string[];
  interests: string[];
  location: string;
  preferredSectors: string[];
  experience: string;
}

const sectorOptions = [
  { en: 'Information Technology', hi: 'सूचना प्रौद्योगिकी' },
  { en: 'Healthcare & Medicine', hi: 'स्वास्थ्य सेवा एवं चिकित्सा' },
  { en: 'Education & Training', hi: 'शिक्षा एवं प्रशिक्षण' },
  { en: 'Banking & Finance', hi: 'बैंकिंग एवं वित्त' },
  { en: 'Government & Public Service', hi: 'सरकारी एवं लोक सेवा' },
  { en: 'Manufacturing', hi: 'विनिर्माण' },
  { en: 'Agriculture & Rural Development', hi: 'कृषि एवं ग्रामीण विकास' },
  { en: 'Tourism & Hospitality', hi: 'पर्यटन एवं आतिथ्य' },
  { en: 'Media & Communications', hi: 'मीडिया एवं संचार' },
  { en: 'Environmental Services', hi: 'पर्यावरण सेवाएं' },
  { en: 'Social Work & NGO', hi: 'समाज सेवा एवं एनजीओ' },
  { en: 'Retail & E-commerce', hi: 'खुदरा एवं ई-कॉमर्स' }
];

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    skills: [],
    interests: [],
    preferredSectors: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData as UserProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'skills' | 'interests' | 'preferredSectors', item: string) => {
    const currentArray = formData[field] || [];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, newArray);
  };

  const getText = (en: string, hi: string) => language === 'en' ? en : hi;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-between items-center w-full">
            <div></div>
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            InternMatch
          </CardTitle>
          <CardDescription className="text-base">
            {getText('Find the perfect internship for you', 'हम आपके लिए सबसे उपयुक्त इंटर्नशिप खोजने में मदद करेंगे')}
          </CardDescription>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {getText(`Step ${currentStep} of ${totalSteps}`, `चरण ${currentStep} / ${totalSteps}`)}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {getText('Basic Information', 'बुनियादी जानकारी')}
                </h3>
                <p className="text-muted-foreground">
                  {getText('Share your basic details', 'अपनी बुनियादी जानकारी साझा करें')}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">
                  {getText('Full Name', 'पूरा नाम')}
                </Label>
                <Input
                  id="name"
                  placeholder={getText('Enter your full name', 'अपना पूरा नाम दर्ज करें')}
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">
                  {getText('Education Level', 'शिक्षा स्तर')}
                </Label>
                <Select value={formData.education} onValueChange={(value) => updateFormData('education', value)}>
                  <SelectTrigger className="text-lg h-12">
                    <SelectValue placeholder={getText('Select your education level', 'अपना शिक्षा स्तर चुनें')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">{getText('10th Grade', 'दसवीं कक्षा')}</SelectItem>
                    <SelectItem value="12th">{getText('12th Grade', 'बारहवीं कक्षा')}</SelectItem>
                    <SelectItem value="diploma">{getText('Diploma', 'डिप्लोमा')}</SelectItem>
                    <SelectItem value="undergraduate">{getText("Bachelor's Degree", 'स्नातक')}</SelectItem>
                    <SelectItem value="postgraduate">{getText("Master's Degree", 'परास्नातक')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">
                  {getText('Field of Study', 'अध्ययन क्षेत्र')}
                </Label>
                <Input
                  id="field"
                  placeholder={getText('e.g., Computer Science, Commerce, Arts', 'जैसे: कंप्यूटर साइंस, कॉमर्स, आर्ट्स')}
                  value={formData.fieldOfStudy || ''}
                  onChange={(e) => updateFormData('fieldOfStudy', e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {getText('Your Skills', 'आपके कौशल')}
                </h3>
                <p className="text-muted-foreground">
                  {getText('Select your skills (multiple)', 'अपने कौशल चुनें (एकाधिक)')}
                </p>
              </div>
              
              <SkillSelector
                selectedSkills={formData.skills || []}
                onSkillToggle={(skill) => toggleArrayItem('skills', skill)}
                language={language}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {getText('Interests & Preferences', 'रुचियां और प्राथमिकताएं')}
                </h3>
                <p className="text-muted-foreground">
                  {getText('Tell us what interests you', 'बताएं कि आपकी रुचि किसमें है')}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    {getText('Areas of Interest', 'रुचि के क्षेत्र')}
                  </Label>
                  <InterestSelector
                    selectedInterests={formData.interests || []}
                    onInterestToggle={(interest) => toggleArrayItem('interests', interest)}
                    language={language}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    {getText('Preferred Location', 'पसंदीदा स्थान')}
                  </Label>
                  <Input
                    id="location"
                    placeholder={getText('Enter city or state', 'शहर या राज्य दर्ज करें')}
                    value={formData.location || ''}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {getText('Final Preferences', 'अंतिम प्राथमिकताएं')}
                </h3>
                <p className="text-muted-foreground">
                  {getText('Choose your preferred sectors', 'अपने पसंदीदा क्षेत्र चुनें')}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    {getText('Preferred Sectors', 'पसंदीदा क्षेत्र')}
                  </Label>
                  <div className="grid grid-cols-1 gap-3">
                    {sectorOptions.map((sector) => {
                      const sectorName = sector.en;
                      const isSelected = formData.preferredSectors?.includes(sectorName);
                      return (
                        <div 
                          key={sectorName} 
                          className={`
                            flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                            ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted border-border'}
                          `}
                          onClick={() => toggleArrayItem('preferredSectors', sectorName)}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'bg-primary-foreground border-primary-foreground' : 'border-muted-foreground'}`} />
                          <span className="text-sm font-medium">
                            {language === 'en' ? sector.en : sector.hi}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    {getText('Previous Experience', 'पूर्व अनुभव')}
                  </Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
                    <SelectTrigger className="text-lg h-12">
                      <SelectValue placeholder={getText('Select your experience level', 'अपना अनुभव स्तर चुनें')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{getText('No Experience', 'कोई अनुभव नहीं')}</SelectItem>
                      <SelectItem value="some">{getText('Some Projects', 'कुछ परियोजनाएं')}</SelectItem>
                      <SelectItem value="internship">{getText('Previous Internship', 'पूर्व इंटर्नशिप')}</SelectItem>
                      <SelectItem value="work">{getText('Work Experience', 'कार्य अनुभव')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 h-12 px-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{getText('Previous', 'पिछला')}</span>
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90 h-12 px-6 flex-1"
            >
              <span>
                {currentStep === totalSteps 
                  ? getText('Get Recommendations', 'सुझाव प्राप्त करें') 
                  : getText('Next', 'अगला')
                }
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}