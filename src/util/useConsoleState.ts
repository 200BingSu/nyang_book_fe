import { useEffect, useRef } from "react";

export function useDebugState<T>(label: string, state: T) {
  const prev = useRef<T>(null);

  useEffect(() => {
    if (prev.current !== undefined && prev.current !== state) {
      console.log(
        `%c${label} changed`,
        "color: #4ade80; font-weight: bold;",
        "\nPrev:",
        prev.current,
        "\nNext:",
        state,
      );
    } else {
      console.log(`[${label}]`, state);
    }
    prev.current = state;
  }, [state]);
}
