'use client';

import { useState } from 'react';
import { Heart, TrendingUp, Shield, Sparkles, ChevronRight, DollarSign, Check, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  monthlyPremium: number;
  coverage: string;
  matchScore: number;
  benefits: string[];
  whyRecommended: string;
  type: 'primary' | 'cross-sell' | 'upsell';
}

const sampleCustomers = [
  {
    id: 'CS-SG-001',
    name: 'Brandon Ng',
    age: 34,
    income: 180000,
    lifestage: 'Young Family',
    currentProducts: ['Term Life SGD 200K', 'Basic Medical'],
    protectionGap: 65,
    primaryRecommendation: {
      id: 'prod-1',
      name: 'Critical Illness Plus',
      category: 'Health Protection',
      monthlyPremium: 280,
      coverage: 'SGD 500,000',
      matchScore: 96,
      benefits: [
        'Covers 100+ critical illnesses',
        'Early stage coverage',
        'Premium waiver on diagnosis',
        'Death benefit included'
      ],
      whyRecommended: 'Your current coverage has a significant gap for critical illness. With a young family, this ensures financial security if you fall ill.',
      type: 'primary' as const
    },
    crossSellOpportunities: [
      {
        id: 'prod-2',
        name: 'Education Savings Plan',
        category: 'Savings & Investment',
        monthlyPremium: 450,
        coverage: 'SGD 150,000 maturity',
        matchScore: 88,
        benefits: [
          'Guaranteed returns for education',
          'Flexible premium payment',
          'Death & TPD coverage',
          'Tax benefits available'
        ],
        whyRecommended: 'Based on your social media activity, you recently welcomed a baby. Start building their education fund now with compound growth.',
        type: 'cross-sell' as const
      },
      {
        id: 'prod-3',
        name: 'Disability Income Protection',
        category: 'Income Protection',
        monthlyPremium: 195,
        coverage: 'SGD 5,000/month benefit',
        matchScore: 85,
        benefits: [
          'Monthly income if unable to work',
          'Covers partial disability',
          'Inflation protection',
          'Own occupation definition'
        ],
        whyRecommended: 'As the primary breadwinner, protect your income stream. This pays you monthly if injury prevents you from working.',
        type: 'cross-sell' as const
      }
    ],
    upsellOpportunities: [
      {
        id: 'prod-4',
        name: 'Critical Illness Premier',
        category: 'Health Protection',
        monthlyPremium: 420,
        coverage: 'SGD 1,000,000',
        matchScore: 92,
        benefits: [
          'All benefits of Plus plan',
          'Multi-claim up to 5 times',
          'Cancer booster benefit',
          'Advanced medical rider included',
          'Premium guaranteed for life'
        ],
        whyRecommended: 'For only SGD 140 more per month, get double coverage and multi-claim protection. Your income level supports this premium comfortably.',
        type: 'upsell' as const
      }
    ]
  }
];

