import React from "react";
import Brand from "./details";
import Navigation from "./navigation";
import SideFooter from "./Sidefooter";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white dark:bg-[#1a2634] border-r border-[#dbe0e6] dark:border-gray-700 flex flex-col shrink-0">
      <div className="flex flex-col h-full p-4 justify-between">
        <div className="flex flex-col gap-6">
          <Brand />
          <Navigation />
        </div>
        <SideFooter />
      </div>
    </aside>
  );
}