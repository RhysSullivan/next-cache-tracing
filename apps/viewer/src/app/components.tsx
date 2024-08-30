"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { ArcherContainer, ArcherElement } from "react-archer";

// transparent purple box

type BoxProps = {
  width: number;
  height: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  centerContent?: boolean;
};

function Box(props: BoxProps) {
  return (
    <div
      className={cn(
        "bg-opacity-50 rounded-lg text-center font-normal  text-sm",
        props.centerContent ? "flex justify-center items-center" : "",
        props.className
      )}
      //  color 24172F
      // border 8A52AF
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: "#24172F",
        // no opacity on border
        border: "2.5px solid #8A52AF",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

function DataCache() {
  return (
    <Box width={130} height={120} className="relative">
      <div className="mt-6  font-semibold">Data Cache</div>
      <Box
        width={60}
        height={30}
        centerContent
        className="absolute bottom-1 left-2"
      >
        JSON
      </Box>
      <Box
        width={90}
        height={30}
        centerContent
        className="absolute text-center"
        style={{
          top: -15,
          left: 5,
          backgroundColor: "#502564",
        }}
      >
        Persistent
      </Box>
    </Box>
  );
}

export function CacheSystemDiagram() {
  return (
    <div className="p-32">
      <div className="flex flex-col items-center gap-4">
        <div className="pb-4">
          <DataCache />
        </div>
        <Box width={50} height={30} centerContent>
          Miss
        </Box>
        <Box width={50} height={30} centerContent>
          Hit
        </Box>
      </div>
    </div>
  );
}
