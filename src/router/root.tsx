import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/spinner/Loading";
import NotFound from "../page/NotFound";
import MainLayout from "../components/layout/MainLayout";

const Main = lazy(() => import("../page/main/Main"));

// 로그인
const LoginIndex = lazy(() => import("../page/login/Index"));
const SignUpPage = lazy(() => import("../page/login/SignUp"));

// 구매이력
const PurchasesIndex = lazy(() => import("../page/purchases/Index"));

// 통계
const StaticsIndex = lazy(() => import("../page/statics/Index"));

// 일기
const DiaryIndex = lazy(() => import("../page/diary/Index"));

// todo
const TodoIndex = lazy(() => import("../page/todo/Index"));

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

      // 구매이력
      {
        path: "purchases/*",
        element: (
          <Suspense fallback={<Loading />}>
            <PurchasesIndex />
          </Suspense>
        ),
      },

      // 통계
      {
        path: "statics/*",
        element: (
          <Suspense fallback={<Loading />}>
            <StaticsIndex />
          </Suspense>
        ),
      },

      // todo
      {
        path: "todo",
        element: (
          <Suspense fallback={<Loading />}>
            <TodoIndex />
          </Suspense>
        ),
      },

      // diary
      {
        path: "diary",
        element: (
          <Suspense fallback={<Loading />}>
            <DiaryIndex />
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
