import React, { useEffect, useState } from "react";
import { getSearchDataList } from "../../api/searchApi";
import type { DiaryVO } from "../../types/DiaryVO";
import type { CustomTableI } from "../../types/IComponent";
import type { columnI } from "../../types/SearchInterface";
import BasicModal from "../layout/modal/BasicModal";
import DetailContents from "./DetailContents";

export type DetailDataType = Partial<DiaryVO>;

const CustomTable: React.FC<CustomTableI> = ({
  data,
  nowOption,
  columnList,
  detailColumnList,
}) => {
  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState<DetailDataType>({});

  const fetchDataList = async (key: number | undefined | null) => {
    const dataArr = await getSearchDataList(
      data,
      nowOption?.option_value,
      nowOption?.option_sort,
      key,
    );
    if (!key) {
      setDataList(dataArr.dataMap.dataList);
    } else {
      setIsOpenDetail(true);
      setDetailData(dataArr.dataMap.dataList[0]);
    }
  };

  const handleClickRow = (item: any) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    fetchDataList(null);
  }, [data, nowOption]);

  useEffect(() => {
    if (Object.keys(selectedItem).length === 0) {
      return;
    }
    type Key = `${string}_key`;

    const key = `${data}_key` as Key;
    const value = (selectedItem as Record<Key, any>)[key];

    if (!value) return;

    fetchDataList(value as number);
  }, [selectedItem]);
  useEffect(() => {
    console.log("selectedItem", selectedItem);
    console.log("isOpenDetail", isOpenDetail);
  }, [detailData, isOpenDetail]);
  return (
    <div className="p-1">
      <div className=" pr-4">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              {columnList?.map((item, index) => {
                return (
                  <th
                    key={index}
                    style={{
                      width: item.column_width
                        ? `${item.column_width}%`
                        : undefined,
                    }}
                    className="border-b border-stone-300"
                  >
                    <p className="text-center p-2 text-stone-500 font-medium text-xs">
                      {item.column_name}
                    </p>
                  </th>
                );
              })}
            </tr>
          </thead>
        </table>
      </div>
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        <table className="w-full table-fixed">
          <tbody>
            {dataList.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-orange-100 cursor-pointer"
                  onClick={() => handleClickRow(item)}
                >
                  {columnList?.map((column, colIndex) => {
                    return column.column_value === "index" ? (
                      <td
                        key={colIndex}
                        style={{
                          width: column.column_width
                            ? `${column.column_width}%`
                            : undefined,
                        }}
                      >
                        <p className="text-center  p-2 text-stone-500 font-medium text-xs">
                          {index + 1}
                        </p>
                      </td>
                    ) : (
                      <td
                        key={colIndex}
                        style={{
                          width: column.column_width
                            ? `${column.column_width}%`
                            : undefined,
                        }}
                      >
                        <p className="text-center truncate p-2 text-stone-700 font-medium text-sm">
                          {item[column.column_value]}
                        </p>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isOpenDetail && (
        <BasicModal
          handleClose={() => {
            setIsOpenDetail(false);
            setSelectedItem({});
          }}
          children={
            <DetailContents
              handleClose={() => {
                setIsOpenDetail(false);
                setSelectedItem({});
              }}
              data={data as string}
              detailData={detailData}
              detailColumnList={detailColumnList as columnI[]}
            />
          }
        />
      )}
    </div>
  );
};

export default CustomTable;
