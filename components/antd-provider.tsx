"use client";

import React from "react";
import { ConfigProvider } from "antd";

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4A2B4D",
          colorLink: "#4A2B4D",
          fontFamily: "var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          borderRadius: 6,
          colorBorder: "#DEE2E6",
          colorText: "#1A1A1A",
          colorTextSecondary: "#6B7280",
        },
        components: {
          Table: {
            headerBg: "#F8F9FA",
            headerColor: "#6B7280",
            headerSplitColor: "transparent",
            borderColor: "#E9ECEF",
            rowHoverBg: "#FAFBFF",
            cellPaddingBlock: 14,
            cellPaddingInline: 12,
          },
          Select: {
            borderRadius: 6,
          },
          Button: {
            borderRadius: 6,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
