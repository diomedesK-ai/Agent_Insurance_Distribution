'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingDown, Users, CheckCircle2, XCircle, Phone, MessageSquare, Calendar, DollarSign } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  tenure: string;
  currentPerformance: {
    mtdSales: string;
    target: string;
    achievement: number;
  };
  lapseRisk: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  riskFactors: {
    factor: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    detail: string;
  }[];
  earlyWarnings: string[];
  recommendedActions: {
    priority: number;
    action: string;
    timing: string;
  }[];
  prediction: {
    likelyToLeave: number;
    timeframe: string;
    costOfReplacement: string;
  };
}

export default function AgentLapsePredictor() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [filterRisk, setFilterRisk] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');

  const agents: Agent[] = [
    {
      id: 'AGT-001',
      name: 'James Lim',
      tenure: '2 years 3 months',
      currentPerformance: {
        mtdSales: 'SGD 12K',
        target: 'SGD 35K',
        achievement: 34
      },
      lapseRisk: 92,
      riskLevel: 'critical',
      riskFactors: [
        { factor: 'Performance Decline', severity: 'critical', detail: '3 consecutive months below target - down 68% from peak' },
        { factor: 'Engagement Drop', severity: 'critical', detail: 'Missed 4 team meetings, zero training attendance' },
        { factor: 'Social Signals', severity: 'high', detail: 'LinkedIn profile updated, resume activity detected' },
        { factor: 'Income Stress', severity: 'critical', detail: 'Earning SGD 3.2K/month avg - below liveable wage' }
      ],
      earlyWarnings: [
        'Asking about exit procedures',
        'Declined renewal of business cards',
        'Not returning client calls promptly',
        'Closed social media accounts'
      ],
      recommendedActions: [
        { priority: 1, action: 'URGENT: Schedule 1-on-1 with manager TODAY', timing: 'Within 24 hours' },
        { priority: 2, action: 'Offer temporary draw/advance on commissions', timing: 'This week' },
        { priority: 3, action: 'Pair with mentor for joint calls', timing: 'Starting next week' },
        { priority: 4, action: 'Review and adjust target expectations', timing: 'This month' }
      ],
      prediction: {
        likelyToLeave: 94,
        timeframe: '2-4 weeks',
        costOfReplacement: 'SGD 45,000'
      }
    },
    {
      id: 'AGT-002',
      name: 'Rachel Tan',
      tenure: '8 months',
      currentPerformance: {
        mtdSales: 'SGD 22K',
        target: 'SGD 30K',
        achievement: 73
      },
      lapseRisk: 78,
      riskLevel: 'high',
      riskFactors: [
        { factor: 'New Agent Struggle', severity: 'high', detail: 'First-year challenges - inconsistent results' },
        { factor: 'Work-Life Balance', severity: 'high', detail: 'Complained about weekend work expectations' },
        { factor: 'Training Gaps', severity: 'medium', detail: 'Missing key product knowledge certifications' },
        { factor: 'Peer Comparison', severity: 'medium', detail: 'Cohort members earning 40% more' }
      ],
      earlyWarnings: [
        'Expressing doubt about career choice',
        'Reduced prospecting activity',
        'Comparing to corporate job offers'
      ],
      recommendedActions: [
        { priority: 1, action: 'Enroll in accelerated product training', timing: 'This week' },
        { priority: 2, action: 'Assign warm leads from agency pool', timing: 'Immediate' },
        { priority: 3, action: 'Celebrate small wins publicly', timing: 'Ongoing' },
        { priority: 4, action: 'Flexible schedule arrangement', timing: 'Next month' }
      ],
      prediction: {
        likelyToLeave: 76,
        timeframe: '1-2 months',
        costOfReplacement: 'SGD 38,000'
      }
    },
    {
      id: 'AGT-003',
      name: 'Marcus Chen',
      tenure: '3 years 7 months',
      currentPerformance: {
        mtdSales: 'SGD 48K',
        target: 'SGD 50K',
        achievement: 96
      },
      lapseRisk: 64,
      riskLevel: 'medium',
      riskFactors: [
        { factor: 'Career Plateau', severity: 'medium', detail: 'Sensing lack of growth opportunities' },
        { factor: 'Compensation Concerns', severity: 'medium', detail: 'Mentioned competitors offering better splits' },
        { factor: 'External Offers', severity: 'high', detail: 'Received headhunter approach from competitor' }
      ],
      earlyWarnings: [
        'Asking about management track opportunities',
        'Less enthusiastic in meetings',
        'Networking with other agencies'
      ],
      recommendedActions: [
        { priority: 1, action: 'Discuss leadership/management track', timing: 'This week' },
        { priority: 2, action: 'Review and enhance commission structure', timing: 'Within 2 weeks' },
        { priority: 3, action: 'Offer team lead or mentor role', timing: 'Next quarter' }
      ],
      prediction: {
        likelyToLeave: 62,
        timeframe: '3-6 months',
        costOfReplacement: 'SGD 85,000'
      }
    },
    {
      id: 'AGT-004',
      name: 'Lisa Wong',
      tenure: '5 years 2 months',
      currentPerformance: {
        mtdSales: 'SGD 65K',
        target: 'SGD 60K',
        achievement: 108
      },
      lapseRisk: 32,
      riskLevel: 'low',
      riskFactors: [
        { factor: 'Personal Life Changes', severity: 'low', detail: 'Recently married - potential relocation' }
      ],
      earlyWarnings: [
        'Mentioned spouse job opportunity in another city'
      ],
      recommendedActions: [
        { priority: 1, action: 'Explore remote work or satellite office options', timing: 'Proactive discussion' },
        { priority: 2, action: 'Maintain regular check-ins', timing: 'Monthly' }
      ],
      prediction: {
        likelyToLeave: 28,
        timeframe: '12+ months',
        costOfReplacement: 'SGD 120,000'
      }
    },
    {
      id: 'AGT-005',
      name: 'Kevin Ng',
      tenure: '1 year 9 months',
      currentPerformance: {
        mtdSales: 'SGD 18K',
        target: 'SGD 28K',
        achievement: 64
      },
      lapseRisk: 85,
      riskLevel: 'critical',
      riskFactors: [
        { factor: 'Financial Pressure', severity: 'critical', detail: 'Visible stress about income inconsistency' },
        { factor: 'Family Opposition', severity: 'high', detail: 'Family pressuring to return to corporate job' },
        { factor: 'Confidence Issues', severity: 'high', detail: 'Hesitant in client meetings, avoiding difficult conversations' },
        { factor: 'Lead Pipeline Dry', severity: 'critical', detail: 'Only 3 active prospects - urgent intervention needed' }
      ],
      earlyWarnings: [
        'Talking about job security concerns',
        'Reduced work hours',
        'Not investing in business development'
      ],
      recommendedActions: [
        { priority: 1, action: 'Emergency lead allocation from agency', timing: 'Immediately' },
        { priority: 2, action: 'Joint client meetings with senior agent', timing: 'This week' },
        { priority: 3, action: 'Sales coaching intensive program', timing: 'Starting next week' },
        { priority: 4, action: 'Temporary income support/advance', timing: 'This month' }
      ],
      prediction: {
        likelyToLeave: 88,
        timeframe: '3-5 weeks',
        costOfReplacement: 'SGD 42,000'
      }
    }
  ];

  const filteredAgents = filterRisk === 'all' 
    ? agents 
    : agents.filter(a => a.riskLevel === filterRisk);

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'text-red-600 dark:text-red-400';
    if (risk >= 60) return 'text-amber-600 dark:text-amber-400';
    if (risk >= 40) return 'text-blue-600 dark:text-blue-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'medium':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'low':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      default:
        return '';
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'critical' || severity === 'high') return <AlertTriangle className="h-4 w-4 text-red-600" />;
    return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Agent Lapse Predictor</h2>
            <p className="text-sm text-muted-foreground">
              AI identifies agents at risk of leaving and recommends retention strategies
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-orange-500 p-0.5 rounded-full">
            <div className="bg-white dark:bg-background rounded-full p-3">
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-red-600">{agents.filter(a => a.riskLevel === 'critical').length}</div>
          <div className="text-sm text-muted-foreground">Critical Risk</div>
        </div>
        <div className="bg-card border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-amber-600">{agents.filter(a => a.riskLevel === 'high').length}</div>
          <div className="text-sm text-muted-foreground">High Risk</div>
        </div>
        <div className="bg-card border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-blue-600">{agents.filter(a => a.riskLevel === 'medium').length}</div>
          <div className="text-sm text-muted-foreground">Medium Risk</div>
        </div>
        <div className="bg-card border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="text-3xl font-bold text-green-600">{agents.filter(a => a.riskLevel === 'low').length}</div>
          <div className="text-sm text-muted-foreground">Low Risk</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-foreground">Filter by Risk:</span>
        <button
          onClick={() => setFilterRisk('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRisk === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterRisk('critical')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRisk === 'critical'
              ? 'bg-red-600 text-white'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          Critical
        </button>
        <button
          onClick={() => setFilterRisk('high')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRisk === 'high'
              ? 'bg-amber-600 text-white'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          High
        </button>
        <button
          onClick={() => setFilterRisk('medium')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRisk === 'medium'
              ? 'bg-blue-600 text-white'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setFilterRisk('low')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filterRisk === 'low'
              ? 'bg-green-600 text-white'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          Low
        </button>
      </div>

      {selectedAgent ? (
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={() => setSelectedAgent(null)}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            ← Back to all agents
          </button>

          {/* Agent Detail */}
          <div className={`border-2 rounded-xl p-6 ${
            selectedAgent.riskLevel === 'critical' ? 'bg-red-50 dark:bg-red-950/20 border-red-500' :
            selectedAgent.riskLevel === 'high' ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-500' :
            selectedAgent.riskLevel === 'medium' ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-500' :
            'bg-green-50 dark:bg-green-950/20 border-green-500'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedAgent.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Tenure: {selectedAgent.tenure}</p>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskBadge(selectedAgent.riskLevel)}`}>
                    {selectedAgent.riskLevel.toUpperCase()} RISK
                  </span>
                  {selectedAgent.riskLevel === 'critical' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white animate-pulse">
                      ⚠️ URGENT ACTION REQUIRED
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-5xl font-bold ${getRiskColor(selectedAgent.lapseRisk)}`}>
                  {selectedAgent.lapseRisk}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">Lapse Risk</div>
              </div>
            </div>

            {/* Current Performance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-white dark:bg-background rounded-lg border border-border">
                <div className="text-lg font-bold text-foreground">{selectedAgent.currentPerformance.mtdSales}</div>
                <div className="text-xs text-muted-foreground">MTD Sales</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-background rounded-lg border border-border">
                <div className="text-lg font-bold text-foreground">{selectedAgent.currentPerformance.target}</div>
                <div className="text-xs text-muted-foreground">Target</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-background rounded-lg border border-border">
                <div className={`text-lg font-bold ${selectedAgent.currentPerformance.achievement < 50 ? 'text-red-600' : selectedAgent.currentPerformance.achievement < 80 ? 'text-amber-600' : 'text-green-600'}`}>
                  {selectedAgent.currentPerformance.achievement}%
                </div>
                <div className="text-xs text-muted-foreground">Achievement</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-background rounded-lg border border-border">
                <div className="text-lg font-bold text-red-600">{selectedAgent.prediction.likelyToLeave}%</div>
                <div className="text-xs text-muted-foreground">Leave Probability</div>
              </div>
            </div>

            {/* Prediction */}
            <div className="bg-white dark:bg-background border border-border rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">AI Prediction</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Likely Departure Timeframe</div>
                  <div className="text-lg font-bold text-red-600">{selectedAgent.prediction.timeframe}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Cost of Replacement</div>
                  <div className="text-lg font-bold text-foreground">{selectedAgent.prediction.costOfReplacement}</div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span>Risk Factors Detected</span>
              </h4>
              <div className="space-y-2">
                {selectedAgent.riskFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-white dark:bg-background rounded-lg border border-border">
                    {getSeverityIcon(factor.severity)}
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground mb-1">{factor.factor}</div>
                      <div className="text-xs text-muted-foreground">{factor.detail}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskBadge(factor.severity)}`}>
                      {factor.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Early Warnings */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Early Warning Signs</h4>
              <div className="space-y-2">
                {selectedAgent.earlyWarnings.map((warning, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm p-2 bg-white dark:bg-background rounded-lg">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{warning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Recommended Retention Actions</h4>
              <div className="space-y-3">
                {selectedAgent.recommendedActions.map((action, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-white dark:bg-background rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {action.priority}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground mb-1">{action.action}</div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{action.timing}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all">
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all">
                <Calendar className="h-4 w-4" />
                <span>Schedule 1-on-1</span>
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
          {filteredAgents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                agent.riskLevel === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-950/20 hover:border-red-600' :
                agent.riskLevel === 'high' ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20 hover:border-amber-600' :
                agent.riskLevel === 'medium' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 hover:border-blue-600' :
                'border-green-500 bg-green-50 dark:bg-green-950/20 hover:border-green-600'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskBadge(agent.riskLevel)}`}>
                  {agent.riskLevel.toUpperCase()}
                </span>
                <div className={`text-2xl font-bold ${getRiskColor(agent.lapseRisk)}`}>
                  {agent.lapseRisk}%
                </div>
              </div>

              <h4 className="text-lg font-semibold text-foreground mb-1">{agent.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{agent.tenure}</p>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <div className="text-muted-foreground">Achievement</div>
                  <div className={`font-semibold ${agent.currentPerformance.achievement < 50 ? 'text-red-600' : agent.currentPerformance.achievement < 80 ? 'text-amber-600' : 'text-green-600'}`}>
                    {agent.currentPerformance.achievement}%
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Exit Timeline</div>
                  <div className="font-semibold text-foreground">{agent.prediction.timeframe}</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {agent.riskFactors.length} risk factors detected
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

