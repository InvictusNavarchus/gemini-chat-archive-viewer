
import React from 'react';
import { GeminiChat } from '../types/gemini';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Calendar, Clock, FileText, History } from 'lucide-react';

interface ChatDetailProps {
  chat: GeminiChat;
  onBack: () => void;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ chat, onBack }) => {
  const formattedDate = chat.timestamp 
    ? format(parseISO(chat.timestamp), 'PPP') // 'Apr 28, 2025'
    : "Unknown date";
    
  const formattedTime = chat.timestamp
    ? format(parseISO(chat.timestamp), 'p') // '9:45 AM'
    : "Unknown time";

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
      </div>
      
      <Card className="border border-border shadow-sm mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold">{chat.title || "Untitled Chat"}</h2>
            <Badge className="bg-gemini text-white self-start">
              {chat.model || "Unknown model"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <a 
                href={chat.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gemini hover:underline"
              >
                Open in Gemini
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Prompt</h3>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm whitespace-pre-wrap">{chat.prompt || "No prompt available"}</p>
            </div>
          </div>
          
          {chat.attachedFiles && chat.attachedFiles.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Attached Files ({chat.attachedFiles.length})
              </h3>
              <ul className="bg-muted p-3 rounded-md space-y-1">
                {chat.attachedFiles.map((file, index) => (
                  <li key={index} className="text-sm truncate">
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {chat.accountName && (
            <div>
              <h3 className="text-sm font-medium mb-1">Account</h3>
              <p className="text-sm">{chat.accountName} ({chat.accountEmail || "No email"})</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-end bg-muted/30 pt-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(chat.url, '_blank')}
          >
            Open Original Conversation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatDetail;
