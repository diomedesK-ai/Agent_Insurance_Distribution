'use client';

import { Sparkles, LucideIcon } from 'lucide-react';

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  badge?: string;
}

interface AIFeatureSelectorProps {
  features: AIFeature[];
  selectedFeature: string;
  onSelect: (featureId: string) => void;
}

export default function AIFeatureSelector({ features, selectedFeature, onSelect }: AIFeatureSelectorProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AI-Powered Features</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => onSelect(feature.id)}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                selectedFeature === feature.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 bg-card hover:bg-accent'
              }`}
            >
              {feature.badge && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full font-medium">
                    {feature.badge}
                  </span>
                </div>
              )}
              
              <div className={`${feature.iconColor} p-0.5 rounded-full mb-3 w-fit`}>
                <div className="bg-white dark:bg-background rounded-full p-2">
                  <Icon className={`h-5 w-5 ${feature.iconColor.replace('bg-', 'text-')}`} />
                </div>
              </div>
              
              <div className="font-semibold text-sm text-foreground mb-1">{feature.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{feature.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

