
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-4 mb-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full gemini-gradient flex items-center justify-center text-white font-bold">
            G
          </div>
          <div>
            <h1 className="font-semibold text-xl">Gemini Chat Archive</h1>
            <p className="text-xs text-muted-foreground">View and search your Gemini conversation history</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
