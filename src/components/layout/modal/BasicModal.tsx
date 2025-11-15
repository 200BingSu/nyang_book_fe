import React from "react";
import type { ModalI } from "../../../types/IComponent";
import { CgClose } from "react-icons/cg";

const BasicModal: React.FC<ModalI> = ({
  handleClose = () => {},
  title = "상세보기",
  children,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50">
      {/* 배경 흐림 */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={e => {
          e.stopPropagation();
          handleClose();
        }}
      ></div>

      {/* 모달 내용 */}
      <div className="relative z-10 bg-white p-4 rounded-md max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between">
          <h4 className="text-stone-400">{title}</h4>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <CgClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BasicModal;
