import { DatePicker, Flex, Rate, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { PiPawPrintFill } from "react-icons/pi";
import { getAuthInfo } from "../../page/login/loginApi";
import type { DetailDataType } from "../../types/IComponent";
import type { COLUMN_TYPE, columnI } from "../../types/SearchInterface";
import { selectProduct } from "../../api/productApi";
import { toGroupedOptions, type GroupedItem } from "../../util/DataHelper";

interface DetailContentsI {
  form: DetailDataType;
  setForm: React.Dispatch<React.SetStateAction<DetailDataType>>;
  detailColumnList: columnI[];
}

const DetailContents: React.FC<DetailContentsI> = ({
  form,
  setForm,
  detailColumnList,
}) => {
  const userSession = async () => {
    const result = await getAuthInfo();
    return result;
  };

  // useState
  const [selectColumnValue, setSelectColumnValue] = useState<string | null>(
    null,
  );
  const [selectDataList, setSelectDataList] = useState<GroupedItem[]>([]);

  const fetchData = async (item: any) => {
    const columnValue = item.column_value;
    switch (columnValue) {
      case "product_key":
        const apiResult = await selectProduct();
        if (apiResult) {
          const dataList = apiResult.dataList;
          const formattedDataList = toGroupedOptions(dataList);
          setSelectDataList(formattedDataList);
        }

        break;
      default:
        null;
        break;
    }
  };

  const renderInput = (item: columnI, column_type: COLUMN_TYPE) => {
    switch (column_type) {
      case "TEXTAREA":
        return (
          <textarea
            className="w-full h-32 border border-stone-500 rounded-md p-3 resize-none overflow-y-auto"
            value={form[item.column_value as keyof DetailDataType] ?? ""}
            onChange={e => {
              setForm(prev => ({
                ...prev,
                [item.column_value]: e.target.value,
              }));
            }}
          />
        );
      case "TEXT":
        return (
          <input
            className="w-full border border-stone-500 rounded-md p-3"
            value={form[item.column_value as keyof DetailDataType] ?? ""}
            onChange={e => {
              setForm(prev => ({
                ...prev,
                [item.column_value]: e.target.value,
              }));
            }}
          />
        );
      case "SEARCH":
        const handleSelect = (value: any) => {
          setForm(prev => ({
            ...prev,
            [item.column_value]: value,
          }));
        };
        useEffect(() => {
          setSelectColumnValue(item.column_value);
        }, [item.column_value]);
        return (
          <Select
            className="w-full"
            onChange={handleSelect}
            options={selectDataList}
          />
        );
      case "LIKEPOINT":
        const customIcons: Record<number, React.ReactNode> = {
          1: <PiPawPrintFill />,
          2: <PiPawPrintFill />,
          3: <PiPawPrintFill />,
          4: <PiPawPrintFill />,
          5: <PiPawPrintFill />,
        };
        const handleChange = (value: number) => {
          setForm(prev => ({
            ...prev,
            [item.column_value]: value,
          }));
        };
        return (
          <Flex gap="middle" vertical>
            <Rate
              defaultValue={3}
              value={
                form[item.column_value as keyof DetailDataType]
                  ? Number(form[item.column_value as keyof DetailDataType])
                  : 0
              }
              character={({ index = 0 }) => customIcons[index + 1]}
              style={{ color: "#FF6900" }}
              onChange={handleChange}
            />
          </Flex>
        );
      case "DATETIME":
        const dateFormat = "YYYY/MM/DD";
        const onChange = (value: any) => {
          setForm(prev => ({ ...prev, [item.column_value]: value }));
        };
        return (
          <DatePicker
            defaultValue={dayjs("2015/01/01", dateFormat)}
            format={dateFormat}
            onChange={onChange}
          />
        );
    }
  };

  const handleReset = () => {
    const resetForm = detailColumnList.reduce((acc, column) => {
      switch (column.column_type) {
        case "TEXT":
        case "TEXTAREA":
          acc[column.column_value as keyof DetailDataType] = "" as any;
          break;
        case "NUMBER":
          acc[column.column_value as keyof DetailDataType] = 0 as any;
          break;
        // case "CHECKBOX":
        //   acc[column.column_value as keyof DetailDataType] = false;
        //   break;
        default:
          acc[column.column_value as keyof DetailDataType] = null as any;
      }
      return acc;
    }, {} as DetailDataType);

    setForm(resetForm);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const { session, user } = await userSession();
      //   console.log("session:", session);
      //   console.log("user:", user);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectColumnValue) return;

      if (selectColumnValue === "product_key") {
        const apiResult = await selectProduct();
        if (apiResult) {
          const formatted = toGroupedOptions(apiResult.dataList);
          setSelectDataList(formatted);
        }
      }
    };

    fetchData();
  }, [selectColumnValue]);

  return (
    <div className="flex flex-col gap-2">
      {/* form */}
      <div>
        {detailColumnList?.map((item, index) => {
          return (
            <label key={index}>
              <p>{item.column_name}</p>
              {renderInput(item, item.column_type as COLUMN_TYPE)}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default DetailContents;
