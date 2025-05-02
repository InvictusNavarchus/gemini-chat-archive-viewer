
# Gemini Chat Archive Viewer

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A responsive web application for visualizing and analyzing archived Google Gemini chat history. This project works in conjunction with the [Gemini Chat History Manager](https://github.com/InvictusNavarchus/gemini-chat-history) userscript to provide enhanced data visualization and exploration capabilities.

## 🌟 Features

- **JSON Import**: Easily upload and parse Gemini chat history JSON files
- **Comprehensive Dashboard**:
  - Statistical overview of your chat interactions
  - Model usage distribution visualization
  - Chronological chat activity metrics
- **Advanced Filtering**:
  - Search by title or prompt content
  - Filter by AI model type
  - Multiple sorting options (newest, oldest, alphabetical)
- **Detailed Chat Views**: Examine individual chat metadata including:
  - Timestamp
  - Original URL
  - Selected model
  - Full prompt text
  - Attached files
  - Account information
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 📊 Data Visualization

The application provides visual analytics of your chat history:

- **Model Usage Chart**: Bar graph showing the distribution of chats across different Gemini models
- **Activity Timeline**: View your chat activity over time
- **Summary Statistics**: Quick insights into your total chats, most used models, and more

## 🔒 Privacy

Your data stays private and secure:

- **Client-side Processing**: All data handling occurs locally in your browser
- **No Server Storage**: Imported JSON files are never uploaded to a remote server
- **No Tracking**: No analytics or user tracking implemented

## 🧩 Compatible Data Structure

The application expects JSON files with the following structure per chat entry:

```json
{
  "timestamp": "2025-04-28T09:45:21",
  "url": "https://gemini.google.com/app/57b902e9742e4d13",
  "title": "Research Plan: Women's Sexual Desire",
  "model": "Deep Research",
  "prompt": "deeply investigate everything about...",
  "attachedFiles": ["filename1.pdf", "filename2.jpg"],
  "accountName": "User Name",
  "accountEmail": "user@example.com"
}
```

> **Note**: The application handles missing fields gracefully by providing default values where appropriate.

## 🛠️ Technology Stack

- **React**: Frontend UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library
- **Recharts**: Composable charting library
- **Vite**: Next generation frontend tooling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gemini-chat-archive-viewer.git
   cd gemini-chat-archive-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🌐 Deployment

The project can be built for production using:

```bash
npm run build
# or
yarn build
```

The output in the `dist` directory can be deployed to any static hosting service.

## 🤝 Related Projects

This application is designed to work with data exported from the [Gemini Chat History Manager](https://github.com/InvictusNavarchus/gemini-chat-history) userscript, which automatically tracks and exports Google Gemini chat sessions.

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.
