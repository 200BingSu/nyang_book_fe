import type { columnI, optionI } from "./SearchInterface";

export interface PropsI {
  children?: React.ReactElement<any>;
}

export interface CustomTableI {
  data?: string;
  nowOption?: optionI;
  columnList?: columnI[];
}

export interface ModalI extends PropsI {
  handleClose: () => void;
  title?: string;
}
