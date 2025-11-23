import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import store from "./store/store";

import koKR from "antd/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={koKR}
        theme={{
          token: {
            colorPrimary: "#FF6900",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
