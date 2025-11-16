// store 설정
// store은 전역에서 사용할 state를 말함
// 주로 /src/store 폴더 주로 생성.
// store은 1개만, 즉 전역 state는 1개만 만들 수 있다.

import { configureStore } from "@reduxjs/toolkit";
// 카운터용 reducer을 활용
import serviceReducer from "../features/serviceSlice";
import messageReducer from "../features/messageSlice";

// 파일명은 주로 store.js
const store = configureStore({
  reducer: {
    // store을 쪼개서, 즉 slice해서 사용합니다.
    service: serviceReducer,
    message: messageReducer,
  },
});

export default store; //Provider에 적기 위해

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
