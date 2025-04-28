
export interface GeminiChat {
  timestamp?: string;
  url?: string;
  title?: string;
  model?: string;
  prompt?: string;
  attachedFiles?: string[];
  accountName?: string;
  accountEmail?: string;
}

export type GeminiChatHistory = GeminiChat[];
