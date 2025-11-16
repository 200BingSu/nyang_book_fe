import { createSlice } from "@reduxjs/toolkit";
import type { NoticeType } from "antd/es/message/interface";

interface MessageI {
  type: NoticeType;
  content: string;
  isOpenMessage: boolean;
}

// 초기값(상태 관리할 데이터)
const initialState: MessageI = {
  type: "info",
  content: "",
  isOpenMessage: false,
};
// 코딩 컨벤션
// Slice는 sotre을 쪼개서 사용한다는 의미
const messageSlice = createSlice({
  // 슬라이스 구분용 이름
  name: "messageSlice", //문자열
  // 슬라이스 초기값
  initialState: initialState,
  // state 내에 저장된 값 갱신, 해당 Slice를 업데이트할 함수
  // 상태를 갱신해 주는 함수 묶음
  reducers: {
    setSuccess: (state, action) => {
      state.type = "success";
      state.content = action.payload;
      state.isOpenMessage = true;
    },
    setError: (state, action) => {
      state.type = "error";
      state.content = action.payload;
      state.isOpenMessage = true;
    },
    setInfo: (state, action) => {
      state.type = "info";
      state.content = action.payload;
      state.isOpenMessage = true;
    },
    resetMessage: state => {
      state.type = initialState.type;
      state.content = initialState.content;
      state.isOpenMessage = initialState.isOpenMessage;
    },
  },
});
// Reduce 함수를 외부로 내보내서 dispatch를 실행하도록 해준다.
// action: type 구분, payload 전달 ...
export const { setSuccess, setError, setInfo, resetMessage } =
  messageSlice.actions;
export default messageSlice.reducer;
