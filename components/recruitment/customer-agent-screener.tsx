'use client';

import { useState } from 'react';
import { Users, Target, TrendingUp, Award, CheckCircle2, AlertCircle, MessageSquare, Phone, Linkedin, Facebook, Instagram } from 'lucide-react';

interface CustomerCandidate {
  id: string;
  name: string;
  age: number;
  currentRole: string;
  customer: {
    since: string;
    productsOwned: number;
    lifetimeValue: string;
    referrals: number;
    nps: number;
  };
  socialPresence: {
    linkedin: {
      connections: number;
      engagement: 'high' | 'medium' | 'low';
      postsPerMonth: number;
      profileViews: number;
    };
    facebook: {
      friends: number;
      activity: 'high' | 'medium' | 'low';
      groupMemberships: number;
    };
    instagram?: {
      followers: number;
      engagement: number;
    };
  };
  networkQuality: {
    score: number;
    description: string;
    potentialClientBase: number;
  };
  personalityTraits: string[];
  whyGoodFit: string[];
  aiScore: number;
  potentialRating: 'high' | 'medium' | 'low';
  strengths: string[];
  concerns: string[];
  prediction: {
    firstYearIncome: string;
    threeYearSuccess: number;
    retentionProbability: number;
    expectedClientBase: number;
  };
  nextAction: string;
}

