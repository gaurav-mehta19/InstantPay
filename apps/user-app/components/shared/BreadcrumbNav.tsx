interface BreadcrumbNavProps {
  current: string;
}

export function BreadcrumbNav({ current }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <span className="breadcrumb-parent">Workspace</span>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-current">{current}</span>
    </nav>
  );
}
