"use client";

import React, { useState } from "react";
import { Drawer, Select, Checkbox, Button } from "antd";

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

const DISTRICTS = ["Thrissur", "Ernakulam", "Kozhikode", "Thiruvananthapuram"];
const COURTS = ["District Court Thrissur", "Court Complex Kunnamkulam", "JFCM 1 District Court Thrissur"];
const PRODUCTS = ["All", "Judgement", "Interim Order", "Other"];

export default function Header() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [district, setDistrict] = useState<string | undefined>(undefined);
  const [court, setCourt] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<string>("All");
  const [testUsers, setTestUsers] = useState(true);

  function handleReset() {
    setDistrict(undefined);
    setCourt(undefined);
    setProduct("All");
    setTestUsers(false);
  }

  return (
    <>
      <header className="w-full bg-[#F8F9FA] border-b border-[#E9ECEF] px-6 py-0 flex items-center justify-between h-[72px] flex-shrink-0">
        <div>
          <h1 className="text-[22px] font-bold text-[#1A1A1A] leading-tight">
            Certified True Copy (47834)
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">Manage Your CTC Orders Here</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-[#DEE2E6] text-[#495057] hover:bg-[#F1F3F5] transition-colors">
            <ShareIcon />
          </button>
          <button
            onClick={() => setFilterOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-[#DEE2E6] text-[#495057] hover:bg-[#F1F3F5] transition-colors"
            aria-label="Open filters"
          >
            <FilterIcon />
          </button>

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

      {/* ── Filter Drawer ── */}
      <Drawer
        title={<span className="text-[18px] font-bold text-[#1A1A1A]">Filter Users</span>}
        placement="right"
        style={{ width: 380 }}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        closeIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        }
        styles={{
          body: { display: "flex", flexDirection: "column", gap: 20, paddingBottom: 100 },
          footer: { borderTop: "1px solid #E9ECEF", padding: "16px 24px" },
        }}
        footer={
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={handleReset}
              style={{ borderRadius: 999, borderColor: "#4A2B4D", color: "#4A2B4D", minWidth: 130, height: 42, fontWeight: 600 }}
            >
              Reset Filter
            </Button>
            <Button
              type="primary"
              onClick={() => setFilterOpen(false)}
              style={{ borderRadius: 999, backgroundColor: "#4A2B4D", borderColor: "#4A2B4D", minWidth: 130, height: 42, fontWeight: 600 }}
            >
              Apply Filter
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-[#1A1A1A]">District</label>
          <Select
            placeholder="Choose District"
            value={district}
            onChange={setDistrict}
            options={DISTRICTS.map((d) => ({ value: d, label: d }))}
            style={{ width: "100%", height: 44 }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-[#1A1A1A]">Court Establishment</label>
          <Select
            placeholder="Choose Court Establishment"
            value={court}
            onChange={setCourt}
            options={COURTS.map((c) => ({ value: c, label: c }))}
            style={{ width: "100%", height: 44 }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-[#1A1A1A]">Product</label>
          <Select
            value={product}
            onChange={setProduct}
            options={PRODUCTS.map((p) => ({ value: p, label: p }))}
            style={{ width: "100%", height: 44 }}
          />
        </div>

        <Checkbox
          checked={testUsers}
          onChange={(e) => setTestUsers(e.target.checked)}
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          Test Users
        </Checkbox>
      </Drawer>
    </>
  );
}
