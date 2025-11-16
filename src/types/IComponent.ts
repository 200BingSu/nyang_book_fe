import type { DiaryVO } from "./DiaryVO";
import type { ProductVO } from "./ProductVO";
import type { columnI, optionI } from "./SearchInterface";

export interface PropsI {
  children?: React.ReactElement<any>;
}

export interface CustomTableI {
  data?: string;
  nowOption?: optionI;
  columnList?: columnI[];
  detailColumnList?: columnI[];
  dataList: object[];
  handleClickRow?: (row: any) => void;
}

export interface ModalI extends PropsI {
  handleClose: () => void;
  title?: string;
  buttonComponent: React.ReactElement<any>;
}

export type DetailDataType = Partial<DiaryVO & ProductVO>;
