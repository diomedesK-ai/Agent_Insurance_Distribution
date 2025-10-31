'use client';

import { useState } from 'react';
import { Video, Mic, CheckCircle2, XCircle, AlertCircle, TrendingUp, MessageSquare, Star, Play, Pause } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  category: 'sales' | 'technical' | 'behavioral' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Feedback {
  aspect: string;
  score: number;
  feedback: string;
  type: 'positive' | 'neutral' | 'negative';
}

export default function InterviewSimulator() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Tell me about yourself and why you want to be an insurance agent.",
      category: 'behavioral',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: "How would you handle a client who says insurance is too expensive?",
      category: 'situational',
      difficulty: 'medium'
    },
    {
      id: 3,
      question: "Explain the difference between term life and whole life insurance.",
      category: 'technical',
      difficulty: 'medium'
    },
    {
      id: 4,
      question: "A client has just been diagnosed with a critical illness. They're emotional and want to cancel their policy. How do you respond?",
      category: 'situational',
      difficulty: 'hard'
    },
    {
      id: 5,
      question: "How would you prospect and build your client base in your first 6 months?",
      category: 'sales',
      difficulty: 'hard'
    }
  ];

  const realTimeFeedback: Feedback[] = [
    {
      aspect: 'Confidence',
      score: 85,
      feedback: 'Good eye contact and vocal clarity. Maintain this throughout.',
      type: 'positive'
    },
    {
      aspect: 'Content Structure',
      score: 72,
      feedback: 'Try using the STAR method (Situation, Task, Action, Result) for clearer answers.',
      type: 'neutral'
    },
    {
      aspect: 'Product Knowledge',
      score: 65,
      feedback: 'Consider mentioning specific policy features and benefits.',
      type: 'negative'
    },
    {
      aspect: 'Communication',
      score: 88,
      feedback: 'Excellent use of examples. Clear and concise delivery.',
      type: 'positive'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'technical':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'behavioral':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'situational':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return '';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
    ));
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'negative':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'neutral':
        return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return null;
    }
  };

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      case 'negative':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
      case 'neutral':
        return 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800';
      default:
        return '';
    }
  };

  const handleStartInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestionIndex(0);
    setShowingFeedback(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowingFeedback(false);
      setIsRecording(false);
    } else {
      setIsInterviewActive(false);
      setShowingFeedback(true);
    }
  };

  const avgScore = Math.round(realTimeFeedback.reduce((sum, f) => sum + f.score, 0) / realTimeFeedback.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">AI Interview Coach & Simulator</h2>
            <p className="text-sm text-muted-foreground">
              Practice with virtual interviews and get real-time feedback
            </p>
          </div>
          {!isInterviewActive && (
            <button
              onClick={handleStartInterview}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Start Interview</span>
            </button>
          )}
        </div>
      </div>

      {isInterviewActive && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Simulation */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white/10 p-4 rounded-full mb-4 mx-auto w-fit">
                    <Video className="h-12 w-12 text-white" />
                  </div>
                  <p className="text-white text-sm">Camera simulation</p>
                  {isRecording && (
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white text-sm">Recording...</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(currentQuestion.category)}`}>
                      {currentQuestion.category}
                    </span>
                    <div className="flex items-center space-x-0.5">
                      {getDifficultyStars(currentQuestion.difficulty)}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-3 rounded-lg transition-all ${
                      isRecording 
                        ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400' 
                        : 'bg-accent text-foreground hover:bg-accent/80'
                    }`}
                  >
                    {isRecording ? <Pause className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <p className="text-foreground text-lg font-medium">{currentQuestion.question}</p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => setShowingFeedback(!showingFeedback)}
                    className="px-4 py-2 bg-accent text-foreground rounded-lg text-sm font-medium hover:bg-accent/80 transition-all"
                  >
                    {showingFeedback ? 'Hide Feedback' : 'Show AI Feedback'}
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
                  </button>
                </div>
              </div>
            </div>

            {/* Real-time Feedback */}
            {showingFeedback && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">AI Real-Time Feedback</h3>
                <div className="space-y-3">
                  {realTimeFeedback.map((feedback, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${getFeedbackColor(feedback.type)}`}
                    >
                      <div className="flex items-start space-x-3">
                        {getFeedbackIcon(feedback.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-foreground">{feedback.aspect}</span>
                            <span className="text-sm font-bold text-foreground">{feedback.score}/100</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all ${
                                  feedback.score >= 80 ? 'bg-green-500' : feedback.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${feedback.score}%` }}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-foreground">{feedback.feedback}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Progress & Tips */}
          <div className="space-y-4">
            {/* Overall Score */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Overall Performance</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{avgScore}</div>
                <div className="text-xs text-muted-foreground mb-4">Average Score</div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        avgScore >= 80 ? 'bg-green-500' : avgScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${avgScore}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {avgScore >= 80 ? 'Excellent!' : avgScore >= 60 ? 'Good progress' : 'Keep practicing'}
                </p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Quick Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">Use the STAR method for behavioral questions</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">Maintain eye contact with the camera</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">Speak clearly and at a moderate pace</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">Use specific examples from experience</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">Show enthusiasm for helping clients</p>
                </div>
              </div>
            </div>

            {/* Question Progress */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Interview Progress</h3>
              <div className="space-y-2">
                {questions.map((q, index) => (
                  <div 
                    key={q.id}
                    className={`flex items-center space-x-2 p-2 rounded ${
                      index === currentQuestionIndex 
                        ? 'bg-primary/10 border border-primary/20' 
                        : index < currentQuestionIndex
                        ? 'bg-green-50 dark:bg-green-950'
                        : 'bg-accent'
                    }`}
                  >
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      index === currentQuestionIndex 
                        ? 'bg-primary text-primary-foreground' 
                        : index < currentQuestionIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                    }`}>
                      {index < currentQuestionIndex ? '✓' : index + 1}
                    </div>
                    <span className="text-xs text-foreground flex-1">{q.category}</span>
                    <div className="flex items-center space-x-0.5">
                      {getDifficultyStars(q.difficulty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isInterviewActive && !showingFeedback && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
            <Video className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Practice?</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            This AI-powered simulator will ask you {questions.length} interview questions and provide real-time feedback on your responses, 
            body language, and communication skills.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-accent rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{questions.length}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="bg-accent rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">15</div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
            <div className="bg-accent rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="bg-accent rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">AI</div>
              <div className="text-xs text-muted-foreground">Feedback</div>
            </div>
          </div>
          <button
            onClick={handleStartInterview}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all inline-flex items-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Start Interview Simulation</span>
          </button>
        </div>
      )}
    </div>
  );
}

