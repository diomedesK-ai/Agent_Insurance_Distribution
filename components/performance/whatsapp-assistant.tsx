'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, Mic, MicOff, Camera, Calendar, Users, TrendingUp, Sparkles, CheckCircle, AlertCircle, Info, FileText, Phone, MessageCircle, MessageSquare, Zap, ChevronLeft, Plus, Smile } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  isImage?: boolean;
  metadata?: {
    isMeetingRelated?: boolean;
    isLeadRelated?: boolean;
  };
}

export default function WhatsAppAssistant() {
  const [platform, setPlatform] = useState<'whatsapp' | 'teams'>('whatsapp');
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
  const [activeFlow, setActiveFlow] = useState<'leads' | 'meetings' | 'compare' | 'pitch' | null>(null);
  const [flowData, setFlowData] = useState<any>(null);
  const [loadingFlow, setLoadingFlow] = useState(false);
  const [compareStep, setCompareStep] = useState<'select-type' | 'select-my-insurer' | 'select-competitors' | 'results'>('select-type');
  const [selectedProductType, setSelectedProductType] = useState<string>('');
  const [myInsurer, setMyInsurer] = useState<string>('');
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [lastStructuredSummary, setLastStructuredSummary] = useState<string | null>(null);
  const [meetingReschedules, setMeetingReschedules] = useState<{[key: string]: {newTime: string, reason: string}}>({});
  const [drawerContent, setDrawerContent] = useState<string | null>(null);
  const [drawerTitle, setDrawerTitle] = useState<string>('');
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [showTeamsSplash, setShowTeamsSplash] = useState(false);
  const [showWhatsAppSplash, setShowWhatsAppSplash] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update welcome message when platform changes
  useEffect(() => {
    setMessages(prev => {
      const updated = [...prev];
      if (updated[0]?.id === '1') {
        updated[0] = {
          ...updated[0],
          content: platform === 'teams' 
            ? 'Hi! I\'m your **Agent Companion**.\n\nQuick menu:\n\n**Leads** - Hot/warm/cold list\n**Meetings** - Today\'s schedule\n**Record** - Meeting transcription\n**Compare** - Product comparison\n**Scan** - Photo analysis\n**Pitch AI** - Voice-to-customer pitch builder\n\nTap a button or type!'
            : '👋 Hi! I\'m your **Agent Companion**. Quick menu:\n\n🔥 **Leads** - Hot/warm/cold list\n📅 **Meetings** - Today\'s schedule\n🎤 **Record** - Meeting transcription\n🎯 **Compare** - Product comparison\n📸 **Scan** - Photo analysis\n💡 **Pitch AI** - Voice-to-customer pitch builder\n\nTap a button or type!'
        };
      }
      return updated;
    });
  }, [platform]);

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

  const applyStoredReschedules = (meetings: any[]) => {
    console.log('🔄 Applying stored reschedules to meetings');
    console.log('📦 Stored reschedules:', meetingReschedules);
    
    return meetings.map((meeting: any) => {
      const meetingClientLower = meeting.client.toLowerCase();
      
      // First try exact match
      if (meetingReschedules[meetingClientLower]) {
        console.log(`✅ Exact match - Applying reschedule to ${meeting.client}: ${meetingReschedules[meetingClientLower].newTime}`);
        return {
          ...meeting,
          originalTime: meeting.originalTime || meeting.time,
          rescheduledTime: meetingReschedules[meetingClientLower].newTime,
          rescheduleReason: meetingReschedules[meetingClientLower].reason
        };
      }
      
      // Try partial match (stored name is substring of meeting client or vice versa)
      for (const [storedName, rescheduleInfo] of Object.entries(meetingReschedules)) {
        if (meetingClientLower.includes(storedName) || storedName.includes(meetingClientLower)) {
          console.log(`✅ Partial match - Applying reschedule to ${meeting.client} (matched with "${storedName}"): ${rescheduleInfo.newTime}`);
          return {
            ...meeting,
            originalTime: meeting.originalTime || meeting.time,
            rescheduledTime: rescheduleInfo.newTime,
            rescheduleReason: rescheduleInfo.reason
          };
        }
        
        // Also try matching first 2 words (e.g., "Jonathan Koh" matches "Jonathan Koh Wei Ming")
        const meetingWords = meetingClientLower.split(/\s+/).slice(0, 2).join(' ');
        const storedWords = storedName.split(/\s+/).slice(0, 2).join(' ');
        if (meetingWords === storedWords && meetingWords.length > 3) {
          console.log(`✅ Name match (first 2 words) - Applying reschedule to ${meeting.client}: ${rescheduleInfo.newTime}`);
          return {
            ...meeting,
            originalTime: meeting.originalTime || meeting.time,
            rescheduledTime: rescheduleInfo.newTime,
            rescheduleReason: rescheduleInfo.reason
          };
        }
      }
      
      return meeting;
    });
  };

  const parseAndApplyReschedules = async (aiResponse: string) => {
    console.log('🔄 === PARSING RESCHEDULES FROM AI RESPONSE ===');
    console.log('📄 Full AI Response (first 1000 chars):', aiResponse.substring(0, 1000));
    
    const reschedules: {[key: string]: {newTime: string, reason: string}} = {};
    
    // Split response into lines for easier parsing
    const lines = aiResponse.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Pattern 1: "Name (ID) ... Reschedule to/for TIME tomorrow"
      // Example: "Jonathan Koh Wei Ming (LD-SG-001) - Reschedule to 11:00 AM tomorrow"
      const pattern1 = /([\w\s]+?)\s*(?:\([^)]+\))?[:\s-]+.*?(?:Reschedule|reschedule|Move|move)\s+(?:to|for)\s+(?:tomorrow\s+at\s+)?([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM|am|pm))/i;
      let match = line.match(pattern1);
      
      if (match) {
        const clientName = match[1].replace(/\([^)]+\)/g, '').replace(/[*_-]/g, '').trim();
        const newTime = match[2].trim();
        
        if (clientName.length >= 3 && !clientName.match(/^(the|to|for|at|and|or)$/i)) {
          console.log(`📅 Pattern 1 - Found reschedule: ${clientName} → ${newTime}`);
          reschedules[clientName.toLowerCase()] = {
            newTime: newTime,
            reason: 'AI-recommended reschedule'
          };
          continue;
        }
      }
      
      // Pattern 2: "**Tomorrow (TIME):** Name" or "Name → TIME"
      const pattern2 = /(?:\*\*Tomorrow\s*\(([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM|am|pm))\)\*\*[:\s-]+([\w\s]+)|([\w\s]+)\s*→\s*([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM|am|pm)))/i;
      match = line.match(pattern2);
      
      if (match) {
        let clientName: string | undefined;
        let newTime: string | undefined;
        if (match[1] && match[2]) {
          // Format: **Tomorrow (TIME):** Name
          newTime = match[1].trim();
          clientName = match[2].replace(/\([^)]+\)/g, '').replace(/[*_-]/g, '').trim();
        } else if (match[3] && match[4]) {
          // Format: Name → TIME
          clientName = match[3].replace(/\([^)]+\)/g, '').replace(/[*_-]/g, '').trim();
          newTime = match[4].trim();
        }
        
        if (clientName && newTime && clientName.length >= 3 && !clientName.match(/^(the|to|for|at|and|or)$/i)) {
          console.log(`📅 Pattern 2 - Found reschedule: ${clientName} → ${newTime}`);
          reschedules[clientName.toLowerCase()] = {
            newTime: newTime,
            reason: 'AI-recommended reschedule'
          };
          continue;
        }
      }
      
      // Pattern 3: "HIGH PRIORITY - Reschedule for tomorrow: Name ... TIME"
      const pattern3 = /(?:HIGH PRIORITY|PRIORITY|CAN WAIT)[:\s-]+.*?(?:Reschedule|reschedule)[^\n]*?:\s*([\w\s]+?)(?:\s*\([^)]+\))?[:\s-]+.*?([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM|am|pm))/i;
      match = line.match(pattern3);
      
      if (match) {
        const clientName = match[1].replace(/\([^)]+\)/g, '').replace(/[*_-]/g, '').trim();
        const newTime = match[2].trim();
        
        if (clientName.length >= 3 && !clientName.match(/^(the|to|for|at|and|or|reschedule)$/i)) {
          console.log(`📅 Pattern 3 - Found reschedule: ${clientName} → ${newTime}`);
          reschedules[clientName.toLowerCase()] = {
            newTime: newTime,
            reason: 'AI-recommended reschedule'
          };
        }
      }
    }

    if (Object.keys(reschedules).length > 0) {
      console.log('✅ Parsed Reschedules:', reschedules);
      console.log('📊 Total reschedules found:', Object.keys(reschedules).length);
      
      setMeetingReschedules(prev => {
        const updated = { ...prev, ...reschedules };
        console.log('💾 Updated meetingReschedules state:', updated);
        return updated;
      });
      
      // If meetings flow is currently open, update it immediately
      if (activeFlow === 'meetings' && flowData && Array.isArray(flowData)) {
        console.log('🔄 Meetings flow is OPEN - applying reschedules immediately');
        const updatedMeetings = flowData.map((meeting: any) => {
          const rescheduleKey = meeting.client.toLowerCase();
          if (reschedules[rescheduleKey]) {
            console.log(`✅ Updating meeting card for ${meeting.client}`);
            return {
              ...meeting,
              originalTime: meeting.originalTime || meeting.time,
              rescheduledTime: reschedules[rescheduleKey].newTime,
              rescheduleReason: reschedules[rescheduleKey].reason
            };
          }
          return meeting;
        });
        
        console.log('🔄 Updated meetings data immediately:', updatedMeetings);
        setFlowData(updatedMeetings);
      } else {
        console.log('ℹ️ Meetings flow is NOT currently open - reschedules stored for later');
      }
    } else {
      console.log('⚠️ No reschedules found in AI response');
      console.log('📝 Tip: AI should mention times like "11:00 AM" or "2:30 PM" with client names');
    }
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

    console.log('🤖 === MAIN CHAT LLM REQUEST ===');
    console.log('📝 User Query:', userQuery);
    console.log('📍 Location: singapore');

    try {
      // Convert messages to conversation history format
      const conversationHistory = messages.map(msg => ({
        agentId: msg.role === 'user' ? 'user' : 'orchestrator',
        agentName: msg.role === 'user' ? 'Agent' : 'AI Assistant',
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }));

      console.log('📚 Conversation History:', conversationHistory.length, 'messages');

      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userQuery,
          location: 'singapore',
          conversationHistory: conversationHistory,
        }),
      });

      console.log('✅ Response Status:', response.status);

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

      console.log('✅ LLM Response Complete - Length:', fullResponse.length, 'characters');
      console.log('📨 Final Response Preview:', fullResponse.substring(0, 200) + (fullResponse.length > 200 ? '...' : ''));

      // Check if response is about meetings and add quick action button
      const isMeetingRelated = userQuery.toLowerCase().includes('meeting') || 
                               userQuery.toLowerCase().includes('reschedule') ||
                               userQuery.toLowerCase().includes('calendar') ||
                               userQuery.toLowerCase().includes('appointment');
      
      if (isMeetingRelated) {
        fullResponse += '\n\n---\n\n**Quick Action:** Would you like to view your meetings?';
        
        // Parse reschedule suggestions from AI response and update meeting data
        await parseAndApplyReschedules(fullResponse);
      }

      setMessages(prev => prev.map(msg => 
        msg.id === streamingMsgId 
          ? { ...msg, content: fullResponse, metadata: { isMeetingRelated } }
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
    if (!isRecording) {
      // Start recording
      console.log('🎤 === VOICE RECORDING STARTED ===');
      setIsRecording(true);
      setShowRecordingModal(true);
      setRecordingDuration(0);
      
      // Timer for duration
      const startTime = Date.now();
      const timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setRecordingDuration(elapsed);
      }, 100);
      
      // Simulate 5-second recording
      setTimeout(() => {
        clearInterval(timerInterval);
        console.log('⏹️ Recording stopped - Processing transcription...');
        setIsRecording(false);
        setShowRecordingModal(false);
        setRecordingDuration(0);
        
        const transcribedText = `Just had a great meeting with Sarah Wong. She's 35, married with two kids aged 3 and 5. Her husband is the primary breadwinner earning about 12K per month. They're looking for comprehensive life insurance coverage around 1 million SGD. She's concerned about premium affordability but very interested. She mentioned her friend got cancer recently which is why she's thinking about this now. I need to send her a term life comparison with critical illness rider by this Friday and follow up next Tuesday.`;
        
        console.log('📝 Transcribed Text:', transcribedText);
        console.log('🤖 Sending to LLM for structured summary...');
        
        // Auto-structure and show in drawer
        setDrawerTitle('Meeting Summary');
        setDrawerContent(null);
        setDrawerLoading(true);
        
        setTimeout(async () => {
          try {
            const structureQuery = `I recorded a voice memo from a client meeting. Please structure this into a meeting summary:

**Format:**

**Client Profile**
Key information about the client

**Discussion Points**
Main topics discussed

**Client Concerns**
Concerns or objections raised

**Action Items**
What needs to be done

**Next Steps**
Follow-up plan

**Memo:**
"${transcribedText}"

Keep it concise and actionable. NO EMOJIS.`;
            
            console.log('💬 Structuring Query:', structureQuery);
            
            const response = await fetch('/api/agents', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query: structureQuery,
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
                        setDrawerContent(fullResponse);
                      }
                    } catch (e) {
                      // Skip invalid JSON
                    }
                  }
                }
              }
            }

            console.log('✅ Meeting summary generated');
            setDrawerLoading(false);
            setLastStructuredSummary(fullResponse);
            
          } catch (error) {
            console.error('❌ Error structuring meeting summary:', error);
            setDrawerContent('❌ Sorry, I had trouble structuring the summary. Please try again.');
            setDrawerLoading(false);
          }
        }, 500);
      }, 5000); // 5 second recording
    } else {
      // Stop recording early
      console.log('⏹️ Recording stopped manually');
      setIsRecording(false);
      setShowRecordingModal(false);
      setRecordingDuration(0);
    }
  };

  const handleSaveToCRM = (summaryContent: string) => {
    console.log('💾 === SAVING TO CRM ===');
    console.log('📄 Summary:', summaryContent);
    
    const saveMsg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '✅ **Meeting summary saved to CRM successfully!**\n\nThe structured summary has been added to Sarah Wong\'s client record. A follow-up task has been created for Friday to send the term life comparison.\n\n**Next Actions:**\n• Email reminder set for Thursday\n• Calendar invite for Tuesday follow-up meeting\n• Lead score updated to 92 (Hot)',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, saveMsg]);
    setLastStructuredSummary(null);
  };

  const handleOpenFlow = async (flowType: 'leads' | 'meetings' | 'compare' | 'pitch') => {
    console.log('📂 === OPENING FLOW ===');
    console.log('🎯 Flow Type:', flowType);
    setLoadingFlow(true);
    
    // Pitch flow doesn't need API call, just show the UI with delay
    if (flowType === 'pitch') {
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveFlow(flowType);
      setFlowData({ isPitchFlow: true });
      setLoadingFlow(false);
      return;
    }

    // Compare flow starts with selection UI
    if (flowType === 'compare') {
      await new Promise(resolve => setTimeout(resolve, 300));
      setActiveFlow(flowType);
      setCompareStep('select-type');
      setSelectedProductType('');
      setMyInsurer('');
      setSelectedCompetitors([]);
      setFlowData({ isCompareFlow: true });
      setLoadingFlow(false);
      return;
    }
    
    let query = '';
    if (flowType === 'leads') {
      query = 'Return a JSON array of my top 5 leads in Singapore with fields: id, name, status (hot/warm/cold), interest, score, phone, lastContact. Format as valid JSON only.';
    } else if (flowType === 'meetings') {
      query = 'Return a JSON array of today\'s meetings in Singapore with fields: id, client, time, topic, status (upcoming/completed), location. Format as valid JSON only.';
    }

    console.log('💬 LLM Query for', flowType, ':', query);

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

      console.log('✅ API Response Status:', response.status);

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

      console.log('📨 Full LLM Response:', fullResponse.substring(0, 500) + (fullResponse.length > 500 ? '...' : ''));
      
      // Parse the LLM response as JSON
      try {
        const jsonMatch = fullResponse.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
        if (jsonMatch) {
          let parsedData = JSON.parse(jsonMatch[0]);
          console.log('✅ Successfully Parsed LLM data for', flowType);
          console.log('📊 Parsed Data:', parsedData);
          
          // Apply any stored reschedules if this is meetings data
          if (flowType === 'meetings' && Array.isArray(parsedData)) {
            parsedData = applyStoredReschedules(parsedData);
          }
          
          setFlowData(parsedData);
        } else {
          // Fallback mock data if parsing fails
          console.warn('⚠️ No JSON found in response - Using mock data for', flowType);
          let mockData = getMockFlowData(flowType);
          console.log('🎭 Mock Data:', mockData);
          
          // Apply any stored reschedules if this is meetings data
          if (flowType === 'meetings' && Array.isArray(mockData)) {
            mockData = applyStoredReschedules(mockData);
          }
          
          setFlowData(mockData);
        }
      } catch (e) {
        console.error('❌ Error parsing flow data:', e);
        console.log('🎭 Fallback to mock data for', flowType);
        let mockData = getMockFlowData(flowType);
        console.log('📦 Mock Data:', mockData);
        
        // Apply any stored reschedules if this is meetings data
        if (flowType === 'meetings' && Array.isArray(mockData)) {
          mockData = applyStoredReschedules(mockData);
        }
        
        setFlowData(mockData);
      }
    } catch (error) {
      console.error('Error loading flow:', error);
      console.log('Using mock data due to error for', flowType);
      const mockData = getMockFlowData(flowType);
      console.log('Mock data:', mockData);
      setFlowData(mockData);
    } finally {
      // Set active flow and stop loading only after data is ready
      setActiveFlow(flowType);
      setLoadingFlow(false);
      console.log('Flow loaded successfully:', flowType, 'Data:', flowData);
    }
  };

  const getMockFlowData = (flowType: 'leads' | 'meetings' | 'compare' | 'pitch') => {
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
        { id: 'M001', client: 'Sarah Wong', time: '10:00 AM', topic: 'Life Insurance Review', status: 'upcoming', location: 'Raffles Place', originalTime: '10:00 AM', rescheduledTime: null },
        { id: 'M002', client: 'Michael Lim', time: '2:00 PM', topic: 'Policy Upgrade Discussion', status: 'upcoming', location: 'Video Call', originalTime: '2:00 PM', rescheduledTime: null },
        { id: 'M003', client: 'Jennifer Tan', time: '4:30 PM', topic: 'Investment Portfolio Review', status: 'upcoming', location: 'Client Office', originalTime: '4:30 PM', rescheduledTime: null }
      ];
    } else if (flowType === 'pitch') {
      return { isPitchFlow: true };
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

  const handleProductTypeSelect = (productType: string) => {
    setSelectedProductType(productType);
    setCompareStep('select-my-insurer');
  };

  const handleMyInsurerSelect = (insurer: string) => {
    setMyInsurer(insurer);
    setCompareStep('select-competitors');
  };

  const handleCompetitorToggle = (insurer: string) => {
    setSelectedCompetitors(prev => {
      if (prev.includes(insurer)) {
        return prev.filter(i => i !== insurer);
      } else if (prev.length < 2) {
        return [...prev, insurer];
      }
      return prev;
    });
  };

  const handleCompareProducts = async () => {
    if (selectedCompetitors.length === 0) return;
    
    console.log('🔍 === PRODUCT COMPARISON LLM REQUEST ===');
    console.log('🏢 My Insurer:', myInsurer);
    console.log('📦 Product Type:', selectedProductType);
    console.log('🆚 Competitors:', selectedCompetitors);
    
    setLoadingFlow(true);
    setCompareStep('results');

    const competitors = selectedCompetitors.join(' and ');
    const query = `I'm a ${myInsurer} agent. Compare our ${myInsurer} ${selectedProductType} product against ${competitors}'s ${selectedProductType} products. Return a JSON object with:
    
    {
      "myProduct": { "provider": "${myInsurer}", "productName": "...", "coverage": "...", "premium": "...", "keyFeatures": [...], "advantages": [...] },
      "competitors": [
        { "provider": "...", "productName": "...", "coverage": "...", "premium": "...", "keyFeatures": [...], "weaknesses": [...] }
      ],
      "pitchSummary": "2-3 sentence pitch highlighting why ${myInsurer} is better",
      "talkingPoints": ["3-4 specific competitive advantages to emphasize"],
      "objectionHandling": ["2-3 common objections and how to counter them"]
    }
    
    Format as valid JSON only with real Singapore insurance data.`;
    
    console.log('💬 LLM Query:', query);

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
        const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          console.log('Parsed comparison data:', parsedData);
          setFlowData(parsedData);
        } else {
          // Fallback mock data
          const mockData = {
            myProduct: {
              provider: myInsurer,
              productName: `${myInsurer} ${selectedProductType} Plus`,
              coverage: 'Up to SGD 500,000',
              premium: 'SGD 280/month',
              keyFeatures: ['120 critical illnesses covered', 'Early stage coverage', 'Triple cancer protection', 'Premium waiver on total disability'],
              advantages: ['Most comprehensive coverage in market', 'Competitive premium vs coverage ratio', 'Fast 48-hour claims processing', 'Free annual health screening']
            },
            competitors: selectedCompetitors.map(comp => ({
              provider: comp,
              productName: `${comp} ${selectedProductType}`,
              coverage: 'Up to SGD 450,000',
              premium: 'SGD 265/month',
              keyFeatures: ['95 critical illnesses', 'Standard cancer coverage', 'Medical second opinion'],
              weaknesses: ['25 fewer illnesses covered', 'No early stage benefit', 'Longer claims processing time', 'Higher premium for smokers']
            })),
            pitchSummary: `Our ${myInsurer} ${selectedProductType} offers the most comprehensive protection with 120 critical illnesses covered versus competitors' 95. For just SGD 15 more per month, you get 25% more coverage, early stage benefits they don't offer, and our industry-leading 48-hour claims guarantee.`,
            talkingPoints: [
              `We cover 25 MORE critical illnesses than ${selectedCompetitors.join(' or ')} - that's 25% better protection`,
              'Unique triple cancer protection with 3x payout on recurrence',
              'Fast-track 48-hour claims processing vs industry standard 7-14 days',
              'Free annual health screening worth SGD 500 included'
            ],
            objectionHandling: [
              `"Premium seems higher" → Actually just SGD 15/month more but you get 25% more coverage - that's SGD 0.60 per day for superior protection`,
              `"${selectedCompetitors[0]} has good reputation" → We respect them, but our claims approval rate is 98% vs industry 92%, and we pay out faster`,
              `"Need to think about it" → I understand. Let me email you a detailed comparison so you can see exactly what you'd be missing with other plans`
            ]
          };
          setFlowData(mockData);
        }
      } catch (e) {
        console.error('Error parsing comparison data:', e);
        // Use mock data
        const mockData = {
          myProduct: {
            provider: myInsurer,
            productName: `${myInsurer} ${selectedProductType} Plus`,
            coverage: 'Up to SGD 500,000',
            premium: 'SGD 280/month',
            keyFeatures: ['120 critical illnesses covered', 'Early stage coverage', 'Triple cancer protection', 'Premium waiver on total disability'],
            advantages: ['Most comprehensive coverage in market', 'Competitive premium vs coverage ratio', 'Fast 48-hour claims processing', 'Free annual health screening']
          },
          competitors: selectedCompetitors.map(comp => ({
            provider: comp,
            productName: `${comp} ${selectedProductType}`,
            coverage: 'Up to SGD 450,000',
            premium: 'SGD 265/month',
            keyFeatures: ['95 critical illnesses', 'Standard cancer coverage', 'Medical second opinion'],
            weaknesses: ['25 fewer illnesses covered', 'No early stage benefit', 'Longer claims processing time', 'Higher premium for smokers']
          })),
          pitchSummary: `Our ${myInsurer} ${selectedProductType} offers the most comprehensive protection with 120 critical illnesses covered versus competitors' 95. For just SGD 15 more per month, you get 25% more coverage, early stage benefits they don't offer, and our industry-leading 48-hour claims guarantee.`,
          talkingPoints: [
            `We cover 25 MORE critical illnesses than ${selectedCompetitors.join(' or ')} - that's 25% better protection`,
            'Unique triple cancer protection with 3x payout on recurrence',
            'Fast-track 48-hour claims processing vs industry standard 7-14 days',
            'Free annual health screening worth SGD 500 included'
          ],
          objectionHandling: [
            `"Premium seems higher" → Actually just SGD 15/month more but you get 25% more coverage - that's SGD 0.60 per day for superior protection`,
            `"${selectedCompetitors[0]} has good reputation" → We respect them, but our claims approval rate is 98% vs industry 92%, and we pay out faster`,
            `"Need to think about it" → I understand. Let me email you a detailed comparison so you can see exactly what you'd be missing with other plans`
          ]
        };
        setFlowData(mockData);
      }
    } catch (error) {
      console.error('Error loading comparison:', error);
      // Use mock data on error
      const mockData = {
        myProduct: {
          provider: myInsurer,
          productName: `${myInsurer} ${selectedProductType} Plus`,
          coverage: 'Up to SGD 500,000',
          premium: 'SGD 280/month',
          keyFeatures: ['120 critical illnesses covered', 'Early stage coverage', 'Triple cancer protection', 'Premium waiver on total disability'],
          advantages: ['Most comprehensive coverage in market', 'Competitive premium vs coverage ratio', 'Fast 48-hour claims processing', 'Free annual health screening']
        },
        competitors: selectedCompetitors.map(comp => ({
          provider: comp,
          productName: `${comp} ${selectedProductType}`,
          coverage: 'Up to SGD 450,000',
          premium: 'SGD 265/month',
          keyFeatures: ['95 critical illnesses', 'Standard cancer coverage', 'Medical second opinion'],
          weaknesses: ['25 fewer illnesses covered', 'No early stage benefit', 'Longer claims processing time', 'Higher premium for smokers']
        })),
        pitchSummary: `Our ${myInsurer} ${selectedProductType} offers the most comprehensive protection with 120 critical illnesses covered versus competitors' 95. For just SGD 15 more per month, you get 25% more coverage, early stage benefits they don't offer, and our industry-leading 48-hour claims guarantee.`,
        talkingPoints: [
          `We cover 25 MORE critical illnesses than ${selectedCompetitors.join(' or ')} - that's 25% better protection`,
          'Unique triple cancer protection with 3x payout on recurrence',
          'Fast-track 48-hour claims processing vs industry standard 7-14 days',
          'Free annual health screening worth SGD 500 included'
        ],
        objectionHandling: [
          `"Premium seems higher" → Actually just SGD 15/month more but you get 25% more coverage - that's SGD 0.60 per day for superior protection`,
          `"${selectedCompetitors[0]} has good reputation" → We respect them, but our claims approval rate is 98% vs industry 92%, and we pay out faster`,
          `"Need to think about it" → I understand. Let me email you a detailed comparison so you can see exactly what you'd be missing with other plans`
        ]
      };
      setFlowData(mockData);
    } finally {
      setLoadingFlow(false);
    }
  };

  const handleCloseFlow = () => {
    setActiveFlow(null);
    setFlowData(null);
    setCompareStep('select-type');
    setSelectedProductType('');
    setMyInsurer('');
    setSelectedCompetitors([]);
  };

  const handleRescheduleMeeting = async (meeting: any) => {
    console.log('📅 === RESCHEDULE MEETING TRIGGERED ===');
    console.log('📦 Meeting Data:', meeting);
    
    // Add user action message
    const actionMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `📅 Reschedule meeting with ${meeting.client}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, actionMsg]);

    // Create loading message
    const loadingMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingMsgId,
      role: 'assistant',
      content: '🤔 Analyzing your schedule and finding the best alternative times...',
      timestamp: new Date()
    }]);

    try {
      // Query AI for reschedule suggestions
      const query = `I need to reschedule my meeting with ${meeting.client} currently scheduled for ${meeting.time} (${meeting.topic}). 
      
Please suggest 3 alternative time slots for this week and provide:
1) **Recommended Time**: The single best alternative time slot
2) **Reasoning**: Why this time is optimal
3) **Alternative Options**: 2 other possible times
4) **Message Template**: A professional message to send to ${meeting.client}

