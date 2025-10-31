'use client';

import { useState } from 'react';
import { Scale, Check, X, Sparkles, Info, ChevronRight } from 'lucide-react';

interface Product {
  provider: string;
  logo: string;
  productName: string;
  category: 'Critical Illness' | 'Term Life' | 'Whole Life';
  monthlyPremium: number;
  sumAssured: number;
  coverage: {
    criticalIllnesses?: number;
    earlyStage?: boolean;
    deathBenefit?: boolean;
    tpd?: boolean;
    premiumWaiver?: boolean;
  };
  pros: string[];
  cons: string[];
  aiScore: number;
  aiRecommendation: string;
}

export default function ProductComparison() {
  const [selectedCategory, setSelectedCategory] = useState<'Critical Illness' | 'Term Life' | 'Whole Life'>('Critical Illness');
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  const allProducts: Product[] = [
    // Critical Illness
    {
      provider: 'Prudential',
      logo: '🏢',
      productName: 'PRUCancer 360',
      category: 'Critical Illness',
      monthlyPremium: 285,
      sumAssured: 500000,
      coverage: {
        criticalIllnesses: 100,
        earlyStage: true,
        deathBenefit: true,
        tpd: true,
        premiumWaiver: true
      },
      pros: [
        'Comprehensive cancer coverage including early stages',
        'Recurrence benefit up to 3 times',
        'Payout for diagnosis, not just major stages'
      ],
      cons: [
        'Higher premium vs competitors',
        'Cancer-specific, limited other CI coverage'
      ],
      aiScore: 92,
      aiRecommendation: 'Best for customers with family cancer history. Strong early detection benefits justify higher premium.'
    },
    {
      provider: 'Manulife',
      logo: '🌿',
      productName: 'ManuProtect Critical Care',
      category: 'Critical Illness',
      monthlyPremium: 265,
      sumAssured: 500000,
      coverage: {
        criticalIllnesses: 120,
        earlyStage: true,
        deathBenefit: true,
        tpd: true,
        premiumWaiver: true
      },
      pros: [
        'Most comprehensive CI list (120+)',
        'Multi-pay: up to 5 claims on different conditions',
        'Covers children at no extra cost'
      ],
      cons: [
        'Complex policy terms',
        'Lower payout for early stages (25%)'
      ],
      aiScore: 89,
      aiRecommendation: 'Ideal for young families wanting comprehensive protection. Best value for money with multi-pay feature.'
    },
    {
      provider: 'AIA',
      logo: '🔴',
      productName: 'AIA Critical Cover Plus',
      category: 'Critical Illness',
      monthlyPremium: 298,
      sumAssured: 500000,
      coverage: {
        criticalIllnesses: 105,
        earlyStage: true,
        deathBenefit: true,
        tpd: true,
        premiumWaiver: true
      },
      pros: [
        'Includes mental illness coverage (unique)',
        'Valid worldwide, not just Singapore',
        'Highest early-stage payout (40%)'
      ],
      cons: [
        'Most expensive option',
        'No multi-pay benefit'
      ],
      aiScore: 87,
      aiRecommendation: 'Premium choice for frequent travelers and expats. Mental illness coverage is industry-leading.'
    },
    {
      provider: 'Great Eastern',
      logo: '⭐',
      productName: 'GREAT CareShield',
      category: 'Critical Illness',
      monthlyPremium: 245,
      sumAssured: 500000,
      coverage: {
        criticalIllnesses: 85,
        earlyStage: false,
        deathBenefit: true,
        tpd: true,
        premiumWaiver: false
      },
      pros: [
        'Lowest premium among major providers',
        '10% no-claim bonus every 5 years',
        'Strong local presence and support'
      ],
      cons: [
        'No early-stage coverage',
        'Fewer conditions covered (85 vs 100+)'
      ],
      aiScore: 78,
      aiRecommendation: 'Budget-conscious customers. Good basic coverage but lacks advanced features like early-stage payout.'
    },

    // Term Life
    {
      provider: 'Prudential',
      logo: '🏢',
      productName: 'PRUTerm Plus',
      category: 'Term Life',
      monthlyPremium: 68,
      sumAssured: 1000000,
      coverage: {
        deathBenefit: true,
        tpd: true,
        premiumWaiver: false
      },
      pros: [
        'Very affordable for high coverage',
        'Can convert to whole life without health check',
        'Premiums guaranteed not to increase'
      ],
      cons: [
        'No cash value/returns',
        'Coverage ends at age 65'
      ],
      aiScore: 91,
      aiRecommendation: 'Perfect for young families needing high coverage at low cost. Best term life value in market.'
    },
    {
      provider: 'Manulife',
      logo: '🌿',
      productName: 'LifeProtect Term',
      category: 'Term Life',
      monthlyPremium: 72,
      sumAssured: 1000000,
      coverage: {
        deathBenefit: true,
        tpd: true,
        premiumWaiver: true
      },
      pros: [
        'Coverage extends to age 75 (vs 65)',
        'Auto 5% coverage increase yearly',
        'Premium waiver on TPD'
      ],
      cons: [
        'Slightly higher premium',
        'No conversion option'
      ],
      aiScore: 88,
      aiRecommendation: 'Best for those wanting extended coverage into retirement years. Inflation protection built-in.'
    },
    {
      provider: 'AIA',
      logo: '🔴',
      productName: 'AIA Simple Term',
      category: 'Term Life',
      monthlyPremium: 65,
      sumAssured: 1000000,
      coverage: {
        deathBenefit: true,
        tpd: false,
        premiumWaiver: false
      },
      pros: [
        'Lowest premium in category',
        'No medical examination required',
        'Approval in 24 hours'
      ],
      cons: [
        'TPD not included (add-on only)',
        'Premium increases after age 55'
      ],
      aiScore: 85,
      aiRecommendation: 'Quick protection for healthy individuals. Best for those avoiding medical exams.'
    },

    // Whole Life
    {
      provider: 'Prudential',
      logo: '🏢',
      productName: 'PRULife Vantage Premier',
      category: 'Whole Life',
      monthlyPremium: 485,
      sumAssured: 250000,
      coverage: {
        deathBenefit: true,
        tpd: true,
        criticalIllnesses: 37,
        premiumWaiver: true
      },
      pros: [
        'Coverage for entire life',
        'Guaranteed + non-guaranteed returns',
        'Can borrow against policy'
      ],
      cons: [
        'High premium commitment',
        'Returns not guaranteed'
      ],
      aiScore: 84,
      aiRecommendation: 'For high-income individuals wanting protection + savings. Not ideal for pure protection needs.'
    },
    {
      provider: 'Manulife',
      logo: '🌿',
      productName: 'ManuGrowth Legacy',
      category: 'Whole Life',
      monthlyPremium: 520,
      sumAssured: 250000,
      coverage: {
        deathBenefit: true,
        tpd: true,
        premiumWaiver: false
      },
      pros: [
        'Higher projected returns vs Prudential',
        'Flexible partial withdrawals',
        'Estate planning benefits'
      ],
      cons: [
        'Highest premium in category',
        'No CI riders available'
      ],
      aiScore: 81,
      aiRecommendation: 'Wealth accumulation focus. Better for estate planning than pure protection.'
    }
  ];

  const categories = ['Critical Illness', 'Term Life', 'Whole Life'];
  const filteredProducts = allProducts.filter(p => p.category === selectedCategory);

  const toggleCompare = (product: Product) => {
    if (comparedProducts.find(p => p.productName === product.productName)) {
      setComparedProducts(comparedProducts.filter(p => p.productName !== product.productName));
    } else if (comparedProducts.length < 3) {
      setComparedProducts([...comparedProducts, product]);
    }
  };

  const isCompared = (product: Product) => {
    return comparedProducts.some(p => p.productName === product.productName);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 bg-black border-green-500';
    if (score >= 85) return 'text-blue-500 bg-black border-blue-500';
    if (score >= 80) return 'text-amber-500 bg-black border-amber-500';
    return 'text-slate-500 bg-black border-slate-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5 rounded-xl">
        <div className="bg-background rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Side-by-Side Product Comparison</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Real insurance products from Prudential, Manulife, AIA & Great Eastern
              </p>
              <div className="flex items-center space-x-2 text-xs text-primary bg-accent px-3 py-2 rounded-lg border border-primary/30 w-fit">
                <Info className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">Select 2-3 products below to see side-by-side comparison table</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5 rounded-full">
              <div className="bg-background rounded-full p-3">
                <Scale className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold text-foreground">Step 1: Choose Category</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat as any);
              setComparedProducts([]);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Comparison Status Banner */}
      {comparedProducts.length > 0 && (
        <div className="bg-card border-2 border-green-500 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-foreground mb-2 flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Comparing {comparedProducts.length} products • Scroll down to see comparison table</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {comparedProducts.map(p => (
                  <span key={p.productName} className="px-3 py-1 bg-black border-2 border-green-500 rounded-full text-sm font-bold text-green-500 flex items-center space-x-2">
                    <Check className="h-3 w-3" />
                    <span>{p.productName}</span>
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setComparedProducts([])}
              className="px-5 py-2 bg-black border-2 border-red-500 text-red-500 rounded-full text-sm font-bold hover:bg-red-500 hover:text-black transition-all"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Step 2 Indicator */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold text-foreground">
          Step 2: Select 2-3 Products to Compare ({comparedProducts.length}/3 selected)
        </span>
      </div>

      {/* Products Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.productName}
            className={`bg-card rounded-xl p-6 transition-all cursor-pointer ${
              isCompared(product)
                ? 'border-4 border-primary shadow-xl'
                : 'border-2 border-border hover:border-primary/30 hover:shadow-lg'
            }`}
            onClick={() => toggleCompare(product)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-14 w-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
                  <Check className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">{product.provider}</div>
                  <h3 className="text-lg font-bold text-foreground">{product.productName}</h3>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-sm font-bold border ${getScoreColor(product.aiScore)}`}>
                AI: {product.aiScore}
              </div>
            </div>

            <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-baseline space-x-2 mb-1">
                <div className="text-3xl font-bold text-foreground">SGD {product.monthlyPremium}</div>
                <div className="text-sm text-muted-foreground font-medium">/month</div>
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Coverage: SGD {(product.sumAssured / 1000).toFixed(0)}K
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-xs font-semibold text-muted-foreground mb-2">KEY PROS</div>
              {product.pros.slice(0, 3).map((pro, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-foreground">{pro}</span>
                </div>
              ))}
            </div>

            <div className="bg-accent border border-primary/20 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-xs font-medium text-foreground">{product.aiRecommendation}</div>
              </div>
            </div>

            <button
              className={`w-full px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                isCompared(product)
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-accent hover:bg-accent/80 text-foreground border-2 border-border'
              }`}
            >
              {isCompared(product) ? '✓ Added to Compare' : '+ Add to Compare'}
            </button>
          </div>
        ))}
      </div>

      {/* Side-by-Side Comparison Table */}
      {comparedProducts.length >= 2 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold text-foreground">📊 Side-by-Side Comparison</span>
            <span className="text-xs text-muted-foreground">(Scroll horizontally if needed)</span>
          </div>

          <div className="overflow-x-auto border-2 border-primary/30 rounded-xl shadow-2xl">
            <table className="w-full border-collapse min-w-[800px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-card border-b-2 border-primary">
                  <th className="text-left p-5 font-bold text-foreground text-sm sticky left-0 bg-card border-r-2 border-primary/20">
                    FEATURE
                  </th>
                  {comparedProducts.map((product) => (
                    <th key={product.productName} className="text-center p-5 min-w-[280px] border-l border-border bg-card">
                      <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">{product.provider}</div>
                      <div className="font-bold text-foreground text-base">{product.productName}</div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${getScoreColor(product.aiScore)}`}>
                        AI Score: {product.aiScore}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Monthly Premium */}
                <tr className="border-b-2 border-border bg-primary/5">
                  <td className="p-4 font-bold text-sm sticky left-0 bg-primary/5 border-r border-border">💰 Monthly Premium</td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 text-center border-l border-border">
                      <div className="text-2xl font-bold text-foreground">SGD {product.monthlyPremium}</div>
                    </td>
                  ))}
                </tr>

                {/* Sum Assured */}
                <tr className="border-b border-border bg-card">
                  <td className="p-4 font-bold text-sm sticky left-0 bg-card border-r border-border">🛡️ Sum Assured</td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 text-center font-semibold text-foreground border-l border-border">
                      SGD {(product.sumAssured / 1000).toFixed(0)}K
                    </td>
                  ))}
                </tr>

                {/* Category-specific rows */}
                {selectedCategory === 'Critical Illness' && (
                  <>
                    <tr className="border-b border-border bg-accent">
                      <td className="p-4 font-bold text-sm sticky left-0 bg-accent border-r border-border">🏥 Conditions Covered</td>
                      {comparedProducts.map((product) => (
                        <td key={product.productName} className="p-4 text-center font-semibold text-foreground border-l border-border">
                          {product.coverage.criticalIllnesses || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border bg-card">
                      <td className="p-4 font-bold text-sm sticky left-0 bg-card border-r border-border">🔬 Early Stage Coverage</td>
                      {comparedProducts.map((product) => (
                        <td key={product.productName} className="p-4 text-center border-l border-border">
                          {product.coverage.earlyStage ? (
                            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-black border-2 border-green-500 text-green-500 rounded-full font-bold text-sm">
                              <Check className="h-5 w-5" />
                              <span>YES</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-black border-2 border-red-500 text-red-500 rounded-full font-bold text-sm">
                              <X className="h-5 w-5" />
                              <span>NO</span>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {/* Common coverage features */}
                <tr className="border-b border-border bg-accent">
                  <td className="p-4 font-bold text-sm sticky left-0 bg-accent border-r border-border">☠️ Death Benefit</td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 text-center border-l border-border">
                      {product.coverage.deathBenefit ? (
                        <Check className="h-7 w-7 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-7 w-7 text-red-600 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-border bg-card">
                  <td className="p-4 font-bold text-sm sticky left-0 bg-card border-r border-border">♿ TPD Coverage</td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 text-center border-l border-border">
                      {product.coverage.tpd ? (
                        <Check className="h-7 w-7 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-7 w-7 text-red-600 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="border-b-2 border-border bg-accent">
                  <td className="p-4 font-bold text-sm sticky left-0 bg-accent border-r border-border">✋ Premium Waiver</td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 text-center border-l border-border">
                      {product.coverage.premiumWaiver ? (
                        <Check className="h-7 w-7 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-7 w-7 text-red-600 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Pros */}
                <tr className="border-b border-border bg-accent">
                  <td className="p-4 font-bold text-sm sticky left-0 bg-accent border-r border-border align-top">✅ PROS</td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 border-l border-border">
                      <div className="space-y-2">
                        {product.pros.map((pro, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground font-medium">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Cons */}
                <tr className="border-b-2 border-border bg-card">
                  <td className="p-4 font-bold text-sm sticky left-0 bg-card border-r border-border align-top">❌ CONS</td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 border-l border-border">
                      <div className="space-y-2">
                        {product.cons.map((con, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs">
                            <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground font-medium">{con}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* AI Recommendation */}
                <tr>
                  <td className="p-4 font-bold text-sm sticky left-0 bg-accent border-r border-border align-top">
                    ✨ AI RECOMMENDATION
                  </td>
                  {comparedProducts.map((product) => (
                    <td key={product.productName} className="p-4 bg-accent border-l border-border">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="text-xs font-medium text-foreground">{product.aiRecommendation}</div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
