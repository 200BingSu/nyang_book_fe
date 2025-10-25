import { Select } from "antd";
import React, { useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // navigate
  const navigate = useNavigate();
  // useState
  const [text, setText] = useState("");

  const handleSearch = (text: string) => {
    navigate(`/search?query=${text}`);
  };
  return (
    <div>
      {/* 검색 */}
      <div className="searchBar">
        <input type="text" name="search" id="search" />
        <button type="button">
          <i>
            <PiMagnifyingGlass />
          </i>
        </button>
      </div>
      {/* 빠른 검색 결과 */}
      <div className={`${text.trim() ? "" : ""}`}></div>
    </div>
  );
};

export default SearchBar;
