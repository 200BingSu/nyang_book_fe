export enum COLUMN_TYPE {
  TEXTAREA = "TEXTAREA",
  TEXT = "TEXT",
}

export interface optionI {
  option_name: string;
  option_value: string;
  option_sort: string;
}

export interface columnI {
  column_name: string;
  column_value: string;
  column_width?: number;
  column_type?: COLUMN_TYPE;
  column_align?: string;
}
