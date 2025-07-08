"use client";

import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

type ExportCallback = (
  status: "start" | "complete" | "error",
  message?: string
) => void;

/**
 * Exports the roadmap as a PNG image
 * @param elementId The ID of the DOM element to export
 * @param fileName The name of the file to download (without extension)
 * @param callback Optional callback to report export status
 */
export const exportAsImage = async (
  elementId: string,
  fileName: string = "roadmap",
  callback?: ExportCallback
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    const errorMessage = `Element with ID ${elementId} not found`;
    callback?.("error", errorMessage);
    console.error(errorMessage);
    return;
  }

  try {
    callback?.("start");

    const dataUrl = await toPng(element, {
      quality: 1,
      backgroundColor: "#111111", // Dark background to match your theme
      pixelRatio: 2, // Higher resolution
      skipAutoScale: true,
      style: {
        // Override any problematic styles for export
        transform: "none",
        overflow: "visible",
      },
    });

    // Create a download link
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();

    callback?.("complete", "PNG exported successfully");
  } catch (error) {
    const errorMessage = `Error exporting as PNG: ${error}`;
    callback?.("error", errorMessage);
    console.error(errorMessage);
  }
};

/**
 * Exports the roadmap as a PDF document
 * @param elementId The ID of the DOM element to export
 * @param fileName The name of the file to download (without extension)
 * @param callback Optional callback to report export status
 */
export const exportAsPDF = async (
  elementId: string,
  fileName: string = "roadmap",
  callback?: ExportCallback
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    const errorMessage = `Element with ID ${elementId} not found`;
    callback?.("error", errorMessage);
    console.error(errorMessage);
    return;
  }

  try {
    callback?.("start");

    const dataUrl = await toPng(element, {
      quality: 1,
      backgroundColor: "#111111", // Dark background to match your theme
      pixelRatio: 2, // Higher resolution
      skipAutoScale: true,
      style: {
        // Override any problematic styles for export
        transform: "none",
        overflow: "visible",
      },
    });

    // Get dimensions for optimal PDF sizing
    const imgWidth = element.offsetWidth;
    const imgHeight = element.offsetHeight;
    const aspectRatio = imgHeight / imgWidth;

    // Create PDF with appropriate orientation based on aspect ratio
    const orientation = aspectRatio > 1 ? "portrait" : "landscape";
    const pdf = new jsPDF({
      orientation,
      unit: "mm",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdfWidth * aspectRatio;

    // Add image to PDF
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save PDF
    pdf.save(`${fileName}.pdf`);

    callback?.("complete", "PDF exported successfully");
  } catch (error) {
    const errorMessage = `Error exporting as PDF: ${error}`;
    callback?.("error", errorMessage);
    console.error(errorMessage);
  }
};

// For backward compatibility with older code
export const exportAsPNG = exportAsImage;
