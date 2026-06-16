"use client";

import React from "react";

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-[#F8F9FA] border-b border-[#E9ECEF] px-6 py-0 flex items-center justify-between h-[72px] flex-shrink-0">
      {/* Title */}
      <div>
        <h1 className="text-[22px] font-bold text-[#1A1A1A] leading-tight">
          Certified True Copy (47834)
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">Manage Your CTC Orders Here</p>
      </div>

      {/* Right: action buttons + search */}
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-[#DEE2E6] text-[#495057] hover:bg-[#F1F3F5] transition-colors">
          <ShareIcon />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-[#DEE2E6] text-[#495057] hover:bg-[#F1F3F5] transition-colors">
          <FilterIcon />
        </button>

        {/* Rounded search input */}
        <div className="relative flex items-center">
          <div className="absolute left-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="h-9 pl-9 pr-4 rounded-full bg-white border border-[#DEE2E6] text-sm text-[#1A1A1A] placeholder-[#9CA3AF] outline-none focus:border-[#4A2B4D] focus:ring-1 focus:ring-[#4A2B4D] transition-colors w-52"
          />
        </div>
      </div>
    </header>
  );
}