export default function ProductMatchmaker() {
  const [customer] = useState(sampleCustomers[0]);
  const [selectedProduct, setSelectedProduct] = useState<typeof customer.primaryRecommendation | typeof customer.crossSellOpportunities[0] | typeof customer.upsellOpportunities[0]>(customer.primaryRecommendation);
  const [showBundle, setShowBundle] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);

  const runEligibilityCheck = () => {
    setShowEligibility(true);
    // Simulate AI processing
    setTimeout(() => {
      setEligibilityResult({
        eligible: true,
        score: 92,
        factors: [
          { factor: 'Age', status: 'pass', detail: '34 years - within acceptable range' },
          { factor: 'Health Status', status: 'pass', detail: 'No pre-existing conditions flagged' },
          { factor: 'Income Level', status: 'pass', detail: 'SGD 180K - meets minimum threshold' },
          { factor: 'Occupation', status: 'pass', detail: 'Low-risk occupation category' }
        ],
        recommendation: 'Customer is highly eligible for all recommended products',
        specialConditions: 'No additional medical screening required'
      });
    }, 2500);
  };

  const allProducts = [
    customer.primaryRecommendation,
    ...customer.crossSellOpportunities,
    ...customer.upsellOpportunities
  ];

  const calculateBundleSavings = () => {
    const total = customer.primaryRecommendation.monthlyPremium + 
                  customer.crossSellOpportunities[0].monthlyPremium + 
                  customer.crossSellOpportunities[1].monthlyPremium;
    const discount = total * 0.15;
    return { total, discount, final: total - discount };
  };

  const bundle = calculateBundleSavings();

  const getProductTypeColor = (type: string) => {
    switch (type) {
      case 'primary': return 'bg-black text-blue-500 border-blue-500 border-2';
      case 'cross-sell': return 'bg-black text-green-500 border-green-500 border-2';
      case 'upsell': return 'bg-black text-purple-500 border-purple-500 border-2';
      default: return 'bg-black text-gray-500 border-gray-500 border-2';
    }
  };

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'primary': return '🎯 Perfect Match';
      case 'cross-sell': return '💡 Also Consider';
      case 'upsell': return '⭐ Premium Option';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Customer Card */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{customer.name}</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Age: {customer.age}</span>
              <span>•</span>
              <span>Income: SGD {customer.income.toLocaleString()}</span>
              <span>•</span>
              <span className="px-3 py-1 bg-black border-2 border-blue-500 text-blue-500 rounded-full font-bold text-xs">
                {customer.lifestage}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-sm text-muted-foreground mb-1">Current Coverage</div>
              <div className="flex flex-wrap gap-2">
                {customer.currentProducts.map((prod, idx) => (
                  <span key={idx} className="px-3 py-1 bg-card border border-border rounded-lg text-sm">
                    {prod}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={runEligibilityCheck}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              <Zap className="h-4 w-4" />
              <span>AI Eligibility Check</span>
            </button>
            <div className="text-right">
              <div className="text-4xl font-bold text-red-600">{customer.protectionGap}%</div>
              <div className="text-sm text-muted-foreground">Protection Gap</div>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Modal */}
      {showEligibility && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { if (eligibilityResult) { setShowEligibility(false); setEligibilityResult(null); } }}>
          <div className="bg-card border-2 border-primary rounded-xl p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">AI Eligibility Assessment</h3>
                  <p className="text-sm text-muted-foreground">Powered by Claude Sonnet 4.5</p>
                </div>
              </div>
              {eligibilityResult && (
                <button onClick={() => { setShowEligibility(false); setEligibilityResult(null); }} className="text-muted-foreground hover:text-foreground text-2xl">✕</button>
              )}
            </div>

            {!eligibilityResult ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm text-muted-foreground">Running AI eligibility check with Claude...</p>
                <p className="text-xs text-muted-foreground mt-2">Analyzing health status, age, income, and occupation</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center p-6 bg-accent rounded-xl border-2 border-green-500">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-500 mb-2">{eligibilityResult.score}%</div>
                    <div className="text-sm font-medium text-foreground">Eligibility Score</div>
                    <div className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-bold border-2 ${
                      eligibilityResult.eligible ? 'bg-black border-green-500 text-green-500' : 'bg-black border-red-500 text-red-500'
                    }`}>
                      {eligibilityResult.eligible ? '✓ HIGHLY ELIGIBLE' : '✗ NOT ELIGIBLE'}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Assessment Factors</h4>
                  <div className="space-y-2">
                    {eligibilityResult.factors.map((item: any, i: number) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          item.status === 'pass' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {item.status === 'pass' ? '✓' : '✗'}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{item.factor}</div>
                          <div className="text-xs text-muted-foreground">{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-accent rounded-xl border border-primary/20">
                  <div className="text-sm font-semibold text-foreground mb-1">AI Recommendation</div>
                  <div className="text-sm text-foreground">{eligibilityResult.recommendation}</div>
                  {eligibilityResult.specialConditions && (
                    <div className="text-xs text-muted-foreground mt-2">✨ {eligibilityResult.specialConditions}</div>
                  )}
                </div>

                <button
                  onClick={() => { setShowEligibility(false); setEligibilityResult(null); }}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
                >
                  Close Assessment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bundle Offer */}
      {showBundle && (
        <div className="bg-card border-2 border-green-500 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-black border-2 border-green-500 text-green-500 px-4 py-1 rounded-bl-lg font-bold text-sm">
            SAVE 15%
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold text-foreground">Smart Bundle Package</h3>
              </div>
              <p className="text-sm text-muted-foreground">Complete protection at a special price</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-foreground">{customer.primaryRecommendation.name}</span>
              <span className="text-muted-foreground">SGD {customer.primaryRecommendation.monthlyPremium}/mo</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-foreground">{customer.crossSellOpportunities[0].name}</span>
              <span className="text-muted-foreground">SGD {customer.crossSellOpportunities[0].monthlyPremium}/mo</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-foreground">{customer.crossSellOpportunities[1].name}</span>
              <span className="text-muted-foreground">SGD {customer.crossSellOpportunities[1].monthlyPremium}/mo</span>
            </div>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-border">
            <div>
              <div className="text-sm text-muted-foreground line-through">
                Regular: SGD {bundle.total}/month
              </div>
              <div className="text-2xl font-bold text-foreground">
                Bundle: SGD {bundle.final}/month
              </div>
              <div className="text-xs text-green-500 font-medium">
                You save SGD {bundle.discount.toFixed(0)}/month
              </div>
            </div>
            <button className="px-6 py-3 bg-black border-2 border-green-500 text-green-500 rounded-full font-bold hover:bg-green-500 hover:text-black transition-all">
              Get Bundle
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`bg-card border-2 rounded-xl p-6 cursor-pointer transition-all ${
              selectedProduct.id === product.id
                ? 'border-primary shadow-lg scale-[1.02]'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border mb-2 ${getProductTypeColor(product.type)}`}>
                  {getProductTypeLabel(product.type)}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{product.matchScore}</div>
                <div className="text-xs text-muted-foreground">AI Match</div>
              </div>
            </div>

            <div className="bg-accent rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Coverage</span>
                <span className="font-bold text-foreground">{product.coverage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Premium</span>
                <span className="text-lg font-bold text-primary">SGD {product.monthlyPremium}/mo</span>
              </div>
            </div>

            <div className="bg-accent rounded-lg p-4 mb-4 border border-primary/20">
              <div className="flex items-start space-x-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{product.whyRecommended}</p>
              </div>
            </div>

            <div className="space-y-2">
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Select Product
            </button>
          </div>
        ))}
      </div>

      {/* Bundle CTA */}
      {!showBundle && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Want to save 15%?</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Bundle {customer.primaryRecommendation.name} with complementary products for complete protection
              </p>
            </div>
            <button
              onClick={() => setShowBundle(true)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              View Bundle Deal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

