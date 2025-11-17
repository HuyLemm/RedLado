interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-text-primary dark:text-[#E5E7EB] mb-2">{title}</h1>
      {description && (
        <p className="text-text-secondary dark:text-[#A7B0BF]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

