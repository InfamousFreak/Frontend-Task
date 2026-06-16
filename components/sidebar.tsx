"use client";

import React from "react";

interface SidebarIconProps {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function SidebarIcon({ active, children, onClick }: SidebarIconProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors ${
        active
          ? "bg-white/10"
          : "hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

// Custom SVG Icons
function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-4 2.7-7 6-7" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M14 20c0-3 1.6-5.5 4-5.5" />
    </svg>
  );
}

function PersonCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="3.5" />
      <path d="M3 20c0-4 3-7 7-7" />
      <path d="M16 18l2 2 4-4" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

function ClerkBadgeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-4 0v2" />
      <circle cx="12" cy="14" r="2" />
      <path d="M9 18c0-1.66 1.34-3 3-3s3 1.34 3 3" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-[88px] bg-[#1A1A1A] flex flex-col items-center z-50">
      {/* Logo box */}
      <div className="w-full flex items-center justify-center h-[72px] bg-[#311A2D] flex-shrink-0">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="8" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M10 34c0-5.52 4.48-10 10-10s10 4.48 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M16 12 L20 8 L24 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Left accent bar for active item */}
      <div className="relative flex flex-col items-center flex-1 w-full py-4 gap-1">
        {/* Active indicator for the 3rd icon */}
        <div className="absolute left-0 top-[118px] w-[3px] h-10 bg-[#F5A623] rounded-r-full" />

        <div className="text-white/50">
          <SidebarIcon>
            <DashboardIcon />
          </SidebarIcon>
        </div>
        <div className="text-white/50">
          <SidebarIcon>
            <UsersIcon />
          </SidebarIcon>
        </div>
        <div className="text-[#F5A623]">
          <SidebarIcon active>
            <PersonCheckIcon />
          </SidebarIcon>
        </div>
        <div className="text-white/50">
          <SidebarIcon>
            <DocumentIcon />
          </SidebarIcon>
        </div>
        <div className="text-white/50">
          <SidebarIcon>
            <ScanIcon />
          </SidebarIcon>
        </div>
        <div className="text-white/50">
          <SidebarIcon>
            <ClerkBadgeIcon />
          </SidebarIcon>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        <div className="text-white/50 mb-2">
          <SidebarIcon>
            <DotsIcon />
          </SidebarIcon>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#555] flex items-center justify-center mb-4 overflow-hidden">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
