import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getSearchWithQuery } from "../../../api/searchApi";

const SearchBar = () => {
  // navigate
  const navigate = useNavigate();
  // useState
  const [text, setText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    navigate(`/search?query=${text}`);
  };

  const searchBarStyle = (isSearching: boolean): string => {
    const baseStyle = ` w-full
      px-4 py-3 
      
      flex items-center justify-between 
      text-base bg-white 
      transition-all duration-100 
      `;
    if (isSearching) {
      return `${baseStyle} rounded-t-lg border-x-stone-200 border-b-stone-100 border`;
    } else {
      return `${baseStyle} rounded-lg border-orange-400 border`;
    }
  };

  useEffect(() => {
    const isKoreanSentence = /^[가-힣\s]+$/.test(text);
    if (text.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    if (isKoreanSentence) {
      getSearchWithQuery(text);
    }
  }, [text]);

  return (
    <div className="relative bg-red-200 ">
      {/* 검색 */}
      <div
        className={`absolute w-[505px] top-0 left-0 overflow-visible rounded-lg ${
          isSearching ? "shadow-md" : ""
        }`}
      >
        <div className={`${searchBarStyle(isSearching)}`}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="검색어를 입력해주세요."
            className="outline-none bg-transparent placeholder-stone-300"
            onChange={e => {
              setText(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                getSearchWithQuery(text);
              }
            }}
          />
          <button
            type="button"
            title="검색"
            onClick={() => {
              getSearchWithQuery(text);
            }}
          >
            <i>
              <PiMagnifyingGlass className="text-stone-400 size-5" />
            </i>
          </button>
        </div>
        {/* 빠른 검색 결과 */}
        {isSearching && (
          <div
            className={` 
              w-full box-border
              border-x border-bottom border-stone-200
              rounded-b-lg
              
          bg-white`}
          >
            {/* 메뉴 */}
            <div className="border-b border-stone-100 py-2">
              <p className="px-4 py-1 text-stone-400 font-light text-sm">
                메뉴 바로가기
              </p>
              <ul>
                <li className="px-4 py-1 hover:bg-slate-100">메인 &gt; 서브</li>
              </ul>
            </div>
            {/* 콘텐츠 내 검색 */}
            <div className="py-2">
              <p className="px-4 py-1 text-stone-400 font-light text-sm">
                콘텐츠 검색
              </p>
              <ul>
                <li className="px-4 py-1 hover:bg-slate-100">검색/메뉴</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
