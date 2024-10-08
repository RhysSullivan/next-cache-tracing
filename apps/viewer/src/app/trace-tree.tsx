"use client";

import { TreeView } from "@/components/ui/tree-view";
import {
  Folder,
  Tree,
  File,
  CollapseButton,
  TreeViewElement,
} from "@/components/ui/tree-view-api";
import React from "react";

type TOCProps = {
  toc: TreeViewElement[];
};

export const TraceTree = ({ toc }: TOCProps) => {
  return (
    <Tree className="w-full h-60 bg-background p-2 rounded-md" indicator={true}>
      {toc.map((element, _) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
      <CollapseButton elements={toc} expandAll={true} />
    </Tree>
  );
};

type TreeItemProps = {
  elements: TreeViewElement[];
};

export const TreeItem = ({ elements }: TreeItemProps) => {
  return (
    <ul className="w-full space-y-1">
      {elements.map((element) => (
        <li key={element.id} className="w-full space-y-2">
          {element.children && element.children?.length > 0 ? (
            <Folder
              element={element.name}
              value={element.id}
              isSelectable={element.isSelectable}
              className="px-px pr-1"
            >
              <TreeItem
                key={element.id}
                aria-label={`folder ${element.name}`}
                elements={element.children}
              />
            </Folder>
          ) : (
            <File
              key={element.id}
              value={element.id}
              isSelectable={element.isSelectable}
            >
              <span>{element?.name}</span>
            </File>
          )}
        </li>
      ))}
    </ul>
  );
};