export default function CustomerAgentScreener() {
  const [selectedCandidate, setSelectedCandidate] = useState<CustomerCandidate | null>(null);
  const [filterRating, setFilterRating] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const candidates: CustomerCandidate[] = [
    {
      id: 'CAG-001',
      name: 'Michelle Tan',
      age: 32,
      currentRole: 'Sales Manager - Tech',
      customer: {
        since: '2019',
        productsOwned: 5,
        lifetimeValue: 'SGD 145K',
        referrals: 12,
        nps: 95
      },
      socialPresence: {
        linkedin: {
          connections: 2847,
          engagement: 'high',
          postsPerMonth: 12,
          profileViews: 3420
        },
        facebook: {
          friends: 1842,
          activity: 'high',
          groupMemberships: 8
        },
        instagram: {
          followers: 4200,
          engagement: 8.5
        }
      },
      networkQuality: {
        score: 96,
        description: 'Professional network with high-income contacts',
        potentialClientBase: 250
      },
      personalityTraits: ['Natural Networker', 'Trusted Advisor', 'Results-Driven', 'Empathetic Listener'],
      whyGoodFit: [
        'Already referring 12 people organically - imagine with incentives!',
        'LinkedIn shows 2,847 connections (top 5% in Singapore)',
        'Posts about finance 12x/month - thought leader positioning',
        'Tech sales background = comfortable with rejection & targets',
        'Managing 8 people proves leadership and coaching ability'
      ],
      aiScore: 94,
      potentialRating: 'high',
      strengths: [
        'Strong sales background in B2B',
        'Naturally refers friends & family (12 referrals)',
        'High engagement with financial planning',
        'Leadership experience managing 8-person team'
      ],
      concerns: [
        'Currently earning high salary - may need competitive package',
        'No direct insurance experience'
      ],
      prediction: {
        firstYearIncome: 'SGD 120-150K',
        threeYearSuccess: 89,
        retentionProbability: 87,
        expectedClientBase: 85
      },
      nextAction: 'Schedule informal coffee chat to explore interest'
    },
    {
      id: 'CAG-002',
      name: 'David Wong',
      age: 28,
      currentRole: 'Real Estate Agent',
      customer: {
        since: '2020',
        productsOwned: 3,
        lifetimeValue: 'SGD 78K',
        referrals: 8,
        nps: 88
      },
      socialPresence: {
        linkedin: {
          connections: 1650,
          engagement: 'high',
          postsPerMonth: 8,
          profileViews: 2100
        },
        facebook: {
          friends: 2340,
          activity: 'high',
          groupMemberships: 15
        },
        instagram: {
          followers: 5800,
          engagement: 12.3
        }
      },
      networkQuality: {
        score: 93,
        description: 'Real estate clients = insurance prospects',
        potentialClientBase: 320
      },
      personalityTraits: ['Hustler Mentality', 'Social Butterfly', 'Deal Closer', 'Community Builder'],
      whyGoodFit: [
        '5,800 Instagram followers actively viewing property tours',
        'Every real estate client needs home/mortgage insurance',
        'Already comfortable with 100% commission structure',
        'Proven track record closing 40+ deals/year',
        'Facebook groups: 15 memberships in property investment communities'
      ],
      aiScore: 91,
      potentialRating: 'high',
      strengths: [
        'Self-employed with proven sales success',
        'Comfortable with commission-based income',
        'Large network from real estate',
        'Strong interpersonal skills'
      ],
      concerns: [
        'Real estate market currently hot - timing risk',
        'May see insurance as "side hustle" initially'
      ],
      prediction: {
        firstYearIncome: 'SGD 95-125K',
        threeYearSuccess: 85,
        retentionProbability: 82,
        expectedClientBase: 95
      },
      nextAction: 'Present insurance as complementary to real estate business'
    },
    {
      id: 'CAG-003',
      name: 'Sarah Lim',
      age: 35,
      currentRole: 'Stay-at-home Mom (Former HR)',
      customer: {
        since: '2018',
        productsOwned: 4,
        lifetimeValue: 'SGD 112K',
        referrals: 15,
        nps: 92
      },
      socialPresence: {
        linkedin: {
          connections: 890,
          engagement: 'medium',
          postsPerMonth: 4,
          profileViews: 450
        },
        facebook: {
          friends: 3200,
          activity: 'high',
          groupMemberships: 22
        },
        instagram: {
          followers: 1200,
          engagement: 6.8
        }
      },
      networkQuality: {
        score: 89,
        description: 'Strong parent network & former colleagues',
        potentialClientBase: 180
      },
      personalityTraits: ['Community Connector', 'Nurturing', 'Organized', 'Passionate Advocate'],
      whyGoodFit: [
        'Made 15 referrals WITHOUT commission - highest in database!',
        'Facebook: 3,200 friends, member of 22 parent/community groups',
        'Natural spokesperson for family protection - lived experience',
        'HR background = recruitment & people skills transferable',
        'Looking for flexible work - perfect timing to recruit'
      ],
      aiScore: 88,
      potentialRating: 'high',
      strengths: [
        'Looking to return to workforce - timing perfect',
        'HR background = excellent people skills',
        'Passionate about family protection',
        'Most referrals of any customer - natural advocate'
      ],
      concerns: [
        'Need flexible hours for childcare',
        '5-year career gap'
      ],
      prediction: {
        firstYearIncome: 'SGD 75-100K',
        threeYearSuccess: 83,
        retentionProbability: 91,
        expectedClientBase: 72
      },
      nextAction: 'Emphasize work-life balance and flexible schedule benefits'
    },
    {
      id: 'CAG-004',
      name: 'Marcus Goh',
      age: 42,
      currentRole: 'Bank Relationship Manager',
      customer: {
        since: '2021',
        productsOwned: 6,
        lifetimeValue: 'SGD 203K',
        referrals: 6,
        nps: 85
      },
      socialPresence: {
        linkedin: {
          connections: 3200,
          engagement: 'high',
          postsPerMonth: 6,
          profileViews: 2800
        },
        facebook: {
          friends: 980,
          activity: 'medium',
          groupMemberships: 5
        }
      },
      networkQuality: {
        score: 94,
        description: 'Premium HNW banking clients',
        potentialClientBase: 420
      },
      personalityTraits: ['Wealth Advisor', 'Trusted Professional', 'Detail-Oriented', 'Client-Focused'],
      whyGoodFit: [
        'LinkedIn: 3,200 connections - many high-net-worth individuals',
        'Banking RM = already selling financial products daily',
        'Licensed for FA - can hit ground running',
        'Client base averaging SGD 500K+ investable assets',
        'Understands complex structured products better than 95% of agents'
      ],
      aiScore: 85,
      potentialRating: 'high',
      strengths: [
        'Financial services experience',
        'Understands complex products',
        'High-net-worth client network',
        'Licensed for financial advisory'
      ],
      concerns: [
        'Banking career stable - less motivated to switch',
        'May expect high base salary'
      ],
      prediction: {
        firstYearIncome: 'SGD 140-180K',
        threeYearSuccess: 87,
        retentionProbability: 79,
        expectedClientBase: 65
      },
      nextAction: 'Position as entrepreneurial opportunity with unlimited earning potential'
    },
    {
      id: 'CAG-005',
      name: 'Emily Chen',
      age: 29,
      currentRole: 'Marketing Executive',
      customer: {
        since: '2022',
        productsOwned: 2,
        lifetimeValue: 'SGD 42K',
        referrals: 4,
        nps: 78
      },
      socialPresence: {
        linkedin: {
          connections: 1240,
          engagement: 'medium',
          postsPerMonth: 15,
          profileViews: 1850
        },
        facebook: {
          friends: 1680,
          activity: 'high',
          groupMemberships: 12
        },
        instagram: {
          followers: 3200,
          engagement: 9.2
        }
      },
      networkQuality: {
        score: 76,
        description: 'Young professionals, digital-savvy network',
        potentialClientBase: 145
      },
      personalityTraits: ['Digital Native', 'Content Creator', 'Brand Builder', 'Trendsetter'],
      whyGoodFit: [
        'Posts 15x/month on LinkedIn - natural content creator',
        '3,200 Instagram followers - can leverage social selling',
        'Marketing skills = understands funnels & conversions',
        'Young network just starting families - perfect timing for protection',
        'Digital-first approach matches modern insurance distribution'
      ],
      aiScore: 72,
      potentialRating: 'medium',
      strengths: [
        'Digital marketing skills valuable for social selling',
        'Active on social media with good following',
        'Young and ambitious'
      ],
      concerns: [
        'Limited sales experience',
        'Short customer tenure',
        'May lack persistence for insurance sales'
      ],
      prediction: {
        firstYearIncome: 'SGD 60-85K',
        threeYearSuccess: 68,
        retentionProbability: 71,
        expectedClientBase: 48
      },
      nextAction: 'Invite to shadow experienced agent for a day'
    }
  ];

  const filteredCandidates = filterRating === 'all' 
    ? candidates 
    : candidates.filter(c => c.potentialRating === filterRating);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    return 'text-amber-600 dark:text-amber-400';
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'high':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'medium':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'low':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Customer-to-Agent Screener</h2>
            <p className="text-sm text-muted-foreground">
              AI identifies existing customers with high potential to become successful agents
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 rounded-full">
            <div className="bg-white dark:bg-background rounded-full p-3">
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-foreground">Filter by Potential:</span>
        <button
          onClick={() => setFilterRating('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRating === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          All ({candidates.length})
        </button>
        <button
          onClick={() => setFilterRating('high')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRating === 'high'
              ? 'bg-green-600 text-white'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          High ({candidates.filter(c => c.potentialRating === 'high').length})
        </button>
        <button
          onClick={() => setFilterRating('medium')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRating === 'medium'
              ? 'bg-blue-600 text-white'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          Medium ({candidates.filter(c => c.potentialRating === 'medium').length})
        </button>
      </div>

      {selectedCandidate ? (
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={() => setSelectedCandidate(null)}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            ← Back to all candidates
          </button>

          {/* Candidate Detail */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedCandidate.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{selectedCandidate.currentRole} • Age {selectedCandidate.age}</p>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRatingBadge(selectedCandidate.potentialRating)}`}>
                    {selectedCandidate.potentialRating.toUpperCase()} POTENTIAL
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${getScoreColor(selectedCandidate.aiScore)}`}>
                  {selectedCandidate.aiScore}
                </div>
                <div className="text-xs text-muted-foreground mt-1">AI Score</div>
              </div>
            </div>

            {/* Customer History */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-lg font-bold text-foreground">{selectedCandidate.customer.since}</div>
                <div className="text-xs text-muted-foreground">Customer Since</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-lg font-bold text-foreground">{selectedCandidate.customer.productsOwned}</div>
                <div className="text-xs text-muted-foreground">Products Owned</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-lg font-bold text-foreground">{selectedCandidate.customer.lifetimeValue}</div>
                <div className="text-xs text-muted-foreground">Lifetime Value</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-lg font-bold text-green-600">{selectedCandidate.customer.referrals}</div>
                <div className="text-xs text-muted-foreground">Referrals Made</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg">
                <div className="text-lg font-bold text-primary">{selectedCandidate.customer.nps}</div>
                <div className="text-xs text-muted-foreground">NPS Score</div>
              </div>
            </div>

            {/* Social Presence & Network Quality */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Social Media Stats */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Social Media Presence</h4>
                <div className="space-y-4">
                  {/* LinkedIn */}
                  <div className="p-4 bg-black border-2 border-blue-500 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">in</div>
                        <span className="text-sm font-semibold text-foreground">LinkedIn</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedCandidate.socialPresence.linkedin.engagement === 'high' 
                          ? 'bg-black border-2 border-green-500 text-green-400' 
                          : 'bg-black border-2 border-amber-500 text-amber-400'
                      }`}>
                        {selectedCandidate.socialPresence.linkedin.engagement.toUpperCase()} ACTIVITY
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-xl font-bold text-blue-400">{selectedCandidate.socialPresence.linkedin.connections.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Connections</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-blue-400">{selectedCandidate.socialPresence.linkedin.postsPerMonth}</div>
                        <div className="text-xs text-muted-foreground">Posts/Month</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-blue-400">{selectedCandidate.socialPresence.linkedin.profileViews.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Profile Views</div>
                      </div>
                    </div>
                  </div>

                  {/* Facebook */}
                  <div className="p-4 bg-black border-2 border-blue-500 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">f</div>
                        <span className="text-sm font-semibold text-foreground">Facebook</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedCandidate.socialPresence.facebook.activity === 'high' 
                          ? 'bg-black border-2 border-green-500 text-green-400' 
                          : 'bg-black border-2 border-amber-500 text-amber-400'
                      }`}>
                        {selectedCandidate.socialPresence.facebook.activity.toUpperCase()} ACTIVITY
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xl font-bold text-blue-400">{selectedCandidate.socialPresence.facebook.friends.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Friends</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-blue-400">{selectedCandidate.socialPresence.facebook.groupMemberships}</div>
                        <div className="text-xs text-muted-foreground">Group Memberships</div>
                      </div>
                    </div>
                  </div>

                  {/* Instagram */}
                  {selectedCandidate.socialPresence.instagram && (
                    <div className="p-4 bg-black border-2 border-purple-500 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">IG</div>
                          <span className="text-sm font-semibold text-foreground">Instagram</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xl font-bold text-purple-400">{selectedCandidate.socialPresence.instagram.followers.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Followers</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-400">{selectedCandidate.socialPresence.instagram.engagement}%</div>
                          <div className="text-xs text-muted-foreground">Engagement Rate</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Network Quality & Personality */}
              <div className="space-y-6">
                {/* Network Quality Score */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-foreground">Network Quality</h4>
                    <div className="text-3xl font-bold text-green-600">{selectedCandidate.networkQuality.score}</div>
                  </div>
                  <p className="text-sm text-foreground mb-4">{selectedCandidate.networkQuality.description}</p>
                  <div className="p-3 bg-white dark:bg-background rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">{selectedCandidate.networkQuality.potentialClientBase}</div>
                    <div className="text-xs text-muted-foreground">Estimated Potential Client Base</div>
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Personality Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.personalityTraits.map((trait, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expected Client Base */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Year 1 Client Acquisition</h4>
                  <div className="text-3xl font-bold text-primary mb-1">{selectedCandidate.prediction.expectedClientBase}</div>
                  <div className="text-xs text-muted-foreground">Expected new clients in first 12 months</div>
                </div>
              </div>
            </div>

            {/* Why Good Fit - Highlighted Section */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h4 className="text-lg font-bold text-foreground">Why This Candidate is a Perfect Fit</h4>
              </div>
              <div className="space-y-2">
                {selectedCandidate.whyGoodFit.map((reason, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-white dark:bg-background rounded-lg">
                    <div className="h-6 w-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictions */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-4">AI Success Predictions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Est. First Year Income</div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">{selectedCandidate.prediction.firstYearIncome}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">3-Year Success Probability</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{selectedCandidate.prediction.threeYearSuccess}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Retention Probability</div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{selectedCandidate.prediction.retentionProbability}%</div>
                </div>
              </div>
            </div>

            {/* Strengths & Concerns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <h4 className="text-sm font-semibold text-foreground">Strengths</h4>
                </div>
                <div className="space-y-2">
                  {selectedCandidate.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <h4 className="text-sm font-semibold text-foreground">Concerns to Address</h4>
                </div>
                <div className="space-y-2">
                  {selectedCandidate.concerns.map((concern, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{concern}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Next Action */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-semibold text-blue-900 dark:text-blue-100">RECOMMENDED APPROACH</span>
              </div>
              <p className="text-sm text-foreground">{selectedCandidate.nextAction}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all">
                <Phone className="h-4 w-4" />
                <span>Schedule Call</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-card border border-border hover:bg-accent text-foreground rounded-lg font-medium transition-all">
                <MessageSquare className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate)}
              className="p-6 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent transition-all text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRatingBadge(candidate.potentialRating)}`}>
                  {candidate.potentialRating.toUpperCase()}
                </span>
                <div className={`text-2xl font-bold ${getScoreColor(candidate.aiScore)}`}>
                  {candidate.aiScore}
                </div>
              </div>

              <h4 className="text-lg font-semibold text-foreground mb-1">{candidate.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{candidate.currentRole}</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Referrals</div>
                  <div className="font-semibold text-green-600">{candidate.customer.referrals}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">NPS</div>
                  <div className="font-semibold text-primary">{candidate.customer.nps}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Y1 Income</div>
                  <div className="font-semibold text-foreground">{candidate.prediction.firstYearIncome.split('-')[0]}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Success Rate</div>
                  <div className="font-semibold text-blue-600">{candidate.prediction.threeYearSuccess}%</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

