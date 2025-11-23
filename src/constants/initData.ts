import { COLUMN_TYPE } from "../types/SearchInterface";

export const initDiaryColumnList = [
  { column_name: "#", column_value: "index", column_width: 10 },
  {
    column_name: "내용",
    column_value: "diary_content",
    column_width: 70,
    column_align: "start",
    COLUMN_TYPE: COLUMN_TYPE.TEXTAREA,
  },
  {
    column_name: "작성일",
    column_value: "fm_created_at",
    column_width: 20,
  },
];
