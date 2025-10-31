// Centralized data context for AI agents
export interface DataContext {
  candidates: any[];
  leads: any[];
  customers: any[];
  agents: any[];
  location: 'singapore' | 'hongkong';
}

export function getDataContext(location: 'singapore' | 'hongkong'): DataContext {
  return {
    candidates: getCandidates(location),
    leads: getLeads(location),
    customers: getCustomers(location),
    agents: getAgents(location),
    location
  };
}

function getCandidates(location: 'singapore' | 'hongkong') {
  const candidates = {
    singapore: [
      {
        id: 'SG001',
        name: 'Sarah Chen Li Ying',
        status: 'ready',
        experience: 5,
        skills: ['Life Insurance', 'Health Insurance', 'Financial Planning'],
        matchScore: 92,
        phone: '+65 9123 4567',
        email: 'sarah.chen@example.sg',
        availability: 'Immediate'
      },
      {
        id: 'SG002',
        name: 'Marcus Lim Wei Jie',
        status: 'interview',
        experience: 7,
        skills: ['Investment Products', 'Retirement Planning', 'Estate Planning'],
        matchScore: 89,
        phone: '+65 8234 5678',
        email: 'marcus.lim@example.sg',
        availability: '2 weeks notice'
      },
      {
        id: 'SG003',
        name: 'Emily Tan Hui Min',
        status: 'onboarding',
        experience: 3,
        skills: ['Customer Service', 'Sales', 'Relationship Management'],
        matchScore: 85,
        phone: '+65 9876 5432',
        email: 'emily.tan@example.sg',
        availability: 'Immediate'
      },
      {
        id: 'SG004',
        name: 'Daniel Wong Boon Huat',
        status: 'screening',
        experience: 10,
        skills: ['Corporate Insurance', 'Group Benefits', 'Employee Benefits'],
        matchScore: 94,
        phone: '+65 8765 4321',
        email: 'daniel.wong@example.sg',
        availability: '1 month notice'
      }
    ],
    hongkong: [
      {
        id: 'HK001',
        name: 'Vivian Chan Siu Ying',
        status: 'ready',
        experience: 6,
        skills: ['Life Insurance', 'Wealth Management', 'Cross-border Sales'],
        matchScore: 94,
        phone: '+852 9123 4567',
        email: 'vivian.chan@example.hk',
        availability: 'Immediate'
      },
      {
        id: 'HK002',
        name: 'Kenneth Lee Chun Kit',
        status: 'interview',
        experience: 4,
        skills: ['Medical Insurance', 'Group Benefits', 'Corporate Sales'],
        matchScore: 89,
        phone: '+852 6234 5678',
        email: 'kenneth.lee@example.hk',
        availability: '2 weeks notice'
      },
      {
        id: 'HK003',
        name: 'Sarah Ng Mei Ling',
        status: 'onboarding',
        experience: 8,
        skills: ['Investment Insurance', 'Retirement Planning', 'Regulatory Compliance'],
        matchScore: 92,
        phone: '+852 9876 5432',
        email: 'sarah.ng@example.hk',
        availability: 'Immediate'
      },
      {
        id: 'HK004',
        name: 'Michael Cheung Kar Wai',
        status: 'screening',
        experience: 3,
        skills: ['General Insurance', 'Digital Marketing', 'Client Acquisition'],
        matchScore: 83,
        phone: '+852 5432 1098',
        email: 'michael.cheung@example.hk',
        availability: '1 month notice'
      }
    ]
  };
  
  return candidates[location] || [];
}

function getLeads(location: 'singapore' | 'hongkong') {
  const leads = {
    singapore: [
      {
        id: 'LD-SG-001',
        name: 'Jonathan Koh Wei Ming',
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
        name: 'Betty Leung Wai Ling',
        source: 'Digital Ad Campaign',
        score: 72,
        status: 'new',
        age: 26,
        income: 'HKD 300,000 - 400,000',
        interest: ['Health Insurance', 'Travel Insurance'],
        phone: '+852 5432 1098',
        email: 'betty.leung@example.hk',
        priority: 'low'
      }
    ]
  };
  
  return leads[location] || [];
}

