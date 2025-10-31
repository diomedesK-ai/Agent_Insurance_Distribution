# Agency Distribution Demo - User Guide

## Overview

This demo showcases a comprehensive insurance agency distribution platform with four key operational areas. The design follows executive minimal principles with clean, corporate aesthetics.

## Access

**Local Development:** http://localhost:3333

## Navigation Structure

### Home Page
The landing page displays four clickable cards representing the main operational areas:
1. **Recruitment**
2. **Leads**
3. **Sell**
4. **Performance & Upskill**

Each card shows the key features and capabilities of that area.

## Module Details

### 1. Recruitment Module (`/recruitment`)

**Purpose:** Manage the complete agent recruitment lifecycle

**Features:**
- Candidate identification and screening
- Interview scheduling
- Onboarding tracking
- Lapse detection

**Metrics Displayed:**
- Total Candidates
- Interviewed count
- Onboarding progress
- Average match score
- Average experience

**Data:** Synthetic candidate data for Singapore and Hong Kong including:
- Personal details and contact information
- Experience levels and skills
- Match scores and status
- Availability information

### 2. Leads Module (`/leads`)

**Purpose:** Track and manage sales leads through the pipeline

**Features:**
- Lead generation and scoring
- Lead validation and merging
- Nurturing workflows
- Agent assignment

**Metrics Displayed:**
- Total Leads
- Qualified leads
- Assigned leads
- Conversion rate
- Average lead score

**Data:** Synthetic lead data including:
- Lead source and priority
- Income and interest profiles
- Lead scores and status
- Agent assignments

### 3. Sell Module (`/sell`)

**Purpose:** Provide customer insights and product recommendations

**Features:**
- Customer protection analysis
- Financial needs prediction
- Next best offer recommendations
- Product comparison and Q&A

**Metrics Displayed:**
- Total Customers
- Average protection gap
- Recommendation acceptance rate
- Upsell opportunities
- Average premium increase

**Data:** Synthetic customer data including:
- Current coverage analysis
- Protection gap calculations
- Life stage and risk profile
- Predicted needs and recommendations

### 4. Performance & Upskill Module (`/performance`)

**Purpose:** Monitor agent performance and provide coaching

**Features:**
- Commission forecasting and simulation
- Performance tracking
- Target achievement monitoring
- Digital coaching recommendations

**Metrics Displayed:**
- Total Agents
- Average achievement rate
- Agents on track
- Agents needing support
- Total commission

**Data:** Synthetic agent performance data including:
- Commission tracking (current vs target)
- Forecast projections
- Active policies and conversion rates
- Training completion
- Personalized coaching recommendations

## Location Switching

Each module includes a location switcher (Singapore / Hong Kong) that:
- Updates all data in real-time
- Maintains consistent UI/UX across locations
- Displays location-appropriate currency (SGD vs HKD)
- Shows region-specific phone formats

## Design Principles

- **Minimal & Clean:** Subtle borders, ample whitespace, refined typography
- **Corporate Aesthetic:** Professional color scheme with blue accents
- **No Icons:** Text-based navigation and indicators only
- **Responsive:** Works seamlessly across desktop and tablet devices
- **Accessible:** High contrast ratios and clear visual hierarchy

## Data Notes

All data in this demo is **synthetic and for demonstration purposes only**. The data represents realistic scenarios for insurance agency operations in Singapore and Hong Kong markets.

## Technical Details

- Built with Next.js 15 and React 18
- TypeScript for type safety
- Tailwind CSS for styling
- Client-side rendering for interactive features
- No external API dependencies

## Customization

The demo can be easily customized by:
- Updating data in the respective page files
- Adjusting colors in the Tailwind configuration
- Adding new metrics or features to modules
- Extending with additional locations or languages

