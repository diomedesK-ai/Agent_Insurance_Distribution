'use client';

import { useState } from 'react';
import { Brain, Zap, Target, TrendingUp, Award, CheckCircle2, XCircle, AlertTriangle, Star, Users, Radar } from 'lucide-react';

interface SkillCategory {
  name: string;
  skills: { skill: string; level: number; benchmark: number }[];
  color: string;
}

interface Candidate {
  id: string;
  name: string;
  overallMatch: number;
  strengths: string[];
  gaps: string[];
  potential: 'high' | 'medium' | 'low';
  skillDNA: {
    sales: number;
    technical: number;
    communication: number;
    resilience: number;
    empathy: number;
    analytical: number;
  };
  experience: number;
  predicted3YearSuccess: number;
  similarToTopPerformer: string;
}

export default function SkillsDNAAnalyzer() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<'dna' | 'comparison' | 'bestfit'>('dna');
  const [showSpiderChart, setShowSpiderChart] = useState(false);

  // Function to convert skill DNA to spider chart points
  const getSpiderChartPoints = (skillDNA: any, benchmark: any) => {
    const skills = ['sales', 'technical', 'communication', 'resilience', 'empathy', 'analytical'];
    const angleStep = (Math.PI * 2) / skills.length;
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;

    const candidatePoints = skills.map((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const radius = (skillDNA[skill] / 100) * maxRadius;
      return `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`;
    }).join(' ');

    const benchmarkPoints = skills.map((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const radius = (benchmark[skill] / 100) * maxRadius;
      return `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`;
    }).join(' ');

    const labels = skills.map((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const labelRadius = maxRadius + 30;
      return {
        x: centerX + labelRadius * Math.cos(angle),
        y: centerY + labelRadius * Math.sin(angle),
        text: skill.charAt(0).toUpperCase() + skill.slice(1),
        value: skillDNA[skill]
      };
    });

    return { candidatePoints, benchmarkPoints, labels, skills };
  };

  // Top performer benchmark (the ideal profile)
  const topPerformerBenchmark = {
    sales: 95,
    technical: 85,
    communication: 92,
    resilience: 88,
    empathy: 90,
    analytical: 82,
  };

  const candidates: Candidate[] = [
    {
      id: 'C001',
      name: 'Alice Tan',
      overallMatch: 92,
      strengths: ['Exceptional Sales Skills', 'High Empathy', 'Strong Communication'],
      gaps: ['Technical Knowledge', 'Data Analysis'],
      potential: 'high',
      skillDNA: {
        sales: 96,
        technical: 72,
        communication: 94,
        resilience: 88,
        empathy: 95,
        analytical: 75,
      },
      experience: 5,
      predicted3YearSuccess: 89,
      similarToTopPerformer: 'Sarah Chen (Top 1% Agent)',
    },
    {
      id: 'C002',
      name: 'Ben Lim',
      overallMatch: 78,
      strengths: ['Technical Knowledge', 'Analytical Thinking', 'Detail-Oriented'],
      gaps: ['Sales Drive', 'Client Empathy', 'Communication'],
      potential: 'medium',
      skillDNA: {
        sales: 68,
        technical: 92,
        communication: 74,
        resilience: 80,
        empathy: 70,
        analytical: 88,
      },
      experience: 3,
      predicted3YearSuccess: 72,
      similarToTopPerformer: 'David Wong (Technical Specialist)',
    },
    {
      id: 'C003',
      name: 'Catherine Wong',
      overallMatch: 88,
      strengths: ['Leadership Potential', 'Resilience', 'Balanced Skillset'],
      gaps: ['Sales Experience', 'Product Knowledge'],
      potential: 'high',
      skillDNA: {
        sales: 82,
        technical: 80,
        communication: 90,
        resilience: 94,
        empathy: 86,
        analytical: 84,
      },
      experience: 7,
      predicted3YearSuccess: 85,
      similarToTopPerformer: 'Michael Lee (Agency Leader)',
    },
    {
      id: 'C004',
      name: 'David Chen',
      overallMatch: 65,
      strengths: ['Resilience', 'Work Ethic'],
      gaps: ['Sales Skills', 'Communication', 'Technical Knowledge', 'Empathy'],
      potential: 'low',
      skillDNA: {
        sales: 58,
        technical: 62,
        communication: 65,
        resilience: 85,
        empathy: 60,
        analytical: 68,
      },
      experience: 2,
      predicted3YearSuccess: 58,
      similarToTopPerformer: 'Entry Level Profile',
    },
    {
      id: 'C005',
      name: 'Emily Tan',
      overallMatch: 95,
      strengths: ['Elite Sales', 'Exceptional Communication', 'High Empathy', 'Strong Analytics'],
      gaps: ['None - Star Candidate'],
      potential: 'high',
      skillDNA: {
        sales: 98,
        technical: 86,
        communication: 96,
        resilience: 90,
        empathy: 94,
        analytical: 88,
      },
      experience: 6,
      predicted3YearSuccess: 94,
      similarToTopPerformer: 'Jennifer Lim (Top 0.1% Elite)',
    },
    {
      id: 'C006',
      name: 'Frank Ng',
      overallMatch: 82,
      strengths: ['Analytical Strength', 'Technical Expertise', 'Communication'],
      gaps: ['Sales Experience', 'Client Empathy'],
      potential: 'medium',
      skillDNA: {
        sales: 75,
        technical: 90,
        communication: 85,
        resilience: 82,
        empathy: 74,
        analytical: 92,
      },
      experience: 4,
      predicted3YearSuccess: 78,
      similarToTopPerformer: 'Kevin Tan (Analytical Seller)',
    },
  ];

  const skillCategories: SkillCategory[] = [
    {
      name: 'Sales Excellence',
      color: 'text-green-600',
      skills: [
        { skill: 'Prospecting', level: selectedCandidate?.skillDNA.sales || 0, benchmark: 90 },
        { skill: 'Needs Analysis', level: (selectedCandidate?.skillDNA.sales || 0) * 0.95, benchmark: 88 },
        { skill: 'Closing', level: (selectedCandidate?.skillDNA.sales || 0) * 1.02, benchmark: 92 },
        { skill: 'Objection Handling', level: (selectedCandidate?.skillDNA.sales || 0) * 0.98, benchmark: 85 },
      ],
    },
    {
      name: 'Technical Mastery',
      color: 'text-blue-600',
      skills: [
        { skill: 'Product Knowledge', level: selectedCandidate?.skillDNA.technical || 0, benchmark: 85 },
        { skill: 'Financial Planning', level: (selectedCandidate?.skillDNA.technical || 0) * 0.92, benchmark: 82 },
        { skill: 'Compliance', level: (selectedCandidate?.skillDNA.technical || 0) * 1.05, benchmark: 88 },
        { skill: 'Systems Proficiency', level: (selectedCandidate?.skillDNA.technical || 0) * 0.88, benchmark: 78 },
      ],
    },
    {
      name: 'Communication',
      color: 'text-purple-600',
      skills: [
        { skill: 'Active Listening', level: selectedCandidate?.skillDNA.communication || 0, benchmark: 90 },
        { skill: 'Presentation', level: (selectedCandidate?.skillDNA.communication || 0) * 0.96, benchmark: 88 },
        { skill: 'Written Communication', level: (selectedCandidate?.skillDNA.communication || 0) * 0.94, benchmark: 85 },
        { skill: 'Persuasion', level: (selectedCandidate?.skillDNA.communication || 0) * 1.03, benchmark: 92 },
      ],
    },
    {
      name: 'Emotional Intelligence',
      color: 'text-pink-600',
      skills: [
        { skill: 'Client Empathy', level: selectedCandidate?.skillDNA.empathy || 0, benchmark: 90 },
        { skill: 'Relationship Building', level: (selectedCandidate?.skillDNA.empathy || 0) * 1.02, benchmark: 92 },
        { skill: 'Conflict Resolution', level: (selectedCandidate?.skillDNA.empathy || 0) * 0.95, benchmark: 85 },
        { skill: 'Emotional Awareness', level: (selectedCandidate?.skillDNA.empathy || 0) * 0.98, benchmark: 88 },
      ],
    },
  ];

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'text-green-600 dark:text-green-400';
    if (match >= 80) return 'text-blue-600 dark:text-blue-400';
    if (match >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getMatchBadge = (match: number) => {
    if (match >= 90) return { label: 'Exceptional Fit', color: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' };
    if (match >= 80) return { label: 'Strong Fit', color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
    if (match >= 70) return { label: 'Good Fit', color: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
    return { label: 'Developing Fit', color: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' };
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'medium':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'low':
        return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
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
            <h2 className="text-lg font-semibold text-foreground mb-1">Skills DNA Analyzer & Best Fit Matcher</h2>
            <p className="text-sm text-muted-foreground">
              Compare candidate skills to top performers and predict success
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 rounded-full">
            <div className="bg-white dark:bg-background rounded-full p-3">
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex space-x-2 border-b border-border">
        <button
          onClick={() => setViewMode('dna')}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            viewMode === 'dna'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Skills DNA Analysis
        </button>
        <button
          onClick={() => setViewMode('comparison')}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            viewMode === 'comparison'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Benchmark Comparison
        </button>
        <button
          onClick={() => setViewMode('bestfit')}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            viewMode === 'bestfit'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Best Fit Ranking
        </button>
      </div>

      {/* Best Fit Ranking View */}
      {viewMode === 'bestfit' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">🏆 Candidate Ranking by Best Fit</h3>
            <div className="space-y-3">
              {candidates
                .sort((a, b) => b.overallMatch - a.overallMatch)
                .map((candidate, index) => {
                  const matchBadge = getMatchBadge(candidate.overallMatch);
                  return (
                    <button
                      key={candidate.id}
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setViewMode('dna');
                      }}
                      className="w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent transition-all text-left"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Rank */}
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300' :
                          index === 1 ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300' :
                          index === 2 ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300' :
                          'bg-accent text-foreground'
                        }`}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </div>

                        {/* Candidate Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-foreground">{candidate.name}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${matchBadge.color}`}>
                              {matchBadge.label}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPotentialColor(candidate.potential)}`}>
                              {candidate.potential.toUpperCase()} POTENTIAL
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                            <span>Match: {candidate.overallMatch}%</span>
                            <span>3Y Success: {candidate.predicted3YearSuccess}%</span>
                            <span>Experience: {candidate.experience} years</span>
                            <span className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>Similar to: {candidate.similarToTopPerformer}</span>
                            </span>
                          </div>
                        </div>

                        {/* Match Score */}
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getMatchColor(candidate.overallMatch)}`}>
                            {candidate.overallMatch}
                          </div>
                          <div className="text-xs text-muted-foreground">Overall Match</div>
                        </div>
                      </div>

                      {/* Mini Skill DNA */}
                      <div className="mt-4 grid grid-cols-6 gap-2">
                        {Object.entries(candidate.skillDNA).map(([skill, level]) => (
                          <div key={skill} className="text-center">
                            <div className="text-xs text-muted-foreground capitalize mb-1">{skill}</div>
                            <div className="flex items-center space-x-1">
                              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${
                                    level >= 90 ? 'bg-green-500' : level >= 75 ? 'bg-blue-500' : 'bg-amber-500'
                                  }`}
                                  style={{ width: `${level}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Candidate Selection */}
      {(viewMode === 'dna' || viewMode === 'comparison') && !selectedCandidate && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="bg-purple-100 dark:bg-purple-950 p-4 rounded-full w-fit mx-auto mb-4">
            <Brain className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Select a Candidate</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Choose a candidate to analyze their skills DNA and compare against top performers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {candidates.slice(0, 6).map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate)}
                className="p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent transition-all text-left"
              >
                <div className="font-semibold text-foreground mb-2">{candidate.name}</div>
                <div className={`text-2xl font-bold mb-2 ${getMatchColor(candidate.overallMatch)}`}>
                  {candidate.overallMatch}%
                </div>
                <div className="text-xs text-muted-foreground">{candidate.experience} years experience</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DNA Analysis View */}
      {viewMode === 'dna' && selectedCandidate && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main DNA Visualization */}
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate Overview */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 rounded-xl">
              <div className="bg-card rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{selectedCandidate.name}</h3>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getMatchBadge(selectedCandidate.overallMatch).color}`}>
                        {getMatchBadge(selectedCandidate.overallMatch).label}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPotentialColor(selectedCandidate.potential)}`}>
                        {selectedCandidate.potential.toUpperCase()} POTENTIAL
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <div className={`text-3xl font-bold ${getMatchColor(selectedCandidate.overallMatch)}`}>
                      {selectedCandidate.overallMatch}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Overall Match</div>
                  </div>
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {selectedCandidate.predicted3YearSuccess}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">3-Year Success</div>
                  </div>
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <div className="text-3xl font-bold text-foreground">
                      {selectedCandidate.experience}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills DNA Hexagon */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-foreground">Skills DNA Profile</h3>
                <button
                  onClick={() => setShowSpiderChart(!showSpiderChart)}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs font-medium transition-all"
                >
                  <Radar className="h-3 w-3" />
                  <span>{showSpiderChart ? 'Show Bars' : 'Show Spider Chart'}</span>
                </button>
              </div>
              
              {showSpiderChart ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <svg width="350" height="350" viewBox="0 0 300 300" className="drop-shadow-lg">
                    {/* Grid circles */}
                    {(() => {
                      const { candidatePoints, benchmarkPoints, labels } = getSpiderChartPoints(selectedCandidate.skillDNA, topPerformerBenchmark);
                      return (
                        <>
                          {[20, 40, 60, 80, 100].map((percent) => {
                            const radius = (percent / 100) * 120;
                            return (
                              <circle
                                key={percent}
                                cx="150"
                                cy="150"
                                r={radius}
                                fill="none"
                                stroke="#94a3b8"
                                strokeWidth="1"
                                opacity="0.3"
                              />
                            );
                          })}
                          
                          {/* Grid lines */}
                          {['sales', 'technical', 'communication', 'resilience', 'empathy', 'analytical'].map((_, i) => {
                            const angleStep = (Math.PI * 2) / 6;
                            const angle = i * angleStep - Math.PI / 2;
                            const x = 150 + 120 * Math.cos(angle);
                            const y = 150 + 120 * Math.sin(angle);
                            return (
                              <line
                                key={i}
                                x1="150"
                                y1="150"
                                x2={x}
                                y2={y}
                                stroke="#94a3b8"
                                strokeWidth="1"
                                opacity="0.3"
                              />
                            );
                          })}
                          
                          {/* Benchmark polygon (Top Performer) */}
                          <polygon
                            points={benchmarkPoints}
                            fill="rgba(147, 51, 234, 0.1)"
                            stroke="rgb(147, 51, 234)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                          
                          {/* Candidate polygon */}
                          <polygon
                            points={candidatePoints}
                            fill="rgba(236, 72, 153, 0.2)"
                            stroke="rgb(236, 72, 153)"
                            strokeWidth="3"
                          />
                          
                          {/* Labels and values */}
                          {labels.map((label, i) => (
                            <g key={i}>
                              <text
                                x={label.x}
                                y={label.y}
                                textAnchor="middle"
                                fontSize="11"
                                fontWeight="600"
                                fill="currentColor"
                              >
                                {label.text}
                              </text>
                              <text
                                x={label.x}
                                y={label.y + 14}
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="700"
                                fill="rgb(236, 72, 153)"
                              >
                                {label.value}
                              </text>
                            </g>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-1 bg-pink-600 rounded"></div>
                      <span className="text-sm text-foreground font-medium">{selectedCandidate.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg width="32" height="4" className="flex-shrink-0">
                        <line x1="0" y1="2" x2="32" y2="2" stroke="rgb(147, 51, 234)" strokeWidth="2" strokeDasharray="4,2" />
                      </svg>
                      <span className="text-sm text-muted-foreground">Top Performer Benchmark</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(selectedCandidate.skillDNA).map(([skill, level]) => (
                  <div key={skill} className="p-4 bg-accent rounded-xl">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`${
                        level >= 90 ? 'bg-green-500' : level >= 75 ? 'bg-blue-500' : 'bg-amber-500'
                      } p-0.5 rounded-full`}>
                        <div className="bg-white dark:bg-background rounded-full p-1.5">
                          <Zap className={`h-3 w-3 ${
                            level >= 90 ? 'text-green-500' : level >= 75 ? 'text-blue-500' : 'text-amber-500'
                          }`} />
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-foreground capitalize">{skill}</div>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            level >= 90 ? 'bg-green-500' : level >= 75 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${level}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-foreground">{level}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Benchmark: {topPerformerBenchmark[skill as keyof typeof topPerformerBenchmark]}
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>

            {/* Detailed Skills Breakdown */}
            <div className="space-y-4">
              {skillCategories.map((category, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <h4 className={`text-sm font-semibold mb-4 ${category.color}`}>{category.name}</h4>
                  <div className="space-y-3">
                    {category.skills.map((skill, idx) => {
                      const gap = skill.level - skill.benchmark;
                      return (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-foreground">{skill.skill}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{Math.round(skill.level)}</span>
                              <span className={`text-xs font-semibold ${
                                gap >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {gap >= 0 ? '+' : ''}{Math.round(gap)}
                              </span>
                            </div>
                          </div>
                          <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                            {/* Benchmark marker */}
                            <div 
                              className="absolute top-0 bottom-0 w-0.5 bg-amber-500"
                              style={{ left: `${skill.benchmark}%` }}
                            />
                            {/* Candidate level */}
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                skill.level >= skill.benchmark ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(100, skill.level)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Strengths */}
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Key Strengths</span>
              </h4>
              <div className="space-y-2">
                {selectedCandidate.strengths.map((strength, idx) => (
                  <div key={idx} className="text-xs text-green-900 dark:text-green-100 bg-green-100 dark:bg-green-900 p-2 rounded">
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            {/* Development Areas */}
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Development Areas</span>
              </h4>
              <div className="space-y-2">
                {selectedCandidate.gaps.map((gap, idx) => (
                  <div key={idx} className="text-xs text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-900 p-2 rounded">
                    {gap}
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Profile */}
            <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Similar to Top Performer</span>
              </h4>
              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                  {selectedCandidate.similarToTopPerformer}
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>AI Recommendation</span>
              </h4>
              <div className="text-sm text-foreground space-y-2">
                {selectedCandidate.overallMatch >= 90 ? (
                  <>
                    <p className="font-semibold text-green-600 dark:text-green-400">✅ HIGHLY RECOMMENDED</p>
                    <p className="text-xs">This candidate shows exceptional fit across all key dimensions. Fast-track to final interview.</p>
                  </>
                ) : selectedCandidate.overallMatch >= 80 ? (
                  <>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">👍 STRONG CANDIDATE</p>
                    <p className="text-xs">Solid fit with minor development areas. Recommend proceeding to interview with focus on growth potential.</p>
                  </>
                ) : selectedCandidate.overallMatch >= 70 ? (
                  <>
                    <p className="font-semibold text-amber-600 dark:text-amber-400">⚠️ PROCEED WITH CAUTION</p>
                    <p className="text-xs">Gaps in key areas. Consider additional assessment or training plan before hiring.</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-red-600 dark:text-red-400">❌ NOT RECOMMENDED</p>
                    <p className="text-xs">Significant gaps across multiple dimensions. May not be suitable for this role.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison View */}
      {viewMode === 'comparison' && selectedCandidate && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">{selectedCandidate.name} vs Top Performer Benchmark</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                Change Candidate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(selectedCandidate.skillDNA).map(([skill, level]) => {
                const benchmark = topPerformerBenchmark[skill as keyof typeof topPerformerBenchmark];
                const gap = level - benchmark;
                const gapPercentage = ((gap / benchmark) * 100).toFixed(0);

                return (
                  <div key={skill} className="bg-accent rounded-xl p-6">
                    <div className="text-center mb-4">
                      <div className="text-sm font-semibold text-foreground capitalize mb-2">{skill}</div>
                      <div className="flex items-center justify-center space-x-4">
                        <div>
                          <div className="text-2xl font-bold text-primary">{level}</div>
                          <div className="text-xs text-muted-foreground">Candidate</div>
                        </div>
                        <div className="text-2xl text-muted-foreground">vs</div>
                        <div>
                          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{benchmark}</div>
                          <div className="text-xs text-muted-foreground">Benchmark</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all"
                            style={{ width: `${level}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                          <div 
                            className="bg-amber-500 h-3 rounded-full transition-all"
                            style={{ width: `${benchmark}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={`text-center mt-4 text-sm font-semibold ${
                      gap >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {gap >= 0 ? '✓' : '✗'} {gap >= 0 ? '+' : ''}{gap} ({gapPercentage}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

