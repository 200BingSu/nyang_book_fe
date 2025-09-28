import { createSlice } from "@reduxjs/toolkit";

// 초기값(상태 관리할 데이터)
const initialState = { count: 0 };
// 코딩 컨벤션
// Slice는 sotre을 쪼개서 사용한다는 의미
const counterSlice = createSlice({
  // 슬라이스 구분용 이름
  name: "counterSlice", //문자열
  // 슬라이스 초기값
  initialState: initialState,
  // state 내에 저장된 값 갱신, 해당 Slice를 업데이트할 함수
  // 상태를 갱신해 주는 함수 묶음
  reducers: {
    add: state => {
      state.count += 1;
    },
    minus: state => {
      state.count -= 1;
    },
    reset: state => {
      state.count = 0;
    },
  },
});
// Reduce 함수를 외부로 내보내서 dispatch를 실행하도록 해준다.
// action: type 구분, payload 전달 ...
export const { add, minus, reset } = counterSlice.actions;
export default counterSlice.reducer;