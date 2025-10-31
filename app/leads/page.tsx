'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AIFeatureSelector from '@/components/ai-feature-selector';
import SocialTriangulation from '@/components/leads/social-triangulation';
import ConversationAssistant from '@/components/leads/conversation-assistant';
import LeadOrchestrator from '@/components/leads/lead-orchestrator';
import { BarChart3, Search, MessageSquare, Target } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  location: string;
  source: string;
  score: number;
  status: 'new' | 'qualified' | 'nurturing' | 'assigned';
  age: number;
  income: string;
  interest: string[];
  phone: string;
  email: string;
  assignedTo?: string;
  priority: 'high' | 'medium' | 'low';
}

export default function LeadsPage() {
  const [selectedLocation, setSelectedLocation] = useState<'singapore' | 'hongkong'>('singapore');
  const [selectedFeature, setSelectedFeature] = useState('traditional');

  const aiFeatures = [
    {
      id: 'traditional',
      title: 'Traditional View',
      description: 'Standard lead pipeline and metrics',
      icon: BarChart3,
      iconColor: 'bg-slate-500'
    },
    {
      id: 'social-triangulation',
      title: 'Social Intelligence',
      description: 'AI-powered lead qualification from Facebook, Instagram, LinkedIn',
      icon: Search,
      iconColor: 'bg-blue-500',
      badge: 'AI'
    },
    {
      id: 'conversation-assistant',
      title: 'Memo AI',
      description: 'Voice memos transcribed to structured notes',
      icon: MessageSquare,
      iconColor: 'bg-green-500',
      badge: 'AI'
    },
    {
      id: 'orchestrator',
      title: 'Perfect Touch AI',
      description: 'AI determines best next action and timing',
      icon: Target,
      iconColor: 'bg-purple-500',
      badge: 'AI'
    }
  ];
  
  const leads: Record<string, Lead[]> = {
    singapore: [
      {
        id: 'LD-SG-001',
        name: 'Jonathan Koh Wei Ming',
        location: 'Singapore',
        source: 'Website Form',
        score: 92,
        status: 'qualified',
        age: 35,
        income: 'SGD 120,000 - 150,000',
        interest: ['Life Insurance', 'Investment-Linked'],
        phone: '+65 9234 5678',
        email: 'jonathan.koh@example.sg',
        assignedTo: 'Emily Tan',
        priority: 'high'
      },
      {
        id: 'LD-SG-002',
        name: 'Rachel Lim Hui Fen',
        location: 'Singapore',
        source: 'Referral',
        score: 88,
        status: 'assigned',
        age: 42,
        income: 'SGD 200,000+',
        interest: ['Wealth Management', 'Retirement Planning'],
        phone: '+65 8345 6789',
        email: 'rachel.lim@example.sg',
        assignedTo: 'Marcus Lim',
        priority: 'high'
      },
      {
        id: 'LD-SG-003',
        name: 'Kumar Raj',
        location: 'Singapore',
        source: 'Digital Ad Campaign',
        score: 75,
        status: 'nurturing',
        age: 29,
        income: 'SGD 60,000 - 80,000',
        interest: ['Health Insurance', 'Critical Illness'],
        phone: '+65 9876 5432',
        email: 'kumar.raj@example.sg',
        priority: 'medium'
      },
      {
        id: 'LD-SG-004',
        name: 'Michelle Tan Xin Yi',
        location: 'Singapore',
        source: 'Webinar',
        score: 81,
        status: 'qualified',
        age: 38,
        income: 'SGD 150,000 - 180,000',
        interest: ['Education Insurance', 'Term Life'],
        phone: '+65 8765 4321',
        email: 'michelle.tan@example.sg',
        assignedTo: 'Daniel Wong',
        priority: 'high'
      },
      {
        id: 'LD-SG-005',
        name: 'David Chen Yong Hui',
        location: 'Singapore',
        source: 'Social Media',
        score: 68,
        status: 'new',
        age: 26,
        income: 'SGD 50,000 - 60,000',
        interest: ['Personal Accident', 'Travel Insurance'],
        phone: '+65 9123 8765',
        email: 'david.chen@example.sg',
        priority: 'low'
      }
    ],
    hongkong: [
      {
        id: 'LD-HK-001',
        name: 'William Lau Wing Kin',
        location: 'Hong Kong',
        source: 'Bank Partnership',
        score: 94,
        status: 'qualified',
        age: 45,
        income: 'HKD 1,500,000+',
        interest: ['High Net Worth Solutions', 'Estate Planning'],
        phone: '+852 9234 5678',
        email: 'william.lau@example.hk',
        assignedTo: 'Vivian Chan',
        priority: 'high'
      },
      {
        id: 'LD-HK-002',
        name: 'Grace Wong Siu Kwan',
        location: 'Hong Kong',
        source: 'Referral',
        score: 86,
        status: 'assigned',
        age: 33,
        income: 'HKD 800,000 - 1,000,000',
        interest: ['Medical Insurance', 'Life Insurance'],
        phone: '+852 6345 7890',
        email: 'grace.wong@example.hk',
        assignedTo: 'Kenneth Lee',
        priority: 'high'
      },
      {
        id: 'LD-HK-003',
        name: 'Tommy Cheng Ho Fai',
        location: 'Hong Kong',
        source: 'Website Form',
        score: 79,
        status: 'nurturing',
        age: 28,
        income: 'HKD 400,000 - 600,000',
        interest: ['Investment Insurance', 'Savings Plan'],
        phone: '+852 9876 5432',
        email: 'tommy.cheng@example.hk',
        priority: 'medium'
      },
      {
        id: 'LD-HK-004',
        name: 'Sophie Li Ka Yan',
        location: 'Hong Kong',
        source: 'Corporate Seminar',
        score: 90,
        status: 'qualified',
        age: 40,
        income: 'HKD 1,200,000 - 1,500,000',
        interest: ['Group Benefits', 'Executive Protection'],
        phone: '+852 5432 1098',
        email: 'sophie.li@example.hk',
        assignedTo: 'Sarah Ng',
        priority: 'high'
      },
      {
        id: 'LD-HK-005',
        name: 'Andy Yeung Chun Ming',
        location: 'Hong Kong',
        source: 'Digital Ad Campaign',
        score: 71,
        status: 'new',
        age: 31,
        income: 'HKD 500,000 - 700,000',
        interest: ['Critical Illness', 'Hospitalization'],
        phone: '+852 6789 4321',
        email: 'andy.yeung@example.hk',
        priority: 'medium'
      }
    ]
  };

  const stats = {
    singapore: {
      totalLeads: 156,
      qualified: 48,
      conversionRate: 31,
      avgScore: 78,
      assigned: 35
    },
    hongkong: {
      totalLeads: 128,
      qualified: 42,
      conversionRate: 33,
      avgScore: 81,
      assigned: 29
    }
  };

  const currentLeads = leads[selectedLocation];
  const currentStats = stats[selectedLocation];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-black text-green-500 border-green-500 border-2 font-bold';
      case 'qualified': return 'bg-black text-blue-500 border-blue-500 border-2 font-bold';
      case 'nurturing': return 'bg-black text-amber-500 border-amber-500 border-2 font-bold';
      case 'new': return 'bg-black text-slate-500 border-slate-500 border-2 font-bold';
      default: return 'bg-black text-gray-500 border-gray-500 border-2 font-bold';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-black border-2 border-red-500 font-bold';
      case 'medium': return 'text-amber-500 bg-black border-2 border-amber-500 font-bold';
      case 'low': return 'text-slate-500 bg-black border-2 border-slate-500 font-bold';
      default: return 'text-gray-500 bg-black border-2 border-gray-500 font-bold';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500 bg-black border-2 border-green-500 font-bold';
    if (score >= 70) return 'text-blue-500 bg-black border-2 border-blue-500 font-bold';
    return 'text-amber-500 bg-black border-2 border-amber-500 font-bold';
  };

  return (
    <DashboardLayout location={selectedLocation}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Leads</h1>
            <p className="text-muted-foreground mt-1">Track and convert sales leads</p>
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
        {selectedFeature === 'social-triangulation' ? (
          <SocialTriangulation />
        ) : selectedFeature === 'conversation-assistant' ? (
          <ConversationAssistant />
        ) : selectedFeature === 'orchestrator' ? (
          <LeadOrchestrator />
        ) : (
          <>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Leads</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.totalLeads}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Qualified</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.qualified}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Assigned</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.assigned}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.conversionRate}%</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Avg Lead Score</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.avgScore}</div>
          </div>
        </div>

        {/* Leads List */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Lead Pipeline</h2>
          </div>
          
          <div className="divide-y divide-border">
            {currentLeads.map((lead) => (
              <div key={lead.id} className="p-6 hover:bg-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-foreground">{lead.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(lead.status)}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.score)}`}>
                        Score: {lead.score}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                        {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)} Priority
                      </span>
                    </div>
                      <div className="text-sm text-muted-foreground space-y-1 mb-3">
                      <div>ID: {lead.id} • Age: {lead.age} • Source: {lead.source}</div>
                      <div>Income: {lead.income}</div>
                      <div>{lead.phone} • {lead.email}</div>
                      {lead.assignedTo && <div>Assigned to: {lead.assignedTo}</div>}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {lead.interest.map((item, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-accent text-foreground rounded-lg text-xs border border-border"
                        >
                          {item}
                        </span>
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

