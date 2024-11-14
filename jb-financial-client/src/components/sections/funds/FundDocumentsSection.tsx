import React from "react";

interface Document {
  title: string;
  fileType: string;
  fileSize: string;
  tags: string[];
  buttonText: string;
  filePath: string; // Add filePath to point to the document
  imagePath: string;
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
      {documents.map((doc, index) => (
        <div
          key={index}
          className="flex flex-col py-4 mlg:p-12 gap-4 md:gap-12 border-b-2 border-neutral-lightest"
        >
          <div className="flex gap-4">
            {/* Image with responsive scaling */}
            <img
              src={doc.imagePath}
              alt={doc.title}
              className="w-24 h-30 md:w-32 md:h-40 lg:w-48 lg:h-60 object-cover shadow-md rounded-sm" // Responsive width and height
            />
            <div className="flex flex-col gap-4 md:gap-12 w-full justify-center">
              <div className="flex flex-col gap-2 md:gap-4">
                <h5 className="zodiak-r text-xl md:text-4xl text-neutral-mid">
                  {doc.title}
                </h5>
                <p className="bodyText text-neutral-mid">
                  {doc.fileType} - <span>{doc.fileSize}</span>
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-2 md:gap-6 h-fit">
                  {doc.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="switzer-r text-xs md:text-base text-neutral-mid "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={doc.filePath} // Removed download attribute
                  className="secondary-button-2"
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Security best practice
                >
                  {doc.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FundDocumentsSection;
