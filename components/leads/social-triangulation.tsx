'use client';

import { useState } from 'react';
import { Facebook, Instagram, Linkedin, TrendingUp, DollarSign, Briefcase, Users, MapPin, Heart } from 'lucide-react';

interface SocialProfile {
  platform: 'facebook' | 'instagram' | 'linkedin';
  data: {
    followers?: number;
    connections?: number;
    posts?: number;
    engagement?: string;
    topics?: string[];
    lifestyle?: string;
    jobTitle?: string;
    company?: string;
    location?: string;
    interests?: string[];
  };
  score: number;
}

const sampleLeads = [
  {
    id: 'LD-SG-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.sg',
    phone: '+65 9123 4567',
    overallScore: 94,
    qualificationStatus: 'hot',
    socialProfiles: [
      {
        platform: 'linkedin' as const,
        data: {
          jobTitle: 'Senior Marketing Manager',
          company: 'Tech Unicorn Pte Ltd',
          connections: 850,
          topics: ['Marketing', 'Digital Strategy', 'Leadership'],
          location: 'Singapore'
        },
        score: 95
      },
      {
        platform: 'facebook' as const,
        data: {
          followers: 420,
          posts: 230,
          engagement: 'High',
          lifestyle: 'Family-oriented',
          interests: ['Travel', 'Education', 'Wellness']
        },
        score: 88
      },
      {
        platform: 'instagram' as const,
        data: {
          followers: 1200,
          posts: 340,
          engagement: 'Very High',
          lifestyle: 'Active & Health-conscious',
          interests: ['Fitness', 'Luxury Travel', 'Fine Dining']
        },
        score: 92
      }
    ],
    aiInsights: {
      incomeEstimate: 'SGD 150,000 - 200,000',
      lifestage: 'Young Family Builder',
      buyingSignals: [
        'Recent posts about starting a family',
        'Shared article about education planning',
        'Connected with financial advisors on LinkedIn'
      ],
      recommendedProducts: [
        { name: 'Family Protection', reasoning: 'Recent family posts and two young children indicate strong need for breadwinner protection' },
        { name: 'Education Savings', reasoning: 'Shared education planning content shows priority for children\'s future' },
        { name: 'Critical Illness', reasoning: 'Health-conscious lifestyle + family responsibility = high value on protection' }
      ],
      urgency: 'High',
      bestApproach: 'Emphasize family security and long-term planning'
    }
  },
  {
    id: 'LD-HK-002',
    name: 'Michael Wong',
    email: 'michael.w@example.hk',
    phone: '+852 9234 5678',
    overallScore: 87,
    qualificationStatus: 'warm',
    socialProfiles: [
      {
        platform: 'linkedin' as const,
        data: {
          jobTitle: 'Financial Controller',
          company: 'Global Finance Corp',
          connections: 1200,
          topics: ['Finance', 'Investment', 'Risk Management'],
          location: 'Hong Kong'
        },
        score: 92
      },
      {
        platform: 'facebook' as const,
        data: {
          followers: 280,
          posts: 150,
          engagement: 'Medium',
          lifestyle: 'Professional',
          interests: ['Golf', 'Wine', 'Business Networking']
        },
        score: 82
      },
      {
        platform: 'instagram' as const,
        data: {
          followers: 650,
          posts: 180,
          engagement: 'Medium',
          lifestyle: 'Sophisticated',
          interests: ['Luxury Cars', 'Property', 'Fine Dining']
        },
        score: 85
      }
    ],
    aiInsights: {
      incomeEstimate: 'HKD 800,000 - 1,000,000',
      lifestage: 'Wealth Accumulation',
      buyingSignals: [
        'LinkedIn posts about retirement planning',
        'Follows wealth management thought leaders',
        'Recently purchased property (Facebook check-in)'
      ],
      recommendedProducts: [
        { name: 'Investment-Linked Insurance', reasoning: 'LinkedIn activity shows investment interest + finance background = ideal for ILP products' },
        { name: 'Retirement Annuity', reasoning: 'Posts about retirement planning indicate forward-thinking wealth accumulation mindset' },
        { name: 'Executive Protection', reasoning: 'Luxury lifestyle signals (property, cars, wine) suggest HNW coverage needs' }
      ],
      urgency: 'Medium',
      bestApproach: 'Focus on wealth preservation and tax efficiency'
    }
  }
];

