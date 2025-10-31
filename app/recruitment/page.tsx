'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AIFeatureSelector from '@/components/ai-feature-selector';
import InterviewSimulator from '@/components/recruitment/interview-simulator';
import SkillsDNAAnalyzer from '@/components/recruitment/skills-dna-analyzer';
import SuccessPredictor from '@/components/recruitment/success-predictor';
import CustomerAgentScreener from '@/components/recruitment/customer-agent-screener';
import { BarChart3, Video, TrendingUp, Brain, Target } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  location: string;
  status: 'screening' | 'interview' | 'onboarding' | 'ready';
  experience: number;
  skills: string[];
  matchScore: number;
  phone: string;
  email: string;
  availability: string;
}

export default function RecruitmentPage() {
  const [selectedLocation, setSelectedLocation] = useState<'singapore' | 'hongkong'>('singapore');
  const [selectedFeature, setSelectedFeature] = useState('traditional');

  const aiFeatures = [
    {
      id: 'traditional',
      title: 'Traditional View',
      description: 'Standard candidate pipeline and metrics',
      icon: BarChart3,
      iconColor: 'bg-slate-500'
    },
    {
      id: 'interview-simulator',
      title: 'AI Interview Coach',
      description: 'Virtual interview simulator with real-time feedback',
      icon: Video,
      iconColor: 'bg-blue-500',
      badge: 'AI'
    },
    {
      id: 'success-predictor',
      title: 'Success Predictor',
      description: 'AI predicts 3-year success trajectory and earnings',
      icon: TrendingUp,
      iconColor: 'bg-green-500',
      badge: 'AI'
    },
    {
      id: 'skills-analyzer',
      title: 'Skills DNA Analyzer',
      description: 'Compare candidate skills to top performers & best fit matching',
      icon: Brain,
      iconColor: 'bg-purple-500',
      badge: 'AI'
    },
    {
      id: 'customer-screener',
      title: 'Customer-to-Agent Screener',
      description: 'AI identifies customers with high potential to become agents',
      icon: Target,
      iconColor: 'bg-cyan-500',
      badge: 'AI'
    }
  ];
  
  const candidates: Record<string, Candidate[]> = {
    singapore: [
      {
        id: 'SG001',
        name: 'Emily Tan Wei Ling',
        location: 'Singapore',
        status: 'ready',
        experience: 5,
        skills: ['Life Insurance', 'Investment Products', 'Client Relations'],
        matchScore: 96,
        phone: '+65 9123 4567',
        email: 'emily.tan@example.sg',
        availability: 'Immediate'
      },
      {
        id: 'SG002',
        name: 'Marcus Lim Jia Hao',
        location: 'Singapore',
        status: 'interview',
        experience: 3,
        skills: ['General Insurance', 'Risk Assessment', 'Sales'],
        matchScore: 88,
        phone: '+65 8234 5678',
        email: 'marcus.lim@example.sg',
        availability: '2 weeks notice'
      },
      {
        id: 'SG003',
        name: 'Priya Sharma',
        location: 'Singapore',
        status: 'screening',
        experience: 7,
        skills: ['Health Insurance', 'Financial Planning', 'Compliance'],
        matchScore: 91,
        phone: '+65 9876 5432',
        email: 'priya.sharma@example.sg',
        availability: '1 month notice'
      },
      {
        id: 'SG004',
        name: 'Daniel Wong Kai Ming',
        location: 'Singapore',
        status: 'onboarding',
        experience: 4,
        skills: ['Property Insurance', 'Claims Management', 'Customer Service'],
        matchScore: 85,
        phone: '+65 8765 4321',
        email: 'daniel.wong@example.sg',
        availability: 'Immediate'
      }
    ],
    hongkong: [
      {
        id: 'HK001',
        name: 'Vivian Chan Siu Ying',
        location: 'Hong Kong',
        status: 'ready',
        experience: 6,
        skills: ['Life Insurance', 'Wealth Management', 'Cross-border Sales'],
        matchScore: 94,
        phone: '+852 9123 4567',
        email: 'vivian.chan@example.hk',
        availability: 'Immediate'
      },
      {
        id: 'HK002',
        name: 'Kenneth Lee Chun Kit',
        location: 'Hong Kong',
        status: 'interview',
        experience: 4,
        skills: ['Medical Insurance', 'Group Benefits', 'Corporate Sales'],
        matchScore: 89,
        phone: '+852 6234 5678',
        email: 'kenneth.lee@example.hk',
        availability: '2 weeks notice'
      },
      {
        id: 'HK003',
        name: 'Sarah Ng Mei Ling',
        location: 'Hong Kong',
        status: 'onboarding',
        experience: 8,
        skills: ['Investment Insurance', 'Retirement Planning', 'Regulatory Compliance'],
        matchScore: 92,
        phone: '+852 9876 5432',
        email: 'sarah.ng@example.hk',
        availability: 'Immediate'
      },
      {
        id: 'HK004',
        name: 'Michael Cheung Kar Wai',
        location: 'Hong Kong',
        status: 'screening',
        experience: 3,
        skills: ['General Insurance', 'Digital Marketing', 'Client Acquisition'],
        matchScore: 83,
        phone: '+852 5432 1098',
        email: 'michael.cheung@example.hk',
        availability: '1 month notice'
      }
    ]
  };

  const stats = {
    singapore: {
      totalCandidates: 47,
      interviewed: 23,
      onboarding: 8,
      avgMatchScore: 87,
      avgExperience: 4.5
    },
    hongkong: {
      totalCandidates: 38,
      interviewed: 19,
      onboarding: 6,
      avgMatchScore: 85,
      avgExperience: 5.2
    }
  };

  const currentCandidates = candidates[selectedLocation];
  const currentStats = stats[selectedLocation];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-50 text-green-700 border-green-200';
      case 'interview': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'onboarding': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'screening': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-700 bg-green-50';
    if (score >= 80) return 'text-blue-700 bg-blue-50';
    return 'text-amber-700 bg-amber-50';
  };

  return (
    <DashboardLayout location={selectedLocation}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Recruitment</h1>
            <p className="text-muted-foreground mt-1">Manage candidate pipeline and onboarding</p>
          </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedLocation('singapore')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedLocation === 'singapore'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  Singapore
                </button>
                <button
                  onClick={() => setSelectedLocation('hongkong')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedLocation === 'hongkong'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  Hong Kong
                </button>
              </div>
        </div>

        {/* AI Feature Selector */}
        <AIFeatureSelector
          features={aiFeatures}
          selectedFeature={selectedFeature}
          onSelect={setSelectedFeature}
        />

        {/* Conditional Rendering based on selected feature */}
            {selectedFeature === 'interview-simulator' ? (
              <InterviewSimulator />
            ) : selectedFeature === 'skills-analyzer' ? (
              <SkillsDNAAnalyzer />
            ) : selectedFeature === 'success-predictor' ? (
              <SuccessPredictor />
            ) : selectedFeature === 'customer-screener' ? (
              <CustomerAgentScreener />
            ) : (
          <>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Candidates</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.totalCandidates}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Interviewed</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.interviewed}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Onboarding</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.onboarding}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Avg Match Score</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.avgMatchScore}%</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Avg Experience</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.avgExperience} yrs</div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Candidate Pipeline</h2>
          </div>
          
          <div className="divide-y divide-border">
            {currentCandidates.map((candidate) => (
              <div key={candidate.id} className="p-6 hover:bg-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-foreground">{candidate.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(candidate.status)}`}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(candidate.matchScore)}`}>
                        {candidate.matchScore}% Match
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>ID: {candidate.id} • {candidate.experience} years experience</div>
                      <div>{candidate.phone} • {candidate.email}</div>
                      <div>Availability: {candidate.availability}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-accent text-foreground rounded-lg text-xs border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
        )}
      </div>
    </DashboardLayout>
  );
}

