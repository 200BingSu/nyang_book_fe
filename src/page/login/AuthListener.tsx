// src/components/AuthListener.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./loginApi";

export default function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        // console.log("Auth event:", event);
        // console.log("Session:", session);

        if (event === "SIGNED_OUT") {
          navigate("/login"); //
        }

        if (event === "SIGNED_IN") {
          navigate("/"); //
        }
      },
    );

    // cleanup: 리스너 해제
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}
