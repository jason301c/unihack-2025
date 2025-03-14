'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="mb-4">
      <p className="mb-2">Search for brands</p>
      <Input 
        type="text" 
        placeholder="E.g. Zara" 
        value={searchQuery}
        onChange={handleChange}
        className="bg-gray-800 border-none text-white placeholder:text-gray-500"
      />
    </div>
  );
}