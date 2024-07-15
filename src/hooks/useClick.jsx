import { useEffect, useRef } from "react";

export function useClick(close, listenCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [close, listenCapturing]);

  return ref;
}
