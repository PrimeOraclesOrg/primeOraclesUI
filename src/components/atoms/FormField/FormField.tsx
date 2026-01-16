import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  charCount?: number;
  maxChars?: number;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  required,
  charCount,
  maxChars,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-muted-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {maxChars !== undefined && charCount !== undefined && (
          <span className="text-xs text-muted-foreground">
            {charCount}/{maxChars}
          </span>
        )}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
