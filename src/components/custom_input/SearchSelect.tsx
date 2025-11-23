import { Button, Empty } from "antd";
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

    if (isKoreanSentence && text.trim() !== "") {
      const objDataList = fetchData(text);
      setSearchList(objDataList);
    }
  }, [text]);

  useEffect(() => {
    console.log("searchList", searchList);
  }, [searchList]);
  return (
    <div>
      {/* 검색 */}
      <div className="relative">
        <input
          type="text"
          name={`searchSelect_${title}`}
          id={`searchSelect_${title}`}
          value={text}
          onChange={e => {
            setText(e.target.value);
            if (text.trim() === "") {
              setIsSearch(false);
            } else {
              if (!isSearch) {
                setIsSearch(true);
              }
            }
          }}
          placeholder={placeholder}
          className="px-2"
        />
        {/* 선택지 */}
        {isSearch && (
          <div className="absolute top-full left-0 z-10 mt-1 bg-white w-full shadow-md border border-stone-200 rounded-md p-1">
            {searchList.length === 0 && isSearch && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                styles={{ image: { height: 60 } }}
                description={"검색된 제품이 없습니다."}
              >
                <Button type="primary">새 제품 등록하기</Button>
              </Empty>
            )}
            {searchList.length > 0 && isSearch && (
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
                        setIsSearch(false);
                      }}
                    >
                      <p className="text-sm px-1 hover:bg-stone-100 cursor-pointer">
                        {item.option_name}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
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
