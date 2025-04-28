
export interface GeminiChat {
  timestamp: string;
  url: string;
  title: string;
  model: string;
  prompt: string;
  attachedFiles: string[];
  accountName?: string; // Optional as specified
  accountEmail?: string; // Optional as specified
}

export type GeminiChatHistory = GeminiChat[];
