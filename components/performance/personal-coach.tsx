'use client';

import { useState } from 'react';
import { UserCheck, Target, TrendingUp, MessageSquare, CheckCircle2, Star, Award, Zap, Calendar, Clock } from 'lucide-react';

interface CoachingInsight {
  type: 'strength' | 'improvement' | 'action' | 'milestone';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface DailyGoal {
  id: number;
  goal: string;
  completed: boolean;
  points: number;
}

export default function PersonalCoach() {
  const [selectedAgent, setSelectedAgent] = useState('Daniel Lim');
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'insights'>('today');

  const agentProfile = {
    name: 'Daniel Lim',
    level: 'Senior Agent',
    currentCommission: 120000,
    targetCommission: 100000,
    achievement: 120,
    streak: 15, // days of consistent performance
    totalPoints: 2450,
    rank: 3, // out of all agents
  };

  const dailyGoals: DailyGoal[] = [
    { id: 1, goal: 'Make 5 client calls', completed: true, points: 50 },
    { id: 2, goal: 'Send 3 follow-up emails', completed: true, points: 30 },
    { id: 3, goal: 'Complete 1 training module', completed: false, points: 100 },
    { id: 4, goal: 'Schedule 2 meetings for tomorrow', completed: true, points: 40 },
    { id: 5, goal: 'Update 3 client records', completed: false, points: 20 },
  ];

  const weeklyGoals = [
    { goal: 'Close 3 new policies', progress: 2, target: 3, unit: 'policies' },
    { goal: 'Generate 10 qualified leads', progress: 8, target: 10, unit: 'leads' },
    { goal: 'Conduct 5 client reviews', progress: 5, target: 5, unit: 'reviews' },
    { goal: 'Complete compliance training', progress: 1, target: 1, unit: 'modules' },
  ];

  const coachingInsights: CoachingInsight[] = [
    {
      type: 'strength',
      title: 'Exceptional Closing Rate',
      description: 'Your closing rate is 35% higher than team average. Keep using your consultative approach with high-value clients.',
      priority: 'medium'
    },
    {
      type: 'improvement',
      title: 'Morning Productivity Dip',
      description: 'Data shows you close 40% more deals in the afternoon. Consider scheduling important calls after 2 PM.',
      priority: 'high'
    },
    {
      type: 'action',
      title: 'Follow Up Opportunity',
      description: '3 clients from last month haven\'t responded. Send a personalized check-in today to re-engage them.',
      priority: 'high'
    },
    {
      type: 'milestone',
      title: 'Diamond Tier Unlocked!',
      description: 'You\'ve reached 120% of your target. You qualify for the Diamond tier bonus program.',
      priority: 'medium'
    },
    {
      type: 'improvement',
      title: 'Cross-Selling Opportunity',
      description: '60% of your clients only have one product. Consider introducing complementary products to existing clients.',
      priority: 'medium'
    },
    {
      type: 'strength',
      title: 'Client Retention Champion',
      description: 'Your client retention rate is 95% - top 5% in the company. Your relationship-building skills are exceptional.',
      priority: 'low'
    },
  ];

  const upcomingTasks = [
    { time: '10:00 AM', task: 'Client call with Mrs. Chen', type: 'call' },
    { time: '2:00 PM', task: 'Policy review meeting - Mr. Tan', type: 'meeting' },
    { time: '3:30 PM', task: 'Follow up: David Wong quote', type: 'followup' },
    { time: '5:00 PM', task: 'Weekly team sync', type: 'meeting' },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength':
        return <Star className="h-5 w-5" />;
      case 'improvement':
        return <TrendingUp className="h-5 w-5" />;
      case 'action':
        return <Zap className="h-5 w-5" />;
      case 'milestone':
        return <Award className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'improvement':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'action':
        return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'milestone':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  const completedGoals = dailyGoals.filter(g => g.completed).length;
  const totalPoints = dailyGoals.filter(g => g.completed).reduce((sum, g) => sum + g.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Personal AI Coach</h2>
            <p className="text-sm text-muted-foreground">
              Daily personalized coaching and guidance for {agentProfile.name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Performance Streak</div>
              <div className="text-2xl font-bold text-orange-500">{agentProfile.streak}🔥</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Points Today</div>
              <div className="text-2xl font-bold text-primary">{totalPoints}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg">
              <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Achievement</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{agentProfile.achievement}%</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Above target</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-lg">
              <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Company Rank</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">#{agentProfile.rank}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Top 5%</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
              <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total Points</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{agentProfile.totalPoints}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Lifetime</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-amber-100 dark:bg-amber-950 p-2 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Goals Today</div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{completedGoals}/{dailyGoals.length}</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-border">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            activeTab === 'today'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Today's Goals
        </button>
        <button
          onClick={() => setActiveTab('week')}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            activeTab === 'week'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-2 text-sm font-medium transition-all ${
            activeTab === 'insights'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          AI Insights
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'today' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Today's Goals</h3>
              <div className="space-y-3">
                {dailyGoals.map((goal) => (
                  <div 
                    key={goal.id}
                    className={`p-4 rounded-lg border transition-all ${
                      goal.completed 
                        ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                        : 'bg-accent border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          goal.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-slate-300 dark:bg-slate-600'
                        }`}>
                          {goal.completed && <CheckCircle2 className="h-4 w-4" />}
                        </div>
                        <span className={`text-sm font-medium ${
                          goal.completed ? 'text-foreground line-through' : 'text-foreground'
                        }`}>
                          {goal.goal}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-primary">+{goal.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'week' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Goals</h3>
              <div className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index} className="p-4 bg-accent rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{goal.goal}</span>
                      <span className="text-sm font-semibold text-foreground">
                        {goal.progress}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            goal.progress >= goal.target ? 'bg-green-500' : 'bg-primary'
                          }`}
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((goal.progress / goal.target) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-3">
              {coachingInsights.map((insight, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                        {insight.priority === 'high' && (
                          <span className="text-xs px-2 py-0.5 bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full font-medium">
                            Priority
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Today's Schedule */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Today's Schedule</span>
            </h3>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-accent rounded-lg">
                  <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-primary font-medium mb-1">{task.time}</div>
                    <div className="text-xs text-foreground">{task.task}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Quick Wins</span>
            </h3>
            <div className="space-y-2">
              <div className="text-xs text-foreground bg-card/50 p-3 rounded-lg">
                Complete 1 training module to earn 100 points
              </div>
              <div className="text-xs text-foreground bg-card/50 p-3 rounded-lg">
                Update 3 client records to unlock bonus streak
              </div>
              <div className="text-xs text-foreground bg-card/50 p-3 rounded-lg">
                Follow up with 3 warm leads for instant momentum
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">💪</div>
            <p className="text-sm font-medium text-foreground mb-2">
              "You're in the top 5% this month!"
            </p>
            <p className="text-xs text-muted-foreground">
              Keep up the excellent work, Daniel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

