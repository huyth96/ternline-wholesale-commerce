import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

const baseProps: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function TernlineMark(props: IconProps) {
  return (
    <svg {...baseProps} viewBox="0 0 32 28" {...props}>
      <path d="M3 5h17M3 14h26M3 23h19" />
      <circle className="ternline-mark__node" cx="10" cy="14" r="3.5" fill="var(--terracotta, currentColor)" stroke="none" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13.2 13.2 3.3 3.3" />
    </svg>
  );
}

export function OrderIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3.5 6.5 10 3l6.5 3.5v7L10 17l-6.5-3.5z" />
      <path d="M3.8 6.7 10 10l6.2-3.3M10 10v7" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="3" width="5.5" height="5.5" />
      <rect x="11.5" y="3" width="5.5" height="5.5" />
      <rect x="3" y="11.5" width="5.5" height="5.5" />
      <rect x="11.5" y="11.5" width="5.5" height="5.5" />
    </svg>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M7 5h10M7 10h10M7 15h10" />
      <circle cx="3.5" cy="5" r=".75" fill="currentColor" stroke="none" />
      <circle cx="3.5" cy="10" r=".75" fill="currentColor" stroke="none" />
      <circle cx="3.5" cy="15" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 5h14M5.5 10h9M8 15h4" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m4 4 12 12M16 4 4 16" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 10h12" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="6.5" y="6.5" width="10" height="10" rx="1" />
      <path d="M13.5 6.5V4.75c0-.7-.55-1.25-1.25-1.25h-7.5c-.7 0-1.25.55-1.25 1.25v7.5c0 .7.55 1.25 1.25 1.25H6.5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m10 16V4M5.5 8.5 10 4l4.5 4.5" />
    </svg>
  );
}

export function PrintIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 7V3.5h8V7M6 14H4.5A1.5 1.5 0 0 1 3 12.5v-4A1.5 1.5 0 0 1 4.5 7h11A1.5 1.5 0 0 1 17 8.5v4a1.5 1.5 0 0 1-1.5 1.5H14" />
      <path d="M6 11h8v6H6z" />
      <circle cx="14.5" cy="9.5" r=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  );
}

export function CatalogSceneIcon(props: IconProps) {
  return (
    <svg
      width="420"
      height="190"
      viewBox="0 0 420 190"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 170h380" opacity=".28" />
      <path d="M34 23v147M112 23v147M34 23h78M34 63h78M34 103h78M34 143h78" />
      <path d="M47 43h20v20H47zM75 40h24v23H75zM45 82h35v21H45zM86 86h15v17H86zM47 121h23v22H47zM78 118h23v25H78z" opacity=".72" />
      <path d="M143 91h126v79M153 91v79M143 91l12-12h128l-14 12" />
      <path d="M201 67h49v12h-49zM222 23h7v44" />
      <path d="M176 105v22h59v-22M185 127v43M228 127v43" opacity=".62" />
      <path d="M290 39h86v131h-86zM333 39v131M304 58h17M345 58h17M304 64h17M345 64h17M320 103v18M346 103v18" />
      <path d="M301 170v-5M365 170v-5M39 170v-5M107 170v-5" />
    </svg>
  );
}
