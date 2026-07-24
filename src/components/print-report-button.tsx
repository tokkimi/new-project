"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintReportButton({ label }: { label: string }) {
  return (
    <Button className="no-print" onClick={() => window.print()}>
      <Printer className="size-4" />
      {label}
    </Button>
  );
}
