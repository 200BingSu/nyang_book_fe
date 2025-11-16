import React, { useEffect, useState } from "react";
import { getAuthInfo } from "../../page/login/loginApi";
import type { COLUMN_TYPE, columnI } from "../../types/SearchInterface";
import type { DetailDataType } from "../../types/IComponent";
import { Cascader } from "antd";

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

  const renderInput = (item: columnI, column_type: COLUMN_TYPE) => {
    const onChange = (option: any) => {
      console.log("option", option);
    };
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
        return (
          <Cascader
            options={item.column_optionList}
            onChange={onChange}
            placeholder="제품"
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
    </div>
  );
};

export default DetailContents;