function getCustomers(location: 'singapore' | 'hongkong') {
  const customers = {
    singapore: [
      {
        id: 'CS-SG-001',
        name: 'Anthony Ng Chee Keong',
        age: 45,
        income: 'SGD 380,000',
        currentCoverage: ['Whole Life SGD 500K', 'Medical Premium', 'Investment Plan'],
        protectionGap: 35,
        nextBestOffer: 'Critical Illness Rider',
        predictedNeed: 'Health Protection Enhancement',
        lifestage: 'Established Family',
        riskProfile: 'Moderate',
        engagement: 'high',
        phone: '+65 9234 5678',
        email: 'anthony.ng@example.sg'
      },
      {
        id: 'CS-SG-002',
        name: 'Jennifer Tan Siew Leng',
        age: 38,
        income: 'SGD 280,000',
        currentCoverage: ['Term Life SGD 1M', 'Hospitalization', 'Education Plan for 2 kids'],
        protectionGap: 20,
        nextBestOffer: 'Retirement Income Plan',
        predictedNeed: 'Long-term Wealth Accumulation',
        lifestage: 'Young Family',
        riskProfile: 'Conservative',
        engagement: 'high',
        phone: '+65 8765 4321',
        email: 'jennifer.tan@example.sg'
      },
      {
        id: 'CS-SG-003',
        name: 'Kevin Lim Boon Teck',
        age: 32,
        income: 'SGD 160,000',
        currentCoverage: ['Group Medical', 'Basic Life SGD 200K'],
        protectionGap: 55,
        nextBestOffer: 'Comprehensive Protection Package',
        predictedNeed: 'Foundation Building',
        lifestage: 'Young Professional',
        riskProfile: 'Moderate',
        engagement: 'medium',
        phone: '+65 9123 4567',
        email: 'kevin.lim@example.sg'
      },
      {
        id: 'CS-SG-004',
        name: 'Catherine Wong Li Fang',
        age: 29,
        income: 'SGD 95,000',
        currentCoverage: ['Group Medical'],
        protectionGap: 75,
        nextBestOffer: 'Young Professional Starter Pack',
        predictedNeed: 'Personal Protection Start',
        lifestage: 'Young Professional',
        riskProfile: 'Aggressive',
        engagement: 'low',
        phone: '+65 8234 5678',
        email: 'catherine.wong@example.sg'
      }
    ],
    hongkong: [
      {
        id: 'CS-HK-001',
        name: 'Patrick Chan Pak Hin',
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
        age: 27,
        income: 'HKD 480,000',
        currentCoverage: ['Basic Medical'],
        protectionGap: 80,
        nextBestOffer: 'Young Professional Package',
        predictedNeed: 'Protection Foundation Start',
        lifestage: 'Young Professional',
        riskProfile: 'Moderate',
        engagement: 'low',
        phone: '+852 5432 1098',
        email: 'sarah.tsang@example.hk'
      }
    ]
  };
  
  return customers[location] || [];
}

