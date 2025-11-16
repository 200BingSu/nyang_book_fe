import { Button, Popconfirm } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { PiCaretDownBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { deleteData, insertData, updateData } from "../../api/CommonApi";
import { getSearchDataList } from "../../api/searchApi";
import { setError, setSuccess } from "../../features/messageSlice";
import type { PropsI } from "../../types/IComponent";
import type { columnI, optionI } from "../../types/SearchInterface";
import BasicModal from "../layout/modal/BasicModal";
import type { DetailDataType } from "./CustomTable";
import CustomTable from "./CustomTable";
import DetailContents from "./DetailContents";
import { useNavigate } from "react-router-dom";

interface DashBoardItemProps extends PropsI {
  title: string;
  url: string;
  subTitle?: string;
  data: string;
  columnList?: columnI[];
  optionList?: optionI[];
  detailColumnList?: columnI[];

  addBtn: boolean;
  isSelectBox: boolean;
  openKeyRef: React.RefObject<string>;
  type: string;
}

interface openModalI {
  type: "insert" | "detail";
  isOpen: boolean;
}

const DashBoardItem: React.FC<DashBoardItemProps> = ({
  title,
  url,
  subTitle,
  data,
  columnList = [{ column_name: "", column_value: "" }],
  addBtn = true,
  isSelectBox = true,
  openKeyRef,
  optionList = [
    {
      option_name: "option_name",
      option_value: "option_value",
      option_sort: "ASC",
    },
  ],
  detailColumnList,
  children,
  type,
}) => {
  // navigate
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  // useRef
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  // useState
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false);
  const [nowOption, setNowOption] = useState<optionI>(optionList[0]);

  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  const [isOpenDataModal, setIsOpenDataModal] = useState<openModalI>({
    type: "insert",
    isOpen: false,
  });
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [form, setForm] = useState<DetailDataType>({});

  // children
  const renderTypeComponent = (type: string) => {
    switch (type) {
      case "custom_table":
        return (
          <CustomTable
            data={data}
            dataList={dataList}
            nowOption={nowOption}
            columnList={columnList}
            detailColumnList={detailColumnList}
            handleClickRow={handleClickRow}
          />
        );
    }
  };

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
      setIsOpenDataModal({ type: "detail", isOpen: true });
      setForm(dataArr.dataMap.dataList[0]);
    }
  };

  const handleSubmit = async (type: string, form: any) => {
    if (type === "insert") {
      const resData = await insertData(data, form);
      if (resData) {
        await fetchDataList(null);
        dispatch(setSuccess("등록되었습니다."));
        setIsOpenDataModal({ type: "insert", isOpen: false });
        setForm({});
      } else {
        dispatch(setError("실패했습니다."));
      }
    }
    if (type === "update") {
      const upData = await updateData(data, form);
      if (upData) {
        await fetchDataList(null);
        dispatch(setSuccess("수정되었습니다."));
        setIsOpenDataModal({ type: "insert", isOpen: false });
        setForm({});
      } else {
        dispatch(setError("실패했습니다."));
      }
    }
  };

  const handleOk = async () => {
    setIsDeleteLoading(true);
    const resData = await deleteData(data, form);
    if (resData) {
      await fetchDataList(null);
      dispatch(setSuccess("삭제되었습니다."));
      setIsOpenDataModal({ type: "insert", isOpen: false });
      setIsOpenDelete(false);
      setIsDeleteLoading(false);
      setForm({});
    } else {
      dispatch(setError("실패했습니다."));
      setIsOpenDelete(false);
      setIsDeleteLoading(false);
    }
  };
  const handleCancelDelete = () => {
    setIsOpenDelete(false);
  };

  const handleOpenSelectBox = () => {
    openKeyRef.current = `${title}`;
    setIsOpenSelectBox(!isOpenSelectBox);
  };

  const handleClickOption = (item: optionI) => {
    setNowOption(item);
    setIsOpenSelectBox(false);
  };

  const handleClickRow = (item: any) => {
    setIsOpenDataModal({ type: "detail", isOpen: true });
    setSelectedItem(item);
  };

  useEffect(() => {
    const nowKey = openKeyRef.current;
    const componentKey = `${title}`;
    if (nowKey === "") {
      return;
    }
    if (nowKey !== componentKey) {
      setIsOpenSelectBox(false);
    }
  }, [openKeyRef]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (selectBoxRef.current && !selectBoxRef.current.contains(target)) {
        setIsOpenSelectBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  useEffect(() => {}, [form, isOpenDataModal.isOpen]);

  return (
    <div className="dashboardItem flex-1 h-full flex flex-col gap-2">
      {/* header */}
      <div className="flex justify-between">
        <div className="flex items-end gap-2">
          <div
            className="flex items-end gap-1 cursor-pointer"
            onClick={() => {
              navigate(url);
            }}
          >
            <h3 className="text-[18px] font-semibold text-stone-700">
              {title}
            </h3>
            {subTitle && (
              <p className="text-[12px] font-light text-stone-400">
                {subTitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isSelectBox && (
            <div className="relative " ref={selectBoxRef}>
              <button
                type="button"
                onClick={handleOpenSelectBox}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-stone-400 transition-all duration-200"
              >
                <p className="text-sm ">{nowOption.option_name}</p>
                <div
                  className={`transition-all duration-200 ${
                    isOpenSelectBox ? "-rotate-180" : ""
                  }`}
                >
                  <PiCaretDownBold />
                </div>
              </button>

              <div
                className={`absolute top-full left-0 transition-all duration-100 min-w-full p-1
                    ${
                      isOpenSelectBox
                        ? "mt-1 bg-white shadow-lg border border-stone-200 rounded-md"
                        : "h-0 overflow-hidden "
                    }`}
              >
                <ul>
                  {optionList.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          handleClickOption(item);
                        }}
                        className="px-2 py-1 no-drag cursor-pointer hover:bg-stone-200 text-sm text-nowrap"
                      >
                        {item.option_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          {addBtn && (
            <div className="">
              <button
                type="button"
                title="등록"
                className="bg-orange-500 size-5 rounded-full flex items-center justify-center transition-all duration-200  hover:bg-orange-600 "
                onClick={() =>
                  setIsOpenDataModal({ type: "insert", isOpen: true })
                }
              >
                <BiPlus className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* body */}
      <div className="border border-stone-200 bg-white rounded-lg h-full">
        {renderTypeComponent(type)}
      </div>

      {/* detailModal */}
      {isOpenDataModal.isOpen && (
        <BasicModal
          title={
            isOpenDataModal.type === "insert"
              ? `${title} 등록`
              : `${title} 상세보기`
          }
          handleClose={() => {
            setIsOpenDataModal({ type: "insert", isOpen: false });
            setSelectedItem({});
            setForm({});
            handleCancelDelete();
          }}
          buttonComponent={
            <>
              <Button
                type="primary"
                onClick={() => handleSubmit("update", form)}
              >
                등록
              </Button>
              {isOpenDataModal.type === "detail" && (
                <Popconfirm
                  title={title}
                  description="다음 게시물을 삭제하시겠습니까?"
                  open={isOpenDelete}
                  onConfirm={handleOk}
                  okButtonProps={{ loading: isDeleteLoading }}
                  onCancel={handleCancelDelete}
                  okText="예"
                  cancelText="아니오"
                >
                  <Button danger onClick={() => setIsOpenDelete(true)}>
                    삭제
                  </Button>
                </Popconfirm>
              )}
            </>
          }
          children={
            <DetailContents
              form={form}
              setForm={setForm}
              detailColumnList={detailColumnList as columnI[]}
            />
          }
        />
      )}
    </div>
  );
};

export default DashBoardItem;
