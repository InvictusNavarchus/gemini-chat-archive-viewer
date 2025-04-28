
import React from 'react';
import { GeminiChatHistory } from '../types/gemini';
import { Card, CardContent } from './ui/card';
import { MessageSquare, FileText, Clock } from 'lucide-react';
import ModelUsageChart from './ModelUsageChart';

interface StatsOverviewProps {
  chatHistory: GeminiChatHistory;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ chatHistory }) => {
  // Count total files attached
  const totalFiles = chatHistory.reduce((sum, chat) => sum + (chat.attachedFiles?.length || 0), 0);
  
  // Get most used model
  const modelCounts: Record<string, number> = {};
  chatHistory.forEach(chat => {
    const model = chat.model || 'Unknown';
    modelCounts[model] = (modelCounts[model] || 0) + 1;
  });
  
  let mostUsedModel = 'None';
  let highestCount = 0;
  
  Object.entries(modelCounts).forEach(([model, count]) => {
    if (count > highestCount) {
      mostUsedModel = model;
      highestCount = count;
    }
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="pt-6 flex items-center">
            <div className="mr-4 h-10 w-10 rounded-full bg-gemini/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-gemini" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Conversations</p>
              <p className="text-2xl font-bold">{chatHistory.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="pt-6 flex items-center">
            <div className="mr-4 h-10 w-10 rounded-full bg-gemini-secondary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-gemini-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attached Files</p>
              <p className="text-2xl font-bold">{totalFiles}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="pt-6 flex items-center">
            <div className="mr-4 h-10 w-10 rounded-full bg-accent/40 flex items-center justify-center">
              <Clock className="h-5 w-5 text-gemini" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Most Used Model</p>
              <p className="text-lg font-bold truncate">{mostUsedModel}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ModelUsageChart chatHistory={chatHistory} />
    </div>
  );
};

export default StatsOverview;
