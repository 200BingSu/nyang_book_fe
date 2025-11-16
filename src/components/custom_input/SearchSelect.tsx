import { Button } from "antd";
import React, { useEffect, useState } from "react";
import type { PropsI } from "../../types/IComponent";
import type { optionI } from "../../types/SearchInterface";

interface SearchSelectI extends PropsI {
  title: string;
  placeholder: string;
  fetchData: (text: string) => optionI[];
  setForm: React.Dispatch<React.SetStateAction<object>>;
}

const SearchSelect: React.FC<SearchSelectI> = ({
  title = "",
  placeholder = "선택",
  fetchData,
  setForm,
  children,
}) => {
  const [text, setText] = useState("");
  const [searchList, setSearchList] = useState<optionI[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const isKoreanSentence = /^[가-힣\s]+$/.test(text);
    if (text.trim() !== "") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }

    if (isKoreanSentence && text.trim() !== "") {
      const objDataList = fetchData(text);
      setSearchList(objDataList);
    }
  }, [text]);
  return (
    <div className="relative">
      {/* 검색 */}
      <div>
        <input
          type="text"
          name={`searchSelect_${title}`}
          id={`searchSelect_${title}`}
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          placeholder={placeholder}
        />
      </div>
      {/* 선택지 */}
      <div>
        {searchList.length === 0 && isSearch && (
          <Button type="primary">등록</Button>
        )}
        {searchList.length > 0 && (
          <ul>
            {searchList.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setText(item.option_name);
                    setForm(prev => ({
                      ...prev,
                      [item.option_value]: item.option_key,
                    }));
                  }}
                >
                  {item.option_name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {/* 등록창 */}
      {isOpenModal && (
        <div className="absolute top-1/2 left-full bg-white rounded-md">
          등록창입니다
          {children}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
