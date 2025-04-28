
import React from 'react';
import { Card, CardContent } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { GeminiChatHistory } from '../types/gemini';

interface ModelUsageChartProps {
  chatHistory: GeminiChatHistory;
}

const ModelUsageChart: React.FC<ModelUsageChartProps> = ({ chatHistory }) => {
  const modelCounts = chatHistory.reduce((acc, chat) => {
    const model = chat.model || 'Unknown';
    acc[model] = (acc[model] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(modelCounts)
    .filter(([model]) => model && model.trim() !== '')
    .map(([model, count]) => ({
      model,
      count,
    }));

  return (
    <Card className="col-span-full border border-border bg-card shadow-sm">
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">Model Usage Distribution</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="model" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                }} 
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelUsageChart;
