
import React, { useState, useMemo } from 'react';
import FileUpload from '../components/FileUpload';
import ChatCard from '../components/ChatCard';
import ChatSidebar from '../components/ChatSidebar';
import SearchFilters from '../components/SearchFilters';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import StatsOverview from '../components/StatsOverview';
import { GeminiChatHistory, GeminiChat } from '../types/gemini';

const Index = () => {
  const [chatHistory, setChatHistory] = useState<GeminiChatHistory>([]);
  const [selectedChat, setSelectedChat] = useState<GeminiChat | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modelFilter, setModelFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFileLoaded = (data: GeminiChatHistory) => {
    setChatHistory(data);
    console.log("Chat history loaded:", data.length, "items");
  };

  const handleChatSelect = (chat: GeminiChat) => {
    setSelectedChat(chat);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
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
          ((chat.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
          (chat.prompt?.toLowerCase() || '').includes(searchTerm.toLowerCase()));
        
        // Apply model filter
        const modelMatch = modelFilter === 'all' || chat.model === modelFilter;
        
        return searchMatch && modelMatch;
      })
      .sort((a, b) => {
        // Apply sorting with null/undefined checks
        if (sortOrder === 'newest') {
          return new Date(b.timestamp || '1970-01-01').getTime() - new Date(a.timestamp || '1970-01-01').getTime();
        } else if (sortOrder === 'oldest') {
          return new Date(a.timestamp || '1970-01-01').getTime() - new Date(b.timestamp || '1970-01-01').getTime();
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
                    onClick={() => handleChatSelect(chat)} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </main>

      {/* Chat Details Sidebar */}
      <ChatSidebar 
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        chat={selectedChat}
      />
    </div>
  );
};

export default Index;
