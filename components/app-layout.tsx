"use client";

import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-[88px] flex flex-col">
        <Header />

        {/* Tab bar */}
        <div className="bg-white border-b border-[#E9ECEF] px-6 flex items-center justify-between gap-0 h-11 flex-shrink-0">
          <div className="flex items-center gap-0">
            <button className="px-4 h-full bg-[#1A1A1A] text-white text-[13px] font-medium rounded-t-md flex items-center gap-2 border-b-2 border-transparent -mb-px">
              Orders (121)
            </button>
            <button className="px-4 h-full bg-[#2A2A2A] text-white text-[13px] font-medium rounded-t-md flex items-center gap-1.5 ml-px border-b-2 border-transparent -mb-px">
              Clerks (40)
              <span className="w-4 h-4 flex items-center justify-center rounded-sm bg-[#4A2B4D] text-[10px] font-bold">
                4
              </span>
            </button>
            <button className="px-4 h-full bg-transparent text-[#6B7280] text-[13px] font-medium hover:text-[#1A1A1A] hover:bg-[#F8F9FA] rounded-t-md border-b-2 border-transparent -mb-px">
              Courts (32)
            </button>
            <button className="px-4 h-full bg-transparent text-[#6B7280] text-[13px] font-medium hover:text-[#1A1A1A] hover:bg-[#F8F9FA] rounded-t-md border-b-2 border-transparent -mb-px">
              Districts (14)
            </button>
            <button className="px-4 h-full bg-transparent text-[#6B7280] text-[13px] font-medium hover:text-[#1A1A1A] hover:bg-[#F8F9FA] rounded-t-md border-b-2 border-transparent -mb-px">
              Eligible Users (11)
            </button>
          </div>

          {/* Types filter — matches screenshot top-right of tab bar */}
          <Dropdown
            menu={{
              items: [
                { key: "orders", label: "ORDERS" },
                { key: "clerks", label: "CLERKS" },
              ],
            }}
            trigger={["click"]}
          >
            <Button
              size="small"
              style={{ borderColor: "#DEE2E6", color: "#495057", fontSize: 12, minWidth: 110 }}
            >
              <span className="text-[10px] text-[#9CA3AF] mr-1 block leading-none" style={{ fontSize: 9 }}>Types</span>
              ORDERS <DownOutlined style={{ fontSize: 10 }} />
            </Button>
          </Dropdown>
        </div>

        {/* Main content area */}
        <main className="flex-1 px-6 py-5 overflow-auto bg-[#FAFBFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
