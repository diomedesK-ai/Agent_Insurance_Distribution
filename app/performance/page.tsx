'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AIFeatureSelector from '@/components/ai-feature-selector';
import PersonalCoach from '@/components/performance/personal-coach';
import CommissionSimulator from '@/components/performance/commission-simulator';
import AgentLapsePredictor from '@/components/performance/agent-lapse-predictor';
import WhatsAppAssistant from '@/components/performance/whatsapp-assistant';
import { BarChart3, UserCheck, DollarSign, Sparkles, AlertTriangle, MessageCircle } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  location: string;
  level: string;
  currentCommission: number;
  targetCommission: number;
  forecasted: number;
  achievement: number;
  activePolicies: number;
  conversionRate: number;
  avgPremium: number;
  trainingCompleted: number;
  coachingAreas: string[];
  strengths: string[];
  recommendations: string[];
}

export default function PerformancePage() {
  const [selectedLocation, setSelectedLocation] = useState<'singapore' | 'hongkong'>('singapore');
  const [selectedFeature, setSelectedFeature] = useState('traditional');

  const aiFeatures = [
    {
      id: 'traditional',
      title: 'Traditional View',
      description: 'Standard performance metrics and dashboard',
      icon: BarChart3,
      iconColor: 'bg-slate-500'
    },
    {
      id: 'personal-coach',
      title: 'Personal AI Coach',
      description: 'Daily personalized coaching and guidance',
      icon: UserCheck,
      iconColor: 'bg-blue-500',
      badge: 'AI'
    },
    {
      id: 'commission-simulator',
      title: 'Commission Simulator',
      description: 'Interactive what-if scenarios for earnings',
      icon: DollarSign,
      iconColor: 'bg-green-500',
      badge: 'AI'
    },
    {
      id: 'agent-lapse',
      title: 'Agent Lapse Predictor',
      description: 'AI identifies agents at risk of leaving and recommends retention strategies',
      icon: AlertTriangle,
      iconColor: 'bg-red-500',
      badge: 'AI'
    },
    {
      id: 'skill-recommender',
      title: 'Skill Recommender',
      description: 'AI identifies skill gaps and training priorities',
      icon: Sparkles,
      iconColor: 'bg-purple-500',
      badge: 'Coming Soon'
    }
  ];
  
  const agents: Record<string, Agent[]> = {
    singapore: [
      {
        id: 'AG-SG-001',
        name: 'Emily Tan Wei Ling',
        location: 'Singapore',
        level: 'Senior Agent',
        currentCommission: 87500,
        targetCommission: 100000,
        forecasted: 95000,
        achievement: 88,
        activePolicies: 142,
        conversionRate: 42,
        avgPremium: 4200,
        trainingCompleted: 92,
        coachingAreas: ['Investment Products', 'High Net Worth Clients'],
        strengths: ['Client Retention', 'Cross-selling'],
        recommendations: [
          'Focus on 3 high-potential leads to reach target',
          'Complete Advanced Wealth Management module',
          'Schedule premium client reviews this month'
        ]
      },
      {
        id: 'AG-SG-002',
        name: 'Marcus Lim Jia Hao',
        location: 'Singapore',
        level: 'Agent',
        currentCommission: 52000,
        targetCommission: 72000,
        forecasted: 68000,
        achievement: 72,
        activePolicies: 89,
        conversionRate: 35,
        avgPremium: 3100,
        trainingCompleted: 78,
        coachingAreas: ['Objection Handling', 'Closing Techniques'],
        strengths: ['Product Knowledge', 'Lead Generation'],
        recommendations: [
          'Increase meeting frequency with qualified leads',
          'Complete Sales Excellence certification',
          'Target 2 additional policy closings this quarter'
        ]
      },
      {
        id: 'AG-SG-003',
        name: 'Priya Sharma',
        location: 'Singapore',
        level: 'Associate Director',
        currentCommission: 145000,
        targetCommission: 150000,
        forecasted: 152000,
        achievement: 97,
        activePolicies: 238,
        conversionRate: 48,
        avgPremium: 5800,
        trainingCompleted: 96,
        coachingAreas: ['Team Leadership', 'Recruitment'],
        strengths: ['Strategic Planning', 'Mentorship'],
        recommendations: [
          'On track to exceed target - maintain momentum',
          'Consider leadership training program',
          'Focus on team development initiatives'
        ]
      },
      {
        id: 'AG-SG-004',
        name: 'Daniel Wong Kai Ming',
        location: 'Singapore',
        level: 'Agent',
        currentCommission: 38000,
        targetCommission: 60000,
        forecasted: 55000,
        achievement: 63,
        activePolicies: 64,
        conversionRate: 28,
        avgPremium: 2800,
        trainingCompleted: 64,
        coachingAreas: ['Client Engagement', 'Needs Analysis'],
        strengths: ['Communication', 'Follow-up'],
        recommendations: [
          'Focus on conversion rate improvement',
          'Complete Customer Psychology workshop',
          'Increase average premium through upselling'
        ]
      }
    ],
    hongkong: [
      {
        id: 'AG-HK-001',
        name: 'Vivian Chan Siu Ying',
        location: 'Hong Kong',
        level: 'Senior Agent',
        currentCommission: 195000,
        targetCommission: 200000,
        forecasted: 205000,
        achievement: 98,
        activePolicies: 186,
        conversionRate: 45,
        avgPremium: 8500,
        trainingCompleted: 94,
        coachingAreas: ['Cross-border Solutions', 'Estate Planning'],
        strengths: ['Relationship Building', 'Premium Cases'],
        recommendations: [
          'Excellent performance - on track to exceed target',
          'Consider mentoring junior agents',
          'Explore executive protection market'
        ]
      },
      {
        id: 'AG-HK-002',
        name: 'Kenneth Lee Chun Kit',
        location: 'Hong Kong',
        level: 'Agent',
        currentCommission: 128000,
        targetCommission: 160000,
        forecasted: 148000,
        achievement: 80,
        activePolicies: 124,
        conversionRate: 38,
        avgPremium: 6200,
        trainingCompleted: 82,
        coachingAreas: ['Group Benefits', 'Corporate Sales'],
        strengths: ['Prospecting', 'Presentation'],
        recommendations: [
          'Target 4 corporate accounts to reach goal',
          'Complete Advanced Group Insurance module',
          'Focus on premium enhancement strategies'
        ]
      },
      {
        id: 'AG-HK-003',
        name: 'Sarah Ng Mei Ling',
        location: 'Hong Kong',
        level: 'Associate Director',
        currentCommission: 285000,
        targetCommission: 300000,
        forecasted: 310000,
        achievement: 95,
        activePolicies: 312,
        conversionRate: 51,
        avgPremium: 9200,
        trainingCompleted: 98,
        coachingAreas: ['Digital Transformation', 'Team Building'],
        strengths: ['Leadership', 'Innovation'],
        recommendations: [
          'Projected to exceed target significantly',
          'Lead digital adoption initiative',
          'Share best practices at regional conference'
        ]
      },
      {
        id: 'AG-HK-004',
        name: 'Michael Cheung Kar Wai',
        location: 'Hong Kong',
        level: 'Junior Agent',
        currentCommission: 42000,
        targetCommission: 80000,
        forecasted: 72000,
        achievement: 53,
        activePolicies: 48,
        conversionRate: 25,
        avgPremium: 4100,
        trainingCompleted: 58,
        coachingAreas: ['Product Knowledge', 'Sales Process'],
        strengths: ['Digital Marketing', 'Social Media'],
        recommendations: [
          'Complete foundational training modules urgently',
          'Shadow senior agent for 2 weeks',
          'Focus on building consistent pipeline'
        ]
      }
    ]
  };

  const stats = {
    singapore: {
      totalAgents: 247,
      avgAchievement: 78,
      onTrack: 156,
      needsSupport: 91,
      totalCommission: 18500000
    },
    hongkong: {
      totalAgents: 198,
      avgAchievement: 82,
      onTrack: 142,
      needsSupport: 56,
      totalCommission: 24800000
    }
  };

  const currentAgents = agents[selectedLocation];
  const currentStats = stats[selectedLocation];

  const getAchievementColor = (achievement: number) => {
    if (achievement >= 90) return 'bg-black border-2 border-green-500 text-green-500 font-bold';
    if (achievement >= 70) return 'bg-black border-2 border-blue-500 text-blue-500 font-bold';
    if (achievement >= 50) return 'bg-black border-2 border-amber-500 text-amber-500 font-bold';
    return 'bg-black border-2 border-red-500 text-red-500 font-bold';
  };

  const getTrainingColor = (completion: number) => {
    if (completion >= 90) return 'bg-black border-2 border-green-500 text-green-500 font-bold';
    if (completion >= 70) return 'bg-black border-2 border-blue-500 text-blue-500 font-bold';
    return 'bg-black border-2 border-amber-500 text-amber-500 font-bold';
  };

  const formatCurrency = (amount: number, location: string) => {
    const currency = location === 'Singapore' ? 'SGD' : 'HKD';
    return `${currency} ${amount.toLocaleString()}`;
  };

  return (
    <DashboardLayout location={selectedLocation}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Performance & Upskill</h1>
            <p className="text-muted-foreground mt-1">Agent performance tracking and coaching</p>
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
            {selectedFeature === 'personal-coach' ? (
              <PersonalCoach />
            ) : selectedFeature === 'commission-simulator' ? (
              <CommissionSimulator />
            ) : selectedFeature === 'agent-lapse' ? (
              <AgentLapsePredictor />
      ) : (
              <>
            {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Agents</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.totalAgents}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Avg Achievement</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.avgAchievement}%</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">On Track</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.onTrack}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Needs Support</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.needsSupport}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Commission</div>
            <div className="text-2xl font-semibold text-foreground">
              {formatCurrency(currentStats.totalCommission, selectedLocation === 'singapore' ? 'Singapore' : 'Hong Kong')}
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Agent Performance Dashboard</h2>
          </div>
          
          <div className="divide-y divide-border">
            {currentAgents.map((agent) => (
              <div key={agent.id} className="p-6 hover:bg-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-foreground">{agent.name}</h3>
                      <span className="px-3 py-1 rounded-full text-xs bg-black border-2 border-slate-500 text-slate-400 font-bold">
                        {agent.level}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${getAchievementColor(agent.achievement)}`}>
                        {agent.achievement}% Achievement
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${getTrainingColor(agent.trainingCompleted)}`}>
                        {agent.trainingCompleted}% Training
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-accent rounded-lg p-4 border border-slate-500/30">
                    <div className="text-xs text-muted-foreground mb-1 font-medium">Current Commission</div>
                    <div className="text-lg font-bold text-foreground">
                      {formatCurrency(agent.currentCommission, agent.location)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Target: {formatCurrency(agent.targetCommission, agent.location)}
                    </div>
                  </div>
                  <div className="bg-accent rounded-lg p-4 border border-blue-500/30">
                    <div className="text-xs text-blue-400 mb-1 font-medium">Forecasted</div>
                    <div className="text-lg font-bold text-foreground">
                      {formatCurrency(agent.forecasted, agent.location)}
                    </div>
                    <div className="text-xs text-blue-400 mt-1">
                      {agent.forecasted >= agent.targetCommission ? 'On track ✓' : 'Below target'}
                    </div>
                  </div>
                  <div className="bg-accent rounded-lg p-4 border border-green-500/30">
                    <div className="text-xs text-green-400 mb-1 font-medium">Active Policies</div>
                    <div className="text-lg font-bold text-foreground">{agent.activePolicies}</div>
                    <div className="text-xs text-green-400 mt-1">
                      Avg Premium: {formatCurrency(agent.avgPremium, agent.location)}
                    </div>
                  </div>
                  <div className="bg-accent rounded-lg p-4 border border-amber-500/30">
                    <div className="text-xs text-amber-400 mb-1 font-medium">Conversion Rate</div>
                    <div className="text-lg font-bold text-foreground">{agent.conversionRate}%</div>
                    <div className="text-xs text-amber-400 mt-1">
                      Industry avg: 32%
                    </div>
                  </div>
                </div>

                {/* Coaching & Development */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 font-medium">Coaching Areas</div>
                    <div className="space-y-1">
                      {agent.coachingAreas.map((area, idx) => (
                        <div key={idx} className="text-sm font-medium bg-black border-2 border-amber-500 text-amber-400 px-3 py-1 rounded-lg">
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 font-medium">Strengths</div>
                    <div className="space-y-1">
                      {agent.strengths.map((strength, idx) => (
                        <div key={idx} className="text-sm font-medium bg-black border-2 border-green-500 text-green-400 px-3 py-1 rounded-lg">
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 font-medium">Recommendations</div>
                    <div className="space-y-1">
                      {agent.recommendations.map((rec, idx) => (
                        <div key={idx} className="text-xs font-medium bg-black border-2 border-blue-500 text-blue-400 px-3 py-2 rounded-lg">
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
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

