import React, { useEffect, useState } from "react";
import { updateData } from "../../api/CommonApi";
import { getAuthInfo } from "../../page/login/loginApi";
import type { COLUMN_TYPE, columnI } from "../../types/SearchInterface";
import type { DetailDataType } from "./CustomTable";
import { Button } from "antd";

interface DetailContentsI {
  data: string;
  detailData: DetailDataType;
  detailColumnList: columnI[];
  handleClose: () => void;
  fetchDataList: (key: number | undefined | null) => void;
}

const DetailContents: React.FC<DetailContentsI> = ({
  data,
  detailData,
  detailColumnList,
  handleClose,
  fetchDataList,
}) => {
  const userSession = async () => {
    const result = await getAuthInfo();
    return result;
  };

  const [form, setForm] = useState<DetailDataType>({});

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
    }
  };

  const handleSubmit = async () => {
    console.log("upDAta");
    const upData = await updateData(data, form);

    if (upData) {
      await fetchDataList(null);
    }
  };

  const handleReset = () => {
    const resetForm = detailColumnList.reduce((acc, column) => {
      switch (column.column_type) {
        case "TEXT":
        case "TEXTAREA":
          acc[column.column_value as keyof DetailDataType] = "" as any;
          break;
        // case "NUMBER":
        //   acc[column.column_value as keyof DetailDataType] = 0;
        //   break;
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
    setForm(detailData);
    const fetchSession = async () => {
      const { session, user } = await userSession();
      //   console.log("session:", session);
      //   console.log("user:", user);
    };

    fetchSession();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* form */}
      <div>
        {detailColumnList.map((item, index) => {
          return (
            <label key={index}>
              <p>{item.column_name}</p>
              {renderInput(item, item.column_type as COLUMN_TYPE)}
            </label>
          );
        })}
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Button
          type="primary"
          onClick={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          등록
        </Button>
        <Button
          type="default"
          onClick={() => {
            handleClose();
          }}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default DetailContents;
