
import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  modelFilter: string;
  onModelFilterChange: (value: string) => void;
  uniqueModels: string[];
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  modelFilter,
  onModelFilterChange,
  uniqueModels,
  sortOrder,
  onSortOrderChange
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or prompt..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="modelFilter">Filter by Model</Label>
          <Select value={modelFilter} onValueChange={onModelFilterChange}>
            <SelectTrigger id="modelFilter">
              <SelectValue placeholder="All models" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All models</SelectItem>
              {uniqueModels
                .filter(model => model && model.trim() !== "")
                .map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Sort by</Label>
          <Select value={sortOrder} onValueChange={onSortOrderChange}>
            <SelectTrigger id="sortOrder">
              <SelectValue placeholder="Newest first" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="alphabetical">Alphabetical (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
