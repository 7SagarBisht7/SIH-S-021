import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Building2, 
  Clock, 
  Star, 
  Users, 
  Sparkles, 
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Award,
  Calendar
} from 'lucide-react';
import { UserProfile } from './OnboardingForm';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  sector: string;
  skills: string[];
  description: string;
  matchScore: number;
  applicationDeadline: string;
  startDate: string;
  mode: 'Remote' | 'On-site' | 'Hybrid';
}

interface RecommendationDashboardProps {
  userProfile: UserProfile;
  onBack: () => void;
}

export function RecommendationDashboard({ userProfile, onBack }: RecommendationDashboardProps) {
  const [recommendations, setRecommendations] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  // Simulated AI recommendation engine
  const generateRecommendations = (profile: UserProfile): Internship[] => {
    const sampleInternships: Internship[] = [
      {
        id: '1',
        title: 'Digital Marketing Intern',
        company: 'Tech Solutions Pvt Ltd',
        location: 'Mumbai, Maharashtra',
        duration: '3 months',
        stipend: '₹15,000/month',
        sector: 'Information Technology',
        skills: ['Digital Marketing', 'Communication', 'Content Writing'],
        description: 'Work on social media campaigns, content creation, and digital marketing strategies for tech products.',
        matchScore: 95,
        applicationDeadline: '2024-10-15',
        startDate: '2024-11-01',
        mode: 'Hybrid'
      },
      {
        id: '2',
        title: 'Data Analysis Intern',
        company: 'Government Analytics Division',
        location: 'Delhi, NCR',
        duration: '6 months',
        stipend: '₹12,000/month',
        sector: 'Government & Public Service',
        skills: ['Data Analysis', 'Research', 'Problem Solving'],
        description: 'Analyze government data to support policy decisions and public service improvements.',
        matchScore: 88,
        applicationDeadline: '2024-10-20',
        startDate: '2024-11-15',
        mode: 'On-site'
      },
      {
        id: '3',
        title: 'Customer Service Excellence Intern',
        company: 'Rural Banking Initiative',
        location: 'Jaipur, Rajasthan',
        duration: '4 months',
        stipend: '₹10,000/month',
        sector: 'Banking & Finance',
        skills: ['Customer Service', 'Communication', 'Problem Solving'],
        description: 'Support rural banking initiatives and help customers with digital banking services.',
        matchScore: 82,
        applicationDeadline: '2024-10-25',
        startDate: '2024-12-01',
        mode: 'On-site'
      },
      {
        id: '4',
        title: 'Educational Content Development',
        company: 'National Education Mission',
        location: 'Bangalore, Karnataka',
        duration: '5 months',
        stipend: '₹14,000/month',
        sector: 'Education & Training',
        skills: ['Content Writing', 'Research', 'Digital Literacy'],
        description: 'Create educational content for digital learning platforms targeting rural students.',
        matchScore: 78,
        applicationDeadline: '2024-11-01',
        startDate: '2024-12-15',
        mode: 'Remote'
      },
      {
        id: '5',
        title: 'Healthcare Data Management',
        company: 'Public Health Department',
        location: 'Chennai, Tamil Nadu',
        duration: '6 months',
        stipend: '₹13,000/month',
        sector: 'Healthcare & Medicine',
        skills: ['Data Analysis', 'Research', 'Digital Literacy'],
        description: 'Manage and analyze healthcare data to improve public health programs.',
        matchScore: 75,
        applicationDeadline: '2024-10-30',
        startDate: '2024-11-20',
        mode: 'Hybrid'
      }
    ];

    // Simple matching algorithm based on profile
    return sampleInternships
      .filter(internship => {
        // Filter by preferred sectors
        if (profile.preferredSectors && profile.preferredSectors.length > 0) {
          return profile.preferredSectors.includes(internship.sector);
        }
        return true;
      })
      .map(internship => {
        // Calculate match score based on skills overlap
        const skillMatch = internship.skills.filter(skill => 
          profile.skills?.includes(skill)
        ).length;
        const adjustedScore = Math.min(95, internship.matchScore + (skillMatch * 5));
        
        return { ...internship, matchScore: adjustedScore };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Top 5 recommendations max
  };

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      const recs = generateRecommendations(userProfile);
      setRecommendations(recs);
      setLoading(false);
    }, 2000);
  }, [userProfile]);

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'bg-success text-success-foreground';
    if (score >= 70) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const refreshRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      const recs = generateRecommendations(userProfile);
      setRecommendations(recs);
      setLoading(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light p-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-card text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Finding Perfect Matches</h3>
            <p className="text-muted-foreground mb-4">
              आपके लिए सबसे उपयुक्त इंटर्नशिप खोजी जा रही है...
            </p>
            <Progress value={75} className="w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Welcome, {userProfile.name}!</h1>
                <p className="text-muted-foreground">
                  Based on your profile, here are your top internship matches
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={refreshRecommendations}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* User Summary */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Your Profile Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Education</p>
                <p className="font-medium">{userProfile.education} - {userProfile.fieldOfStudy}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{userProfile.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {userProfile.skills?.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Top {recommendations.length} Recommendations for You
          </h2>
          <p className="text-muted-foreground">
            आपके लिए चुनी गई सर्वोत्तम इंटर्नशिप
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((internship, index) => (
            <Card 
              key={internship.id} 
              className="shadow-card hover:shadow-hover transition-shadow cursor-pointer"
              onClick={() => setSelectedInternship(internship)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getMatchColor(internship.matchScore)}>
                      {internship.matchScore}% Match
                    </Badge>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-lg">{internship.title}</CardTitle>
                <CardDescription className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Building2 className="w-4 h-4" />
                    <span>{internship.company}</span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-accent" />
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{internship.mode}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant={userProfile.skills?.includes(skill) ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {internship.description}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-muted-foreground">
                      Deadline: {new Date(internship.applicationDeadline).toLocaleDateString()}
                    </div>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recommendations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No matches found</h3>
              <p className="text-muted-foreground mb-4">
                Try updating your preferences or skills to get better matches.
              </p>
              <Button onClick={onBack} variant="outline">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}