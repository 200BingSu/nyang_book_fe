import React, { useEffect, useState } from "react";
import { updateData } from "../../api/CommonApi";
import { getAuthInfo } from "../../page/login/loginApi";
import type { COLUMN_TYPE, columnI } from "../../types/SearchInterface";
import type { DetailDataType } from "./CustomTable";

interface DetailContentsI {
  data: string;
  detailData: DetailDataType;
  detailColumnList: columnI[];
  handleClose: () => void;
}

const DetailContents: React.FC<DetailContentsI> = ({
  data,
  detailData,
  detailColumnList,
  handleClose,
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
    <div>
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
      <div>
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            updateData(data, form);
          }}
          className="px-2 py-1 bg-orange-400 text-slate-50 rounded-md hover:bg-orange-500 transition-all duration-200"
        >
          등록
        </button>
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            handleReset();
          }}
          className="px-2 py-1 bg-orange-400 text-slate-50 rounded-md hover:bg-orange-500 transition-all duration-200"
        >
          초기화
        </button>
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            handleClose();
          }}
          className="px-2 py-1 bg-orange-400 text-slate-50 rounded-md hover:bg-orange-500 transition-all duration-200"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DetailContents;
