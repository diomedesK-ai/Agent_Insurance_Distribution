'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Camera, Calendar, Users, TrendingUp, Sparkles, CheckCircle, AlertCircle, Info, FileText, Phone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  isImage?: boolean;
}

export default function WhatsAppAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Hi! I\'m your **Agent Companion**. Quick menu:\n\n🔥 **Leads** - Hot/warm/cold list\n📅 **Meetings** - Today\'s schedule\n🎤 **Record** - Meeting transcription\n🎯 **Compare** - Product comparison\n📸 **Scan** - Photo analysis\n💡 **Pitch AI** - Voice-to-customer pitch builder\n\nTap a button or type!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showVoicePitch, setShowVoicePitch] = useState(false);
  const [isRecordingPitch, setIsRecordingPitch] = useState(false);
  const [activeFlow, setActiveFlow] = useState<'leads' | 'meetings' | 'compare' | null>(null);
  const [flowData, setFlowData] = useState<any>(null);
  const [loadingFlow, setLoadingFlow] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickActions = [
    { label: '🔥 Lead List', action: 'show_leads' },
    { label: '📅 Meeting Schedule', action: 'show_meetings' },
    { label: '🎤 Record Meeting', action: 'record_meeting' },
    { label: '🎯 Product Guru', action: 'product_guru' }
  ];

  const mockLeads = [
    { id: '1', name: 'Sarah Wong', status: 'hot', interest: 'Life Insurance', score: 92 },
    { id: '2', name: 'Michael Lim', status: 'hot', interest: 'Critical Illness', score: 89 },
    { id: '3', name: 'Jennifer Tan', status: 'warm', interest: 'Investment Plan', score: 78 },
    { id: '4', name: 'David Chen', status: 'cold', interest: 'Term Life', score: 65 }
  ];

  const mockMeetings = [
    { time: '10:00 AM', client: 'Sarah Wong', topic: 'Life Insurance Review', status: 'upcoming' },
    { time: '2:00 PM', client: 'Michael Lim', topic: 'Policy Upgrade Discussion', status: 'upcoming' },
    { time: '4:30 PM', client: 'Jennifer Tan', topic: 'Investment Portfolio Review', status: 'upcoming' }
  ];

  const handleQuickAction = async (action: string) => {
    let queryText = '';
    
    switch(action) {
      case 'show_leads':
        queryText = 'Show me my current hot and warm leads with their details';
        break;
      case 'show_meetings':
        queryText = 'What are my meetings scheduled for today?';
        break;
      case 'record_meeting':
        queryText = 'How can I record and transcribe a meeting?';
        break;
      case 'product_guru':
        queryText = 'Help me compare insurance products between AIA, Prudential, and Manulife';
        break;
    }

    // Set the input and trigger send
    setInput(queryText);
    setShowQuickActions(false);
    
    // Wait a tick then send
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const userQuery = input;
    setInput('');
    setLoading(true);

    try {
      // Convert messages to conversation history format
      const conversationHistory = messages.map(msg => ({
        agentId: msg.role === 'user' ? 'user' : 'orchestrator',
        agentName: msg.role === 'user' ? 'Agent' : 'AI Assistant',
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }));

      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userQuery,
          location: 'singapore',
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      // Create streaming message
      const streamingMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: streamingMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      if (reader) {
        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content' && parsed.chunk) {
                  fullResponse += parsed.chunk;
                  
                  // Update streaming message
                  setMessages(prev => prev.map(msg => 
                    msg.id === streamingMsgId 
                      ? { ...msg, content: fullResponse }
                      : msg
                  ));
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      // Finalize message
      if (!fullResponse) {
        fullResponse = 'I can help you with leads, meetings, product comparisons, and more. What would you like to know?';
      }

      setMessages(prev => prev.map(msg => 
        msg.id === streamingMsgId 
          ? { ...msg, content: fullResponse }
          : msg
      ));

    } catch (error) {
      console.error('Error calling AI:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m here to help with product comparisons, lead management, and more. Please try asking again!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        setIsRecording(false);
        const transcribedMsg: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: '🎤 Voice message transcribed',
          timestamp: new Date(),
          isVoice: true
        };

        const summaryMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '📝 **Meeting Summary:**\n\n**Attendee:** Sarah Wong\n**Duration:** 25 minutes\n**Topic:** Life Insurance Review\n\n**Key Points:**\n✅ Discussed family protection needs\n✅ Two young children (ages 3 & 5)\n✅ Husband is primary breadwinner\n✅ Looking for SGD 1M coverage\n\n**Client Concerns:**\n⚠️ Premium affordability\n⚠️ Policy flexibility\n\n**Action Items:**\n📋 Send term life comparison by Friday\n📋 Include critical illness rider options\n📋 Schedule follow-up next Tuesday\n\n**Sentiment:** Highly interested, ready to proceed',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, transcribedMsg, summaryMsg]);
      }, 3000);
    }
  };

  const handleOpenFlow = async (flowType: 'leads' | 'meetings' | 'compare') => {
    setLoadingFlow(true);
    setActiveFlow(flowType);
    
    let query = '';
    if (flowType === 'leads') {
      query = 'Return a JSON array of my top 5 leads in Singapore with fields: id, name, status (hot/warm/cold), interest, score, phone, lastContact. Format as valid JSON only.';
    } else if (flowType === 'meetings') {
      query = 'Return a JSON array of today\'s meetings in Singapore with fields: id, client, time, topic, status (upcoming/completed), location. Format as valid JSON only.';
    } else if (flowType === 'compare') {
      query = 'Return a JSON object comparing AIA, Prudential, and Manulife critical illness products with fields: provider, productName, coverage, premium, keyFeatures (array), pros (array). Format as valid JSON only.';
    }

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          location: 'singapore',
          conversationHistory: [],
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content' && parsed.chunk) {
                  fullResponse += parsed.chunk;
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      // Parse the LLM response as JSON
      try {
        const jsonMatch = fullResponse.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          setFlowData(parsedData);
        } else {
          // Fallback mock data if parsing fails
          setFlowData(getMockFlowData(flowType));
        }
      } catch (e) {
        console.error('Error parsing flow data:', e);
        setFlowData(getMockFlowData(flowType));
      }
    } catch (error) {
      console.error('Error loading flow:', error);
      setFlowData(getMockFlowData(flowType));
    } finally {
      setLoadingFlow(false);
    }
  };

  const getMockFlowData = (flowType: 'leads' | 'meetings' | 'compare') => {
    if (flowType === 'leads') {
      return [
        { 
          id: 'LD-SG-001', 
          name: 'Jonathan Koh', 
          status: 'hot', 
          interest: 'Critical Illness', 
          score: 92, 
          phone: '+65 9123 4567', 
          lastContact: '2 days ago',
          pitch: 'Family man, 2 kids, concerned about cancer coverage due to family history',
          recommendedProduct: 'PRUCancer 360 - SGD 285/month'
        },
        { 
          id: 'LD-SG-002', 
          name: 'Rachel Lim', 
          status: 'hot', 
          interest: 'Life Insurance', 
          score: 89, 
          phone: '+65 9234 5678', 
          lastContact: '1 day ago',
          pitch: 'Young professional, building wealth, needs breadwinner protection',
          recommendedProduct: 'AIA Life Protect - SGD 195/month'
        },
        { 
          id: 'LD-SG-003', 
          name: 'Kumar Raj', 
          status: 'warm', 
          interest: 'Health Insurance', 
          score: 78, 
          phone: '+65 9345 6789', 
          lastContact: '3 days ago',
          pitch: 'Health-conscious, gym member, looking for comprehensive medical coverage',
          recommendedProduct: 'ManuHealth Shield - SGD 165/month'
        },
        { 
          id: 'LD-SG-004', 
          name: 'Michelle Tan', 
          status: 'warm', 
          interest: 'Investment Plan', 
          score: 75, 
          phone: '+65 9456 7890', 
          lastContact: '5 days ago',
          pitch: 'Savvy investor, interested in insurance + investment combo for retirement',
          recommendedProduct: 'PRUSave Plus - SGD 500/month'
        },
        { 
          id: 'LD-SG-005', 
          name: 'David Chen', 
          status: 'cold', 
          interest: 'Term Life', 
          score: 68, 
          phone: '+65 9567 8901', 
          lastContact: '1 week ago',
          pitch: 'Budget-conscious, wants basic coverage, young family starting out',
          recommendedProduct: 'Term Life Basic - SGD 85/month'
        }
      ];
    } else if (flowType === 'meetings') {
      return [
        { id: 'M001', client: 'Sarah Wong', time: '10:00 AM', topic: 'Life Insurance Review', status: 'upcoming', location: 'Raffles Place' },
        { id: 'M002', client: 'Michael Lim', time: '2:00 PM', topic: 'Policy Upgrade Discussion', status: 'upcoming', location: 'Video Call' },
        { id: 'M003', client: 'Jennifer Tan', time: '4:30 PM', topic: 'Investment Portfolio Review', status: 'upcoming', location: 'Client Office' }
      ];
    } else {
      return {
        products: [
          {
            provider: 'AIA',
            productName: 'AIA Critical Cover',
            coverage: '100 Critical Illnesses',
            premium: 'SGD 285/month',
            keyFeatures: ['Multi-pay for cancer', 'Early stage coverage', 'Juvenile coverage'],
            pros: ['Comprehensive coverage', 'Strong financial stability', 'Fast claims process']
          },
          {
            provider: 'Prudential',
            productName: 'PRUCancer 360',
            coverage: '120 Critical Illnesses',
            premium: 'SGD 298/month',
            keyFeatures: ['Cancer recurrence benefit', '3x payout option', 'Premium waiver'],
            pros: ['Best cancer coverage', 'Multiple claim payouts', 'Flexible options']
          },
          {
            provider: 'Manulife',
            productName: 'ManuProtect CI',
            coverage: '115 Critical Illnesses',
            premium: 'SGD 265/month',
            keyFeatures: ['Affordable premiums', 'Family coverage', 'Health rewards'],
            pros: ['Most affordable', 'Good value', 'Family benefits']
          }
        ]
      };
    }
  };

  const handleCloseFlow = () => {
    setActiveFlow(null);
    setFlowData(null);
  };

  const handleFlowAction = async (action: string, data: any) => {
    handleCloseFlow();
    
    // Add user action message
    const actionMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `📱 ${action}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, actionMsg]);

    // Generate AI response based on action
    let query = '';
    if (action.includes('Call') || action.includes('Message')) {
      query = `I want to contact ${data.name}. Provide a brief call/message script focusing on their interest in ${data.interest}. Include: 1) Opening line, 2) Value proposition, 3) Call to action.`;
    } else if (action.includes('View Details')) {
      query = `Provide detailed information about the meeting with ${data.client} at ${data.time} about ${data.topic}. Include: 1) Client background, 2) Meeting objectives, 3) Key discussion points, 4) Preparation checklist.`;
    } else if (action.includes('Reschedule')) {
      query = `I need to reschedule the meeting with ${data.client} currently scheduled for ${data.time}. Suggest 3 alternative time slots for this week and provide a professional message template to send to the client.`;
    } else if (action.includes('Get Quote')) {
      query = `Generate a detailed insurance quote for ${data.productName} by ${data.provider}. Include: 1) Coverage summary, 2) Premium breakdown, 3) Key benefits, 4) Comparison with alternatives, 5) Next steps for purchase.`;
    }

    setTimeout(() => {
      setInput(query);
      setTimeout(handleSendMessage, 50);
    }, 300);
  };

  const handleAIPitchGeneration = async (pitchRequest: string) => {
    setLoading(true);
    try {
      const conversationHistory = messages.map(msg => ({
        agentId: msg.role === 'user' ? 'user' : 'orchestrator',
        agentName: msg.role === 'user' ? 'Agent' : 'AI Assistant',
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }));

      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `Based on this pitch request: "${pitchRequest}", create a compelling customer proposition with: 1) Opening hook, 2) Key benefits tailored to their situation, 3) Addressing their specific concerns, 4) Clear call to action. Format it as a ready-to-use pitch script.`,
          location: 'singapore',
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      const streamingMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: streamingMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content' && parsed.chunk) {
                  fullResponse += parsed.chunk;
                  setMessages(prev => prev.map(msg => 
                    msg.id === streamingMsgId ? { ...msg, content: fullResponse } : msg
                  ));
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      if (!fullResponse) {
        fullResponse = 'Pitch generated! Review above for your customer proposition.';
      }

      setMessages(prev => prev.map(msg => 
        msg.id === streamingMsgId ? { ...msg, content: fullResponse } : msg
      ));

    } catch (error) {
      console.error('Error generating pitch:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I had trouble generating that pitch. Please try again!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = () => {
    const photoMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: '📸 Product photo uploaded',
      timestamp: new Date(),
      isImage: true
    };

    const analysisMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '🎯 **Product Comparison Analysis:**\n\n**Competitor:** AIA Critical Cover\n**Our Product:** PRUCancer 360\n\n**Coverage Comparison:**\n✅ We cover 100 illnesses vs their 95\n✅ We include early-stage coverage (they don\'t)\n✅ We offer 3x recurrence benefit (they offer 2x)\n\n**Pricing:**\n💰 Our premium: SGD 285/month\n💰 Their premium: SGD 298/month\n\n**Advantages:**\n🏆 Better coverage at lower price\n🏆 Early detection benefit unique to us\n🏆 Higher recurrence protection\n\n**Recommendation:** Emphasize early-stage coverage and recurrence benefits - these are major differentiators!',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, photoMsg, analysisMsg]);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Agent Companion</h1>
          <p className="text-gray-400">AI-Powered WhatsApp Assistant for Insurance Agents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Stats Panel */}
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wide">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-gray-400">Hot Leads</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-red-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">5</div>
                    <div className="text-xs text-gray-400">Meetings Today</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">89%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
              <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">AI Capabilities</h3>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Real-time Product Comparisons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Lead Intelligence & Scoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Meeting Transcription</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Document Analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* iPhone Frame - Center */}
          <div className="flex justify-center items-start">
            <div className="relative w-[420px]">
              {/* iPhone Frame */}
              <div className="relative w-full h-[840px] bg-zinc-950 rounded-[56px] shadow-2xl overflow-hidden">
                {/* Notch - positioned inside frame */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-zinc-950 rounded-b-3xl z-20"></div>
                
                {/* Screen with proper padding */}
                <div className="w-full h-full p-[14px]">
                  <div className="w-full h-full bg-white rounded-[42px] overflow-hidden flex flex-col">
                  {/* WhatsApp Header */}
                  <div className="bg-gradient-to-r from-green-600 to-green-500 px-5 py-4 shadow-lg">
                    <div className="font-bold text-white text-lg">Agent Companion</div>
                    <div className="text-xs text-green-100">Online • Powered by LLM</div>
                  </div>

                  {/* Messages Area or Flow View */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#E5DDD5]" style={{
                    backgroundImage: activeFlow ? 'none' : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23E5DDD5\'/%3E%3Cpath d=\'M20 20h60v60H20z\' fill=\'%23DCF8C6\' opacity=\'.03\'/%3E%3C/svg%3E")'
                  }}>
                    {activeFlow && flowData ? (
                      // WhatsApp Flow View
                      <div className="h-full bg-white flex flex-col">
                        {/* Flow Header */}
                        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                          <button onClick={handleCloseFlow} className="text-green-600 font-medium text-sm">
                            ← Back
                          </button>
                          <div className="text-xs text-gray-500">
                            {activeFlow === 'leads' ? 'Lead List' : activeFlow === 'meetings' ? 'Meeting Schedule' : 'Product Comparison'}
                          </div>
                          <div className="w-12"></div>
                        </div>

                        {/* Flow Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                          {loadingFlow ? (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-center">
                                <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                                <div className="text-sm text-gray-500">Loading...</div>
                              </div>
                            </div>
                          ) : activeFlow === 'leads' && Array.isArray(flowData) ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-xs text-gray-500">Your hot leads</div>
                                <button 
                                  onClick={handleCloseFlow}
                                  className="px-3 py-1.5 bg-green-600 text-white rounded-full text-[10px] font-bold hover:bg-green-700 transition-colors"
                                >
                                  💬 Ask AI
                                </button>
                              </div>
                              {flowData.map((lead: any) => (
                                <div key={lead.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-900 mb-1">{lead.name}</div>
                                      <div className="text-xs text-gray-600">{lead.id}</div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                      lead.status === 'hot' ? 'bg-red-100 text-red-700' :
                                      lead.status === 'warm' ? 'bg-amber-100 text-amber-700' :
                                      'bg-blue-100 text-blue-700'
                                    }`}>
                                      {lead.status.toUpperCase()}
                                    </span>
                                  </div>
                                  
                                  {/* Pitch Section */}
                                  {lead.pitch && (
                                    <div className="mb-3 p-2 bg-purple-50 rounded border border-purple-200">
                                      <div className="text-[10px] text-purple-600 font-bold mb-1">💡 PITCH ANGLE</div>
                                      <div className="text-xs text-gray-700">{lead.pitch}</div>
                                    </div>
                                  )}
                                  
                                  {/* Recommended Product */}
                                  {lead.recommendedProduct && (
                                    <div className="mb-3 p-2 bg-orange-50 rounded border border-orange-200">
                                      <div className="text-[10px] text-orange-600 font-bold mb-1">🎯 RECOMMENDED</div>
                                      <div className="text-xs text-gray-700 font-medium">{lead.recommendedProduct}</div>
                                    </div>
                                  )}
                                  
                                  <div className="space-y-1 mb-3">
                                    <div className="flex items-center text-xs">
                                      <span className="text-gray-500 w-20">Interest:</span>
                                      <span className="text-gray-900 font-medium">{lead.interest}</span>
                                    </div>
                                    <div className="flex items-center text-xs">
                                      <span className="text-gray-500 w-20">Score:</span>
                                      <span className="text-green-600 font-bold">{lead.score}/100</span>
                                    </div>
                                    <div className="flex items-center text-xs">
                                      <span className="text-gray-500 w-20">Phone:</span>
                                      <span className="text-gray-900">{lead.phone}</span>
                                    </div>
                                    <div className="flex items-center text-xs">
                                      <span className="text-gray-500 w-20">Last Contact:</span>
                                      <span className="text-gray-600">{lead.lastContact}</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleFlowAction(`Call ${lead.name}`, lead)}
                                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md text-xs font-medium hover:bg-green-700 transition-colors"
                                    >
                                      📞 Call
                                    </button>
                                    <button 
                                      onClick={() => handleFlowAction(`Message ${lead.name}`, lead)}
                                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                                    >
                                      💬 Message
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : activeFlow === 'meetings' && Array.isArray(flowData) ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-xs text-gray-500">Your meetings for today</div>
                                <button 
                                  onClick={handleCloseFlow}
                                  className="px-3 py-1.5 bg-green-600 text-white rounded-full text-[10px] font-bold hover:bg-green-700 transition-colors"
                                >
                                  💬 Ask AI
                                </button>
                              </div>
                              {flowData.map((meeting: any) => (
                                <div key={meeting.id} className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-900">{meeting.client}</div>
                                      <div className="text-sm text-purple-700 font-medium mt-1">{meeting.time}</div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                      meeting.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                      {meeting.status.toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="space-y-1 mb-3">
                                    <div className="text-xs text-gray-700">
                                      <span className="font-medium">Topic:</span> {meeting.topic}
                                    </div>
                                    <div className="text-xs text-gray-700">
                                      <span className="font-medium">Location:</span> {meeting.location}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleFlowAction(`View Details for ${meeting.client}`, meeting)}
                                      className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-md text-xs font-medium hover:bg-purple-700 transition-colors"
                                    >
                                      View Details
                                    </button>
                                    <button 
                                      onClick={() => handleFlowAction(`Reschedule meeting with ${meeting.client}`, meeting)}
                                      className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md text-xs font-medium hover:bg-gray-700 transition-colors"
                                    >
                                      Reschedule
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : activeFlow === 'compare' && flowData.products ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-xs text-gray-500">Critical Illness Product Comparison</div>
                                <button 
                                  onClick={handleCloseFlow}
                                  className="px-3 py-1.5 bg-green-600 text-white rounded-full text-[10px] font-bold hover:bg-green-700 transition-colors"
                                >
                                  💬 Ask AI
                                </button>
                              </div>
                              {flowData.products.map((product: any, idx: number) => (
                                <div key={idx} className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <div className="text-xs text-orange-600 font-semibold">{product.provider}</div>
                                      <div className="font-bold text-gray-900 text-sm">{product.productName}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm font-bold text-orange-700">{product.premium}</div>
                                      <div className="text-[10px] text-gray-600">{product.coverage}</div>
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="text-xs font-semibold text-gray-700 mb-1">Key Features:</div>
                                    <div className="space-y-1">
                                      {product.keyFeatures.map((feature: string, i: number) => (
                                        <div key={i} className="text-xs text-gray-700 flex items-start">
                                          <span className="text-green-600 mr-1">✓</span>
                                          <span>{feature}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <div className="text-xs font-semibold text-gray-700 mb-1">Advantages:</div>
                                    <div className="space-y-1">
                                      {product.pros.map((pro: string, i: number) => (
                                        <div key={i} className="text-xs text-gray-700 flex items-start">
                                          <span className="text-blue-600 mr-1">→</span>
                                          <span>{pro}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => handleFlowAction(`Get Quote for ${product.productName}`, product)}
                                    className="w-full px-3 py-2 bg-orange-600 text-white rounded-md text-xs font-medium hover:bg-orange-700 transition-colors"
                                  >
                                    Get Quote
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 text-sm">No data available</div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Regular Chat View
                      <div className="p-4 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl px-4 py-2.5 shadow-sm ${
                            message.role === 'user'
                              ? 'bg-[#DCF8C6]'
                              : 'bg-white'
                          }`}
                        >
                          {message.isVoice && (
                            <div className="flex items-center space-x-2 mb-2">
                              <Mic className="h-3 w-3 text-green-600" />
                              <div className="h-1.5 w-28 bg-green-600 rounded-full"></div>
                              <span className="text-xs text-gray-500">0:15</span>
                            </div>
                          )}
                          {message.isImage && (
                            <div className="mb-2">
                              <div className="w-full h-36 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Camera className="h-10 w-10 text-gray-400" />
                              </div>
                            </div>
                          )}
                          <div className="text-sm prose prose-sm max-w-none text-gray-800">
                            {message.role === 'assistant' ? (
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                              </ReactMarkdown>
                            ) : (
                              message.content
                            )}
                          </div>
                          <div className={`text-[10px] mt-1.5 ${
                            message.role === 'user' ? 'text-right text-gray-600' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Quick Actions */}
                    {showQuickActions && messages.length <= 1 && (
                      <div className="grid grid-cols-2 gap-2.5 mt-4">
                        {quickActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickAction(action.action)}
                            className="bg-white p-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm font-medium text-gray-700 text-left hover:bg-green-50"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl px-5 py-3.5 shadow-sm">
                          <div className="flex space-x-2">
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Quick Menu Buttons - Only show when not in Flow */}
                  {!activeFlow && (
                  <>
                  <div className="bg-white border-t border-gray-200 px-3 py-2">
                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                      <button
                        onClick={() => handleOpenFlow('leads')}
                        className="px-2 py-2 bg-red-50 text-red-700 rounded-lg text-[9px] font-semibold hover:bg-red-100 transition-colors"
                        disabled={loading || loadingFlow}
                      >
                        🔥 Leads
                      </button>
                      <button
                        onClick={() => handleOpenFlow('meetings')}
                        className="px-2 py-2 bg-purple-50 text-purple-700 rounded-lg text-[9px] font-semibold hover:bg-purple-100 transition-colors"
                        disabled={loading || loadingFlow}
                      >
                        📅 Meetings
                      </button>
                      <button
                        onClick={handleVoiceRecording}
                        className={`px-2 py-2 rounded-lg text-[9px] font-semibold transition-colors ${
                          isRecording 
                            ? 'bg-red-100 text-red-700 animate-pulse' 
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                        disabled={loading}
                      >
                        🎤 Record
                      </button>
                      <button
                        onClick={() => handleOpenFlow('compare')}
                        className="px-2 py-2 bg-orange-50 text-orange-700 rounded-lg text-[9px] font-semibold hover:bg-orange-100 transition-colors"
                        disabled={loading || loadingFlow}
                      >
                        🎯 Compare
                      </button>
                      <button
                        onClick={handlePhotoUpload}
                        className="px-2 py-2 bg-blue-50 text-blue-700 rounded-lg text-[9px] font-semibold hover:bg-blue-100 transition-colors"
                        disabled={loading}
                      >
                        📸 Scan
                      </button>
                      <button
                        onClick={() => {
                          setShowVoicePitch(true);
                        }}
                        className="px-2 py-2 bg-pink-50 text-pink-700 rounded-lg text-[9px] font-semibold hover:bg-pink-100 transition-colors"
                        disabled={loading}
                      >
                        💡 Pitch AI
                      </button>
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type or use menu..."
                        className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                      />

                      {input.trim() ? (
                        <button
                          onClick={handleSendMessage}
                          disabled={loading}
                          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 shadow-md flex-shrink-0"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleVoiceRecording}
                          className={`p-2 rounded-full transition-colors shadow-md flex-shrink-0 ${
                            isRecording
                              ? 'bg-red-600 text-white animate-pulse'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                          disabled={loading}
                        >
                          {isRecording ? (
                            <MicOff className="h-3.5 w-3.5" />
                          ) : (
                            <Mic className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  </>
                  )}
                  
                  {/* iPhone Home Indicator */}
                  <div className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Right Stats Panel */}
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wide">Recent Activity</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Product comparison requested</div>
                    <div className="text-gray-500">2 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Lead qualification completed</div>
                    <div className="text-gray-500">15 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="text-white font-medium">Meeting transcribed</div>
                    <div className="text-gray-500">1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
              <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">Quick Commands</h3>
              <div className="space-y-2">
                <div className="text-xs bg-zinc-800 rounded px-3 py-2 text-gray-300 font-mono">
                  &quot;Show my leads&quot;
                </div>
                <div className="text-xs bg-zinc-800 rounded px-3 py-2 text-gray-300 font-mono">
                  &quot;Compare AIA vs PRU&quot;
                </div>
                <div className="text-xs bg-zinc-800 rounded px-3 py-2 text-gray-300 font-mono">
                  &quot;Today&apos;s meetings&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pitch AI Modal */}
      {showVoicePitch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pitch AI</h3>
              <p className="text-sm text-gray-600">Describe what you want to pitch, and I'll create a customer proposition</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsRecordingPitch(!isRecordingPitch);
                  if (!isRecordingPitch) {
                    // Start recording
                    setTimeout(() => {
                      setIsRecordingPitch(false);
                      setShowVoicePitch(false);
                      const pitchMsg: Message = {
                        id: Date.now().toString(),
                        role: 'user',
                        content: '🎤 &quot;I need to pitch a critical illness plan to a 35-year-old client with 2 kids, budget around SGD 300/month, concerned about cancer coverage&quot;',
                        timestamp: new Date(),
                        isVoice: true
                      };
                      setMessages(prev => [...prev, pitchMsg]);
                      
                      // Generate AI pitch
                      setTimeout(() => {
                        handleAIPitchGeneration('I need to pitch a critical illness plan to a 35-year-old client with 2 kids, budget around SGD 300/month, concerned about cancer coverage');
                      }, 500);
                    }, 3000);
                  }
                }}
                className={`w-full h-32 rounded-2xl transition-all flex flex-col items-center justify-center space-y-3 ${
                  isRecordingPitch
                    ? 'bg-red-100 border-4 border-red-500 animate-pulse'
                    : 'bg-pink-50 border-2 border-pink-300 hover:bg-pink-100'
                }`}
              >
                {isRecordingPitch ? (
                  <>
                    <div className="h-6 w-6 bg-red-500 rounded"></div>
                    <span className="text-red-700 font-bold text-sm">Recording...</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-10 w-10 text-pink-600" />
                    <span className="text-pink-700 font-bold">Tap to Record</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowVoicePitch(false)}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
