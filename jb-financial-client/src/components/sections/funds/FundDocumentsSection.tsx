import React from "react";
import PdfThumbnail from "./PdfThumbnail";

interface Document {
  title: string;
  fileType: string;
  fileSize: string;
  tags: string[];
  buttonText: string;
  filePath: string; // Add filePath to point to the document
  imagePath: string; // Fallback cover when one can't be generated from the PDF
}

interface FundDocumentsSectionProps {
  sectionTitle: string;
  description: string;
  documents: Document[];
}

const FundDocumentsSection: React.FC<FundDocumentsSectionProps> = ({
  sectionTitle,
  description,
  documents,
}) => {
  return (
    <section className="bg-white px-4 py-8 md:p-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16">
      <h4 className="subtitleText text-neutral-mid">{sectionTitle}</h4>
      <p className="bodyText text-neutral-mid">{description}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-3 md:p-6 border-2 border-neutral-lightest rounded-md"
          >
            {/* Cover auto-generated from the PDF's first page where possible */}
            <PdfThumbnail
              pdfPath={doc.filePath}
              fallbackImage={doc.imagePath}
              alt={doc.title}
              className="w-full aspect-[1/1.414] shadow-md rounded-sm"
            />
            <div className="flex flex-col gap-2 md:gap-4 flex-1">
              <h5 className="zodiak-r text-lg md:text-2xl text-neutral-mid">
                {doc.title}
              </h5>
              {/* File type pill and description hidden for now
              <p className="bodyText text-neutral-light py-1 px-4 w-fit border-2 border-neutral-lighter rounded-md">
                {doc.fileType}
              </p>
              <div className="flex flex-wrap gap-2 md:gap-6 h-fit">
                {doc.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="switzer-r text-xs md:text-base text-neutral-mid "
                  >
                    {tag}
                  </span>
                ))}
              </div>
              */}
            </div>
            <a
              href={doc.filePath} // Removed download attribute
              className="secondary-button-2 w-full text-center"
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practice
            >
              {doc.buttonText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundDocumentsSection;
