"use client";

import { useEffect, useState } from "react";

export function BootScreen() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return <div className={`boot${gone ? " gone" : ""}`}><div className="boot-mark">MLYA</div></div>;
}
