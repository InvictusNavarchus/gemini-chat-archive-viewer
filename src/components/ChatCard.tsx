
import React from 'react';
import { GeminiChat } from '../types/gemini';
import { Card, CardContent, CardHeader } from './ui/card';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { MessageSquare, Calendar, FileText } from 'lucide-react';
import { Badge } from './ui/badge';

interface ChatCardProps {
  chat: GeminiChat;
  onClick: () => void;
  isExpanded?: boolean;
}

const ModelBadge: React.FC<{ model: string }> = ({ model }) => {
  let colorClass = "bg-gray-200 text-gray-800";
  
  if (model?.toLowerCase().includes("pro")) {
    colorClass = "bg-gemini text-white";
  } else if (model?.toLowerCase().includes("research")) {
    colorClass = "bg-gemini-secondary text-white";
  }
  
  return (
    <Badge className={`${colorClass} rounded-full px-2 py-1 text-xs`}>
      {model || "Unknown"}
    </Badge>
  );
};

const ChatCard: React.FC<ChatCardProps> = ({ chat, onClick, isExpanded = false }) => {
  const formattedDate = chat.timestamp 
    ? formatDistanceToNow(parseISO(chat.timestamp), { addSuffix: true })
    : "Unknown date";

  return (
    <Card 
      className={`gemini-card cursor-pointer animate-fade-in ${isExpanded ? 'h-full' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className={`font-medium text-base ${isExpanded ? '' : 'truncate'}`}>
            {chat.title || "Untitled Chat"}
          </h3>
          <ModelBadge model={chat.model} />
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm text-muted-foreground mb-3 ${isExpanded ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {chat.prompt || "No prompt available"}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> 
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {chat.attachedFiles && chat.attachedFiles.length > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>{chat.attachedFiles.length}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>View</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
