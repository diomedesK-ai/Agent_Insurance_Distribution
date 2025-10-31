'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, Calculator, Target, Award, Zap } from 'lucide-react';

interface SimulationResult {
  baseCommission: number;
  bonuses: { name: string; amount: number; color: string }[];
  totalEarnings: number;
  taxEstimate: number;
  netEarnings: number;
  comparisonVsCurrent: number;
}

export default function CommissionSimulator() {
  const [policiesSold, setPoliciesSold] = useState(5);
  const [avgPremium, setAvgPremium] = useState(5000);
  const [crossSells, setCrossSells] = useState(2);
  const [teamSales, setTeamSales] = useState(10);
  
  const currentEarnings = 10000; // Agent's current monthly commission

  const calculateCommission = (): SimulationResult => {
    // Base commission: 20% of total premiums
    const totalPremiums = policiesSold * avgPremium;
    const baseCommission = totalPremiums * 0.20;

    // Bonuses
    const bonuses = [];

    // Volume bonus (5+ policies)
    if (policiesSold >= 5) {
      bonuses.push({ name: 'Volume Bonus', amount: 1000, color: 'text-green-600' });
    }
    if (policiesSold >= 10) {
      bonuses.push({ name: 'High Achiever Bonus', amount: 2000, color: 'text-blue-600' });
    }

    // Premium bonus (avg premium > 5000)
    if (avgPremium >= 5000) {
      bonuses.push({ name: 'Premium Product Bonus', amount: 1500, color: 'text-purple-600' });
    }

    // Cross-sell bonus
    if (crossSells > 0) {
      bonuses.push({ name: 'Cross-Sell Bonus', amount: crossSells * 500, color: 'text-amber-600' });
    }

    // Team override (if team sales > 5)
    if (teamSales >= 5) {
      const teamOverride = teamSales * 200;
      bonuses.push({ name: 'Team Override', amount: teamOverride, color: 'text-indigo-600' });
    }

    const totalBonuses = bonuses.reduce((sum, b) => sum + b.amount, 0);
    const totalEarnings = baseCommission + totalBonuses;
    const taxEstimate = totalEarnings * 0.15; // Simplified 15% tax
    const netEarnings = totalEarnings - taxEstimate;
    const comparisonVsCurrent = ((totalEarnings - currentEarnings) / currentEarnings) * 100;

    return {
      baseCommission,
      bonuses,
      totalEarnings,
      taxEstimate,
      netEarnings,
      comparisonVsCurrent
    };
  };

  const result = calculateCommission();

  const scenarios = [
    { 
      name: 'Conservative', 
      description: 'Steady performance', 
      policies: 3, 
      premium: 3000, 
      crossSells: 1, 
      team: 5,
      color: 'bg-slate-500'
    },
    { 
      name: 'Target', 
      description: 'Monthly goal', 
      policies: 5, 
      premium: 5000, 
      crossSells: 2, 
      team: 10,
      color: 'bg-blue-500'
    },
    { 
      name: 'Stretch', 
      description: 'Top 10% performance', 
      policies: 8, 
      premium: 7000, 
      crossSells: 4, 
      team: 15,
      color: 'bg-green-500'
    },
    { 
      name: 'Diamond', 
      description: 'Elite tier', 
      policies: 12, 
      premium: 10000, 
      crossSells: 6, 
      team: 20,
      color: 'bg-purple-500'
    },
  ];

  const applyScenario = (scenario: typeof scenarios[0]) => {
    setPoliciesSold(scenario.policies);
    setAvgPremium(scenario.premium);
    setCrossSells(scenario.crossSells);
    setTeamSales(scenario.team);
  };

  const formatCurrency = (amount: number) => {
    return `SGD ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Commission Simulator</h2>
            <p className="text-sm text-muted-foreground">
              Interactive "what-if" scenarios for your earnings potential
            </p>
          </div>
          <div className="bg-primary/10 p-4 rounded-full">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Quick Scenarios */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.name}
              onClick={() => applyScenario(scenario)}
              className="p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent transition-all text-left"
            >
              <div className={`${scenario.color} p-0.5 rounded-full mb-2 w-fit`}>
                <div className="bg-white dark:bg-background rounded-full p-2">
                  <Target className={`h-4 w-4 ${scenario.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="font-semibold text-sm text-foreground mb-1">{scenario.name}</div>
              <div className="text-xs text-muted-foreground">{scenario.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Adjust Your Numbers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Policies Sold</label>
            <input
              type="range"
              min="0"
              max="20"
              value={policiesSold}
              onChange={(e) => setPoliciesSold(Number(e.target.value))}
              className="w-full mb-2"
            />
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={policiesSold}
                onChange={(e) => setPoliciesSold(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-center font-semibold"
              />
              <span className="text-xs text-muted-foreground">policies</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Avg Premium per Policy</label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={avgPremium}
              onChange={(e) => setAvgPremium(Number(e.target.value))}
              className="w-full mb-2"
            />
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={avgPremium}
                onChange={(e) => setAvgPremium(Number(e.target.value))}
                className="w-24 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-center font-semibold"
              />
              <span className="text-xs text-muted-foreground">SGD</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Cross-Sells / Upsells</label>
            <input
              type="range"
              min="0"
              max="10"
              value={crossSells}
              onChange={(e) => setCrossSells(Number(e.target.value))}
              className="w-full mb-2"
            />
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={crossSells}
                onChange={(e) => setCrossSells(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-center font-semibold"
              />
              <span className="text-xs text-muted-foreground">products</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Team Sales (Override)</label>
            <input
              type="range"
              min="0"
              max="30"
              value={teamSales}
              onChange={(e) => setTeamSales(Number(e.target.value))}
              className="w-full mb-2"
            />
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={teamSales}
                onChange={(e) => setTeamSales(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-center font-semibold"
              />
              <span className="text-xs text-muted-foreground">policies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commission Breakdown */}
        <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-6">Your Projected Earnings</h3>
          
          {/* Base Commission */}
          <div className="bg-card rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Base Commission (20%)</span>
              <span className="text-lg font-semibold text-foreground">{formatCurrency(result.baseCommission)}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {policiesSold} policies × {formatCurrency(avgPremium)} avg premium × 20%
            </div>
          </div>

          {/* Bonuses */}
          {result.bonuses.length > 0 && (
            <div className="space-y-2 mb-4">
              <div className="text-xs font-semibold text-foreground mb-2">Bonuses Unlocked:</div>
              {result.bonuses.map((bonus, index) => (
                <div key={index} className="bg-card rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className={`h-4 w-4 ${bonus.color}`} />
                    <span className="text-sm text-foreground">{bonus.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${bonus.color}`}>+{formatCurrency(bonus.amount)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Total */}
          <div className="bg-card rounded-lg p-6 border-2 border-primary/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Gross Earnings</span>
              <span className="text-3xl font-bold text-primary">{formatCurrency(result.totalEarnings)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Estimated Tax (15%)</span>
              <span>-{formatCurrency(result.taxEstimate)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-sm font-semibold text-foreground">Net Earnings</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.netEarnings)}</span>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-4 bg-card rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">vs Current Month</span>
              <div className={`flex items-center space-x-2 ${
                result.comparisonVsCurrent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp className="h-4 w-4" />
                <span className="text-lg font-semibold">
                  {result.comparisonVsCurrent >= 0 ? '+' : ''}{result.comparisonVsCurrent.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Goals */}
        <div className="space-y-4">
          {/* Achievement Level */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Achievement Level</h3>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">
                {result.totalEarnings >= 20000 ? '💎' : result.totalEarnings >= 15000 ? '⭐' : result.totalEarnings >= 10000 ? '🥇' : '🎯'}
              </div>
              <div className="text-lg font-bold text-primary mb-1">
                {result.totalEarnings >= 20000 ? 'Diamond Tier' : result.totalEarnings >= 15000 ? 'Platinum Tier' : result.totalEarnings >= 10000 ? 'Gold Tier' : 'Silver Tier'}
              </div>
              <div className="text-xs text-muted-foreground">
                {result.totalEarnings >= 20000 
                  ? 'Top 1% of agents!' 
                  : result.totalEarnings >= 15000 
                  ? 'Top 5% of agents' 
                  : result.totalEarnings >= 10000 
                  ? 'Above average performance' 
                  : 'Keep growing!'}
              </div>
            </div>

            {/* Next Tier Progress */}
            {result.totalEarnings < 20000 && (
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  Next Tier: {result.totalEarnings >= 15000 ? 'Diamond (SGD 20,000)' : result.totalEarnings >= 10000 ? 'Platinum (SGD 15,000)' : 'Gold (SGD 10,000)'}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min(100, (result.totalEarnings / (result.totalEarnings >= 15000 ? 20000 : result.totalEarnings >= 10000 ? 15000 : 10000)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {formatCurrency(
                    (result.totalEarnings >= 15000 ? 20000 : result.totalEarnings >= 10000 ? 15000 : 10000) - result.totalEarnings
                  )} to go
                </div>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">AI Insights</h3>
            <div className="space-y-3">
              {policiesSold < 5 && (
                <div className="text-xs text-foreground bg-amber-50 dark:bg-amber-950 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  💡 Sell {5 - policiesSold} more {policiesSold === 4 ? 'policy' : 'policies'} to unlock Volume Bonus (+SGD 1,000)
                </div>
              )}
              {avgPremium < 5000 && (
                <div className="text-xs text-foreground bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  💡 Focus on premium products to unlock Premium Bonus (+SGD 1,500)
                </div>
              )}
              {crossSells === 0 && (
                <div className="text-xs text-foreground bg-purple-50 dark:bg-purple-950 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  💡 Add 1 cross-sell to earn +SGD 500 per product
                </div>
              )}
              {result.bonuses.length >= 3 && (
                <div className="text-xs text-foreground bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  ✨ Great work! You're maximizing multiple bonus tiers
                </div>
              )}
            </div>
          </div>

          {/* Monthly Projection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Annual Projection</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {formatCurrency(result.netEarnings * 12)}
              </div>
              <div className="text-xs text-muted-foreground">If you maintain this pace</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

