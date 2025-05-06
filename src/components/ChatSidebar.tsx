
import React from 'react';
import { GeminiChat } from '../types/gemini';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { format, parseISO } from 'date-fns';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from './ui/sheet';
import { Calendar, Clock, FileText, MessageSquare, ExternalLink } from 'lucide-react';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chat: GeminiChat | null;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose, chat }) => {
  if (!chat) return null;

  const formattedDate = chat.timestamp 
    ? format(parseISO(chat.timestamp), 'PPP') // 'Apr 28, 2025'
    : "Unknown date";
    
  const formattedTime = chat.timestamp
    ? format(parseISO(chat.timestamp), 'p') // '9:45 AM'
    : "Unknown time";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="pr-8">{chat.title || "Untitled Chat"}</SheetTitle>
            <Badge className="bg-gemini text-white self-start">
              {chat.model || "Unknown model"}
            </Badge>
          </div>
          <SheetDescription className="text-sm flex flex-wrap items-center gap-2 mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formattedTime}
            </span>
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
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
        </div>

        <SheetFooter className="border-t pt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(chat.url, '_blank')}
            className="gap-1"
          >
            <ExternalLink className="w-4 h-4" />
            Open Original Conversation
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebar;
