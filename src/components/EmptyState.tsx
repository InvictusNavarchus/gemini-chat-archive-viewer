
import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-20 w-20 rounded-full gemini-gradient flex items-center justify-center text-white mb-4">
        <MessageSquare className="h-10 w-10" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No Chats Found</h2>
      <p className="text-muted-foreground max-w-sm">
        Upload your Gemini chat export file to view your conversation history
      </p>
    </div>
  );
};

export default EmptyState;
