"use client";

import React, { useState } from "react";
import { Table, Select, Button, Upload, Modal, Checkbox, Avatar } from "antd";
import type { TableColumnsType } from "antd";
import type { UploadProps } from "antd";
import {
  EyeOutlined,
  CopyOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusType = "cancelled" | "order placed" | "payment completed";

interface TagItem {
  id: string;
  label: string;
  color: string;
  textColor: string;
}

interface OrderRecord {
  key: string;
  rowNum: number;
  name: string;
  phone: string;
  orderId: string;
  courtComplex: string;
  district: string;
  product: string;
  productDetail: string;
  price: string;
  orderDate: string;
  orderTime: string;
  daysSince?: number;
  daysSinceColor?: string;
  status: StatusType;
  clerkName?: string;
  tags: TagItem[];
}

// ─── Status Pill ─────────────────────────────────────────────────────────────

const statusStyles: Record<StatusType, { border: string; text: string }> = {
  cancelled: { border: "border-red-400", text: "text-red-500" },
  "order placed": { border: "border-green-500", text: "text-green-600" },
  "payment completed": { border: "border-yellow-500", text: "text-yellow-600" },
};

function StatusPill({ status }: { status: StatusType }) {
  const s = statusStyles[status];
  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full border text-[11px] font-medium ${s.border} ${s.text}`}>
      {status}
    </span>
  );
}

// ─── Tag Cell ────────────────────────────────────────────────────────────────

const ALL_TAG_OPTIONS: TagItem[] = [
  { id: "sub-pending", label: "Subscription Pending", color: "#4A7C7C", textColor: "#fff" },
  { id: "gouri", label: "Gouri", color: "#7A5C5C", textColor: "#fff" },
  { id: "add-case", label: "Add Case", color: "#5C5B6E", textColor: "#fff" },
  { id: "aadhaar", label: "Aadhaar Verified", color: "#5C6E6E", textColor: "#fff" },
  { id: "urgent", label: "Urgent", color: "#8B5E3C", textColor: "#fff" },
  { id: "verified", label: "Verified", color: "#3C6B5C", textColor: "#fff" },
];

function TagCell({
  rowKey,
  tags,
  onTagsChange,
}: {
  rowKey: string;
  tags: TagItem[];
  onTagsChange: (rowKey: string, tags: TagItem[]) => void;
}) {
  function removeTag(id: string) {
    onTagsChange(rowKey, tags.filter((t) => t.id !== id));
  }
  function addTag(id: string) {
    if (tags.find((t) => t.id === id)) return;
    const tag = ALL_TAG_OPTIONS.find((t) => t.id === id);
    if (tag) onTagsChange(rowKey, [...tags, tag]);
  }

  return (
    <div className="flex flex-col gap-2 min-w-[180px]">
      <Select
        placeholder={
          <span className="text-[12px] text-[#6B7280] flex items-center gap-1">
            Choose Tag <DownOutlined style={{ fontSize: 10 }} />
          </span>
        }
        size="small"
        value={null}
        onChange={(val: string) => addTag(val)}
        options={ALL_TAG_OPTIONS.map((t) => ({ value: t.id, label: t.label }))}
        style={{ width: "100%" }}
        suffixIcon={null}
        showSearch
        className="choose-tag-select"
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag.id} className="relative inline-flex">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium pr-4"
              style={{ backgroundColor: tag.color, color: tag.textColor }}
            >
              {tag.label}
            </span>
            <button
              onClick={() => removeTag(tag.id)}
              className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-black text-white text-[9px] leading-none hover:bg-gray-700 transition-colors z-10"
              aria-label={`Remove ${tag.label}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Ecopy Upload Cell ────────────────────────────────────────────────────────

function EcopyCell() {
  const uploadProps: UploadProps = { beforeUpload: () => false, showUploadList: false };
  return (
    <Upload {...uploadProps}>
      <Button
        type="text"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A2B4D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        }
        className="ecopy-btn"
        style={{ padding: "4px 6px" }}
        title="Upload E-Copy"
      />
    </Upload>
  );
}

// ─── Clerk Cell ───────────────────────────────────────────────────────────────

function ClerkCell({
  clerkName,
  onShare,
  onAssign,
}: {
  clerkName?: string;
  onShare?: () => void;
  onAssign?: () => void;
}) {
  if (clerkName) {
    return (
      <div className="flex flex-col items-start gap-2">
        <span className="text-[13px] font-semibold text-[#1A1A1A]">{clerkName}</span>
        <div className="flex items-center gap-2">
          <button className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors" title="Edit">
            <EditOutlined style={{ fontSize: 14 }} />
          </button>
          <button className="text-[#6B7280] hover:text-red-500 transition-colors" title="Delete">
            <DeleteOutlined style={{ fontSize: 14 }} />
          </button>
          <button
            onClick={onShare}
            className="text-[#6B7280] hover:text-[#4A2B4D] transition-colors"
            title="Share"
          >
            <ShareAltOutlined style={{ fontSize: 14 }} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <Button
      icon={<UserOutlined />}
      onClick={onAssign}
      style={{ backgroundColor: "#4A2B4D", color: "#fff", borderColor: "#4A2B4D", fontWeight: 600, fontSize: 13 }}
      size="small"
    >
      Assign
    </Button>
  );
}

// ─── Order Details Modal ──────────────────────────────────────────────────────

const ORDER_DETAIL_ROWS = [
  { label: "APPLICANT", value: "Laisamma George (Petitioner)" },
  { label: "CASE NUMBER", value: "WA 233/2024" },
  { label: "CASE NAME", value: "Laisamma George & Other  vs  State Of Kerala & Others" },
  { label: "CNR NUMBER", value: "KLHC010922112023" },
  { label: "COURT ESTABLISHMENT", value: "JFCM 1 District Court Thrissur" },
  { label: "DOCUMENT TYPE", value: "Certified True Copy - Judgment" },
  { label: "ORDER NUMBER", value: "1/2026" },
  { label: "ORDER DATE", value: "22-Feb-2026" },
];

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function OrderDetailsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  function copyDetails() {
    const text = ORDER_DETAIL_ROWS.map((r) => `${r.label}: ${r.value}`).join("\n");
    navigator.clipboard.writeText(text).catch(() => {});
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={640}
      centered
      closeIcon={<CloseIcon />}
      styles={{ body: { padding: "32px 36px 36px" } }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[26px] font-bold text-[#1A1A1A]">Order Details</h2>
        <Button
          onClick={copyDetails}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          }
          style={{ borderRadius: 8, borderColor: "#DEE2E6", color: "#495057", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}
        >
          Copy Details
        </Button>
      </div>
      <div className="divide-y divide-[#F1F3F5]">
        {ORDER_DETAIL_ROWS.map((row) => (
          <div key={row.label} className="flex items-start py-4 gap-8">
            <span className="text-[11px] font-semibold text-[#9CA3AF] tracking-widest uppercase w-48 shrink-0 pt-0.5">
              {row.label}
            </span>
            <span className="text-[14px] font-bold text-[#1A1A1A] flex-1 leading-snug">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ─── Assign Personnel Modal ───────────────────────────────────────────────────

const MOCK_CLERKS = [
  { id: "1", name: "Shaman" },
  { id: "2", name: "Shaman" },
  { id: "3", name: "Shaman" },
];

function AssignPersonnelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [moreClerks, setMoreClerks] = useState<string | undefined>(undefined);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleAssign() {
    setSelected([]);
    setMoreClerks(undefined);
    onClose();
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={520}
      centered
      closeIcon={<CloseIcon />}
      styles={{ body: { padding: "28px 32px 32px" } }}
    >
      <div className="flex justify-end mb-3">
        <Button
          type="primary"
          style={{ backgroundColor: "#4A2B4D", borderColor: "#4A2B4D", borderRadius: 8, fontWeight: 600 }}
        >
          + Add New
        </Button>
      </div>
      <h2 className="text-[20px] font-bold text-[#1A1A1A] mb-1">Assign Authorized Personnel</h2>
      <p className="text-[13px] text-[#6B7280] mb-5">
        Select the person who is authorized to collect CTC document.
      </p>
      <div className="flex flex-col gap-4 mb-6">
        {MOCK_CLERKS.map((clerk) => (
          <div
            key={clerk.id}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => toggle(clerk.id)}
          >
            <Checkbox checked={selected.includes(clerk.id)} onChange={() => toggle(clerk.id)} />
            <Avatar
              size={40}
              style={{ backgroundColor: "#C4A882", flexShrink: 0 }}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Shaman${clerk.id}`}
            />
            <span className="text-[14px] font-semibold text-[#1A1A1A]">{clerk.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 mb-8">
        <label className="text-[13px] font-semibold text-[#6B7280]">More Clerks</label>
        <Select
          placeholder="Choose Clerks"
          value={moreClerks}
          onChange={setMoreClerks}
          options={[{ value: "clerk4", label: "Additional Clerk" }]}
          style={{ width: "100%", height: 44 }}
        />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={onClose}
          style={{ borderRadius: 999, borderColor: "#4A2B4D", color: "#4A2B4D", minWidth: 110, height: 42, fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleAssign}
          style={{ borderRadius: 999, backgroundColor: "#4A2B4D", borderColor: "#4A2B4D", minWidth: 150, height: 42, fontWeight: 600 }}
        >
          Assign Personnel
        </Button>
      </div>
    </Modal>
  );
}

// ─── Custom Pagination ────────────────────────────────────────────────────────

function CustomPagination({
  current,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const [gotoValue, setGotoValue] = useState("");
  const pages = [1, 2, 3, 4, 5];
  const lastPage = 4810;

  function handleGoto() {
    const p = parseInt(gotoValue, 10);
    if (!isNaN(p) && p >= 1 && p <= lastPage) { onChange(p); setGotoValue(""); }
  }

  return (
    <div className="absolute bottom-4 right-6 flex items-center gap-2 text-[13px]">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-8 h-8 flex items-center justify-center rounded border border-[#DEE2E6] bg-white text-[#495057] hover:bg-[#F1F3F5] disabled:opacity-40"
      >
        <LeftOutlined style={{ fontSize: 11 }} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 flex items-center justify-center rounded font-medium text-[13px] transition-colors ${
            current === p
              ? "bg-[#4A2B4D] text-white border border-[#4A2B4D]"
              : "border border-[#DEE2E6] bg-white text-[#495057] hover:bg-[#F1F3F5]"
          }`}
        >
          {p}
        </button>
      ))}
      <span className="text-[#9CA3AF] tracking-widest">•••</span>
      <button
        onClick={() => onChange(lastPage)}
        className="w-14 h-8 flex items-center justify-center rounded font-medium text-[13px] border border-[#DEE2E6] bg-white text-[#495057] hover:bg-[#F1F3F5]"
      >
        {lastPage}
      </button>
      <button
        onClick={() => onChange(Math.min(lastPage, current + 1))}
        disabled={current === lastPage}
        className="w-8 h-8 flex items-center justify-center rounded border border-[#DEE2E6] bg-white text-[#495057] hover:bg-[#F1F3F5] disabled:opacity-40"
      >
        <RightOutlined style={{ fontSize: 11 }} />
      </button>
      <span className="text-[#6B7280] ml-1">Go to</span>
      <input
        type="number"
        value={gotoValue}
        onChange={(e) => setGotoValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleGoto()}
        className="w-14 h-8 border border-[#DEE2E6] rounded px-2 text-center text-[13px] outline-none focus:border-[#4A2B4D]"
      />
      <span className="text-[#6B7280]">Page</span>
    </div>
  );
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DEFAULT_TAGS: TagItem[] = [
  { id: "sub-pending", label: "Subscription Pending", color: "#4A7C7C", textColor: "#fff" },
  { id: "gouri", label: "Gouri", color: "#7A5C5C", textColor: "#fff" },
  { id: "add-case", label: "Add Case", color: "#5C5B6E", textColor: "#fff" },
  { id: "aadhaar", label: "Aadhaar Verified", color: "#5C6E6E", textColor: "#fff" },
];

const INITIAL_DATA: OrderRecord[] = [
  {
    key: "1", rowNum: 1, name: "Soji Abraham", phone: "91 80861 65790",
    orderId: "OP/000251/2026", courtComplex: "Court Complex, Kunnamkulam",
    district: "Thrissur", product: "Judgement #584854", productDetail: "",
    price: "₹3,500", orderDate: "7 Feb 2026", orderTime: "12:57 PM",
    status: "cancelled", clerkName: "Shabarinath", tags: [...DEFAULT_TAGS],
  },
  {
    key: "2", rowNum: 2, name: "Shaman", phone: "91 80861 65790",
    orderId: "OS/000850/2026", courtComplex: "District Court Thrissur",
    district: "Thrissur", product: "Interim Order #487565", productDetail: "",
    price: "$150", orderDate: "7 Feb 2026", orderTime: "12:57 PM",
    daysSince: 3, daysSinceColor: "text-orange-500",
    status: "order placed", tags: [...DEFAULT_TAGS],
  },
  {
    key: "3", rowNum: 3, name: "Gopalan", phone: "91 80861 65790",
    orderId: "OS/000850/2026", courtComplex: "District Court Thrissur",
    district: "Thrissur", product: "Other",
    productDetail: "Joint Petition Filed Under Section 13 B",
    price: "₹2,500", orderDate: "7 Feb 2026", orderTime: "12:57 PM",
    daysSince: 11, daysSinceColor: "text-orange-500",
    status: "payment completed", tags: [...DEFAULT_TAGS],
  },
];

// ─── Main Table Component ─────────────────────────────────────────────────────

export default function CTCTable() {
  const [data, setData] = useState<OrderRecord[]>(INITIAL_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  function handleTagsChange(rowKey: string, newTags: TagItem[]) {
    setData((prev) => prev.map((row) => (row.key === rowKey ? { ...row, tags: newTags } : row)));
  }

  const columns: TableColumnsType<OrderRecord> = [
    {
      title: "#",
      dataIndex: "rowNum",
      key: "rowNum",
      width: 40,
      render: (val: number) => <span className="text-[13px] text-[#6B7280]">{val}</span>,
    },
    {
      title: "USER INFO",
      key: "userInfo",
      width: 200,
      render: (_: unknown, record: OrderRecord) => (
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-[#1A1A1A]">{record.name}</span>
          <div className="flex items-center gap-1 text-[12px] text-[#6B7280]">
            {record.phone}
            <button className="hover:text-[#4A2B4D] transition-colors" title="Copy phone">
              <CopyOutlined style={{ fontSize: 12 }} />
            </button>
          </div>
          <span className="text-[11px] text-[#9CA3AF]">{record.orderId}</span>
          <button className="mt-1 flex items-center gap-1 px-2.5 py-1 rounded border border-[#DEE2E6] text-[11px] text-[#495057] bg-white hover:bg-[#F1F3F5] w-fit transition-colors">
            <CopyOutlined style={{ fontSize: 10 }} /> Copy Address
          </button>
        </div>
      ),
    },
    {
      title: "COURT COMPLEX",
      key: "court",
      width: 170,
      render: (_: unknown, record: OrderRecord) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-[#1A1A1A] leading-snug">{record.courtComplex}</span>
          <span className="text-[12px] text-[#9CA3AF]">{record.district}</span>
        </div>
      ),
    },
    {
      title: "PRODUCTS",
      key: "products",
      width: 170,
      render: (_: unknown, record: OrderRecord) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-[#1A1A1A]">{record.product}</span>
          {record.productDetail && (
            <span className="text-[11px] text-[#6B7280] leading-tight">{record.productDetail}</span>
          )}
          <span className="text-[12px] text-[#1A1A1A] font-medium mt-0.5">{record.price}</span>
        </div>
      ),
    },
    {
      title: "ORDER DATE",
      key: "orderDate",
      width: 150,
      render: (_: unknown, record: OrderRecord) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-[#1A1A1A]">{record.orderDate}</span>
          <span className="text-[12px] text-[#9CA3AF]">{record.orderTime}</span>
          {record.daysSince !== undefined && (
            <span className={`text-[12px] font-semibold ${record.daysSinceColor}`}>
              <span className="font-bold">{String(record.daysSince).padStart(2, "0")}</span> days since payment
            </span>
          )}
        </div>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      width: 160,
      render: (_: unknown, record: OrderRecord) => (
        <div className="flex flex-col gap-2">
          <Select
            defaultValue="update"
            size="small"
            style={{ width: "100%" }}
            options={[
              { value: "update", label: "Update status" },
              { value: "cancelled", label: "Cancelled" },
              { value: "order placed", label: "Order Placed" },
              { value: "payment completed", label: "Payment Completed" },
            ]}
          />
          <StatusPill status={record.status} />
        </div>
      ),
    },
    {
      title: "ORDER DETAILS / E-SIGN",
      key: "orderDetails",
      width: 120,
      render: () => (
        <div className="flex flex-col gap-2">
          <Button size="small" style={{ borderColor: "#DEE2E6", color: "#495057", fontWeight: 500 }}>
            View
          </Button>
          <Button size="small" icon={<EyeOutlined />} style={{ borderColor: "#DEE2E6", color: "#495057", fontWeight: 500 }}>
            E-sign
          </Button>
        </div>
      ),
    },
    {
      title: "TAGS / NOTE",
      key: "tags",
      width: 220,
      render: (_: unknown, record: OrderRecord) => (
        <TagCell rowKey={record.key} tags={record.tags} onTagsChange={handleTagsChange} />
      ),
    },
    {
      title: "ECOPY",
      key: "ecopy",
      width: 70,
      align: "center" as const,
      render: () => <EcopyCell />,
    },
    {
      title: "CLERK",
      key: "clerk",
      width: 130,
      render: (_: unknown, record: OrderRecord) => (
        <ClerkCell
          clerkName={record.clerkName}
          onShare={() => setOrderDetailsOpen(true)}
          onAssign={() => setAssignOpen(true)}
        />
      ),
    },
  ];

  return (
    <>
      <OrderDetailsModal open={orderDetailsOpen} onClose={() => setOrderDetailsOpen(false)} />
      <AssignPersonnelModal open={assignOpen} onClose={() => setAssignOpen(false)} />

      <div className="relative bg-white rounded-lg border border-[#E9ECEF] overflow-hidden">
        <Table<OrderRecord>
          columns={columns}
          dataSource={data}
          pagination={false}
          size="middle"
          rowKey="key"
          scroll={{ x: 1300 }}
          className="ctc-table"
          style={{ fontSize: 13 }}
        />
        <div className="relative h-14 border-t border-[#E9ECEF]">
          <CustomPagination current={currentPage} total={4810} onChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
}
