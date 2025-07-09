"use client";

import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

type ExportCallback = (
  status: "processing" | "complete" | "error",
  message?: string
) => void;

type ExportOptions = {
  filename?: string;
  quality?: number;
  backgroundColor?: string;
  pixelRatio?: number;
  skipAutoScale?: boolean;
  onStatusChange?: ExportCallback;
};

/**
 * Exports the roadmap as a PNG image
 * @param element The DOM element to export (not element ID)
 * @param options Export options including filename and callback
 */
export const exportAsImage = async (
  element: HTMLElement,
  options: ExportOptions = {}
) => {
  const {
    filename = "roadmap",
    quality = 1,
    backgroundColor = "#111111",
    pixelRatio = 2,
    skipAutoScale = true,
    onStatusChange
  } = options;

  if (!element) {
    const errorMessage = "Element not found";
    onStatusChange?.("error", errorMessage);
    console.error(errorMessage);
    return;
  }

  try {
    onStatusChange?.("processing", "Creating image...");

    // Wait for any pending renders/animations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Ensure element is visible and has dimensions
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      throw new Error("Element has no dimensions. Make sure it's visible and rendered.");
    }

    const dataUrl = await toPng(element, {
      quality,
      backgroundColor,
      pixelRatio,
      skipAutoScale,
      style: {
        transform: "none",
        overflow: "visible",
      },
      // Add these options for better compatibility
      cacheBust: true,
      filter: (node) => {
        // Filter out problematic nodes if needed
        return !node.classList?.contains('no-export');
      }
    });

    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error("Failed to generate image data");
    }

    // Create a download link
    const link = document.createElement("a");
    link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
    link.href = dataUrl;
    
    // Ensure the link is added to DOM temporarily for some browsers
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onStatusChange?.("complete", "Image exported successfully");
  } catch (error) {
    const errorMessage = `Error exporting as PNG: ${error instanceof Error ? error.message : error}`;
    onStatusChange?.("error", errorMessage);
    console.error("Export error details:", error);
  }
};

/**
 * Exports the roadmap as a PDF document
 * @param element The DOM element to export (not element ID)
 * @param options Export options including filename and callback
 */
export const exportAsPDF = async (
  element: HTMLElement,
  options: ExportOptions = {}
) => {
  const {
    filename = "roadmap",
    quality = 1,
    backgroundColor = "#111111",
    pixelRatio = 2,
    skipAutoScale = true,
    onStatusChange
  } = options;

  if (!element) {
    const errorMessage = "Element not found";
    onStatusChange?.("error", errorMessage);
    console.error(errorMessage);
    return;
  }

  try {
    onStatusChange?.("processing", "Creating PDF...");

    // Wait for any pending renders/animations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Ensure element is visible and has dimensions
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      throw new Error("Element has no dimensions. Make sure it's visible and rendered.");
    }

    const dataUrl = await toPng(element, {
      quality,
      backgroundColor,
      pixelRatio,
      skipAutoScale,
      style: {
        transform: "none",
        overflow: "visible",
      },
      cacheBust: true,
      filter: (node) => {
        return !node.classList?.contains('no-export');
      }
    });

    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error("Failed to generate image data");
    }

    // Get dimensions for optimal PDF sizing
    const imgWidth = element.offsetWidth;
    const imgHeight = element.offsetHeight;
    const aspectRatio = imgHeight / imgWidth;

    // Create PDF with appropriate orientation based on aspect ratio
    const orientation = aspectRatio > 1 ? "portrait" : "landscape";
    const pdf = new jsPDF({
      orientation,
      unit: "mm",
      format: "a4"
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate dimensions to fit the page while maintaining aspect ratio
    let finalWidth = pdfWidth;
    let finalHeight = pdfWidth * aspectRatio;

    if (finalHeight > pdfHeight) {
      finalHeight = pdfHeight;
      finalWidth = pdfHeight / aspectRatio;
    }

    // Center the image on the page
    const xOffset = (pdfWidth - finalWidth) / 2;
    const yOffset = (pdfHeight - finalHeight) / 2;

    // Add image to PDF
    pdf.addImage(dataUrl, "PNG", xOffset, yOffset, finalWidth, finalHeight);

    // Save PDF
    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(finalFilename);

    onStatusChange?.("complete", "PDF exported successfully");
  } catch (error) {
    const errorMessage = `Error exporting as PDF: ${error instanceof Error ? error.message : error}`;
    onStatusChange?.("error", errorMessage);
    console.error("Export error details:", error);
  }
};

export const exportAsPNG = exportAsImage;

// Helper function to debug element issues
export const debugElement = (element: HTMLElement) => {
  if (!element) {
    console.error("Element is null or undefined");
    return;
  }

  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  
  console.log("Element debug info:", {
    tagName: element.tagName,
    id: element.id,
    className: element.className,
    dimensions: {
      width: rect.width,
      height: rect.height,
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight
    },
    visibility: {
      display: computedStyle.display,
      visibility: computedStyle.visibility,
      opacity: computedStyle.opacity
    },
    position: {
      x: rect.x,
      y: rect.y,
      top: rect.top,
      left: rect.left
    }
  });
};