import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider } from "react-router-dom";
import router from "./router/root";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F54900",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
