import type { DefaultOptionType } from "antd/es/cascader";

export enum COLUMN_TYPE {
  TEXTAREA = "TEXTAREA",
  TEXT = "TEXT",
  SEARCH = "SEARCH",
  LIKEPOINT = "LIKEPOINT",
  NUMBER = "NUMBER",
  DATETIME = "DATETIME",
}

export interface optionI {
  option_name: string;
  option_value: string;
  option_key?: number;
  option_sort?: string;
  option_function?: () => optionI[];
}

export interface columnI {
  column_name: string;
  column_value: string;
  column_width?: number;
  column_type?: COLUMN_TYPE;
  column_align?: string;
  column_sort?: string;
}
