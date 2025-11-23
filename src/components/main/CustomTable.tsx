import React from "react";
import type { CustomTableI } from "../../types/IComponent";

const CustomTable: React.FC<CustomTableI> = ({
  columnList,
  dataList,
  handleClickRow,
}) => {
  return (
    <div className="p-1 h-full">
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
        className="overflow-y-auto "
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        <table className="w-full table-fixed">
          <tbody>
            {dataList.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-orange-100 cursor-pointer"
                  onClick={() => {
                    if (
                      handleClickRow &&
                      typeof handleClickRow === "function"
                    ) {
                      console.log("???");

                      handleClickRow(item);
                    }
                  }}
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
                        <p
                          className={`truncate p-2 text-stone-700 font-medium text-sm 
                            ${
                              column.column_align
                                ? `text-${column.column_align}`
                                : "text-center "
                            }`}
                        >
                          {(item as Record<string, any>)[column.column_value]}
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
    </div>
  );
};

export default CustomTable;
