"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PrintReportButton({ label }: { label: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function downloadPdf() {
    const report = document.querySelector<HTMLElement>("[data-report-content]");
    if (!report) {
      window.print();
      return;
    }

    setIsLoading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(report, {
        backgroundColor: "#b7b8b3",
        scale: Math.min(window.devicePixelRatio || 1, 2),
        useCORS: true,
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const image = canvas.toDataURL("image/jpeg", 0.95);

      let remainingHeight = imgHeight;
      let position = 0;
      pdf.addImage(image, "JPEG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(image, "JPEG", 0, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save(`haru-skin-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch {
      window.print();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button className="no-print" onClick={downloadPdf} disabled={isLoading}>
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
      {label}
    </Button>
  );
}
