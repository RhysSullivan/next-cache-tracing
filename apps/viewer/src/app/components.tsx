"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";

// transparent purple box
type Colors = "purple" | "yellow";

function getColorAsHex(color: Colors) {
  switch (color) {
    case "purple":
      return {
        backgroundColor: "#24172F",
        border: "#8A52AF",
      };
    case "yellow":
      return {
        backgroundColor: "#4A391D",
        border: "#E8B256",
      };
  }
}

type BoxProps = {
  width: number;
  height: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  centerContent?: boolean;
  id?: string;
  color: Colors;
  relations?: RelationType[];
};

function Box(props: BoxProps) {
  let { id, relations } = props;
  id = id ?? Math.random().toString(36).substring(2, 15);
  return (
    <ArcherElement id={id} relations={relations}>
      <div
        className={cn(
          "bg-opacity-50 rounded-lg text-center font-mono text-sm",
          props.centerContent ? "flex justify-center items-center" : "",
          props.className
        )}
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: getColorAsHex(props.color).backgroundColor,
          border: `2.5px solid ${getColorAsHex(props.color).border}`,
          ...props.style,
        }}
      >
        {props.children}
      </div>
    </ArcherElement>
  );
}

type MissHitProps = {
  miss: boolean;
  color: Colors;
  id?: string;
  relations?: RelationType[];
};

function MissHit(props: MissHitProps) {
  return (
    <Box
      color={props.color}
      width={50}
      height={30}
      centerContent
      id={props.id}
      relations={props.relations}
    >
      {props.miss ? "MISS" : "HIT"}
    </Box>
  );
}

function DataCache() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="pb-4">
        <Box
          width={130}
          height={120}
          color="purple"
          className="relative"
          id="data-cache"
          relations={[
            {
              targetId: "data-cache-miss",
              targetAnchor: "top",
              sourceAnchor: "bottom",
              style: { strokeColor: "#8A52AF", strokeWidth: 2 },
            },
          ]}
        >
          <div className="mt-6">Data Cache</div>
          <Box
            width={60}
            height={30}
            color="purple"
            centerContent
            className="absolute bottom-1 left-2"
          >
            JSON
          </Box>
          <Box
            width={90}
            height={30}
            color="purple"
            centerContent
            className="absolute text-center text-xs"
            style={{
              top: -15,
              left: 5,
              backgroundColor: "#502564",
            }}
          >
            Persistent
          </Box>
        </Box>
      </div>
      <MissHit
        miss
        id="data-cache-miss"
        relations={[
          {
            targetId: "data-cache-hit",
            targetAnchor: "top",
            sourceAnchor: "bottom",
            style: { strokeColor: "#8A52AF", strokeWidth: 2 },
          },
        ]}
        color="purple"
      />
      <MissHit miss={false} id="data-cache-hit" color="purple" />
    </div>
  );
}

export function CacheSystemDiagram() {
  return (
    <ArcherContainer
      strokeColor="#8A52AF"
      endShape={{
        arrow: {
          arrowLength: 0,
          arrowThickness: 0,
        },
      }}
      noCurves
      style={{ strokeDasharray: "6,6" }}
    >
      <div className="p-32 grid grid-cols-2 gap-8">
        <MissHit
          miss
          id="req-memo-miss"
          color="yellow"
          relations={[
            {
              targetId: "data-cache",
              targetAnchor: "left",
              sourceAnchor: "right",
              style: {
                strokeColor: "#878787",
                strokeWidth: 2,
                strokeDasharray: "0,0",
                endShape: {
                  arrow: {
                    arrowLength: 8,
                    arrowThickness: 8,
                  },
                },
              },
            },
          ]}
        />
        {/* connect to data cache */}
        <DataCache />
      </div>
    </ArcherContainer>
  );
}
