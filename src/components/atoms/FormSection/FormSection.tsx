interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}
