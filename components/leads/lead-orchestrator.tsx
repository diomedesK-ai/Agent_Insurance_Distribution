'use client';

import { useState } from 'react';
import { Clock, Phone, Mail, MessageSquare, Calendar, TrendingUp, Zap, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  score: number;
  status: 'hot' | 'warm' | 'cold';
  lastContact: string;
  nextBestAction: {
    type: 'call' | 'email' | 'whatsapp' | 'meeting';
    timing: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  };
  engagement: {
    emailOpens: number;
    websiteVisits: number;
    socialInteractions: number;
    lastActivity: string;
  };
  aiInsights: {
    buyingSignals: string[];
    concerns: string[];
    optimalDay: string;
    optimalTime: string;
    successProbability: number;
  };
  talkingPoints?: {
    opening: string;
    valueProps: string[];
    objectionHandling: string;
    closingPitch: string;
  };
}

export default function LeadOrchestrator() {
  const [view, setView] = useState<'timeline' | 'priority'>('priority');

  const leads: Lead[] = [
    {
      id: 'LD-001',
      name: 'Peter Wong',
      score: 92,
      status: 'hot',
      lastContact: '2 hours ago',
      nextBestAction: {
        type: 'call',
        timing: 'Now - Next 30 minutes',
        reason: 'Lead just viewed pricing page 3 times and downloaded brochure',
        priority: 'high'
      },
      engagement: {
        emailOpens: 8,
        websiteVisits: 12,
        socialInteractions: 5,
        lastActivity: 'Viewed Critical Illness plans 10 mins ago'
      },
      aiInsights: {
        buyingSignals: ['Multiple pricing page visits', 'Downloaded 2 brochures', 'Compared 3 plans', 'Engaged with calculator'],
        concerns: ['Price sensitivity', 'Needs comparison with competitors'],
        optimalDay: 'Tuesday',
        optimalTime: '10:00 AM - 11:00 AM',
        successProbability: 87
      },
      talkingPoints: {
        opening: "Hi Peter! I noticed you've been comparing our Critical Illness plans. That shows you're serious about protecting your family - great decision!",
        valueProps: [
          "Our plan covers 100+ critical illnesses vs competitors' 37-40 average",
          "Early stage coverage pays out at diagnosis, not just major stages",
          "30% cheaper premium than AIA for same coverage amount"
        ],
        objectionHandling: "If price is a concern, we can structure this with a 10-year pay option instead of 25-year, which reduces total cost by 18%.",
        closingPitch: "Many families wished they had this before diagnosis. Let's lock in your current health status with today's rates - rates increase 3-5% annually."
      }
    },
    {
      id: 'LD-002',
      name: 'Susan Lee',
      score: 78,
      status: 'warm',
      lastContact: '1 day ago',
      nextBestAction: {
        type: 'whatsapp',
        timing: 'Tomorrow at 2:00 PM',
        reason: 'Historical data shows she responds best to WhatsApp on weekday afternoons',
        priority: 'medium'
      },
      engagement: {
        emailOpens: 5,
        websiteVisits: 6,
        socialInteractions: 3,
        lastActivity: 'Opened email yesterday'
      },
      aiInsights: {
        buyingSignals: ['Requested callback', 'Saved 2 quotes', 'Added products to wishlist'],
        concerns: ['Uncertain about coverage amount', 'Comparing multiple insurers'],
        optimalDay: 'Wednesday',
        optimalTime: '2:00 PM - 3:00 PM',
        successProbability: 72
      },
      talkingPoints: {
        opening: "Hi Susan! Thanks for saving those quotes. I see you're comparing options - smart move! Let me help you understand what works best for your situation.",
        valueProps: [
          "Our plans offer flexible coverage amounts - start at SGD 200K and scale up to SGD 2M as your needs grow",
          "We match competitor premiums + add 10% more coverage at the same price",
          "Free annual health checkup included (worth SGD 500) - most competitors charge extra",
          "You can adjust coverage every 2 years without medical re-evaluation"
        ],
        objectionHandling: "I understand you're comparing. Here's a quick tip: don't just compare premiums - check claim approval rates. We're at 97.8% vs industry average of 92%. That 5% difference could mean everything when you need it.",
        closingPitch: "Since you've already saved quotes, you're 80% there! Let's book a quick 15-min call tomorrow to answer any final questions. I can also run a comparison with any competitor quote you have - completely transparent."
      }
    },
    {
      id: 'LD-003',
      name: 'David Chen',
      score: 95,
      status: 'hot',
      lastContact: '30 minutes ago',
      nextBestAction: {
        type: 'meeting',
        timing: 'Schedule for tomorrow 10 AM',
        reason: 'Lead ready to proceed - mentioned "ready to sign" in last call',
        priority: 'high'
      },
      engagement: {
        emailOpens: 12,
        websiteVisits: 18,
        socialInteractions: 8,
        lastActivity: 'Requested meeting 30 mins ago'
      },
      aiInsights: {
        buyingSignals: ['Explicitly requested meeting', 'Asked about policy start dates', 'Inquired about payment methods', 'Strong purchase intent'],
        concerns: ['None detected - ready to buy'],
        optimalDay: 'Today',
        optimalTime: 'ASAP',
        successProbability: 94
      },
      talkingPoints: {
        opening: "David! Perfect timing. I have everything ready for our meeting tomorrow. You mentioned you're ready to move forward - I love working with decisive clients like you!",
        valueProps: [
          "Your policy can start as early as next Monday - fastest activation in Singapore",
          "Premium payment by GIRO means 2% discount + automatic coverage (never miss a payment)",
          "First 30 days cooling-off period - full refund if you change your mind, no questions asked",
          "Digital policy document + mobile app access within 24 hours of approval",
          "Exclusive: 3 months premium waiver if you refer 2 friends who sign up"
        ],
        objectionHandling: "You're clearly ready, so let me just address one thing upfront: Our medical screening is same-day via telemedicine. No waiting weeks for approval like traditional insurers. Most clients get approved in 48 hours.",
        closingPitch: "Tomorrow at 10 AM, bring your NRIC and we'll complete everything in 20 minutes. I'll have the application pre-filled to save your time. You'll walk out with instant coverage and peace of mind. Sound good?"
      }
    },
    {
      id: 'LD-004',
      name: 'Grace Tan',
      score: 65,
      status: 'warm',
      lastContact: '3 days ago',
      nextBestAction: {
        type: 'email',
        timing: 'Friday at 9:00 AM',
        reason: 'Send personalized education content based on her family situation',
        priority: 'medium'
      },
      engagement: {
        emailOpens: 4,
        websiteVisits: 5,
        socialInteractions: 2,
        lastActivity: 'Clicked education article 3 days ago'
      },
      aiInsights: {
        buyingSignals: ['Reading educational content', 'Engaged with blog posts', 'Subscribed to newsletter'],
        concerns: ['Still in research phase', 'Needs more education'],
        optimalDay: 'Friday',
        optimalTime: '9:00 AM - 10:00 AM',
        successProbability: 58
      },
      talkingPoints: {
        opening: "Hi Grace! I noticed you've been reading our education articles - love that you're doing your homework! Most people rush into insurance without understanding it. Let me help simplify things for you.",
        valueProps: [
          "We offer free 1-on-1 education sessions (no obligation) - understand EXACTLY what you're buying before deciding",
          "Our 'Insurance 101' video series breaks down complex terms into 5-minute clips",
          "Interactive calculator shows real-life scenarios - 'What if I get diagnosed at age 40? What payout?'",
          "Free policy review of any existing coverage you have - we'll tell you gaps honestly, even if you don't buy from us"
        ],
        objectionHandling: "I totally get that you're still learning - that's smart! How about this: I'll send you our 'Top 5 Mistakes People Make Buying Insurance' guide. It's a 3-minute read and will save you thousands. No sales pitch, I promise.",
        closingPitch: "Once you've read that guide, let's have a casual 15-min Zoom chat. Bring all your questions - even the 'dumb' ones (there aren't any!). You'll walk away understanding insurance better than most agents. Deal?"
      }
    },
    {
      id: 'LD-005',
      name: 'Michael Lim',
      score: 60,
      status: 'cold',
      lastContact: '1 week ago',
      nextBestAction: {
        type: 'email',
        timing: 'Wait 3 more days, then send re-engagement',
        reason: 'Pattern suggests he needs space - previous contacts too frequent',
        priority: 'low'
      },
      engagement: {
        emailOpens: 2,
        websiteVisits: 3,
        socialInteractions: 1,
        lastActivity: 'Brief website visit 1 week ago'
      },
      aiInsights: {
        buyingSignals: ['Initial interest shown', 'Browsed homepage only'],
        concerns: ['Low engagement', 'May not be ready', 'Possibly overwhelmed by outreach'],
        optimalDay: 'Monday',
        optimalTime: '8:00 AM - 9:00 AM',
        successProbability: 35
      },
      talkingPoints: {
        opening: "Hi Michael, just a quick check-in - no pressure! I know insurance isn't exciting and you might be busy. Just wanted to drop a helpful resource in case timing is ever right for you.",
        valueProps: [
          "Our 'No Hassle' approach: You tell us when YOU'RE ready, we don't chase",
          "Simple one-page quote - no 50-field forms or pushy follow-ups",
          "Get a quote valid for 90 days - come back anytime, price locked in",
          "Text-only communication if you prefer - some clients hate phone calls (we get it!)"
        ],
        objectionHandling: "Hey Michael, I totally get it if timing isn't right. Insurance falls low on priority lists - completely normal. But here's the thing: the best time to buy insurance is always 'before you need it'. Just keep us in mind when life changes (new job, marriage, kids, property). No hard feelings if now's not the time!",
        closingPitch: "No ask here - just leaving you with this: If you ever want a no-obligation quote (literally takes 2 minutes), text me '2MIN QUOTE' and I'll send a simple link. No follow-up unless you want it. Fair enough?"
      }
    },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'warm':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'cold':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-slate-400';
      default:
        return 'bg-slate-400';
    }
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return 'text-green-600 dark:text-green-400';
    if (prob >= 60) return 'text-blue-600 dark:text-blue-400';
    if (prob >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Perfect Touch AI Orchestrator</h2>
            <p className="text-sm text-muted-foreground">
              AI determines the perfect timing, channel, and message for each lead
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setView('priority')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'priority'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-foreground'
              }`}
            >
              Priority View
            </button>
            <button
              onClick={() => setView('timeline')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'timeline'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-foreground'
              }`}
            >
              Timeline View
            </button>
          </div>
        </div>
      </div>

      {/* AI Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Actions Due Now</div>
          <div className="text-3xl font-semibold text-foreground">2</div>
          <div className="text-xs text-red-600 dark:text-red-400 mt-1">High Priority</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Actions Today</div>
          <div className="text-3xl font-semibold text-foreground">5</div>
          <div className="text-xs text-muted-foreground mt-1">Scheduled</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Avg Success Rate</div>
          <div className="text-3xl font-semibold text-foreground">69%</div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">+15% with AI</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Time Saved</div>
          <div className="text-3xl font-semibold text-foreground">12h</div>
          <div className="text-xs text-muted-foreground mt-1">This week</div>
        </div>
      </div>

      {/* Lead Cards */}
      <div className="space-y-4">
        {leads
          .sort((a, b) => {
            if (view === 'priority') {
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              return priorityOrder[a.nextBestAction.priority] - priorityOrder[b.nextBestAction.priority];
            }
            return 0;
          })
          .map((lead) => (
            <div key={lead.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Priority Indicator */}
                  <div className={`${getPriorityColor(lead.nextBestAction.priority)} p-0.5 rounded-full mt-1`}>
                    <div className="bg-white dark:bg-background rounded-full p-2">
                      <Zap className={`h-4 w-4 ${getPriorityColor(lead.nextBestAction.priority).replace('bg-', 'text-')}`} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{lead.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                        {lead.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">Score: {lead.score}</span>
                    </div>

                    {/* Next Best Action */}
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary p-2 rounded-lg">
                          {getActionIcon(lead.nextBestAction.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-semibold text-foreground">
                              {lead.nextBestAction.type.toUpperCase()}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-primary font-medium">
                              {lead.nextBestAction.timing}
                            </span>
                          </div>
                          <p className="text-sm text-foreground">{lead.nextBestAction.reason}</p>
                        </div>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
                          Take Action
                        </button>
                      </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Email Opens</div>
                        <div className="text-lg font-semibold text-foreground">{lead.engagement.emailOpens}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Website Visits</div>
                        <div className="text-lg font-semibold text-foreground">{lead.engagement.websiteVisits}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Social Interactions</div>
                        <div className="text-lg font-semibold text-foreground">{lead.engagement.socialInteractions}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Success Probability</div>
                        <div className={`text-lg font-semibold ${getProbabilityColor(lead.aiInsights.successProbability)}`}>
                          {lead.aiInsights.successProbability}%
                        </div>
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-2 flex items-center space-x-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Buying Signals</span>
                        </div>
                        <div className="space-y-1">
                          {lead.aiInsights.buyingSignals.slice(0, 2).map((signal, idx) => (
                            <div key={idx} className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-2 py-1 rounded">
                              {signal}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-2 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>Concerns</span>
                        </div>
                        <div className="space-y-1">
                          {lead.aiInsights.concerns.slice(0, 2).map((concern, idx) => (
                            <div key={idx} className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-1 rounded">
                              {concern}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-2 flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Optimal Contact Time</span>
                        </div>
                        <div className="text-xs text-foreground bg-accent px-2 py-1 rounded mb-1">
                          {lead.aiInsights.optimalDay}
                        </div>
                        <div className="text-xs text-foreground bg-accent px-2 py-1 rounded">
                          {lead.aiInsights.optimalTime}
                        </div>
                      </div>
                    </div>

                    {/* Talking Points */}
                    {lead.talkingPoints && (
                      <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-semibold text-blue-900 dark:text-blue-100">AI-Generated Talking Points</span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-semibold text-foreground mb-1">Opening</div>
                            <p className="text-sm text-foreground bg-white dark:bg-background p-2 rounded-lg">{lead.talkingPoints.opening}</p>
                          </div>

                          <div>
                            <div className="text-xs font-semibold text-foreground mb-1">Value Propositions</div>
                            <div className="space-y-1">
                              {lead.talkingPoints.valueProps.map((prop, i) => (
                                <div key={i} className="flex items-start space-x-2 text-sm text-foreground bg-white dark:bg-background p-2 rounded-lg">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{prop}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs font-semibold text-foreground mb-1">Objection Handling</div>
                            <p className="text-sm text-foreground bg-white dark:bg-background p-2 rounded-lg">{lead.talkingPoints.objectionHandling}</p>
                          </div>

                          <div>
                            <div className="text-xs font-semibold text-foreground mb-1">Closing Pitch</div>
                            <p className="text-sm text-foreground bg-white dark:bg-background p-2 rounded-lg font-medium">{lead.talkingPoints.closingPitch}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <span>Last contact: {lead.lastContact}</span>
                <span>Last activity: {lead.engagement.lastActivity}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

