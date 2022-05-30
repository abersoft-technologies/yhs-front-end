import { useEffect, useState } from "react";

interface ISearchBarProps {
  setSearchWord: (value: string) => void;
  searchWord: string;
  placeholder: string;
  width?: string;
}

export const SearchBar = ({
  setSearchWord,
  searchWord,
  width,
  placeholder
}: ISearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={width ? { width: width } : { width: 'auto' }}>
      <img src='/magnifying-glass.svg' alt='Magnifying glass' />
      <input
        onChange={(e) => setSearchWord(e.target.value)}
        value={searchWord}
        type='search'
        placeholder={placeholder}
        autoComplete='off'
      />
    </div>
  );
};
