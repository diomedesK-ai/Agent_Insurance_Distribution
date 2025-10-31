'use client';

import { useState } from 'react';
import { Mic, MicOff, Sparkles, Calendar, CheckCircle, AlertCircle, ArrowRight, History } from 'lucide-react';

export default function ConversationAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNote, setVoiceNote] = useState('');
  const [transcribedNote, setTranscribedNote] = useState<any>(null);
  const [savedTranscripts, setSavedTranscripts] = useState<any[]>([
    {
      id: 1,
      date: '2025-10-28',
      time: '2:45 PM',
      leadName: 'Sarah Wong',
      rawText: 'Called about life insurance for mortgage protection. Concerned about affordability. Has SGD 800K mortgage. Follow up with quote by Friday.',
      structured: {
        keyPoints: ['Mortgage protection priority', 'SGD 800K coverage needed', 'Budget conscious'],
        concerns: ['Affordability', 'Wants multiple quotes'],
        nextAction: 'Send detailed quote by Friday end-of-day',
        sentiment: 'Interested but price-sensitive',
        priority: 'High'
      }
    },
    {
      id: 2,
      date: '2025-10-27',
      time: '11:20 AM',
      leadName: 'Michael Lim',
      rawText: 'Existing customer wants to upgrade critical illness coverage. Diagnosed family history. Wife recently had health scare. Very motivated buyer.',
      structured: {
        keyPoints: ['Upgrade request', 'Family health history concern', 'High motivation'],
        concerns: ['Speed of approval', 'Medical underwriting'],
        nextAction: 'Expedite application - hot lead',
        sentiment: 'Highly motivated',
        priority: 'Hot'
      }
    },
    {
      id: 3,
      date: '2025-10-26',
      time: '4:10 PM',
      leadName: 'Jennifer Tan',
      rawText: 'Young professional, new job at tech startup. Wants investment-linked plan. More interested in returns than protection. Needs education.',
      structured: {
        keyPoints: ['First-time buyer', 'Investment focus', 'Needs product education'],
        concerns: ['Unclear on protection vs investment', 'Risk tolerance unclear'],
        nextAction: 'Schedule product education session',
        sentiment: 'Curious but uninformed',
        priority: 'Medium'
      }
    },
    {
      id: 4,
      date: '2025-10-25',
      time: '9:30 AM',
      leadName: 'David Chen',
      rawText: 'Interested in whole life policy for wealth transfer. High net worth individual. Looking at SGD 2M coverage. Wants estate planning consultation.',
      structured: {
        keyPoints: ['Wealth transfer focus', 'HNW segment', 'SGD 2M coverage target'],
        concerns: ['Tax implications', 'Legacy planning'],
        nextAction: 'Arrange meeting with estate planning specialist',
        sentiment: 'Sophisticated buyer',
        priority: 'High'
      }
    },
    {
      id: 5,
      date: '2025-10-24',
      time: '3:15 PM',
      leadName: 'Rachel Ng',
      rawText: 'First-time homebuyer, concerned about mortgage protection. Just got approved for SGD 650K loan. Wants coverage to match loan amount.',
      structured: {
        keyPoints: ['First-time buyer', 'Mortgage protection', 'SGD 650K loan'],
        concerns: ['Monthly premium affordability', 'Loan tenure matching'],
        nextAction: 'Quote term life policy matching 30-year mortgage',
        sentiment: 'Concerned but responsible',
        priority: 'Medium'
      }
    }
  ]);
  const [showHistory, setShowHistory] = useState(true);
  
  const handleRecordVoiceMemo = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate starting recording
      setVoiceNote('');
      setTranscribedNote(null);
    } else {
      // Simulate stopping and transcribing
      setTimeout(() => {
        const mockTranscription = {
          rawText: 'Spoke with potential client about family protection needs. Two young children, main income earner. Interested in term life and critical illness coverage. Budget around SGD 300 per month. Follow up next Tuesday with detailed proposal.',
          structured: {
            keyPoints: ['Family protection priority', 'Two young children', 'Main breadwinner', 'Budget: SGD 300/month'],
            concerns: ['Premium affordability', 'Coverage adequacy'],
            nextAction: 'Prepare proposal by next Tuesday',
            sentiment: 'Positive - ready to move forward',
            priority: 'High'
          },
          leadName: 'Alex Tan',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setTranscribedNote(mockTranscription);
      }, 1500);
    }
  };

  const handleSaveNote = () => {
    if (transcribedNote) {
      setSavedTranscripts([{
        id: Date.now(),
        ...transcribedNote
      }, ...savedTranscripts]);
      setTranscribedNote(null);
      setVoiceNote('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'hot':
      case 'high':
        return 'bg-black border-2 border-red-500 text-red-400';
      case 'medium':
        return 'bg-black border-2 border-amber-500 text-amber-400';
      default:
        return 'bg-black border-2 border-blue-500 text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>Memo AI</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Speak your notes, AI transcribes and structures them
          </p>
        </div>
      </div>

      {/* Voice Memo Section */}
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="max-w-2xl mx-auto">
          {/* Recording Interface */}
          <div className="flex flex-col items-center mb-8">
            <button
              onClick={handleRecordVoiceMemo}
              className={`relative h-24 w-24 rounded-full transition-all mb-6 flex items-center justify-center ${
                isRecording
                  ? 'bg-black border-4 border-red-500 animate-pulse shadow-lg shadow-red-500/50'
                  : 'bg-black border-4 border-primary hover:shadow-lg hover:shadow-primary/50'
              }`}
            >
              {isRecording ? (
                <div className="h-4 w-4 bg-red-500 rounded"></div>
              ) : (
                <Mic className="h-8 w-8 text-primary" />
              )}
            </button>
            
            <div className="text-center">
              <div className="text-lg font-bold text-foreground mb-1">
                {isRecording ? 'Recording...' : 'Tap to Record Voice Memo'}
              </div>
              <div className="text-sm text-muted-foreground">
                {isRecording ? 'AI is listening and transcribing' : 'Speak naturally about your lead conversation'}
              </div>
            </div>
          </div>

          {/* Transcribed Output */}
          {transcribedNote && (
            <div className="bg-accent border-2 border-primary rounded-xl p-6 mb-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground">AI Structured Output</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{transcribedNote.date} • {transcribedNote.time}</span>
                </div>
              </div>

              {/* Lead Name */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">Lead</div>
                <div className="text-sm font-bold text-foreground">{transcribedNote.leadName}</div>
              </div>

              {/* Raw Transcription */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">Raw Transcription</div>
                <div className="text-sm text-foreground bg-card p-3 rounded-lg border border-border">
                  {transcribedNote.rawText}
                </div>
              </div>

              {/* Key Points */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">Key Points</div>
                <div className="space-y-1">
                  {transcribedNote.structured.keyPoints.map((point: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concerns */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">Concerns</div>
                <div className="space-y-1">
                  {transcribedNote.structured.concerns.map((concern: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{concern}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Action & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Next Action</div>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{transcribedNote.structured.nextAction}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Priority</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(transcribedNote.structured.priority)}`}>
                    {transcribedNote.structured.priority}
                  </span>
                </div>
              </div>

              {/* Sentiment */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">AI Sentiment Analysis</div>
                <div className="text-sm text-foreground italic">{transcribedNote.structured.sentiment}</div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveNote}
                className="w-full mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Add to CRM</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-accent">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Previous Memos ({savedTranscripts.length})</h3>
          </div>
          <div className="text-xs text-muted-foreground">Last saved: {savedTranscripts[0]?.time}</div>
        </div>

        <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
          {savedTranscripts.map((transcript) => (
            <div key={transcript.id} className="p-6 hover:bg-accent transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-bold text-foreground text-lg mb-1">{transcript.leadName}</div>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{transcript.date}</span>
                    <span>•</span>
                    <span>{transcript.time}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${getPriorityColor(transcript.structured.priority)}`}>
                      {transcript.structured.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Condensed View */}
              <div className="space-y-3">
                {/* Key Points */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">Key Points</div>
                  <div className="flex flex-wrap gap-2">
                    {transcript.structured.keyPoints.map((point: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-black border border-green-500/50 text-green-400 rounded text-xs">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Action */}
                <div className="flex items-start space-x-2 bg-accent p-3 rounded-lg border border-primary/20">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Next Action</div>
                    <div className="text-sm font-medium text-foreground">{transcript.structured.nextAction}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
