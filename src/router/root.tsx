import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/spinner/Loading";
import NotFound from "../page/NotFound";
import MainLayout from "../components/layout/MainLayout";

const Main = lazy(() => import("../page/main/Main"));

// 로그인
const LoginIndex = lazy(() => import("../page/login/Index"));
const SignUpPage = lazy(() => import("../page/login/SignUp"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      // 로그인
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginIndex />
          </Suspense>
        ),
      },
      {
        path: "sign_up",
        element: (
          <Suspense fallback={<Loading />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
