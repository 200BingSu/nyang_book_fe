import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getSearchWithQuery } from "../../../api/searchApi";
import type { ServiceVO } from "../../../types/ServiceVO";

const SearchBar = () => {
  // navigate
  const navigate = useNavigate();
  // useState
  const [text, setText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [serviceList, setServiceList] = useState<ServiceVO[]>([]);

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

  const fetchSearch = async () => {
    const data = await getSearchWithQuery(text);
    const dataMap = data.dataMap;
    const serviceVOList = dataMap.serviceVOList ?? [];
    setServiceList(serviceVOList);
  };

  const makingRoute = (service: ServiceVO) => {
    const parentServiceKey = service.parent_service_key;
    const childServiceKey = service.child_service_key;
    const serviceKey = service.service_key;
    const nowList = [
      {
        key: parentServiceKey,
        name: service.parent_service_en,
      },
      { key: serviceKey, name: service.service_en },
      {
        key: childServiceKey,
        name: service.child_service_en,
      },
    ];

    const url = nowList.reduce((acc, curr, index, arr) => {
      // 이전 요소와 key가 같으면 건너뛰기
      if (index > 0 && curr.key === arr[index - 1].key) {
        return acc;
      }

      // acc가 "main"이면 건너뛰기
      if (curr.name === "main") {
        return acc;
      }

      // 첫 번째면 그냥 name, 아니면 '/' 붙여서 연결
      return acc ? `${acc}/${curr.name}` : curr.name;
    }, "");

    return url;
  };

  const handleClickSearchList = (service: ServiceVO) => {
    if (service.parent_service_en === "main") {
      console.log("스크롤뷰");
    } else {
      navigate(makingRoute(service));
    }
  };

  useEffect(() => {
    const isKoreanSentence = /^[가-힣\s]+$/.test(text);
    if (text.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    if (isKoreanSentence && text.trim() !== "") {
      fetchSearch();
    }
  }, [text]);

  return (
    <div className="relative h-[50px]">
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
                {serviceList.length > 0 ? (
                  serviceList.map(service => {
                    const namingList = (service: ServiceVO) => {
                      const parentServiceKey = service.parent_service_key;
                      const childServiceKey = service.child_service_key;
                      const serviceKey = service.service_key;
                      const nowList = [
                        {
                          key: parentServiceKey,
                          name: service.parent_service_name,
                        },
                        { key: serviceKey, name: service.service_name },
                        {
                          key: childServiceKey,
                          name: service.child_service_name,
                        },
                      ];
                      const nowName = nowList.reduce(
                        (acc, curr, index, arr) => {
                          // 이전 요소의 key와 같으면 건너뛰기
                          if (index > 0 && curr.key === arr[index - 1].key) {
                            return acc;
                          }
                          // acc가 빈 문자열이면 그냥 name 추가, 아니면 ' > ' 붙이고 name 추가
                          return acc ? `${acc} > ${curr.name}` : curr.name;
                        },
                        "",
                      );
                      return nowName;
                    };
                    return (
                      <li
                        className="px-4 py-1 hover:bg-slate-100 cursor-pointer"
                        key={`${service.service_key}_${
                          service.child_service_key ?? ""
                        }`}
                        onClick={() => handleClickSearchList(service)}
                      >
                        {namingList(service)}
                      </li>
                    );
                  })
                ) : (
                  <li className="px-4 py-1 hover:bg-slate-100">
                    검색 결과가 없습니다.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
