'use client';

import { useState } from 'react';
import { Heart, Briefcase, Home, Baby, TrendingDown, AlertTriangle, Shield, DollarSign, Activity } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

interface ScenarioResult {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingCoverage: number;
  gap: number;
  recommendedCoverage: number;
  urgency: 'high' | 'medium' | 'low';
}

export default function LifeSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [customerAge, setCustomerAge] = useState(35);
  const [monthlyIncome, setMonthlyIncome] = useState(8000);
  const [dependents, setDependents] = useState(2);
  const [existingCoverage, setExistingCoverage] = useState(100000);

  const scenarios: Scenario[] = [
    {
      id: 'critical-illness',
      title: 'Critical Illness',
      icon: Heart,
      color: 'bg-red-500',
      description: 'What if you were diagnosed with cancer or heart disease?'
    },
    {
      id: 'job-loss',
      title: 'Job Loss',
      icon: Briefcase,
      color: 'bg-orange-500',
      description: 'What if you lost your job for 6 months?'
    },
    {
      id: 'disability',
      title: 'Total Disability',
      icon: Shield,
      color: 'bg-purple-500',
      description: 'What if you couldn\'t work due to disability?'
    },
    {
      id: 'premature-death',
      title: 'Premature Death',
      icon: TrendingDown,
      color: 'bg-slate-600',
      description: 'What would happen to your family if you passed away?'
    },
    {
      id: 'medical-emergency',
      title: 'Medical Emergency',
      icon: AlertTriangle,
      color: 'bg-amber-500',
      description: 'What if you had a major hospitalization?'
    },
    {
      id: 'home-damage',
      title: 'Home Damage',
      icon: Home,
      color: 'bg-blue-500',
      description: 'What if your home was damaged by fire or flood?'
    },
  ];

  const calculateScenario = (): ScenarioResult | null => {
    if (!selectedScenario) return null;

    let result: ScenarioResult = {
      monthlyIncome: monthlyIncome,
      monthlyExpenses: monthlyIncome * 0.7,
      existingCoverage: existingCoverage,
      gap: 0,
      recommendedCoverage: 0,
      urgency: 'medium'
    };

    switch (selectedScenario) {
      case 'critical-illness':
        result.recommendedCoverage = monthlyIncome * 12 * 5; // 5 years income
        result.gap = Math.max(0, result.recommendedCoverage - existingCoverage);
        result.urgency = customerAge > 40 ? 'high' : 'medium';
        break;
      case 'job-loss':
        result.recommendedCoverage = monthlyIncome * 6; // 6 months expenses
        result.gap = Math.max(0, result.recommendedCoverage - existingCoverage);
        result.urgency = 'medium';
        break;
      case 'disability':
        result.recommendedCoverage = monthlyIncome * 12 * 10; // 10 years income
        result.gap = Math.max(0, result.recommendedCoverage - existingCoverage);
        result.urgency = 'high';
        break;
      case 'premature-death':
        result.recommendedCoverage = monthlyIncome * 12 * 15; // 15 years income for family
        result.gap = Math.max(0, result.recommendedCoverage - existingCoverage);
        result.urgency = dependents > 0 ? 'high' : 'medium';
        break;
      case 'medical-emergency':
        result.recommendedCoverage = 50000; // Average major hospitalization cost
        result.gap = Math.max(0, result.recommendedCoverage - existingCoverage);
        result.urgency = 'medium';
        break;
      case 'home-damage':
        result.recommendedCoverage = 200000; // Average home repair cost
        result.gap = Math.max(0, result.recommendedCoverage - existingCoverage);
        result.urgency = 'low';
        break;
    }

    return result;
  };

  const result = calculateScenario();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'low':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      default:
        return '';
    }
  };

  const formatCurrency = (amount: number) => {
    return `SGD ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">Life Event Scenario Simulator</h2>
        <p className="text-sm text-muted-foreground">
          Explore interactive "what-if" scenarios to understand protection gaps
        </p>
      </div>

      {/* Customer Profile Inputs */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Customer Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Age</label>
            <input
              type="number"
              value={customerAge}
              onChange={(e) => setCustomerAge(Number(e.target.value))}
              className="w-full px-3 py-2 bg-accent border border-border rounded-lg text-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Monthly Income (SGD)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full px-3 py-2 bg-accent border border-border rounded-lg text-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Number of Dependents</label>
            <input
              type="number"
              value={dependents}
              onChange={(e) => setDependents(Number(e.target.value))}
              className="w-full px-3 py-2 bg-accent border border-border rounded-lg text-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Existing Coverage (SGD)</label>
            <input
              type="number"
              value={existingCoverage}
              onChange={(e) => setExistingCoverage(Number(e.target.value))}
              className="w-full px-3 py-2 bg-accent border border-border rounded-lg text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Select a Life Event Scenario</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  selectedScenario === scenario.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50 hover:bg-accent'
                }`}
              >
                <div className={`${scenario.color} p-0.5 rounded-full mb-3 w-fit`}>
                  <div className="bg-white dark:bg-background rounded-full p-3">
                    <Icon className={`h-6 w-6 ${scenario.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{scenario.title}</h4>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Scenario Analysis</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(result.urgency)}`}>
              {result.urgency.toUpperCase()} URGENCY
            </span>
          </div>

          {/* Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Current Situation */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-4">Current Situation</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Monthly Income</span>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(result.monthlyIncome)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Monthly Expenses</span>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(result.monthlyExpenses)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Existing Coverage</span>
                    <span className="text-sm font-semibold text-foreground">{formatCurrency(result.existingCoverage)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2">Coverage Adequacy</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          (result.existingCoverage / result.recommendedCoverage) * 100 >= 80
                            ? 'bg-green-500'
                            : (result.existingCoverage / result.recommendedCoverage) * 100 >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (result.existingCoverage / result.recommendedCoverage) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground">
                      {Math.round((result.existingCoverage / result.recommendedCoverage) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Recommended Solution */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-4">Recommended Solution</h4>
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="text-xs text-primary mb-1">Recommended Coverage</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(result.recommendedCoverage)}</div>
                </div>

                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-red-600 dark:text-red-400 mb-1 font-medium">Protection Gap Detected</div>
                      <div className="text-xl font-bold text-red-700 dark:text-red-300">{formatCurrency(result.gap)}</div>
                      <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                        You are {Math.round((result.gap / result.recommendedCoverage) * 100)}% under-protected for this scenario
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs text-muted-foreground mb-2">Additional Premium (estimated):</div>
                  <div className="text-lg font-semibold text-foreground">
                    SGD {Math.round((result.gap / result.recommendedCoverage) * 150)} / month
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h4 className="text-sm font-semibold text-foreground mb-4">AI-Powered Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-xs text-blue-600 dark:text-blue-400 mb-2 font-medium">Primary Product</div>
                <div className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Critical Illness Premier</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Coverage up to SGD 500K</div>
              </div>
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-xs text-green-600 dark:text-green-400 mb-2 font-medium">Add-On</div>
                <div className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">Hospital Income Rider</div>
                <div className="text-xs text-green-700 dark:text-green-300">Daily hospitalization benefit</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="text-xs text-purple-600 dark:text-purple-400 mb-2 font-medium">Bundle Discount</div>
                <div className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-1">Save 15%</div>
                <div className="text-xs text-purple-700 dark:text-purple-300">With family protection plan</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end space-x-3">
            <button className="px-6 py-3 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-all border border-border">
              Try Another Scenario
            </button>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all">
              Generate Quote
            </button>
          </div>
        </div>
      )}

      {!result && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full w-fit mx-auto mb-4">
            <Activity className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Select a Scenario</h3>
          <p className="text-sm text-muted-foreground">
            Choose a life event scenario above to see personalized protection gap analysis
          </p>
        </div>
      )}
    </div>
  );
}