function getAgents(location: 'singapore' | 'hongkong') {
  const agents = {
    singapore: [
      {
        id: 'AG-SG-001',
        name: 'Emily Tan Hui Min',
        level: 'Senior Agent',
        currentCommission: 185000,
        targetCommission: 180000,
        forecasted: 195000,
        achievement: 103,
        activePolicies: 156,
        conversionRate: 42,
        avgPremium: 7800,
        trainingCompleted: 100,
        coachingAreas: ['Wealth Management', 'Estate Planning'],
        strengths: ['Consultative Selling', 'Relationship Building'],
        recommendations: [
          'Exceeding target - consider promotion to team lead',
          'Share best practices with team',
          'Focus on high net worth segment'
        ]
      },
      {
        id: 'AG-SG-002',
        name: 'Marcus Lim Wei Jie',
        level: 'Agent',
        currentCommission: 142000,
        targetCommission: 150000,
        forecasted: 148000,
        achievement: 95,
        activePolicies: 112,
        conversionRate: 38,
        avgPremium: 6500,
        trainingCompleted: 89,
        coachingAreas: ['Prospecting', 'Lead Generation'],
        strengths: ['Product Knowledge', 'Technical Skills'],
        recommendations: [
          'Close to target - needs 3-4 more cases',
          'Focus on referral generation',
          'Complete advanced sales training'
        ]
      },
      {
        id: 'AG-SG-003',
        name: 'Daniel Wong Boon Huat',
        level: 'Agent',
        currentCommission: 98000,
        targetCommission: 140000,
        forecasted: 125000,
        achievement: 70,
        activePolicies: 89,
        conversionRate: 32,
        avgPremium: 5200,
        trainingCompleted: 76,
        coachingAreas: ['Closing Skills', 'Objection Handling'],
        strengths: ['Persistence', 'Work Ethic'],
        recommendations: [
          'Needs urgent intervention - at risk',
          'Pair with high performer for shadowing',
          'Focus on closing existing pipeline'
        ]
      },
      {
        id: 'AG-SG-004',
        name: 'Grace Koh Mei Ling',
        level: 'Junior Agent',
        currentCommission: 65000,
        targetCommission: 100000,
        forecasted: 88000,
        achievement: 65,
        activePolicies: 54,
        conversionRate: 28,
        avgPremium: 4800,
        trainingCompleted: 65,
        coachingAreas: ['Product Knowledge', 'Presentation Skills'],
        strengths: ['Enthusiasm', 'Coachability'],
        recommendations: [
          'New agent showing good potential',
          'Needs more product training',
          'Increase average premium through upselling'
        ]
      }
    ],
    hongkong: [
      {
        id: 'AG-HK-001',
        name: 'Vivian Chan Siu Ying',
        level: 'Senior Agent',
        currentCommission: 195000,
        targetCommission: 200000,
        forecasted: 205000,
        achievement: 98,
        activePolicies: 186,
        conversionRate: 45,
        avgPremium: 8500,
        trainingCompleted: 94,
        coachingAreas: ['Cross-border Solutions', 'Estate Planning'],
        strengths: ['Relationship Building', 'Premium Cases'],
        recommendations: [
          'Excellent performance - on track to exceed target',
          'Consider mentoring junior agents',
          'Explore executive protection market'
        ]
      },
      {
        id: 'AG-HK-002',
        name: 'Kenneth Lee Chun Kit',
        level: 'Agent',
        currentCommission: 128000,
        targetCommission: 160000,
        forecasted: 148000,
        achievement: 80,
        activePolicies: 124,
        conversionRate: 38,
        avgPremium: 6200,
        trainingCompleted: 82,
        coachingAreas: ['Group Benefits', 'Corporate Sales'],
        strengths: ['Prospecting', 'Presentation'],
        recommendations: [
          'Target 4 corporate accounts to reach goal',
          'Complete Advanced Group Insurance module',
          'Focus on premium enhancement strategies'
        ]
      },
      {
        id: 'AG-HK-003',
        name: 'Sarah Ng Mei Ling',
        level: 'Agent',
        currentCommission: 156000,
        targetCommission: 175000,
        forecasted: 165000,
        achievement: 89,
        activePolicies: 138,
        conversionRate: 40,
        avgPremium: 7200,
        trainingCompleted: 88,
        coachingAreas: ['Retirement Planning', 'Investment Products'],
        strengths: ['Technical Knowledge', 'Client Service'],
        recommendations: [
          'Strong performer with growth potential',
          'Expand into MDRT market segment',
          'Leverage compliance expertise for corporate clients'
        ]
      },
      {
        id: 'AG-HK-004',
        name: 'Michael Cheung Kar Wai',
        level: 'Junior Agent',
        currentCommission: 72000,
        targetCommission: 120000,
        forecasted: 95000,
        achievement: 60,
        activePolicies: 68,
        conversionRate: 30,
        avgPremium: 5400,
        trainingCompleted: 68,
        coachingAreas: ['Client Acquisition', 'Digital Marketing'],
        strengths: ['Social Media', 'Tech-Savvy'],
        recommendations: [
          'Leverage digital skills for lead generation',
          'Improve conversion through better qualification',
          'Complete foundational sales training'
        ]
      }
    ]
  };
  
  return agents[location] || [];
}

export function formatDataForAgent(context: DataContext): string {
  return `
## Available Data for ${context.location === 'singapore' ? 'Singapore' : 'Hong Kong'}

### Candidates (${context.candidates.length} total)
${context.candidates.map(c => `- **${c.id}**: ${c.name} | Match: ${c.matchScore}% | Status: ${c.status} | Skills: ${c.skills.join(', ')} | ${c.experience} years exp`).join('\n')}

### Leads (${context.leads.length} total)
${context.leads.map(l => `- **${l.id}**: ${l.name} | Score: ${l.score} | Status: ${l.status} | Age: ${l.age} | Income: ${l.income} | Interest: ${l.interest.join(', ')}`).join('\n')}

### Customers (${context.customers.length} total)
${context.customers.map(c => `- **${c.id}**: ${c.name} | Age: ${c.age} | Income: ${c.income} | Gap: ${c.protectionGap}% | Next Offer: ${c.nextBestOffer} | Lifestage: ${c.lifestage}`).join('\n')}

### Agents (${context.agents.length} total)
${context.agents.map(a => `- **${a.id}**: ${a.name} | Level: ${a.level} | Achievement: ${a.achievement}% | Commission: ${context.location === 'singapore' ? 'SGD' : 'HKD'} ${a.currentCommission.toLocaleString()} / ${a.targetCommission.toLocaleString()}`).join('\n')}
`;
}

