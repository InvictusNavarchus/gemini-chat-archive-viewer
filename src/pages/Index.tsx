
import React, { useState, useMemo } from 'react';
import FileUpload from '../components/FileUpload';
import ChatCard from '../components/ChatCard';
import ChatDetail from '../components/ChatDetail';
import SearchFilters from '../components/SearchFilters';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import StatsOverview from '../components/StatsOverview';
import { GeminiChatHistory, GeminiChat } from '../types/gemini';
import { Toaster } from 'sonner';

const Index = () => {
  const [chatHistory, setChatHistory] = useState<GeminiChatHistory>([]);
  const [selectedChat, setSelectedChat] = useState<GeminiChat | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const handleFileLoaded = (data: GeminiChatHistory) => {
    // Ensure all required fields exist in each chat object
    const sanitizedData = data.map(chat => ({
      timestamp: chat.timestamp || "",
      url: chat.url || "",
      title: chat.title || "Untitled Chat",
      model: chat.model || "Unknown",
      prompt: chat.prompt || "",
      attachedFiles: chat.attachedFiles || [],
      accountName: chat.accountName,
      accountEmail: chat.accountEmail
    }));
    setChatHistory(sanitizedData);
  };

  // Get unique models for the filter dropdown
  const uniqueModels = useMemo(() => {
    const models = Array.from(new Set(
      chatHistory
        .map(chat => chat.model || 'Unknown')
        .filter(model => model && model.trim() !== "") // Filter out empty strings
    ));
    return models;
  }, [chatHistory]);

  // Filter and sort chats
  const filteredChats = useMemo(() => {
    return chatHistory
      .filter(chat => {
        // Apply search filter
        const searchMatch = !searchTerm || 
          (chat.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          chat.prompt?.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Apply model filter
        const modelMatch = !modelFilter || chat.model === modelFilter;
        
        return searchMatch && modelMatch;
      })
      .sort((a, b) => {
        // Apply sorting
        if (sortOrder === 'newest') {
          return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime();
        } else if (sortOrder === 'oldest') {
          return new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime();
        } else if (sortOrder === 'alphabetical') {
          return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
      });
  }, [chatHistory, searchTerm, modelFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pb-16">
        {chatHistory.length === 0 ? (
          <div className="max-w-md mx-auto">
            <FileUpload onFileLoaded={handleFileLoaded} />
          </div>
        ) : selectedChat ? (
          <ChatDetail chat={selectedChat} onBack={() => setSelectedChat(null)} />
        ) : (
          <>
            <StatsOverview chatHistory={chatHistory} />
            
            <SearchFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              modelFilter={modelFilter}
              onModelFilterChange={setModelFilter}
              uniqueModels={uniqueModels}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />
            
            {filteredChats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredChats.map((chat, index) => (
                  <ChatCard 
                    key={index} 
                    chat={chat} 
                    onClick={() => setSelectedChat(chat)} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
