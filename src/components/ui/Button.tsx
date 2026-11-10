import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant =
  | "primary" // чернильная — на светлом фоне
  | "accent" // латунная — на тёмном фоне
  | "outline" // контурная — на светлом фоне
  | "outlineLight" // контурная — на тёмном фоне
  | "whatsapp";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-[3px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-2 shadow-[inset_0_-2px_0_rgb(169_132_74/0.9)]",
  accent: "bg-brass-light text-ink hover:bg-[#dcc290]",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  outlineLight:
    "border border-paper/30 text-paper hover:border-brass-light hover:text-brass-light",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[12px]",
  lg: "h-13 px-7 text-[13px]",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className = "",
) {
  return [base, variants[variant], sizes[size], className].join(" ");
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Стрелка справа, сдвигается при наведении. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  /** Внешняя ссылка: откроется в новой вкладке. */
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  arrow,
  className,
  children,
  external,
  ...rest
}: ButtonLinkProps) {
  const content = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrowRight"
          size={16}
          className="transition-transform duration-200 group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
  const cls = buttonClass(variant, size, className);

  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