Format your response with clear headings.`;

      console.log('💬 Reschedule Query:', query);

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
                  
                  // Update streaming message
                  setMessages(prev => prev.map(msg => 
                    msg.id === loadingMsgId 
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

      console.log('✅ AI Reschedule Response:', fullResponse);

      // Extract recommended time from response
      const timePattern = /(?:Recommended Time|Best Time)[:\s]*([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM|am|pm))/i;
      const match = fullResponse.match(timePattern);
      const suggestedTime = match ? match[1].trim() : null;

      console.log('⏰ Extracted Suggested Time:', suggestedTime);

      // Update the meeting data with rescheduled time
      if (suggestedTime && flowData && Array.isArray(flowData)) {
        const updatedMeetings = flowData.map((m: any) => {
          if (m.id === meeting.id) {
            return {
              ...m,
              rescheduledTime: suggestedTime,
              rescheduleReason: 'Rescheduled per AI recommendation'
            };
          }
          return m;
        });
        
        console.log('📊 Updated Meetings Data:', updatedMeetings);
        setFlowData(updatedMeetings);

        // Add a confirmation message
        setTimeout(() => {
          const confirmMsg: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `✅ **Meeting rescheduled!** ${meeting.client}'s meeting has been moved from ${meeting.time} → ${suggestedTime}. The updated schedule is now showing in your meetings view.`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, confirmMsg]);
        }, 500);
      }

    } catch (error) {
      console.error('❌ Error rescheduling:', error);
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I had trouble processing that reschedule request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMsgId ? errorMsg : msg
      ));
    }
  };

  const handleFlowAction = async (action: string, data: any) => {
    console.log('🎬 === FLOW ACTION TRIGGERED ===');
    console.log('📌 Action:', action);
    console.log('📦 Data:', data);
    
    // For pitch, reschedule, and compare, show in drawer instead of chat
    const isPitchAction = action.includes('pitch') || action.includes('Pitch');
    const isRescheduleAction = action.includes('Reschedule');
    const isCompareAction = action.includes('Get Quote') || action.includes('Compare') || action.includes('Scan');
    const showInDrawer = isPitchAction || isRescheduleAction || isCompareAction;
    
    if (!showInDrawer) {
      handleCloseFlow();
      
      // Add user action message to chat
      const actionMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `📱 ${action}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, actionMsg]);
    } else {
      // Show in drawer - set title and loading
      let title = '';
      if (isPitchAction) {
        title = `Pitch for ${data.name}`;
      } else if (isRescheduleAction) {
        title = `Reschedule: ${data.client}`;
      } else if (isCompareAction) {
        title = action.includes('Scan') ? 'Product Analysis' : `Quote for ${data.productName || 'Product'}`;
      }
      setDrawerTitle(title);
      setDrawerContent(null);
      setDrawerLoading(true);
    }

    // Generate AI response based on action with rich context
    let query = '';
    if (isPitchAction) {
      query = `Create a SHORT, WhatsApp-ready sales pitch for ${data.name} (${data.status} lead, score ${data.score}/100, interested in ${data.interest}).

**Format as follows (keep it BRIEF and actionable):**

**Opening**
[1 compelling sentence hook]

**Key Message** 
[2-3 sentences on why ${data.interest} matters for their situation]

**Product**
${data.recommendedProduct ? `[2 sentences on ${data.recommendedProduct} benefits]` : '[Recommend best product in 2 sentences]'}

**Next Step**
[1 clear call-to-action]

Keep it conversational and under 150 words total. This is for WhatsApp, so be concise and punchy. NO EMOJIS.`;
    } else if (action.includes('Call') || action.includes('Message')) {
      query = `I want to contact ${data.name} (${data.phone || 'contact'}). They are a ${data.status} lead interested in ${data.interest}, with a lead score of ${data.score}. Last contacted ${data.lastContact}. Provide: 1) A compelling opening line, 2) Personalized value proposition based on their needs, 3) Strong call to action with urgency.`;
    } else if (action.includes('View Details')) {
      query = `I have a meeting with ${data.client} at ${data.time} to discuss ${data.topic} at ${data.location}. This is currently ${data.status}. Provide a comprehensive meeting briefing with:

