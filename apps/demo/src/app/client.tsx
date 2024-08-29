"use client";

import React from "react";
import { action } from "./action";
export function ActionButton() {
  return (
    <button
      onClick={async () => {
        await action();
      }}
    >
      Click Me
    </button>
  );
}
