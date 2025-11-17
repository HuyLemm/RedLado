import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-6 text-sm">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-text-muted dark:text-[#8B93A7]">/</span>
            )}
            {item.href ? (
              <Link 
                href={item.href}
                className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#E11D48] dark:text-[#F43F5E] font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

