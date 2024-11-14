import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

interface CareerContent {
  heading: string;
  paragraphs: string[];
}

interface Career {
  _id?: string;
  title: string;
  location: string;
  category: string;
  tags: string[]; // Updated to array of strings
  content: CareerContent[];
}

interface CareerAdminFormProps {
  career: Career;
  onSave: (career: Career) => void;
  onCancel: () => void;
}

const CareerAdminForm: React.FC<CareerAdminFormProps> = ({
  career: initialCareer,
  onSave,
  onCancel,
}) => {
  const [career, setCareer] = useState<Career>(initialCareer);

  useEffect(() => {
    setCareer(initialCareer);
  }, [initialCareer]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // If the field being updated is 'tags', split it by commas into an array
    if (id === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setCareer((prevCareer) => ({ ...prevCareer, tags: tagsArray }));
    } else {
      setCareer((prevCareer) => ({ ...prevCareer, [id]: value }));
    }
  };

  const handleSectionChange = (
    index: number,
    field: "heading" | "paragraphs",
    value: string | string[],
    paragraphIndex?: number
  ) => {
    const updatedContent = [...career.content];
    if (field === "paragraphs" && paragraphIndex !== undefined) {
      const updatedParagraphs = [...updatedContent[index].paragraphs];
      updatedParagraphs[paragraphIndex] = value as string;
      updatedContent[index] = {
        ...updatedContent[index],
        paragraphs: updatedParagraphs,
      };
    } else {
      updatedContent[index] = { ...updatedContent[index], [field]: value };
    }
    setCareer((prevCareer) => ({ ...prevCareer, content: updatedContent }));
  };

  const addSection = () => {
    setCareer((prevCareer) => ({
      ...prevCareer,
      content: [...prevCareer.content, { heading: "", paragraphs: [""] }],
    }));
  };

  const removeSection = (index: number) => {
    setCareer((prevCareer) => ({
      ...prevCareer,
      content: prevCareer.content.filter((_, i) => i !== index),
    }));
  };

  const addParagraph = (index: number) => {
    setCareer((prevCareer) => {
      const updatedContent = [...prevCareer.content];
      updatedContent[index].paragraphs.push("");
      return { ...prevCareer, content: updatedContent };
    });
  };

  const removeParagraph = (sectionIndex: number, paragraphIndex: number) => {
    setCareer((prevCareer) => {
      const updatedContent = [...prevCareer.content];
      updatedContent[sectionIndex].paragraphs = updatedContent[
        sectionIndex
      ].paragraphs.filter((_, i) => i !== paragraphIndex);
      return { ...prevCareer, content: updatedContent };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(career);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 md:gap-4 p-4 shadow-md rounded-2xl bg-off-white"
    >
      <h4 className="switzer-sb text-base md:text-2xl">Career Editor</h4>
      <p className="switzer-sb text-sm md:text-xl text-neutral-mid">
        {career._id ? "Edit Career" : "Create New Career"}
      </p>
      {career._id && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="mb-2 block">
              <Label htmlFor="_id" value="Career ID" className="switzer-md" />
            </div>
            <TextInput
              id="_id"
              type="text"
              value={career._id}
              readOnly
              required
              shadow
              className="switzer-r"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="title"
              value="Career Title"
              className="switzer-md"
            />
          </div>
          <TextInput
            id="title"
            type="text"
            value={career.title}
            onChange={handleInputChange}
            required
            shadow
            className="switzer-r"
          />
        </div>
        <div className="flex-grow">
          <div className="mb-2 block">
            <Label htmlFor="location" value="Location" className="switzer-md" />
          </div>
          <TextInput
            id="location"
            type="text"
            value={career.location}
            onChange={handleInputChange}
            required
            shadow
            className="switzer-r"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="category"
              value="Job Category"
              className="switzer-md"
            />
          </div>
          <TextInput
            id="category"
            type="text"
            value={career.category}
            onChange={handleInputChange}
            required
            shadow
            className="switzer-r"
          />
        </div>
        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="tags"
              value="Tags (Comma Separated)"
              className="switzer-md"
            />
          </div>
          <TextInput
            id="tags"
            type="text"
            value={career.tags.join(", ")} // Convert array back to comma-separated string for display
            onChange={handleInputChange}
            shadow
            className="switzer-r"
          />
        </div>
      </div>
      <div>
        <h5 className="switzer-sb text-sm md:text-xl text-neutral-mid">
          Career Content Sections
        </h5>
        {career.content.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-4 mt-4">
            <div className="mb-2 block">
              <Label
                htmlFor={`section-${sectionIndex}-heading`}
                value={`Section ${sectionIndex + 1} : Heading`}
                className="switzer-md"
              />
            </div>
            <TextInput
              id={`section-${sectionIndex}-heading`}
              type="text"
              value={section.heading}
              onChange={(e) =>
                handleSectionChange(sectionIndex, "heading", e.target.value)
              }
              required
              shadow
              className="switzer-r"
            />
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <div key={paragraphIndex} className="flex flex-col gap-2">
                <div className="mb-2 block">
                  <Label
                    htmlFor={`section-${sectionIndex}-paragraph-${paragraphIndex}`}
                    value={`Section ${sectionIndex + 1} : Paragraph ${
                      paragraphIndex + 1
                    }`}
                    className="switzer-md"
                  />
                </div>
                <Textarea
                  id={`section-${sectionIndex}-paragraph-${paragraphIndex}`}
                  value={paragraph}
                  onChange={(e) =>
                    handleSectionChange(
                      sectionIndex,
                      "paragraphs",
                      e.target.value,
                      paragraphIndex
                    )
                  }
                  required
                  shadow
                  className="switzer-r h-32"
                />
                {section.paragraphs.length > 1 && (
                  <Button
                    pill
                    type="button"
                    color="failure"
                    onClick={() =>
                      removeParagraph(sectionIndex, paragraphIndex)
                    }
                    className="switzer-r w-fit"
                  >
                    Remove Paragraph
                  </Button>
                )}
              </div>
            ))}
            <Button
              pill
              type="button"
              color="success"
              onClick={() => addParagraph(sectionIndex)}
              className="switzer-r mt-2 w-fit"
            >
              + Add New Paragraph
            </Button>
            <Button
              pill
              type="button"
              color="failure"
              onClick={() => removeSection(sectionIndex)}
              className="switzer-r mt-4"
            >
              Remove Section
            </Button>
          </div>
        ))}
        <Button
          pill
          type="button"
          color="success"
          onClick={addSection}
          className="switzer-r mt-4 w-full"
        >
          + Add New Section
        </Button>
      </div>
      <hr />
      <div className="flex gap-4 mt-8">
        <Button type="submit" className="primary-button switzer-md">
          {career._id ? "Update Career" : "Create Career"}
        </Button>
        <Button
          type="button"
          color="failure"
          onClick={onCancel}
          className="switzer-r secondary-button"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CareerAdminForm;
