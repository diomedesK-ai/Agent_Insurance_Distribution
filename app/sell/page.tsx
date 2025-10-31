'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AIFeatureSelector from '@/components/ai-feature-selector';
import ProductMatchmaker from '@/components/sell/product-matchmaker';
import LifeSimulator from '@/components/sell/life-simulator';
import ProductComparison from '@/components/sell/product-comparison';
import { BarChart3, Gift, Gauge, Bot, Scale } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  location: string;
  age: number;
  income: string;
  currentCoverage: string[];
  protectionGap: number;
  nextBestOffer: string;
  predictedNeed: string;
  lifestage: string;
  riskProfile: string;
  engagement: 'high' | 'medium' | 'low';
  phone: string;
  email: string;
}

export default function SellPage() {
  const [selectedLocation, setSelectedLocation] = useState<'singapore' | 'hongkong'>('singapore');
  const [selectedFeature, setSelectedFeature] = useState('traditional');

  const aiFeatures = [
    {
      id: 'traditional',
      title: 'Traditional View',
      description: 'Customer insights and metrics',
      icon: BarChart3,
      iconColor: 'bg-slate-500'
    },
    {
      id: 'product-matchmaker',
      title: 'AI Product Matchmaker',
      description: 'Smart recommendations with cross-sell & upsell',
      icon: Gift,
      iconColor: 'bg-purple-500',
      badge: 'AI'
    },
    {
      id: 'life-simulator',
      title: 'Life Event Simulator',
      description: 'Interactive what-if scenarios for protection gaps',
      icon: Gauge,
      iconColor: 'bg-blue-500',
      badge: 'AI'
    },
      {
        id: 'product-comparison',
        title: 'Product Comparison Tool',
        description: 'Compare insurance products from Prudential, Manulife, AIA & more',
        icon: Scale,
        iconColor: 'bg-indigo-500',
        badge: 'AI'
      },
      {
        id: 'explainer-bot',
        title: 'Product Explainer Bot',
        description: 'AI chatbot that explains products in plain English',
        icon: Bot,
        iconColor: 'bg-green-500',
        badge: 'Coming Soon'
      }
    ];
  
  const customers: Record<string, Customer[]> = {
    singapore: [
      {
        id: 'CS-SG-001',
        name: 'Brandon Ng Wee Kiat',
        location: 'Singapore',
        age: 34,
        income: 'SGD 180,000',
        currentCoverage: ['Term Life SGD 200K', 'Medical Basic'],
        protectionGap: 65,
        nextBestOffer: 'Critical Illness Plus',
        predictedNeed: 'Family Protection Enhancement',
        lifestage: 'Young Family',
        riskProfile: 'Moderate',
        engagement: 'high',
        phone: '+65 9234 5678',
        email: 'brandon.ng@example.sg'
      },
      {
        id: 'CS-SG-002',
        name: 'Catherine Lim Hui Xian',
        location: 'Singapore',
        age: 42,
        income: 'SGD 250,000',
        currentCoverage: ['Life Insurance SGD 500K', 'Investment-Linked'],
        protectionGap: 40,
        nextBestOffer: 'Retirement Income Plan',
        predictedNeed: 'Retirement Planning',
        lifestage: 'Mid-Career',
        riskProfile: 'Conservative',
        engagement: 'high',
        phone: '+65 8345 6789',
        email: 'catherine.lim@example.sg'
      },
      {
        id: 'CS-SG-003',
        name: 'Rajesh Kumar',
        location: 'Singapore',
        age: 29,
        income: 'SGD 85,000',
        currentCoverage: ['Medical Insurance'],
        protectionGap: 78,
        nextBestOffer: 'Term Life with CI Rider',
        predictedNeed: 'Income Protection',
        lifestage: 'Young Professional',
        riskProfile: 'Aggressive',
        engagement: 'medium',
        phone: '+65 9876 5432',
        email: 'rajesh.kumar@example.sg'
      },
      {
        id: 'CS-SG-004',
        name: 'Melissa Tan Siew Eng',
        location: 'Singapore',
        age: 38,
        income: 'SGD 165,000',
        currentCoverage: ['Medical Premium', 'Term Life SGD 300K', 'Education Fund'],
        protectionGap: 35,
        nextBestOffer: 'Whole Life with Multiplier',
        predictedNeed: 'Wealth Accumulation',
        lifestage: 'Growing Family',
        riskProfile: 'Moderate',
        engagement: 'high',
        phone: '+65 8765 4321',
        email: 'melissa.tan@example.sg'
      },
      {
        id: 'CS-SG-005',
        name: 'Kevin Wong Jun Wei',
        location: 'Singapore',
        age: 27,
        income: 'SGD 72,000',
        currentCoverage: ['Company Medical'],
        protectionGap: 82,
        nextBestOffer: 'Starter Protection Bundle',
        predictedNeed: 'Basic Coverage Setup',
        lifestage: 'Early Career',
        riskProfile: 'Moderate',
        engagement: 'low',
        phone: '+65 9123 8765',
        email: 'kevin.wong@example.sg'
      }
    ],
    hongkong: [
      {
        id: 'CS-HK-001',
        name: 'Patrick Chan Pak Hin',
        location: 'Hong Kong',
        age: 48,
        income: 'HKD 2,000,000',
        currentCoverage: ['Universal Life HKD 5M', 'Medical Comprehensive', 'Investment Portfolio'],
        protectionGap: 25,
        nextBestOffer: 'Estate Planning Solution',
        predictedNeed: 'Wealth Transfer & Legacy',
        lifestage: 'Established',
        riskProfile: 'Conservative',
        engagement: 'high',
        phone: '+852 9234 5678',
        email: 'patrick.chan@example.hk'
      },
      {
        id: 'CS-HK-002',
        name: 'Jenny Leung Sze Man',
        location: 'Hong Kong',
        age: 36,
        income: 'HKD 1,200,000',
        currentCoverage: ['Life Insurance HKD 3M', 'Medical Premium'],
        protectionGap: 45,
        nextBestOffer: 'Critical Illness Multi-Pay',
        predictedNeed: 'Health Protection Enhancement',
        lifestage: 'Young Family',
        riskProfile: 'Moderate',
        engagement: 'high',
        phone: '+852 6345 7890',
        email: 'jenny.leung@example.hk'
      },
      {
        id: 'CS-HK-003',
        name: 'Wilson Chow Ka Lok',
        location: 'Hong Kong',
        age: 31,
        income: 'HKD 650,000',
        currentCoverage: ['Group Medical', 'MPF Standard'],
        protectionGap: 70,
        nextBestOffer: 'Income Protection Plan',
        predictedNeed: 'Personal Protection Foundation',
        lifestage: 'Young Professional',
        riskProfile: 'Aggressive',
        engagement: 'medium',
        phone: '+852 9876 5432',
        email: 'wilson.chow@example.hk'
      },
      {
        id: 'CS-HK-004',
        name: 'Sarah Tsang Mei Kuen',
        location: 'Hong Kong',
        age: 44,
        income: 'HKD 1,800,000',
        currentCoverage: ['Life HKD 4M', 'Medical Top-up', 'Savings Insurance'],
        protectionGap: 30,
        nextBestOffer: 'Retirement Annuity',
        predictedNeed: 'Retirement Income Stream',
        lifestage: 'Pre-Retirement',
        riskProfile: 'Conservative',
        engagement: 'high',
        phone: '+852 5432 1098',
        email: 'sarah.tsang@example.hk'
      },
      {
        id: 'CS-HK-005',
        name: 'Alex Lam Chi Hang',
        location: 'Hong Kong',
        age: 28,
        income: 'HKD 480,000',
        currentCoverage: ['Company Medical'],
        protectionGap: 85,
        nextBestOffer: 'Essential Protection Package',
        predictedNeed: 'Comprehensive Starter Coverage',
        lifestage: 'Early Career',
        riskProfile: 'Moderate',
        engagement: 'low',
        phone: '+852 6789 4321',
        email: 'alex.lam@example.hk'
      }
    ]
  };

  const stats = {
    singapore: {
      totalCustomers: 2847,
      avgProtectionGap: 52,
      recommendationsAccepted: 68,
      upsellOpportunities: 428,
      avgPremiumIncrease: 18
    },
    hongkong: {
      totalCustomers: 2156,
      avgProtectionGap: 48,
      recommendationsAccepted: 72,
      upsellOpportunities: 365,
      avgPremiumIncrease: 22
    }
  };

  const currentCustomers = customers[selectedLocation];
  const currentStats = stats[selectedLocation];

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high': return 'bg-black text-green-500 border-green-500 border-2 font-bold';
      case 'medium': return 'bg-black text-amber-500 border-amber-500 border-2 font-bold';
      case 'low': return 'bg-black text-slate-500 border-slate-500 border-2 font-bold';
      default: return 'bg-black text-gray-500 border-gray-500 border-2 font-bold';
    }
  };

  const getGapColor = (gap: number) => {
    if (gap >= 70) return 'text-red-500 bg-black border-2 border-red-500 font-bold';
    if (gap >= 50) return 'text-amber-500 bg-black border-2 border-amber-500 font-bold';
    return 'text-blue-500 bg-black border-2 border-blue-500 font-bold';
  };

  return (
    <DashboardLayout location={selectedLocation}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Sell</h1>
            <p className="text-muted-foreground mt-1">Customer insights and product recommendations</p>
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
            {selectedFeature === 'product-matchmaker' ? (
              <ProductMatchmaker />
            ) : selectedFeature === 'life-simulator' ? (
              <LifeSimulator />
            ) : selectedFeature === 'product-comparison' ? (
              <ProductComparison />
            ) : (
          <>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Customers</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.totalCustomers.toLocaleString()}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Avg Protection Gap</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.avgProtectionGap}%</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Acceptance Rate</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.recommendationsAccepted}%</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Upsell Opportunities</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.upsellOpportunities}</div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Avg Premium Increase</div>
            <div className="text-3xl font-semibold text-foreground">{currentStats.avgPremiumIncrease}%</div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Customer Insights & Recommendations</h2>
          </div>
          
          <div className="divide-y divide-border">
            {currentCustomers.map((customer) => (
              <div key={customer.id} className="p-6 hover:bg-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-foreground">{customer.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getEngagementColor(customer.engagement)}`}>
                        {customer.engagement.charAt(0).toUpperCase() + customer.engagement.slice(1)} Engagement
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGapColor(customer.protectionGap)}`}>
                        {customer.protectionGap}% Gap
                      </span>
                    </div>
                      <div className="text-sm text-muted-foreground space-y-1 mb-3">
                      <div>ID: {customer.id} • Age: {customer.age} • Income: {customer.income}</div>
                      <div>Life Stage: {customer.lifestage} • Risk Profile: {customer.riskProfile}</div>
                      <div>{customer.phone} • {customer.email}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="bg-accent rounded-lg p-4 border border-slate-500/30">
                        <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase">Current Coverage</div>
                        <div className="space-y-1">
                          {customer.currentCoverage.map((coverage, idx) => (
                            <div key={idx} className="text-sm text-foreground font-medium">{coverage}</div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-accent rounded-lg p-4 border border-blue-500/30">
                        <div className="text-xs text-blue-500 mb-2 font-semibold uppercase">Predicted Need</div>
                        <div className="text-sm text-foreground font-medium">{customer.predictedNeed}</div>
                      </div>
                      <div className="bg-accent rounded-lg p-4 border border-green-500/30">
                        <div className="text-xs text-green-500 mb-2 font-semibold uppercase">Next Best Offer</div>
                        <div className="text-sm text-foreground font-medium">{customer.nextBestOffer}</div>
                      </div>
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