1) **Client Profile**: Background and relationship history
2) **Meeting Objectives**: What we aim to achieve
3) **Key Discussion Points**: Specific topics to cover
4) **Preparation Checklist**: Documents, data, and materials needed
5) **Talking Points**: 3-4 strategic conversation starters
6) **Potential Objections**: And how to address them

Format this as a structured meeting brief.`;
    } else if (action.includes('Reschedule')) {
      query = `Help me reschedule my meeting with ${data.client} currently at ${data.time} (${data.topic}).

**Provide:**

**Alternative Times**
3 suggested time slots this week with brief reasoning

**Message Template**
Professional message to send ${data.client}

**Strategy**
Quick tips to maintain rapport

Keep it concise and actionable. NO EMOJIS.`;
    } else if (action.includes('Get Quote')) {
      query = `Generate a quote for ${data.productName} by ${data.provider}.

**Product**: ${data.productName}
**Coverage**: ${data.coverage}
**Premium**: ${data.premium}

**Provide:**

**Coverage Summary**
What's included in clear terms

**Premium Breakdown**
Monthly/annual costs and payment options

**Key Benefits**
Top 3 selling points

**Next Steps**
How to proceed

Keep it brief and client-ready. NO EMOJIS.`;
    }

    console.log('💬 Generated LLM Query:', query);
    console.log('🚀 Triggering LLM call...');

    // For drawer actions (pitch, reschedule, compare), call LLM and show in drawer
    if (showInDrawer) {
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
                    setDrawerContent(fullResponse);
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        }

        console.log('✅ Drawer content generated successfully');
        setDrawerLoading(false);
        
      } catch (error) {
        console.error('❌ Error generating content:', error);
        setDrawerContent('❌ Sorry, I had trouble generating this. Please try again.');
        setDrawerLoading(false);
      }
    } else {
      // For other actions, use chat
      setTimeout(() => {
        setInput(query);
        setTimeout(handleSendMessage, 50);
      }, 300);
    }
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
      content: '📸 Competitor product brochure scanned',
      timestamp: new Date(),
      isImage: true
    };

    const analysisMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `📊 **AI Product Comparison Analysis**\n\n**Identified Competitor Product:** AIA Critical Cover Plus\n**Recommended Response:** PRUCancer 360\n\n---\n\n### Coverage Comparison\n\n| Feature | AIA | Prudential |\n|---------|-----|------------|\n| Critical Illnesses | 95 | **120** ✅ |\n| Early Stage Coverage | ❌ | ✅ **Yes** |\n| Cancer Recurrence | 2x payout | **3x payout** ✅ |\n| Premium Waiver | Standard | **Enhanced** ✅ |\n\n---\n\n### Pricing Analysis\n\n💰 **AIA Premium:** SGD 298/month\n💰 **PRU Premium:** SGD 285/month\n\n✨ **Your Advantage:** Better coverage at **SGD 13/month less**\n\n---\n\n### Key Selling Points\n\n🎯 **Differentiators:**\n1. ✅ **25 more illnesses covered** (120 vs 95)\n2. ✅ **Early stage detection benefit** - unique to PRU\n3. ✅ **3x cancer recurrence** vs their 2x\n4. ✅ **Lower premium** - Save SGD 156/year\n5. ✅ **Enhanced premium waiver** coverage\n\n---\n\n### Suggested Pitch\n\n💬 *"I see you're looking at AIA's plan. Let me show you how our PRUCancer 360 compares - you get 25% more illnesses covered, early detection benefits they don't offer, and actually pay less per month. The cancer recurrence benefit alone is 50% better at 3x payout vs their 2x."*\n\n---\n\n⚠️ **Watch Out For:** Their agents may emphasize brand reputation - counter with our superior coverage and lower cost.\n\n✅ **Close With:** "You're getting more protection for less money - that's the smart choice."`,
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
          <p className="text-gray-400 mb-4">AI-Powered Assistant for Insurance Agents</p>
          
          {/* Platform Toggle */}
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => {
                if (platform !== 'whatsapp') {
                  setShowWhatsAppSplash(true);
                  setTimeout(() => {
                    setPlatform('whatsapp');
                    setTimeout(() => setShowWhatsAppSplash(false), 2000);
                  }, 100);
                }
              }}
              className={`w-44 h-14 px-6 py-3 rounded-full font-bold transition-all flex items-center justify-center space-x-2.5 text-lg ${
                platform === 'whatsapp'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              <MessageCircle className="h-6 w-6" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => {
                if (platform !== 'teams') {
                  setShowTeamsSplash(true);
                  setTimeout(() => {
                    setPlatform('teams');
                    setTimeout(() => setShowTeamsSplash(false), 2000);
                  }, 100);
                }
              }}
              className={`w-44 h-14 px-6 py-3 rounded-full font-bold transition-all flex items-center justify-center space-x-2.5 text-lg ${
                platform === 'teams'
                  ? 'bg-[#6264A7] text-white shadow-lg'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              <Image 
                src="/MS_Teams_Logo.png" 
                alt="Teams" 
                width={40}
                height={40}
                className="h-10 w-10 object-contain -ml-1"
              />
              <span>Teams</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Stats Panel */}
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wide">Performance Metrics</h3>
              <div className="space-y-4">
                {/* Monthly Revenue */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">SGD 24.8K</div>
                    <div className="text-xs text-gray-400">Monthly Revenue</div>
                    <div className="text-[10px] text-emerald-500 mt-0.5">+41% with AI</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-400">$</span>
                  </div>
                </div>

                {/* Lead Capacity */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">47 <span className="text-sm text-gray-500">vs 28</span></div>
                    <div className="text-xs text-gray-400">Leads/Month Capacity</div>
                    <div className="text-[10px] text-blue-500 mt-0.5">+68% vs Traditional</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">34%</div>
                    <div className="text-xs text-gray-400">Conversion Rate</div>
                    <div className="text-[10px] text-green-500 mt-0.5">+12% vs avg</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                </div>

                {/* Time Saved */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">18.5h</div>
                    <div className="text-xs text-gray-400">Hours Saved/Week</div>
                    <div className="text-[10px] text-purple-500 mt-0.5">AI Automation</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-purple-400" />
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
                  <div className="w-full h-full bg-white rounded-[42px] overflow-hidden flex flex-col relative">
                  {/* WhatsApp Splash Screen */}
                  {showWhatsAppSplash && (
                    <div className="absolute inset-0 bg-white z-[100] flex items-center justify-center rounded-[42px]">
                      <div className="relative w-full h-full animate-in fade-in zoom-in duration-700">
                        <Image 
                          src="/whatsapp-splash_w.jpg" 
                          alt="WhatsApp" 
                          fill
                          className="object-cover rounded-[42px]"
                          priority
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Teams Splash Screen */}
                  {showTeamsSplash && (
                    <div className="absolute inset-0 bg-white z-[100] flex items-center justify-center rounded-[42px]">
                      <div className="relative w-[300px] h-[500px] animate-in fade-in zoom-in duration-700">
                        <Image 
                          src="/teams-splash.jpg" 
                          alt="Microsoft Teams" 
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Platform Header */}
                  {platform === 'whatsapp' ? (
                    <div className="bg-gradient-to-r from-green-600 to-green-500 px-5 py-4 shadow-sm">
                      <div className="font-bold text-white text-lg">Agent Companion</div>
                      <div className="text-xs text-green-100">Online • Powered by LLM</div>
                    </div>
                  ) : (
                    <div className="bg-[#F5F5F5] px-4 py-6 flex items-center space-x-3">
                      {/* Back Arrow */}
                      <button className="text-gray-700 hover:text-gray-900">
                        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                      </button>
                      
                      {/* Profile Circle with Green Dot */}
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-[#6264A7] flex items-center justify-center text-white text-xs font-bold">
                          AI
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#92C353] rounded-full border-2 border-[#F5F5F5]"></div>
                      </div>
                      
                      {/* Title and Status */}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm flex items-center">
                          Agent Copilot
                          <ChevronLeft className="h-3 w-3 ml-1 rotate-180 text-gray-500" />
                        </div>
                        <div className="text-[11px] text-gray-500">Available</div>
                      </div>
                    </div>
                  )}

                  {/* Messages Area or Flow View */}
                  <div className={`flex-1 overflow-y-auto overflow-x-hidden ${
                    platform === 'whatsapp' ? 'bg-[#E5DDD5]' : 'bg-white'
                  }`} style={{
                    backgroundImage: activeFlow ? 'none' : (platform === 'whatsapp' ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23E5DDD5\'/%3E%3Cpath d=\'M20 20h60v60H20z\' fill=\'%23DCF8C6\' opacity=\'.03\'/%3E%3C/svg%3E")' : 'none')
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
                            {activeFlow === 'leads' ? 'Lead List' : activeFlow === 'meetings' ? 'Meeting Schedule' : activeFlow === 'pitch' ? 'Pitch AI' : 'Product Comparison'}
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
                          ) : activeFlow === 'pitch' && flowData?.isPitchFlow ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                              <div className="text-center mb-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mx-auto mb-4 flex items-center justify-center">
                                  <Sparkles className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Pitch AI</h3>
                                <p className="text-xs text-gray-600 px-4">Describe your pitch, and I'll create a customer proposition</p>
                              </div>
                              
                              <button
                                onClick={() => {
                                  setIsRecordingPitch(!isRecordingPitch);
                                  if (!isRecordingPitch) {
                                    setTimeout(() => {
                                      setIsRecordingPitch(false);
                                      handleCloseFlow();
                                      const pitchMsg: Message = {
                                        id: Date.now().toString(),
                                        role: 'user',
                                        content: '🎤 "I need to pitch a critical illness plan to a 35-year-old client with 2 kids, budget around SGD 300/month, concerned about cancer coverage"',
                                        timestamp: new Date(),
                                        isVoice: true
                                      };
                                      setMessages(prev => [...prev, pitchMsg]);
                                      setTimeout(() => {
                                        handleAIPitchGeneration('I need to pitch a critical illness plan to a 35-year-old client with 2 kids, budget around SGD 300/month, concerned about cancer coverage');
                                      }, 500);
                                    }, 3000);
                                  }
                                }}
                                className={`w-full max-w-xs h-32 rounded-2xl transition-all flex flex-col items-center justify-center space-y-3 ${
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
                                onClick={handleCloseFlow}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
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
                                  <div className="grid grid-cols-3 gap-2">
                                    {platform === 'teams' ? (
                                      <>
                                        <button 
                                          onClick={() => handleFlowAction(`Call ${lead.name}`, lead)}
                                          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border-2 border-[#6264A7] rounded-full text-xs font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF]"
                                        >
                                          <Phone className="w-3.5 h-3.5" />
                                          <span>Call</span>
                                        </button>
                                        <button 
                                          onClick={() => handleFlowAction(`Message ${lead.name}`, lead)}
                                          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border-2 border-[#6264A7] rounded-full text-xs font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF]"
                                        >
                                          <MessageCircle className="w-3.5 h-3.5" />
                                          <span>Message</span>
                                        </button>
                                        <button 
                                          onClick={() => handleFlowAction(`Generate personalized pitch for ${lead.name}`, lead)}
                                          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border-2 border-[#6264A7] rounded-full text-xs font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF]"
                                        >
                                          <Sparkles className="w-3.5 h-3.5" />
                                          <span>Pitch</span>
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <div className="rounded-full p-[2px] bg-gradient-to-br from-green-500 to-green-600 shadow-sm">
                                          <button 
                                            onClick={() => handleFlowAction(`Call ${lead.name}`, lead)}
                                            className="w-full px-3 py-2 bg-white rounded-full text-xs font-medium transition-all text-green-600 hover:bg-green-50 ring-0 border-0 outline-none"
                                          >
                                            <span className="inline-flex items-center justify-center gap-1.5">
                                              <Phone className="w-3.5 h-3.5" />
                                              <span>Call</span>
                                            </span>
                                          </button>
                                        </div>
                                        <div className="rounded-full p-[2px] bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                                          <button 
                                            onClick={() => handleFlowAction(`Message ${lead.name}`, lead)}
                                            className="w-full px-3 py-2 bg-white rounded-full text-xs font-medium transition-all text-blue-600 hover:bg-blue-50 ring-0 border-0 outline-none"
                                          >
                                            <span className="inline-flex items-center justify-center gap-1.5">
                                              <MessageCircle className="w-3.5 h-3.5" />
                                              <span>Message</span>
                                            </span>
                                          </button>
                                        </div>
                                        <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm">
                                          <button 
                                            onClick={() => handleFlowAction(`Generate personalized pitch for ${lead.name}`, lead)}
                                            className="w-full px-3 py-2 bg-white rounded-full text-xs font-medium transition-all text-amber-600 hover:bg-amber-50 ring-0 border-0 outline-none"
                                          >
                                            <span className="inline-flex items-center justify-center gap-1.5">
                                              <Sparkles className="w-3.5 h-3.5" />
                                              <span>Pitch</span>
                                            </span>
                                          </button>
                                        </div>
                                      </>
                                    )}
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
                                <div key={meeting.id} className={`rounded-lg p-4 border-2 ${
                                  meeting.rescheduledTime 
                                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300' 
                                    : 'bg-purple-50 border-purple-200'
                                }`}>
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-900">{meeting.client}</div>
                                      
                                      {/* Show time comparison if rescheduled */}
                                      {meeting.rescheduledTime ? (
                                        <div className="mt-2 space-y-1">
                                          <div className="flex items-center space-x-2">
                                            <div className="text-xs text-gray-500 line-through">{meeting.originalTime}</div>
                                            <div className="text-xs text-gray-400">→</div>
                                            <div className="text-sm text-amber-700 font-bold">{meeting.rescheduledTime}</div>
                                            <span className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full text-[9px] font-bold">RESCHEDULED</span>
                                          </div>
                                          {meeting.rescheduleReason && (
                                            <div className="text-xs text-gray-600 italic">
                                              📝 {meeting.rescheduleReason}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="text-sm text-purple-700 font-medium mt-1">{meeting.time}</div>
                                      )}
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
                                      onClick={() => handleRescheduleMeeting(meeting)}
                                      className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                                        meeting.rescheduledTime
                                          ? 'bg-amber-600 text-white hover:bg-amber-700'
                                          : 'bg-gray-600 text-white hover:bg-gray-700'
                                      }`}
                                    >
                                      {meeting.rescheduledTime ? 'Update Again' : 'Reschedule'}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : activeFlow === 'compare' ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-xs text-gray-500">
                                  {compareStep === 'select-type' && 'Step 1: Product Type'}
                                  {compareStep === 'select-my-insurer' && 'Step 2: Your Insurance'}
                                  {compareStep === 'select-competitors' && `Step 3: Competitors (${selectedCompetitors.length}/1-2)`}
                                  {compareStep === 'results' && 'Competitive Analysis'}
                                </div>
                                <button 
                                  onClick={handleCloseFlow}
                                  className="px-3 py-1.5 bg-green-600 text-white rounded-full text-[10px] font-bold hover:bg-green-700 transition-colors"
                                >
                                  💬 Ask AI
                                </button>
                              </div>

                              {/* Step 1: Select Product Type */}
                              {compareStep === 'select-type' && (
                                <div className="space-y-2">
                                  <div className="text-xs text-gray-600 mb-3 text-center">What type of product do you want to compare?</div>
                                  {['Critical Illness', 'Life Insurance', 'Savings Plan', 'Investment-Linked'].map((type) => (
                                    <button
                                      key={type}
                                      onClick={() => handleProductTypeSelect(type)}
                                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-lg border-2 border-orange-200 hover:border-orange-300 transition-all"
                                    >
                                      <div className="text-sm font-semibold text-gray-900">{type}</div>
                                    </button>
                                  ))}
                                </div>
                              )}

                              {/* Step 2: Select MY Insurance Company */}
                              {compareStep === 'select-my-insurer' && (
                                <div className="space-y-2">
                                  <div className="text-xs text-gray-600 mb-3 text-center">
                                    Which insurance company do YOU represent?
                                  </div>
                                  {['Prudential', 'AIA', 'Manulife', 'Great Eastern', 'FWD'].map((insurer) => (
                                    <button
                                      key={insurer}
                                      onClick={() => handleMyInsurerSelect(insurer)}
                                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all"
                                    >
                                      <div className="text-sm font-semibold text-gray-900">{insurer}</div>
                                    </button>
                                  ))}
                                </div>
                              )}

                              {/* Step 3: Select Competitors */}
                              {compareStep === 'select-competitors' && (
                                <div className="space-y-2">
                                  <div className="text-xs text-gray-600 mb-3 text-center">
                                    <div className="font-semibold text-blue-700 mb-1">You: {myInsurer}</div>
                                    <div>Select 1-2 competitors to compare against</div>
                                  </div>
                                  {['Prudential', 'AIA', 'Manulife', 'Great Eastern', 'FWD'].filter(i => i !== myInsurer).map((insurer) => {
                                    const isSelected = selectedCompetitors.includes(insurer);
                                    const isDisabled = !isSelected && selectedCompetitors.length >= 2;
                                    return (
                                      <button
                                        key={insurer}
                                        onClick={() => !isDisabled && handleCompetitorToggle(insurer)}
                                        disabled={isDisabled}
                                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                                          isSelected
                                            ? 'bg-orange-500 border-orange-600 text-white font-semibold'
                                            : isDisabled
                                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                            : 'bg-white border-orange-200 hover:border-orange-300 text-gray-900'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-medium">{insurer}</span>
                                          {isSelected && <span>✓</span>}
                                        </div>
                                      </button>
                                    );
                                  })}
                                  <button
                                    onClick={handleCompareProducts}
                                    disabled={selectedCompetitors.length === 0}
                                    className={`w-full mt-4 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                                      selectedCompetitors.length > 0
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                  >
                                    Compare {selectedCompetitors.length} Competitor{selectedCompetitors.length !== 1 ? 's' : ''}
                                  </button>
                                </div>
                              )}

                              {/* Step 4: Show Results */}
                              {compareStep === 'results' && (
                                <>
                                  {loadingFlow ? (
                                    <div className="text-center text-gray-500 text-sm py-8">
                                      <div className="flex items-center justify-center mb-2">
                                        <div className="animate-spin h-5 w-5 border-2 border-orange-600 border-t-transparent rounded-full mr-2"></div>
                                        <span>Analyzing competitive advantages...</span>
                                      </div>
                                      <div className="text-xs">Please wait</div>
                                    </div>
                                  ) : flowData?.myProduct ? (
                                    <div className="space-y-3">
                                      {/* MY PRODUCT - Highlighted */}
                                      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 border-2 border-blue-400 shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                          <div>
                                            <div className="text-xs text-blue-700 font-bold uppercase">✨ Your Product</div>
                                            <div className="text-xs text-blue-600 font-semibold mt-0.5">{flowData.myProduct.provider}</div>
                                            <div className="font-bold text-gray-900 text-sm mt-1">{flowData.myProduct.productName}</div>
                                          </div>
                                          <div className="text-right">
                                            <div className="text-sm font-bold text-blue-700">{flowData.myProduct.premium}</div>
                                            <div className="text-[10px] text-gray-600">{flowData.myProduct.coverage}</div>
                                          </div>
                                        </div>
                                        <div className="mb-3">
                                          <div className="text-xs font-semibold text-gray-700 mb-1">Key Features:</div>
                                          <div className="space-y-1">
                                            {flowData.myProduct.keyFeatures?.map((feature: string, i: number) => (
                                              <div key={i} className="text-xs text-gray-800 flex items-start">
                                                <span className="text-green-600 mr-1 font-bold">✓</span>
                                                <span className="font-medium">{feature}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs font-semibold text-gray-700 mb-1">Competitive Advantages:</div>
                                          <div className="space-y-1">
                                            {flowData.myProduct.advantages?.map((adv: string, i: number) => (
                                              <div key={i} className="text-xs text-gray-800 flex items-start">
                                                <span className="text-blue-600 mr-1 font-bold">★</span>
                                                <span className="font-medium">{adv}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>

                                      {/* COMPETITORS */}
                                      {flowData.competitors?.map((competitor: any, idx: number) => (
                                        <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-300">
                                          <div className="flex items-center justify-between mb-2">
                                            <div>
                                              <div className="text-xs text-gray-500 font-semibold">Competitor</div>
                                              <div className="font-semibold text-gray-900 text-xs">{competitor.provider}</div>
                                              <div className="text-xs text-gray-700 mt-0.5">{competitor.productName}</div>
                                            </div>
                                            <div className="text-right">
                                              <div className="text-xs font-semibold text-gray-700">{competitor.premium}</div>
                                              <div className="text-[9px] text-gray-500">{competitor.coverage}</div>
                                            </div>
                                          </div>
                                          <div className="mb-2">
                                            <div className="text-[10px] font-semibold text-gray-600 mb-1">Features:</div>
                                            <div className="space-y-0.5">
                                              {competitor.keyFeatures?.slice(0, 3).map((feature: string, i: number) => (
                                                <div key={i} className="text-[10px] text-gray-600 flex items-start">
                                                  <span className="text-gray-400 mr-1">•</span>
                                                  <span>{feature}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-[10px] font-semibold text-red-700 mb-1">Where They Fall Short:</div>
                                            <div className="space-y-0.5">
                                              {competitor.weaknesses?.slice(0, 3).map((weakness: string, i: number) => (
                                                <div key={i} className="text-[10px] text-red-600 flex items-start">
                                                  <span className="mr-1">⚠</span>
                                                  <span>{weakness}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      ))}

                                      {/* PITCH SUMMARY */}
                                      {flowData.pitchSummary && (
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-300">
                                          <div className="text-xs font-bold text-purple-800 mb-2 uppercase">💬 Your Pitch</div>
                                          <div className="text-xs text-gray-800 leading-relaxed">{flowData.pitchSummary}</div>
                                        </div>
                                      )}

                                      {/* TALKING POINTS */}
                                      {flowData.talkingPoints && flowData.talkingPoints.length > 0 && (
                                        <div className="bg-green-50 rounded-lg p-3 border border-green-300">
                                          <div className="text-xs font-bold text-green-800 mb-2">🎯 Key Talking Points</div>
                                          <div className="space-y-1.5">
                                            {flowData.talkingPoints.map((point: string, i: number) => (
                                              <div key={i} className="text-xs text-gray-800 flex items-start">
                                                <span className="text-green-600 mr-1.5 font-bold">{i + 1}.</span>
                                                <span className="font-medium">{point}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* OBJECTION HANDLING */}
                                      {flowData.objectionHandling && flowData.objectionHandling.length > 0 && (
                                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-300">
                                          <div className="text-xs font-bold text-amber-800 mb-2">🛡️ Handle Objections</div>
                                          <div className="space-y-2">
                                            {flowData.objectionHandling.map((objection: string, i: number) => (
                                              <div key={i} className="text-xs text-gray-800">
                                                <div className="font-semibold">{objection.split(' → ')[0]}</div>
                                                <div className="text-gray-700 mt-0.5 ml-3">→ {objection.split(' → ')[1]}</div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-center text-gray-500 text-sm py-4">
                                      <div className="mb-2">No comparison data available</div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 text-sm">No data available</div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Regular Chat View
                      <div className="p-4 space-y-3">
                    {loading && (
                      <div className="flex justify-start mb-3">
                        <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                            <div className="text-sm text-gray-600">AI is thinking...</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
                      >
                        {platform === 'teams' && message.role === 'assistant' && (
                          <div className="w-6 h-6 rounded-full bg-[#6264A7] flex items-center justify-center text-white text-[8px] font-bold mr-2 flex-shrink-0 mt-1">
                            AI
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] px-3 py-2 ${
                            platform === 'whatsapp'
                              ? `rounded-xl shadow-sm ${message.role === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'}`
                              : `rounded-md ${message.role === 'user' ? 'bg-[#6264A7] text-white shadow-sm' : 'bg-gray-100'}`
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
                          
                          {/* Action buttons for structured summaries */}
                          {message.role === 'assistant' && 
                           (message.content.includes('**Client Profile**') || 
                            message.content.includes('**Meeting Summary**') ||
                            message.content.includes('**Discussion Points**') ||
                            message.content.includes('**Action Items**')) && (
                            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                              <button
                                onClick={() => handleSaveToCRM(message.content)}
                                className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                              >
                                💾 Save to CRM
                              </button>
                              <button
                                onClick={() => {
                                  // Copy to clipboard
                                  navigator.clipboard.writeText(message.content);
                                  const copyMsg: Message = {
                                    id: Date.now().toString(),
                                    role: 'assistant',
                                    content: '📋 Summary copied to clipboard!',
                                    timestamp: new Date()
                                  };
                                  setMessages(prev => [...prev, copyMsg]);
                                }}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors"
                              >
                                📋 Copy
                              </button>
                            </div>
                          )}
                          
                          {/* Quick action button for meeting-related responses */}
                          {message.role === 'assistant' && message.metadata?.isMeetingRelated && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <button
                                onClick={() => handleOpenFlow('meetings')}
                                className="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-xs font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm flex items-center justify-center space-x-2"
                              >
                                <Calendar className="h-3.5 w-3.5" />
                                <span>📅 Open Meetings</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}


                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl px-5 py-3.5 shadow-sm">
                          <div className="flex space-x-2">
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" style={{ animation: 'bounce 1s infinite' }}></div>
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" style={{ animation: 'bounce 1s infinite 0.2s' }}></div>
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" style={{ animation: 'bounce 1s infinite 0.4s' }}></div>
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
                    {/* Loading indicator for flows */}
                    {loadingFlow && (
                      <div className="mb-2 bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-500/10 rounded-full p-0.5">
                        <div className="bg-white rounded-full px-4 py-2 flex items-center justify-center space-x-2">
                          <div className="relative">
                            <div className="h-3 w-3 rounded-full bg-green-500 animate-ping absolute"></div>
                            <div className="h-3 w-3 rounded-full bg-green-600"></div>
                          </div>
                          <span className="text-xs text-gray-700 font-medium">Loading data...</span>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                      <button
                        onClick={() => handleOpenFlow('leads')}
                        className={platform === 'teams'
                          ? `px-2 py-2 bg-white border-2 border-[#6264A7] rounded-lg text-[9px] font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF] ${loadingFlow ? 'opacity-50 cursor-not-allowed' : ''}`
                          : `px-2 py-2 rounded-lg text-[9px] font-semibold transition-colors ${
                              loadingFlow ? 'bg-red-100 text-red-400 cursor-not-allowed opacity-50' : 'bg-red-50 text-red-700 hover:bg-red-100'
                            }`
                        }
                        disabled={loading || loadingFlow}
                      >
                        {platform === 'teams' ? 'Leads' : (loadingFlow ? '⏳' : '🔥') + ' Leads'}
                      </button>
                      <button
                        onClick={() => handleOpenFlow('meetings')}
                        className={platform === 'teams'
                          ? `px-2 py-2 bg-white border-2 border-[#6264A7] rounded-lg text-[9px] font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF] ${loadingFlow ? 'opacity-50 cursor-not-allowed' : ''}`
                          : `px-2 py-2 rounded-lg text-[9px] font-semibold transition-colors ${
                              loadingFlow ? 'bg-purple-100 text-purple-400 cursor-not-allowed opacity-50' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                            }`
                        }
                        disabled={loading || loadingFlow}
                      >
                        {platform === 'teams' ? 'Meetings' : (loadingFlow ? '⏳' : '📅') + ' Meetings'}
                      </button>
                      <button
                        onClick={handleVoiceRecording}
                        className={platform === 'teams'
                          ? `px-2 py-2 bg-white border-2 border-[#6264A7] rounded-lg text-[9px] font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF] ${isRecording ? 'animate-pulse' : ''}`
                          : `px-2 py-2 rounded-lg text-[9px] font-semibold transition-colors ${
                              isRecording 
                                ? 'bg-red-100 text-red-700 animate-pulse' 
                                : 'bg-green-50 text-green-700 hover:bg-green-100'
                            }`
                        }
                        disabled={loading}
                      >
                        {platform === 'teams' ? 'Record' : '🎤 Record'}
                      </button>
                      <button
                        onClick={() => handleOpenFlow('compare')}
                        className={platform === 'teams'
                          ? `px-2 py-2 bg-white border-2 border-[#6264A7] rounded-lg text-[9px] font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF] ${loadingFlow ? 'opacity-50 cursor-not-allowed' : ''}`
                          : `px-2 py-2 rounded-lg text-[9px] font-semibold transition-colors ${
                              loadingFlow ? 'bg-orange-100 text-orange-400 cursor-not-allowed opacity-50' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                            }`
                        }
                        disabled={loading || loadingFlow}
                      >
                        {platform === 'teams' ? 'Compare' : (loadingFlow ? '⏳' : '🎯') + ' Compare'}
                      </button>
                      <button
                        onClick={handlePhotoUpload}
                        className={platform === 'teams'
                          ? "px-2 py-2 bg-white border-2 border-[#6264A7] rounded-lg text-[9px] font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF]"
                          : "px-2 py-2 bg-blue-50 text-blue-700 rounded-lg text-[9px] font-semibold hover:bg-blue-100 transition-colors"
                        }
                        disabled={loading}
                      >
                        {platform === 'teams' ? 'Scan' : '📸 Scan'}
                      </button>
                      <button
                        onClick={() => handleOpenFlow('pitch')}
                        className={platform === 'teams'
                          ? `px-2 py-2 bg-white border-2 border-[#6264A7] rounded-lg text-[9px] font-semibold transition-colors text-[#6264A7] hover:bg-[#F5F5FF] ${loadingFlow ? 'opacity-50 cursor-not-allowed' : ''}`
                          : `px-2 py-2 rounded-lg text-[9px] font-semibold transition-colors ${
                              loadingFlow ? 'bg-pink-100 text-pink-400 cursor-not-allowed opacity-50' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                            }`
                        }
                        disabled={loading || loadingFlow}
                      >
                        {platform === 'teams' ? 'Pitch AI' : (loadingFlow ? '⏳' : '💡') + ' Pitch AI'}
                      </button>
                    </div>

                    {/* Input Area */}
                    <div className={`flex items-center ${platform === 'teams' ? 'space-x-3 px-3' : 'space-x-2'}`}>
                      {/* Teams: Purple + Button */}
                      {platform === 'teams' && (
                        <button className="w-7 h-7 rounded-full bg-[#6264A7] flex items-center justify-center text-white hover:bg-[#7B83EB] transition-colors flex-shrink-0">
                          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </button>
                      )}
                      
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
                        placeholder={platform === 'whatsapp' ? 'Type or use menu...' : 'Type a message'}
                        className={`flex-1 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none ${
                          platform === 'whatsapp'
                            ? 'px-4 bg-gray-100 rounded-full focus:ring-2 focus:ring-green-500'
                            : 'px-3 bg-white border-0 focus:ring-0'
                        }`}
                        disabled={loading}
                      />

                      {input.trim() ? (
                        <button
                          onClick={handleSendMessage}
                          disabled={loading}
                          className={`transition-colors disabled:opacity-50 flex-shrink-0 ${
                            platform === 'whatsapp'
                              ? 'p-2 bg-green-600 hover:bg-green-700 rounded-full text-white shadow-sm'
                              : 'text-[#6264A7] hover:text-[#7B83EB]'
                          }`}
                        >
                          <Send className="h-5 w-5" fill={platform === 'teams' ? 'currentColor' : 'none'} />
                        </button>
                      ) : (
                        <>
                          {platform === 'teams' ? (
                            <>
                              <button className="text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0">
                                <Smile className="h-5 w-5" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0">
                                <Camera className="h-5 w-5" />
                              </button>
                              <button
                                onClick={handleVoiceRecording}
                                className="text-gray-600 hover:text-gray-800 transition-colors flex-shrink-0"
                                disabled={loading}
                              >
                                <Mic className="h-5 w-5" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={handleVoiceRecording}
                              className={`p-2 transition-colors shadow-sm flex-shrink-0 ${
                                isRecording
                                  ? 'bg-red-600 text-white animate-pulse rounded-full'
                                  : 'bg-green-600 text-white hover:bg-green-700 rounded-full'
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
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Teams Bottom Navigation */}
                  {platform === 'teams' && !activeFlow && (
                    <div className="bg-white border-t border-gray-200 px-2 py-1 flex items-center justify-around">
                      <button className="flex flex-col items-center py-1.5 px-3 text-gray-500 hover:text-[#6264A7] transition-colors">
                        <Zap className="h-4 w-4 mb-0.5" />
                        <span className="text-[9px] font-medium">Activity</span>
                      </button>
                      <button className="flex flex-col items-center py-1.5 px-3 text-[#6264A7] transition-colors">
                        <MessageSquare className="h-4 w-4 mb-0.5" />
                        <span className="text-[9px] font-medium">Chat</span>
                      </button>
                      <button className="flex flex-col items-center py-1.5 px-3 text-gray-500 hover:text-[#6264A7] transition-colors">
                        <Users className="h-4 w-4 mb-0.5" />
                        <span className="text-[9px] font-medium">Teams</span>
                      </button>
                      <button className="flex flex-col items-center py-1.5 px-3 text-gray-500 hover:text-[#6264A7] transition-colors">
                        <Calendar className="h-4 w-4 mb-0.5" />
                        <span className="text-[9px] font-medium">Calendar</span>
                      </button>
                    </div>
                  )}
                  </>
                  )}
                  
                  {/* Recording Modal - inside iPhone */}
                  {showRecordingModal && (
                    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm rounded-[42px]">
                      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-[90%] w-[320px] text-center">
                        {/* Animated Recording Icon */}
                        <div className="mb-4 flex justify-center">
                          <div className="relative">
                            {/* Pulsing outer rings */}
                            <div className="absolute inset-0 bg-red-500 rounded-full opacity-75" style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                            <div className="absolute inset-0 bg-red-500 rounded-full opacity-50" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.3s' }}></div>
                            
                            {/* Main mic icon */}
                            <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-6">
                              <Mic className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Text */}
                        <div className="mb-3">
                          <div className="text-xl font-bold text-gray-900 mb-1">Recording...</div>
                          <div className="text-base text-gray-600 font-mono">{recordingDuration.toFixed(1)}s</div>
                        </div>
                        
                        {/* Waveform Animation */}
                        <div className="flex items-center justify-center space-x-0.5 mb-4 h-10">
                          {[...Array(16)].map((_, i) => {
                            const duration = 0.5 + Math.random() * 0.5;
                            const delay = i * 0.05;
                            return (
                              <div
                                key={i}
                                className="w-1 bg-red-500 rounded-full transition-all"
                                style={{
                                  height: `${Math.random() * 100}%`,
                                  animation: `pulse ${duration}s ease-in-out ${delay}s infinite`
                                }}
                              />
                            );
                          })}
                        </div>
                        
                        {/* Info Text */}
                        <div className="text-xs text-gray-500 mb-4">
                          Speak clearly about your client meeting...
                        </div>
                        
                        {/* Stop Button */}
                        <button
                          onClick={handleVoiceRecording}
                          className="px-6 py-2 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition-colors text-sm"
                        >
                          ⏹️ Stop Recording
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Bottom Drawer - inside iPhone */}
                  {drawerContent !== null && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-2xl z-50 animate-in slide-in-from-bottom duration-300 max-h-[45%] overflow-hidden flex flex-col rounded-b-[42px]">
                      {/* Drawer Header */}
                      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-7 w-7 rounded-full bg-transparent border-2 border-blue-500 flex items-center justify-center">
                            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm">{drawerTitle}</h3>
                        </div>
                        <button
                          onClick={() => setDrawerContent(null)}
                          className="h-6 w-6 rounded-full bg-transparent border border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                      
                      {/* Drawer Content */}
                      <div className="flex-1 overflow-y-auto p-4">
                        {drawerLoading ? (
                          <div className="flex flex-col items-center justify-center py-8">
                            <div className="flex space-x-2 mb-4">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" style={{ animation: 'bounce 1s infinite' }}></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full" style={{ animation: 'bounce 1s infinite 0.2s' }}></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full" style={{ animation: 'bounce 1s infinite 0.4s' }}></div>
                            </div>
                            <p className="text-xs text-gray-600">Generating...</p>
                          </div>
                        ) : (
                          <div className="prose prose-xs max-w-none text-xs">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {drawerContent || ''}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                      
                      {/* Drawer Actions */}
                      {!drawerLoading && drawerContent && (
                        <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setMessages(prev => [...prev, {
                                id: Date.now().toString(),
                                role: 'assistant',
                                content: drawerContent,
                                timestamp: new Date()
                              }]);
                              setDrawerContent(null);
                              handleCloseFlow();
                            }}
                            className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium text-xs hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex items-center justify-center space-x-1.5"
                          >
                            <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                              <Send className="h-2 w-2" />
                            </div>
                            <span>Send</span>
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(drawerContent);
                            }}
                            className="flex-1 px-3 py-1.5 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-medium text-xs hover:bg-gray-50 transition-all flex items-center justify-center space-x-1.5"
                          >
                            <div className="h-4 w-4 rounded-full bg-transparent border border-gray-400 flex items-center justify-center">
                              <FileText className="h-2 w-2 text-gray-600" />
                            </div>
                            <span>Copy</span>
                          </button>
                          <button
                            onClick={() => setDrawerContent(null)}
                            className="h-7 w-7 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-medium text-xs hover:bg-gray-50 transition-all flex items-center justify-center flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
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

      {/* Pitch AI Modal - Now integrated inside phone, keeping for backwards compatibility */}
      {false && showVoicePitch && (
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