export default function SocialTriangulation() {
  const [selectedLead, setSelectedLead] = useState(sampleLeads[0]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return Facebook;
      case 'instagram': return Instagram;
      case 'linkedin': return Linkedin;
      default: return Users;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'bg-black border-2 border-blue-500 text-blue-400 font-bold';
      case 'instagram': return 'bg-black border-2 border-pink-500 text-pink-400 font-bold';
      case 'linkedin': return 'bg-black border-2 border-blue-500 text-blue-400 font-bold';
      default: return 'bg-black border-2 border-gray-500 text-gray-400 font-bold';
    }
  };

  const getQualificationColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-black border-2 border-red-500 text-red-400 font-bold';
      case 'warm': return 'bg-black border-2 border-amber-500 text-amber-400 font-bold';
      case 'cold': return 'bg-black border-2 border-blue-500 text-blue-400 font-bold';
      default: return 'bg-black border-2 border-gray-500 text-gray-400 font-bold';
    }
  };

  return (
    <div className="space-y-6">
      {/* Lead Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleLeads.map((lead) => (
          <button
            key={lead.id}
            onClick={() => setSelectedLead(lead)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedLead.id === lead.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{lead.name}</h3>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{lead.overallScore}</div>
                <div className="text-xs text-muted-foreground">AI Score</div>
              </div>
            </div>
            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getQualificationColor(lead.qualificationStatus)}`}>
              {lead.qualificationStatus.toUpperCase()} LEAD
            </div>
          </button>
        ))}
      </div>

      {/* Social Media Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {selectedLead.socialProfiles.map((profile, idx) => {
          const Icon = getPlatformIcon(profile.platform);
          
          return (
            <div key={idx} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getPlatformColor(profile.platform)}`}>
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium capitalize">{profile.platform}</span>
                </div>
                <div className="text-xl font-bold text-primary">{profile.score}</div>
              </div>

              <div className="space-y-3">
                {profile.data.jobTitle && (
                  <div className="flex items-start space-x-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{profile.data.jobTitle}</div>
                      <div className="text-xs text-muted-foreground">{profile.data.company}</div>
                    </div>
                  </div>
                )}

                {profile.data.connections && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{profile.data.connections} connections</span>
                  </div>
                )}

                {profile.data.followers && (
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{profile.data.followers} followers</span>
                  </div>
                )}

                {profile.data.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{profile.data.location}</span>
                  </div>
                )}

                {profile.data.lifestyle && (
                  <div className="pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">Lifestyle</div>
                    <div className="text-sm text-foreground">{profile.data.lifestyle}</div>
                  </div>
                )}

                {profile.data.topics && profile.data.topics.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs text-muted-foreground mb-2">Topics</div>
                    <div className="flex flex-wrap gap-1">
                      {profile.data.topics.map((topic, i) => (
                        <span key={i} className="px-2 py-0.5 bg-accent text-foreground rounded text-xs border border-border">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.data.interests && profile.data.interests.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs text-muted-foreground mb-2">Interests</div>
                    <div className="flex flex-wrap gap-1">
                      {profile.data.interests.map((interest, i) => (
                        <span key={i} className="px-2 py-0.5 bg-accent text-foreground rounded text-xs border border-border">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-primary rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Estimated Income</div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{selectedLead.aiInsights.incomeEstimate}</span>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Life Stage</div>
                <span className="inline-flex px-3 py-1 bg-black border-2 border-blue-500 text-blue-400 rounded-full text-sm font-bold">
                  {selectedLead.aiInsights.lifestage}
                </span>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Urgency Level</div>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${
                  selectedLead.aiInsights.urgency === 'High' 
                    ? 'bg-black border-2 border-red-500 text-red-400' 
                    : 'bg-black border-2 border-amber-500 text-amber-400'
                }`}>
                  {selectedLead.aiInsights.urgency}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Buying Signals Detected</div>
            <ul className="space-y-2">
              {selectedLead.aiInsights.buyingSignals.map((signal, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm text-foreground">{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-primary/20">
          <div className="text-sm font-bold text-foreground mb-4 flex items-center space-x-2">
            <span>🎯</span>
            <span>AI Recommended Products with Reasoning</span>
          </div>
          <div className="space-y-3 mb-4">
            {selectedLead.aiInsights.recommendedProducts.map((product: any, idx: number) => (
              <div key={idx} className="bg-black border-2 border-primary rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-bold text-primary text-base">{product.name}</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">#{idx + 1}</span>
                </div>
                <div className="text-sm text-foreground">
                  <span className="text-muted-foreground font-medium">AI Reasoning: </span>
                  <span>{product.reasoning}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent rounded-lg p-4 border border-primary/20">
            <div className="text-sm font-bold text-foreground mb-2">💡 Best Approach</div>
            <p className="text-sm text-foreground">{selectedLead.aiInsights.bestApproach}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

