import React, { useEffect, useRef, useState } from "react";

interface PdfThumbnailProps {
  pdfPath: string;
  fallbackImage: string;
  alt: string;
  className?: string;
}

// Rendered covers are cached so shared forms aren't re-rendered on every fund page
const coverCache = new Map<string, Promise<string>>();

// Only PDFs hosted on this site get an auto-generated cover
const canGenerateCover = (path: string) =>
  path.startsWith("/") && path.toLowerCase().endsWith(".pdf");

const renderCover = (pdfPath: string): Promise<string> => {
  const cached = coverCache.get(pdfPath);
  if (cached) return cached;

  const promise = (async () => {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const workerUrl = (
      await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url")
    ).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

    // Fetch only the byte ranges needed for page 1 instead of the whole file
    const pdf = await pdfjs.getDocument({
      url: pdfPath,
      disableAutoFetch: true,
      disableStream: true,
    }).promise;
    try {
      const page = await pdf.getPage(1);
      const baseViewport = page.getViewport({ scale: 1 });
      // Render at ~600px wide, enough to stay sharp on high-DPI screens
      const viewport = page.getViewport({ scale: 600 / baseViewport.width });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas not supported");

      await page.render({ canvasContext: context, viewport }).promise;
      return canvas.toDataURL("image/jpeg", 0.85);
    } finally {
      pdf.destroy();
    }
  })();

  // Drop failed renders from the cache so they fall back to the static image
  promise.catch(() => coverCache.delete(pdfPath));
  coverCache.set(pdfPath, promise);
  return promise;
};

const PdfThumbnail: React.FC<PdfThumbnailProps> = ({
  pdfPath,
  fallbackImage,
  alt,
  className = "",
}) => {
  const shouldGenerate = canGenerateCover(pdfPath);
  const [cover, setCover] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldGenerate || !containerRef.current) return;
    let cancelled = false;

    // Wait until the card is near the viewport before downloading the PDF
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        renderCover(pdfPath)
          .then((url) => !cancelled && setCover(url))
          .catch((error) => {
            console.error("Error generating PDF cover:", error);
            if (!cancelled) setFailed(true);
          });
      },
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [pdfPath, shouldGenerate]);

  const src = !shouldGenerate || failed ? fallbackImage : cover;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
      ) : (
        <div className="w-full h-full bg-neutral-lightest animate-pulse" />
      )}
    </div>
  );
};

export default PdfThumbnail;
