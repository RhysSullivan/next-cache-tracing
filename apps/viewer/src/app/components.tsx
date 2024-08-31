"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { RelationType } from "react-archer/lib/types";

// transparent purple box
type Colors = "purple" | "yellow" | "blackish";

enum Ids {
  DataCache = "data-cache",
  DataCacheMiss = "data-cache-miss",
  DataCacheSet = "data-cache-set",
  DataSource = "data-source",
  DataSourceHit = "data-source-hit",
  RequestMemoCache = "request-memo-cache",
  RequestMemoCacheMiss = "request-memo-cache-miss",
  RequestMemoCacheSet = "request-memo-cache-set",
}

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
    case "blackish":
      return {
        backgroundColor: "#161616",
        border: "#454545",
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
  type: "miss" | "hit" | "set";
  color: Colors;
  id?: string;
  relations?: RelationType[];
};

function MissSetHit(props: MissHitProps) {
  return (
    <Box
      color={props.color}
      width={50}
      height={30}
      centerContent
      id={props.id}
      relations={props.relations}
    >
      {props.type === "miss" ? "MISS" : props.type === "hit" ? "HIT" : "SET"}
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
          id={Ids.DataCache}
          relations={[
            {
              targetId: Ids.DataCacheMiss,
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
      <MissSetHit
        type="miss"
        id={Ids.DataCacheMiss}
        relations={[
          {
            targetId: Ids.DataCacheSet,
            targetAnchor: "top",
            sourceAnchor: "bottom",
            style: { strokeColor: "#8A52AF", strokeWidth: 2 },
          },
          greyArrow({
            targetId: Ids.DataSourceHit,
            targetAnchor: "left",
            sourceAnchor: "right",
          }),
        ]}
        color="purple"
      />
      <MissSetHit type="set" id={Ids.DataCacheSet} color="purple" />
    </div>
  );
}

function greyArrow(
  props: Pick<
    RelationType,
    "targetId" | "sourceAnchor" | "targetAnchor" | "style"
  >
) {
  const { style = {}, ...rest } = props;
  return {
    ...props,
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
      ...style,
    },
  };
}

function ReqMemoCache() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Box width={460} height={120} color="blackish" className="flex flex-row">
        Rendering
        <Box width={230} height={60} color="yellow">
          <div className="mt-2 font-bold">Request Memoization</div>
        </Box>
      </Box>
      <MissSetHit
        type="miss"
        id={Ids.RequestMemoCacheMiss}
        color="yellow"
        relations={[
          greyArrow({
            targetId: Ids.DataCache,
            targetAnchor: "left",
            sourceAnchor: "right",
          }),
        ]}
      />
      <MissSetHit type="set" id={Ids.RequestMemoCacheSet} color="yellow" />
    </div>
  );
}

function DataSource() {
  return (
    <div className="flex flex-col items-center gap-4 pt-9">
      <Box width={120} height={100} color="blackish">
        <div className="mt-6">Data Source</div>
      </Box>
      <MissSetHit
        type="hit"
        id={Ids.DataSourceHit}
        color="blackish"
        relations={[
          greyArrow({
            targetId: Ids.DataCacheSet,
            targetAnchor: "right",
            sourceAnchor: "bottom",
          }),
        ]}
      />
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
      <div className="p-32 grid grid-cols-3 gap-8">
        <ReqMemoCache />
        <DataCache />
        <DataSource />
      </div>
    </ArcherContainer>
  );
}
