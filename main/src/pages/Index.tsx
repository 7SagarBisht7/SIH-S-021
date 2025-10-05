import React, { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { OnboardingForm, UserProfile } from '@/components/OnboardingForm';
import { RecommendationDashboard } from '@/components/RecommendationDashboard';

type AppState = 'landing' | 'onboarding' | 'dashboard';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleGetStarted = () => {
    setCurrentState('onboarding');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentState('dashboard');
  };

  const handleBackToOnboarding = () => {
    setCurrentState('onboarding');
  };

  if (currentState === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentState === 'onboarding') {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  if (currentState === 'dashboard' && userProfile) {
    return (
      <RecommendationDashboard 
        userProfile={userProfile} 
        onBack={handleBackToOnboarding} 
      />
    );
  }

  return null;
};

export default Index;
