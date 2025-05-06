import React from 'react';
import { GeminiChat } from '../types/gemini';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { format, parseISO } from 'date-fns';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Calendar, Clock, FileText, X, ExternalLink } from 'lucide-react';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chat: GeminiChat | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose, chat }) => {
  // We're removing the body overflow: hidden as it's causing the scrolling issues
  
  if (!chat || !isOpen) return null;

  const formattedDate = chat.timestamp 
    ? format(parseISO(chat.timestamp), 'PPP') // 'Apr 28, 2025'
    : "Unknown date";
    
  const formattedTime = chat.timestamp
    ? format(parseISO(chat.timestamp), 'p') // '9:45 AM'
    : "Unknown time";

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-[400px] sm:w-[540px] pointer-events-none">
      <div className="absolute inset-0 pointer-events-auto" onClick={onClose}>
        <div className="absolute inset-y-0 right-0 w-[400px] sm:w-[540px] bg-background shadow-xl h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full flex flex-col border-none rounded-none shadow-none">
            <CardHeader className="pb-4 border-b relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
              
              <div className="flex justify-between items-center pr-8">
                <h2 className="text-lg font-semibold">{chat.title || "Untitled Chat"}</h2>
                <Badge className="bg-gemini text-white self-start">
                  {chat.model || "Unknown model"}
                </Badge>
              </div>
              
              <div className="text-sm flex flex-wrap items-center gap-2 mt-2 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formattedTime}
                </span>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1">
              <CardContent className="py-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Prompt</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{chat.prompt || "No prompt available"}</p>
                  </div>
                </div>
                
                {chat.attachedFiles && chat.attachedFiles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Attached Files ({chat.attachedFiles.length})
                    </h3>
                    <ul className="bg-muted p-4 rounded-md space-y-1">
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
                    <h3 className="text-sm font-medium mb-2">Account</h3>
                    <p className="text-sm">
                      {chat.accountName} {chat.accountEmail ? `(${chat.accountEmail})` : ""}
                    </p>
                  </div>
                )}
              </CardContent>
            </ScrollArea>

            <CardFooter className="border-t mt-auto p-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(chat.url, '_blank')}
                className="gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Open Original Conversation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
