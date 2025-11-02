'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardLayout from '@/components/dashboard-layout';
import { Users, TrendingUp, ShoppingCart, BarChart3, ArrowUpRight, ArrowDownRight, Info, Target, Calendar, Zap, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<'singapore' | 'hongkong'>('singapore');
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const stats = {
    singapore: {
      totalCandidates: 47,
      totalLeads: 156,
      totalCustomers: 2847,
      totalAgents: 247,
      candidatesChange: 12,
      leadsChange: -5,
      customersChange: 8,
      agentsChange: 3,
    },
    hongkong: {
      totalCandidates: 38,
      totalLeads: 128,
      totalCustomers: 2156,
      totalAgents: 198,
      candidatesChange: 8,
      leadsChange: 7,
      customersChange: 5,
      agentsChange: -2,
    }
  };

  const currentStats = stats[selectedLocation];

  // AI Impact Metrics
  const aiImpact = [
    {
      id: 'revenue',
      value: 'SGD 2.4M',
      secondaryValue: 'vs 1.7M',
      label: 'Revenue (AI)',
      sublabel: '',
      color: 'emerald',
      reasoning: 'AI-driven improvements increased monthly revenue by 41% compared to pre-AI baseline (SGD 1.7M → SGD 2.4M). Enhanced lead qualification, optimal meeting scheduling, and cross-sell recommendations drive higher conversion.',
      trend: '+41%'
    },
    {
      id: 'leads',
      value: 847,
      label: 'Leads Qualified',
      color: 'purple',
      reasoning: 'AI analyzed social media profiles, financial data, and behavioral patterns to qualify these leads automatically.',
      trend: '+12%'
    },
    {
      id: 'time',
      value: '23.5h',
      label: 'Hours Saved',
      color: 'pink',
      reasoning: 'Time saved through automated lead qualification, document processing, and candidate screening.',
      trend: '+8h'
    },
    {
      id: 'conversion',
      value: '+18%',
      label: 'Conversion ↑',
      color: 'green',
      reasoning: 'AI-recommended products and timing optimization increased conversion rates significantly.',
      trend: '+3%'
    },
    {
      id: 'accepted',
      value: '76%',
      label: 'AI Accepted',
      color: 'blue',
      reasoning: 'Percentage of AI recommendations that were accepted and acted upon by agents.',
      trend: '+5%'
    },
    {
      id: 'accuracy',
      value: '89%',
      label: 'Accuracy',
      color: 'orange',
      reasoning: 'Success predictor and lead scoring accuracy validated against actual outcomes.',
      trend: '+2%'
    },
    {
      id: 'coached',
      value: 142,
      label: 'Agents Coached',
      color: 'indigo',
      reasoning: 'Agents receiving personalized AI coaching and training recommendations this month.',
      trend: '+18'
    },
  ];

  const automationRate = 67; // percentage of tasks automated

  // Live AI Activity Feed
  const activityTemplates = [
    // Automated mundane tasks
    { type: 'automated', agent: 'Document Processor', task: 'Extracted data from 15 application forms', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Email AI', task: 'Sent 23 follow-up emails automatically', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Social Intelligence AI', task: 'Qualified lead from LinkedIn profile analysis', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Calendar AI', task: 'Scheduled 8 meetings with optimal timing', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Data Entry AI', task: 'Updated 47 customer records in CRM', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Interview Simulator', task: 'Completed candidate pre-screening interview', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Product Matchmaker', task: 'Generated cross-sell opportunities for 12 clients', icon: CheckCircle, color: 'text-blue-600 dark:text-blue-400' },
    { type: 'automated', agent: 'Lead Scoring AI', task: 'Scored and prioritized 34 new leads', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Compliance Checker', task: 'Validated 19 policy documents for compliance', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Report Generator', task: 'Created weekly performance reports for 8 teams', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Personal Coach AI', task: 'Sent personalized coaching tips to 24 agents', icon: CheckCircle, color: 'text-purple-600 dark:text-purple-400' },
    { type: 'automated', agent: 'Reminder Bot', task: 'Sent 31 policy renewal reminders', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Conversation AI', task: 'Provided real-time call assistance to agent', icon: CheckCircle, color: 'text-blue-600 dark:text-blue-400' },
    { type: 'automated', agent: 'Life Event Simulator', task: 'Generated protection gap analysis', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { type: 'automated', agent: 'Lead Enrichment AI', task: 'Enriched 28 leads with social media data', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    
    // Human review needed
    { 
      type: 'review', 
      agent: 'Success Predictor', 
      task: 'High-risk candidate flagged for review', 
      icon: AlertCircle, 
      color: 'text-amber-600 dark:text-amber-400',
      reviewDetails: {
        candidate: 'Michael Chen',
        reason: 'Success probability below 60% threshold',
        risk: 'High attrition risk in first year',
        action: 'Review experience match and cultural fit',
        actionType: 'assessment'
      }
    },
    { 
      type: 'review', 
      agent: 'Skills DNA Analyzer', 
      task: 'Candidate skill mismatch requires review', 
      icon: AlertCircle, 
      color: 'text-amber-600 dark:text-amber-400',
      reviewDetails: {
        candidate: 'Sarah Wong',
        reason: 'Key skill gaps detected',
        risk: 'Missing critical product knowledge',
        action: 'Assess training potential and timeline',
        actionType: 'assessment'
      }
    },
    { 
      type: 'review', 
      agent: 'Social Intelligence AI', 
      task: 'Unusual social pattern detected - review needed', 
      icon: AlertCircle, 
      color: 'text-amber-600 dark:text-amber-400',
      reviewDetails: {
        lead: 'David Tan',
        reason: 'Conflicting information across platforms',
        risk: 'Possible fraud indicator',
        action: 'Manual verification of identity and financials',
        actionType: 'fraud-check'
      }
    },
    { 
      type: 'review', 
      agent: 'Product Matchmaker', 
      task: 'High-value upsell opportunity flagged', 
      icon: AlertCircle, 
      color: 'text-amber-600 dark:text-amber-400',
      reviewDetails: {
        client: 'Premium Client - Emma Lee',
        reason: 'SGD 250K opportunity detected',
        risk: 'Requires senior agent approval',
        action: 'Review personalized proposal and pricing',
        actionType: 'approval'
      }
    },
  ];

  useEffect(() => {
    // Initialize with 5 activities
    const initialActivities = activityTemplates.slice(0, 5).map((template, index) => ({
      ...template,
      id: Date.now() + index,
      timestamp: new Date(Date.now() - (5 - index) * 30000).toISOString(),
    }));
    setActivities(initialActivities);

    // Add new activity every 5-8 seconds
    const interval = setInterval(() => {
      const randomTemplate = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
      const newActivity = {
        ...randomTemplate,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep last 10
    }, Math.random() * 3000 + 5000); // Random between 5-8 seconds

    return () => clearInterval(interval);
  }, []);

  const modules = [
    {
      id: 'recruitment',
      title: 'Recruitment',
      description: 'Manage candidate pipeline and onboarding',
      icon: Users,
      href: '/recruitment',
      stat: currentStats.totalCandidates,
      statLabel: 'Active Candidates',
      change: currentStats.candidatesChange,
      color: 'bg-blue-500',
    },
    {
      id: 'leads',
      title: 'Leads',
      description: 'Track and convert sales leads',
      icon: TrendingUp,
      href: '/leads',
      stat: currentStats.totalLeads,
      statLabel: 'Total Leads',
      change: currentStats.leadsChange,
      color: 'bg-green-500',
    },
    {
      id: 'sell',
      title: 'Sell',
      description: 'Customer insights and recommendations',
      icon: ShoppingCart,
      href: '/sell',
      stat: currentStats.totalCustomers,
      statLabel: 'Customers',
      change: currentStats.customersChange,
      color: 'bg-purple-500',
    },
    {
      id: 'performance',
      title: 'Performance & Upskill',
      description: 'Agent performance and coaching',
      icon: BarChart3,
      href: '/performance',
      stat: currentStats.totalAgents,
      statLabel: 'Active Agents',
      change: currentStats.agentsChange,
      color: 'bg-amber-500',
    },
  ];

  return (
    <DashboardLayout location={selectedLocation}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Agency Distribution</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage your insurance agency operations
            </p>
          </div>
              <div className="flex items-center space-x-3">
                {/* Singapore Flag Circle */}
                <div className="flex flex-col items-center space-y-1">
                  <button
                    onClick={() => setSelectedLocation('singapore')}
                    className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden transition-all border-0 outline-none p-0 ${
                      selectedLocation === 'singapore'
                        ? 'opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ background: 'transparent' }}
                    title="Singapore"
                  >
                    <Image
                      src="/sg.png"
                      alt="Singapore"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  </button>
                  <div className={`h-0.5 w-6 rounded-full transition-all ${
                    selectedLocation === 'singapore' ? 'bg-blue-500' : 'bg-transparent'
                  }`} />
                </div>
                
                {/* Hong Kong Flag Circle */}
                <div className="flex flex-col items-center space-y-1">
                  <button
                    onClick={() => setSelectedLocation('hongkong')}
                    className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden transition-all border-0 outline-none p-0 ${
                      selectedLocation === 'hongkong'
                        ? 'opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ background: 'transparent' }}
                    title="Hong Kong"
                  >
                    <Image
                      src="/hk.png"
                      alt="Hong Kong"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  </button>
                  <div className={`h-0.5 w-6 rounded-full transition-all ${
                    selectedLocation === 'hongkong' ? 'bg-blue-500' : 'bg-transparent'
                  }`} />
                </div>
              </div>
        </div>

        {/* AI Impact Banner */}
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-0.5 rounded-xl">
          <div className="bg-background rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">AI Impact This Month</h2>
                <p className="text-sm text-muted-foreground">Powered by multi-agent intelligence</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-black border-2 border-blue-500 rounded-full">
                  <span className="text-blue-500 font-bold text-sm">{automationRate}% Automated</span>
                </div>
                <div className="px-4 py-2 bg-black border-2 border-pink-500 rounded-full">
                  <span className="text-pink-500 font-bold text-sm">+42% Efficiency</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
              {aiImpact.map((metric) => {
                const colorMap: any = {
                  emerald: 'text-emerald-500 border-emerald-500 bg-black',
                  purple: 'text-purple-500 border-purple-500 bg-black',
                  pink: 'text-pink-500 border-pink-500 bg-black',
                  green: 'text-green-500 border-green-500 bg-black',
                  blue: 'text-blue-500 border-blue-500 bg-black',
                  orange: 'text-orange-500 border-orange-500 bg-black',
                  indigo: 'text-indigo-500 border-indigo-500 bg-black',
                };
                
                return (
                  <div 
                    key={metric.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredMetric(metric.id)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <div className={`flex items-center justify-between px-6 py-3 rounded-full border-2 transition-all cursor-help ${colorMap[metric.color]}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`text-xl font-bold ${colorMap[metric.color].split(' ')[0]}`}>{metric.value}</div>
                        <div className="text-left">
                          <div className="text-xs font-medium leading-tight">{metric.label}</div>
                          {metric.sublabel && <div className="text-[9px] opacity-50">{metric.sublabel}</div>}
                          <div className="text-xs opacity-60">{metric.trend}</div>
                        </div>
                      </div>
                      <Info className="h-3 w-3 opacity-50 flex-shrink-0" />
                    </div>
                    
                    {hoveredMetric === metric.id && (
                      <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-popover border border-border rounded-lg shadow-xl">
                        <div className="text-xs text-popover-foreground leading-relaxed">
                          {metric.reasoning}
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-popover border-r border-b border-border"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            const isPositive = module.change >= 0;
            
            return (
              <Link 
                key={module.id}
                href={module.href}
                className="group"
              >
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${module.color} p-0.5 rounded-full`}>
                      <div className="bg-white dark:bg-background rounded-full p-3">
                        <Icon className={`h-6 w-6 ${module.color.replace('bg-', 'text-')}`} />
                      </div>
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {isPositive ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(module.change)}%
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-foreground">
                      {module.stat.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {module.statLabel}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Live AI Activity Feed */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Live AI Activity Feed</h2>
              <p className="text-sm text-muted-foreground">Real-time operational tasks completed by AI agents</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-black border-2 border-green-500 rounded-full">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-500">Live</span>
              </div>
              <div className="px-3 py-1.5 bg-black border-2 border-blue-500 rounded-full">
                <span className="text-xs font-bold text-blue-500">{automationRate}% Automated</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const isNew = index === 0;
              const timeAgo = Math.floor((Date.now() - new Date(activity.timestamp).getTime()) / 1000);
              const timeDisplay = timeAgo < 60 ? `${timeAgo}s ago` : `${Math.floor(timeAgo / 60)}m ago`;
              
              return (
                <div 
                  key={activity.id} 
                  onClick={() => activity.type === 'review' && activity.reviewDetails && setSelectedReview(activity)}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                    isNew 
                      ? 'border-primary bg-primary/5 animate-in fade-in slide-in-from-top-2 duration-500' 
                      : 'border-border bg-background'
                  } ${activity.type === 'review' ? 'border-amber-500/50 bg-amber-500/5 cursor-pointer hover:border-amber-500 hover:bg-amber-500/10' : ''}`}
                >
                  <div className={`mt-0.5 ${activity.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">{activity.agent}</span>
                      {activity.type === 'review' && (
                        <span className="px-3 py-1 bg-black border-2 border-amber-500 rounded-full text-xs font-bold text-amber-500">
                          Human Review · Click to review
                        </span>
                      )}
                      {activity.type === 'automated' && (
                        <span className="px-3 py-1 bg-black border-2 border-green-500 rounded-full text-xs font-bold text-green-500">
                          Automated
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{activity.task}</p>
                    
                    {/* Review Details Preview */}
                    {activity.type === 'review' && activity.reviewDetails && (
                      <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-semibold text-foreground">
                            Subject: {activity.reviewDetails.candidate || activity.reviewDetails.lead || activity.reviewDetails.client}
                          </div>
                          <button className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline">
                            View Full Details →
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">Reason:</span> {activity.reviewDetails.reason}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-amber-600 dark:text-amber-400">Risk:</span> {activity.reviewDetails.risk}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{timeDisplay}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{activities.filter(a => a.type === 'automated').length}</span> tasks automated, {' '}
              <span className="font-semibold text-amber-600 dark:text-amber-400">{activities.filter(a => a.type === 'review').length}</span> pending human review
            </div>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">View All →</button>
          </div>
        </div>

        {/* Performance Trends with Gradient Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Revenue Trend</h3>
            <div className="relative h-64">
              <svg width="100%" height="100%" viewBox="0 0 1000 256" preserveAspectRatio="none" className="overflow-visible">
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.05 }} />
                  </linearGradient>
                </defs>
                
                {/* Generate smooth curve path */}
                {(() => {
                  const dataPoints = [65, 72, 68, 78, 85, 92, 88, 95, 98, 102, 108, 115];
                  const maxValue = 115;
                  const padding = 10;
                  const width = 1000;
                  const height = 256;
                  const stepX = width / (dataPoints.length - 1);
                  
                  // Create points
                  const points = dataPoints.map((value, index) => ({
                    x: index * stepX,
                    y: height - ((value / maxValue) * (height - padding * 2)) - padding
                  }));
                  
                  // Create smooth curve using quadratic bezier
                  let pathData = `M ${points[0].x} ${points[0].y}`;
                  
                  for (let i = 0; i < points.length - 1; i++) {
                    const current = points[i];
                    const next = points[i + 1];
                    const midX = (current.x + next.x) / 2;
                    
                    pathData += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
                    pathData += ` Q ${next.x} ${next.y}, ${next.x} ${next.y}`;
                  }
                  
                  // Create fill path (area under curve)
                  const fillPath = pathData + ` L ${width} ${height} L 0 ${height} Z`;
                  
                  return (
                    <>
                      {/* Fill area with transparent gradient */}
                      <path
                        d={fillPath}
                        fill="url(#revenueGradient)"
                      />
                      
                      {/* Main line - solid pink */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="rgb(236, 72, 153)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Data points */}
                      {points.map((point, index) => (
                        <g key={index}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            fill="rgb(236, 72, 153)"
                            className="hover:r-5 transition-all cursor-pointer"
                          />
                          <text
                            x={point.x}
                            y={point.y - 15}
                            textAnchor="middle"
                            className="text-xs font-bold fill-foreground opacity-0 hover:opacity-100 transition-opacity"
                            style={{ pointerEvents: 'none' }}
                          >
                            SGD {dataPoints[index]}K
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
            <div className="flex justify-between mt-6 text-xs text-muted-foreground">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Agent Performance Distribution */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Agent Performance Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Top Performers (90%+)</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">32%</span>
                </div>
                <div className="h-3 bg-accent rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '32%',
                      background: 'linear-gradient(to right, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.8))',
                      border: '1px solid rgb(34, 197, 94)',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Good (70-89%)</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">48%</span>
                </div>
                <div className="h-3 bg-accent rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '48%',
                      background: 'linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.8))',
                      border: '1px solid rgb(59, 130, 246)',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground">Needs Support (&lt;70%)</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">20%</span>
                </div>
                <div className="h-3 bg-accent rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '20%',
                      background: 'linear-gradient(to right, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.8))',
                      border: '1px solid rgb(245, 158, 11)',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="text-sm font-semibold text-foreground mb-2">AI Recommendations</div>
              
              <div className="p-3 bg-blue-500/10 dark:bg-blue-500/10 rounded-lg border border-blue-500/20 dark:border-blue-500/20">
                <div className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">Coaching Priority</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  Schedule intensive coaching for 20% underperforming agents. Projected improvement: +15% in 30 days.
                </div>
              </div>

              <div className="p-3 bg-green-500/10 dark:bg-green-500/10 rounded-lg border border-green-500/20 dark:border-green-500/20">
                <div className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">Top Performer Rewards</div>
                <div className="text-xs text-green-700 dark:text-green-300">
                  32% top performers should mentor struggling agents. Consider bonus incentives to maintain momentum.
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 dark:bg-amber-500/10 rounded-lg border border-amber-500/20 dark:border-amber-500/20">
                <div className="text-xs font-semibold text-amber-900 dark:text-amber-100 mb-1">Skills Gap Analysis</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">
                  Middle tier (48%) needs advanced sales training. Focus on objection handling and closing techniques.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Insights & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5 rounded-xl">
            <div className="bg-background rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-950 rounded-full">
                  <Target className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Active Opportunities</h3>
              </div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">127</div>
              <p className="text-sm text-muted-foreground">Hot leads ready to close</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5 rounded-xl">
            <div className="bg-background rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-950 rounded-full">
                  <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Today's Activities</h3>
              </div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">43</div>
              <p className="text-sm text-muted-foreground">Scheduled meetings & calls</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5 rounded-xl">
            <div className="bg-background rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-950 rounded-full">
                  <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">AI Actions Pending</h3>
              </div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">18</div>
              <p className="text-sm text-muted-foreground">Recommendations to review</p>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">System Overview</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm font-medium text-foreground">
                {selectedLocation === 'singapore' ? 'Singapore' : 'Hong Kong'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">Active Modules</span>
              <span className="text-sm font-medium text-foreground">4 Operational</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">AI Agents</span>
              <span className="text-sm font-medium text-foreground">4 Specialized + Orchestrator</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div 
            className="bg-card border-2 border-amber-500 rounded-xl p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-950 rounded-full">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Human Review Required</h3>
                  <p className="text-sm text-muted-foreground">{selectedReview.agent}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReview(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">SUBJECT</div>
                <div className="text-sm font-semibold text-foreground">
                  {selectedReview.reviewDetails.candidate || selectedReview.reviewDetails.lead || selectedReview.reviewDetails.client}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">REASON</div>
                <div className="text-sm text-foreground">{selectedReview.reviewDetails.reason}</div>
              </div>
              
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">RISK / OPPORTUNITY</div>
                <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">{selectedReview.reviewDetails.risk}</div>
              </div>
              
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">RECOMMENDED ACTION</div>
                <div className="text-sm text-foreground">{selectedReview.reviewDetails.action}</div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              {/* Contextual buttons based on actionType */}
              {selectedReview.reviewDetails.actionType === 'fraud-check' && (
                <>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="flex-1 px-6 py-2.5 bg-black border-2 border-blue-500 text-blue-500 rounded-full font-bold hover:bg-blue-500 hover:text-black transition-all"
                  >
                    View Full Details
                  </button>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="flex-1 px-6 py-2.5 bg-black border-2 border-red-500 text-red-500 rounded-full font-bold hover:bg-red-500 hover:text-black transition-all"
                  >
                    Flag Risk
                  </button>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="px-6 py-2.5 bg-black border-2 border-green-500 text-green-500 rounded-full font-bold hover:bg-green-500 hover:text-black transition-all"
                  >
                    Mark Safe
                  </button>
                </>
              )}
              
              {selectedReview.reviewDetails.actionType === 'approval' && (
                <>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="flex-1 px-6 py-2.5 bg-black border-2 border-green-500 text-green-500 rounded-full font-bold hover:bg-green-500 hover:text-black transition-all"
                  >
                    ✓ Approve
                  </button>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="flex-1 px-6 py-2.5 bg-black border-2 border-amber-500 text-amber-500 rounded-full font-bold hover:bg-amber-500 hover:text-black transition-all"
                  >
                    Modify Terms
                  </button>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="px-6 py-2.5 bg-black border-2 border-slate-500 text-slate-400 rounded-full font-bold hover:bg-slate-500 hover:text-black transition-all"
                  >
                    Reject
                  </button>
                </>
              )}
              
              {selectedReview.reviewDetails.actionType === 'assessment' && (
                <>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="flex-1 px-6 py-2.5 bg-black border-2 border-blue-500 text-blue-500 rounded-full font-bold hover:bg-blue-500 hover:text-black transition-all"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="flex-1 px-6 py-2.5 bg-black border-2 border-green-500 text-green-500 rounded-full font-bold hover:bg-green-500 hover:text-black transition-all"
                  >
                    Schedule Review
                  </button>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="px-6 py-2.5 bg-black border-2 border-slate-500 text-slate-400 rounded-full font-bold hover:bg-slate-500 hover:text-black transition-all"
                  >
                    Later
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
