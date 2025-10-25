import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import { ConfigProvider } from "antd";
import AuthListener from "./page/login/AuthListener";

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
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
