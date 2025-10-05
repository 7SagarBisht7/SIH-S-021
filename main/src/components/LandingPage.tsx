import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Target, 
  Users, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'AI-powered recommendations based on your skills and interests',
      hindi: 'आपके कौशल और रुचियों के आधार पर स्मार्ट सुझाव'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works perfectly on any device, anywhere in India',
      hindi: 'किसी भी डिवाइस पर आसानी से उपयोग करें'
    },
    {
      icon: Users,
      title: 'Rural Focus',
      description: 'Designed for first-generation learners and rural youth',
      hindi: 'ग्रामीण युवाओं के लिए विशेष रूप से डिज़ाइन किया गया'
    },
    {
      icon: Zap,
      title: 'Quick Results',
      description: 'Get top 3-5 personalized recommendations in minutes',
      hindi: 'मिनटों में शीर्ष 3-5 व्यक्तिगत सुझाव प्राप्त करें'
    }
  ];

  const benefits = [
    'Save time with personalized recommendations',
    'Discover internships matching your skills',
    'Simple, easy-to-use interface',
    'Works in multiple languages',
    'Completely free to use'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            InternMatch
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Find the perfect internship that matches your skills and dreams
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 font-medium">
            अपने कौशल और सपनों के अनुकूल सही इंटर्नशिप खोजें
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 flex items-center space-x-2"
            >
              <span>Get Started / शुरू करें</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-success" />
              <span>100% Free & Secure</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Internships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Students Helped</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-2">{feature.description}</p>
                <p className="text-sm text-accent font-medium">{feature.hindi}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-8">यह कैसे काम करता है</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Your Profile</h3>
              <p className="text-muted-foreground">Tell us about your education, skills, and interests</p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get AI Recommendations</h3>
              <p className="text-muted-foreground">Our AI finds the best matching internships for you</p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Apply & Succeed</h3>
              <p className="text-muted-foreground">Apply to your top matches and start your journey</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <Card className="max-w-2xl mx-auto shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Why Choose Our Platform?</CardTitle>
            <CardDescription>हमारा प्लेटफॉर्म क्यों चुनें?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-card">
            <CardContent className="p-8">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Ready to Find Your Perfect Internship?
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Join thousands of students who found their dream internships through our platform
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={onGetStarted}
                className="bg-card text-card-foreground hover:bg-card/90"
              >
                Start Your Journey / अपनी यात्रा शुरू करें
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}