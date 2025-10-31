'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Award, AlertTriangle, Target, Zap, Calendar, ArrowRight } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  currentScore: number;
  predictions: {
    year1: { commission: number; policies: number; retention: number; probability: number };
    year2: { commission: number; policies: number; retention: number; probability: number };
    year3: { commission: number; policies: number; retention: number; probability: number };
  };
  trajectory: 'rising-star' | 'steady-performer' | 'high-risk' | 'elite-potential';
  keyFactors: {
    positive: string[];
    risks: string[];
  };
  recommendedActions: string[];
  comparisonToAverage: number;
  likelyToSucceed: number;
}

export default function SuccessPredictor() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const candidates: Candidate[] = [
    {
      id: 'C001',
      name: 'Alice Tan',
      currentScore: 92,
      predictions: {
        year1: { commission: 85000, policies: 42, retention: 88, probability: 92 },
        year2: { commission: 125000, policies: 58, retention: 92, probability: 88 },
        year3: { commission: 180000, policies: 72, retention: 94, probability: 85 },
      },
      trajectory: 'elite-potential',
      keyFactors: {
        positive: [
          'Exceptional sales DNA (96/100)',
          'High empathy and communication skills',
          'Strong track record in similar roles',
          '5 years relevant experience',
          'Matches profile of top 1% performers',
        ],
        risks: [
          'Technical knowledge gap needs training',
          'Limited product certification background',
        ],
      },
      recommendedActions: [
        'Fast-track onboarding program',
        'Pair with technical mentor for first 3 months',
        'Enroll in advanced product training immediately',
        'Set aggressive but achievable Year 1 targets',
      ],
      comparisonToAverage: 145,
      likelyToSucceed: 89,
    },
    {
      id: 'C002',
      name: 'Ben Lim',
      currentScore: 78,
      predictions: {
        year1: { commission: 55000, policies: 28, retention: 82, probability: 78 },
        year2: { commission: 72000, policies: 35, retention: 85, probability: 72 },
        year3: { commission: 85000, policies: 42, retention: 87, probability: 68 },
      },
      trajectory: 'steady-performer',
      keyFactors: {
        positive: [
          'Strong technical knowledge (92/100)',
          'Detail-oriented and methodical',
          'Good analytical skills',
        ],
        risks: [
          'Low sales drive (68/100)',
          'Limited client empathy',
          'May struggle with rejection',
          'Communication skills below benchmark',
        ],
      },
      recommendedActions: [
        'Intensive sales training program',
        'Weekly coaching on client engagement',
        'Role-playing exercises for emotional intelligence',
        'Set conservative Year 1 targets to build confidence',
      ],
      comparisonToAverage: 85,
      likelyToSucceed: 72,
    },
    {
      id: 'C003',
      name: 'Catherine Wong',
      currentScore: 88,
      predictions: {
        year1: { commission: 75000, policies: 38, retention: 90, probability: 88 },
        year2: { commission: 110000, policies: 52, retention: 93, probability: 85 },
        year3: { commission: 155000, policies: 68, retention: 95, probability: 82 },
      },
      trajectory: 'rising-star',
      keyFactors: {
        positive: [
          'Excellent leadership potential',
          'High resilience (94/100)',
          'Balanced skillset across all dimensions',
          '7 years management experience',
          'Exceptional client retention predictor',
        ],
        risks: [
          'Limited direct sales experience in insurance',
          'May take longer to ramp up initially',
        ],
      },
      recommendedActions: [
        'Accelerated leadership development path',
        'Intensive product and sales bootcamp',
        'Early team-building opportunities',
        'Position for future agency leader role',
      ],
      comparisonToAverage: 128,
      likelyToSucceed: 85,
    },
    {
      id: 'C004',
      name: 'David Chen',
      currentScore: 65,
      predictions: {
        year1: { commission: 42000, policies: 20, retention: 75, probability: 65 },
        year2: { commission: 48000, policies: 24, retention: 78, probability: 58 },
        year3: { commission: 52000, policies: 26, retention: 80, probability: 52 },
      },
      trajectory: 'high-risk',
      keyFactors: {
        positive: [
          'High resilience and work ethic',
          'Coachable and eager to learn',
        ],
        risks: [
          'Significant skill gaps across multiple areas',
          'Low sales aptitude (58/100)',
          'Weak communication skills',
          'Limited relevant experience',
          'Below benchmark in 4 out of 6 key dimensions',
        ],
      },
      recommendedActions: [
        'Recommend additional assessment before hiring',
        'If hired: Extended training program (6+ months)',
        'Close daily supervision and coaching',
        'Set very conservative targets',
        'Regular performance reviews',
      ],
      comparisonToAverage: 52,
      likelyToSucceed: 58,
    },
    {
      id: 'C005',
      name: 'Emily Tan',
      currentScore: 95,
      predictions: {
        year1: { commission: 95000, policies: 48, retention: 92, probability: 95 },
        year2: { commission: 145000, policies: 65, retention: 95, probability: 92 },
        year3: { commission: 210000, policies: 82, retention: 96, probability: 90 },
      },
      trajectory: 'elite-potential',
      keyFactors: {
        positive: [
          'Elite-level sales DNA (98/100)',
          'Exceptional communication and empathy',
          'Strong analytical and technical skills',
          'Matches top 0.1% performer profile',
          '6 years proven track record',
          'Natural leadership qualities',
        ],
        risks: [
          'None identified - star candidate',
          'May have high salary expectations',
        ],
      },
      recommendedActions: [
        'Make competitive offer immediately',
        'Fast-track to senior agent track',
        'Provide mentorship opportunities from day one',
        'Position for leadership development',
        'Set stretch goals with high earning potential',
      ],
      comparisonToAverage: 175,
      likelyToSucceed: 94,
    },
    {
      id: 'C006',
      name: 'Frank Ng',
      currentScore: 82,
      predictions: {
        year1: { commission: 68000, policies: 34, retention: 85, probability: 82 },
        year2: { commission: 92000, policies: 44, retention: 88, probability: 78 },
        year3: { commission: 118000, policies: 54, retention: 90, probability: 75 },
      },
      trajectory: 'steady-performer',
      keyFactors: {
        positive: [
          'Strong analytical skills (92/100)',
          'Excellent technical knowledge (90/100)',
          'Good communication abilities',
          '4 years relevant experience',
        ],
        risks: [
          'Moderate sales drive',
          'May struggle with high-volume prospecting',
          'Client empathy below top performer benchmark',
        ],
      },
      recommendedActions: [
        'Focus on quality over quantity approach',
        'Leverage analytical strengths for complex cases',
        'Provide empathy and relationship training',
        'Consider for corporate/group insurance specialist',
      ],
      comparisonToAverage: 108,
      likelyToSucceed: 78,
    },
  ];

  const getTrajectoryIcon = (trajectory: string) => {
    switch (trajectory) {
      case 'elite-potential':
        return '🚀';
      case 'rising-star':
        return '⭐';
      case 'steady-performer':
        return '📊';
      case 'high-risk':
        return '⚠️';
      default:
        return '📈';
    }
  };

  const getTrajectoryColor = (trajectory: string) => {
    switch (trajectory) {
      case 'elite-potential':
        return 'bg-white dark:bg-background text-purple-600 dark:text-purple-400 border-2 border-purple-500';
      case 'rising-star':
        return 'bg-white dark:bg-background text-green-600 dark:text-green-400 border-2 border-green-500';
      case 'steady-performer':
        return 'bg-white dark:bg-background text-blue-600 dark:text-blue-400 border-2 border-blue-500';
      case 'high-risk':
        return 'bg-white dark:bg-background text-red-600 dark:text-red-400 border-2 border-red-500';
      default:
        return 'bg-white dark:bg-background text-slate-600 dark:text-slate-400 border-2 border-slate-400';
    }
  };

  const getSuccessColor = (probability: number) => {
    if (probability >= 85) return 'text-green-600 dark:text-green-400';
    if (probability >= 70) return 'text-blue-600 dark:text-blue-400';
    if (probability >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const formatCurrency = (amount: number) => {
    return `SGD ${amount.toLocaleString()}`;
  };

  const getRecommendationBadge = (score: number) => {
    if (score >= 90) return { text: 'HIRE IMMEDIATELY', color: 'bg-white dark:bg-background text-green-600 dark:text-green-400 border-2 border-green-500' };
    if (score >= 80) return { text: 'STRONG HIRE', color: 'bg-white dark:bg-background text-blue-600 dark:text-blue-400 border-2 border-blue-500' };
    if (score >= 70) return { text: 'CONDITIONAL HIRE', color: 'bg-white dark:bg-background text-amber-600 dark:text-amber-400 border-2 border-amber-500' };
    return { text: 'NOT RECOMMENDED', color: 'bg-white dark:bg-background text-red-600 dark:text-red-400 border-2 border-red-500' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">3-Year Success Predictor</h2>
            <p className="text-sm text-muted-foreground">
              AI predicts candidate success trajectory and earnings potential
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-blue-500 p-0.5 rounded-full">
            <div className="bg-white dark:bg-background rounded-full p-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Selection or Detail View */}
      {!selectedCandidate ? (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Select a Candidate to Predict</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((candidate) => {
              const badge = getRecommendationBadge(candidate.currentScore);
              return (
                <button
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className="p-6 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent transition-all text-left"
                >
                  <div className="flex items-center justify-end mb-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${badge.color}`}>
                      {badge.text}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{candidate.name}</h4>
                  <div className="mb-3">
                    <div className={`inline-flex items-baseline space-x-1 px-3 py-1 rounded-lg ${
                      candidate.likelyToSucceed >= 85 
                        ? 'bg-green-100 dark:bg-green-950' 
                        : candidate.likelyToSucceed >= 70 
                        ? 'bg-blue-100 dark:bg-blue-950' 
                        : candidate.likelyToSucceed >= 60 
                        ? 'bg-amber-100 dark:bg-amber-950' 
                        : 'bg-red-100 dark:bg-red-950'
                    }`}>
                      <span className={`text-2xl font-bold ${
                        candidate.likelyToSucceed >= 85 
                          ? 'text-green-600 dark:text-green-400' 
                          : candidate.likelyToSucceed >= 70 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : candidate.likelyToSucceed >= 60 
                          ? 'text-amber-600 dark:text-amber-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {candidate.likelyToSucceed}
                      </span>
                      <span className={`text-sm font-medium ${
                        candidate.likelyToSucceed >= 85 
                          ? 'text-green-600 dark:text-green-400' 
                          : candidate.likelyToSucceed >= 70 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : candidate.likelyToSucceed >= 60 
                          ? 'text-amber-600 dark:text-amber-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        %
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Likely to Succeed</div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Year 3 Projection:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(candidate.predictions.year3.commission)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={() => setSelectedCandidate(null)}
            className="text-sm text-primary hover:underline"
          >
            ← Back to All Candidates
          </button>

          {/* Candidate Header */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{selectedCandidate.name}</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-medium border ${getTrajectoryColor(selectedCandidate.trajectory)}`}>
                    {selectedCandidate.trajectory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getRecommendationBadge(selectedCandidate.currentScore).color}`}>
                    {getRecommendationBadge(selectedCandidate.currentScore).text}
                  </span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className={`inline-flex items-baseline space-x-1 px-4 py-2 rounded-xl ${
                  selectedCandidate.likelyToSucceed >= 85 
                    ? 'bg-green-100 dark:bg-green-950' 
                    : selectedCandidate.likelyToSucceed >= 70 
                    ? 'bg-blue-100 dark:bg-blue-950' 
                    : selectedCandidate.likelyToSucceed >= 60 
                    ? 'bg-amber-100 dark:bg-amber-950' 
                    : 'bg-red-100 dark:bg-red-950'
                }`}>
                  <span className={`text-4xl font-bold ${
                    selectedCandidate.likelyToSucceed >= 85 
                      ? 'text-green-600 dark:text-green-400' 
                      : selectedCandidate.likelyToSucceed >= 70 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : selectedCandidate.likelyToSucceed >= 60 
                      ? 'text-amber-600 dark:text-amber-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {selectedCandidate.likelyToSucceed}
                  </span>
                  <span className={`text-xl font-medium ${
                    selectedCandidate.likelyToSucceed >= 85 
                      ? 'text-green-600 dark:text-green-400' 
                      : selectedCandidate.likelyToSucceed >= 70 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : selectedCandidate.likelyToSucceed >= 60 
                      ? 'text-amber-600 dark:text-amber-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    %
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Success Probability</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Current Score</div>
                <div className="text-2xl font-bold text-primary">{selectedCandidate.currentScore}</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">vs Average</div>
                <div className="text-2xl font-bold text-foreground">{selectedCandidate.comparisonToAverage}%</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Trajectory</div>
                <div className={`text-lg font-bold ${selectedCandidate.trajectory === 'elite-potential' || selectedCandidate.trajectory === 'rising-star' ? 'text-green-600' : selectedCandidate.trajectory === 'high-risk' ? 'text-red-600' : 'text-blue-600'}`}>
                  {selectedCandidate.trajectory === 'elite-potential' || selectedCandidate.trajectory === 'rising-star' ? '↗️ Rising' : selectedCandidate.trajectory === 'high-risk' ? '↘️ Risk' : '→ Steady'}
                </div>
              </div>
            </div>
          </div>

          {/* 3-Year Predictions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">3-Year Performance Forecast</h3>
            
            <div className="space-y-4">
              {/* Year 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/30 dark:to-transparent rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-lg font-semibold text-foreground">Year 1</h4>
                    <span className={`text-sm font-semibold ${getSuccessColor(selectedCandidate.predictions.year1.probability)}`}>
                      {selectedCandidate.predictions.year1.probability}% Probability
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Commission</div>
                    <div className="text-xl font-bold text-foreground">{formatCurrency(selectedCandidate.predictions.year1.commission)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Policies Sold</div>
                    <div className="text-xl font-bold text-foreground">{selectedCandidate.predictions.year1.policies}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Retention Rate</div>
                    <div className="text-xl font-bold text-foreground">{selectedCandidate.predictions.year1.retention}%</div>
                  </div>
                </div>
              </div>

              {/* Year 2 */}
              <div className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/30 dark:to-transparent rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <h4 className="text-lg font-semibold text-foreground">Year 2</h4>
                    <span className={`text-sm font-semibold ${getSuccessColor(selectedCandidate.predictions.year2.probability)}`}>
                      {selectedCandidate.predictions.year2.probability}% Probability
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{Math.round(((selectedCandidate.predictions.year2.commission - selectedCandidate.predictions.year1.commission) / selectedCandidate.predictions.year1.commission) * 100)}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Commission</div>
                    <div className="text-xl font-bold text-foreground">{formatCurrency(selectedCandidate.predictions.year2.commission)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Policies Sold</div>
                    <div className="text-xl font-bold text-foreground">{selectedCandidate.predictions.year2.policies}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Retention Rate</div>
                    <div className="text-xl font-bold text-foreground">{selectedCandidate.predictions.year2.retention}%</div>
                  </div>
                </div>
              </div>

              {/* Year 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30 dark:to-transparent rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h4 className="text-lg font-semibold text-foreground">Year 3</h4>
                    <span className={`text-sm font-semibold ${getSuccessColor(selectedCandidate.predictions.year3.probability)}`}>
                      {selectedCandidate.predictions.year3.probability}% Probability
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400 font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{Math.round(((selectedCandidate.predictions.year3.commission - selectedCandidate.predictions.year2.commission) / selectedCandidate.predictions.year2.commission) * 100)}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Commission</div>
                    <div className="text-xl font-bold text-foreground">{formatCurrency(selectedCandidate.predictions.year3.commission)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Policies Sold</div>
                    <div className="text-xl font-bold text-foreground">{selectedCandidate.predictions.year3.policies}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Retention Rate</div>
                    <div className="text-xl font-bold text-foreground">{selectedCandidate.predictions.year3.retention}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total 3-Year Value */}
            <div className="mt-6 bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Total 3-Year Commission</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(
                    selectedCandidate.predictions.year1.commission +
                    selectedCandidate.predictions.year2.commission +
                    selectedCandidate.predictions.year3.commission
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Factors & Risks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Positive Factors */}
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Success Factors</span>
              </h4>
              <div className="space-y-2">
                {selectedCandidate.keyFactors.positive.map((factor, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span className="text-green-900 dark:text-green-100">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Risk Factors</span>
              </h4>
              <div className="space-y-2">
                {selectedCandidate.keyFactors.risks.map((risk, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm">
                    <span className="text-red-600 dark:text-red-400 mt-0.5">!</span>
                    <span className="text-red-900 dark:text-red-100">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <span>AI-Recommended Actions</span>
            </h3>
            <div className="space-y-3">
              {selectedCandidate.recommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-accent rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-foreground">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

