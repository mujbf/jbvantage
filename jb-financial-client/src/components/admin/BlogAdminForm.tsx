import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Select, Textarea } from "flowbite-react";
import axios from "axios";
import { SERVER_URL } from "../../Constants.tsx"; // Import axios for the image upload functionality

interface BlogContent {
  heading: string;
  paragraphs: string[];
  imageUrl?: string;
}

interface Blog {
  _id?: string; // Modified _id to a simple string to align with MongoDB ObjectId
  category: string;
  duration: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  content: BlogContent[];
}

interface BlogAdminFormProps {
  blog: Blog;
  onSave: (blog: Blog) => void;
  onCancel: () => void;
}

const BlogAdminForm: React.FC<BlogAdminFormProps> = ({
  blog: initialBlog,
  onSave,
  onCancel,
}) => {
  const [blog, setBlog] = useState<Blog>(initialBlog);
  const [file, setFile] = useState<File | null>(null); // State for managing file upload
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [sectionFiles, setSectionFiles] = useState<(File | null)[]>(
    new Array(initialBlog.content.length).fill(null)
  );

  useEffect(() => {
    setBlog(initialBlog);
  }, [initialBlog]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setBlog({ ...blog, [id]: value });
  };

  const handleSectionChange = (
    index: number,
    field: "heading" | "paragraphs" | "imageUrl",
    value: string | string[],
    paragraphIndex?: number
  ) => {
    const updatedContent = [...blog.content];
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
    setBlog({ ...blog, content: updatedContent });
  };

  const handleSectionFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const updatedSectionFiles = [...sectionFiles];
      updatedSectionFiles[index] = selectedFile;
      setSectionFiles(updatedSectionFiles);
    }
  };

  const handleSectionUpload = async (index: number) => {
    if (!sectionFiles[index]) {
      setUploadStatus(`No file selected for section ${index + 1}`);
      return;
    }

    const formData = new FormData();
    formData.append("image", sectionFiles[index]!);

    try {
      setUploadStatus(`Uploading image for section ${index + 1}...`);
      const response = await axios.post(`${SERVER_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus(
        `Upload successful for section ${index + 1}! Image URL saved.`
      );
      console.log("Server response:", response.data);

      const updatedContent = [...blog.content];
      updatedContent[index].imageUrl = response.data.imageUrl;
      setBlog({ ...blog, content: updatedContent });
    } catch (error) {
      setUploadStatus(
        `Upload failed for section ${index + 1}. Please try again.`
      );
      console.error("Upload error:", error);
    }
  };

  const addSection = () => {
    setBlog({
      ...blog,
      content: [
        ...blog.content,
        { heading: "", paragraphs: [""], imageUrl: "" },
      ],
    });
    setSectionFiles([...sectionFiles, null]);
  };

  const removeSection = (index: number) => {
    const updatedContent = blog.content.filter((_, i) => i !== index);
    setBlog({ ...blog, content: updatedContent });
    setSectionFiles(sectionFiles.filter((_, i) => i !== index));
  };

  const addParagraph = (index: number) => {
    const updatedContent = [...blog.content];
    updatedContent[index].paragraphs.push("");
    setBlog({ ...blog, content: updatedContent });
  };

  const removeParagraph = (sectionIndex: number, paragraphIndex: number) => {
    const updatedContent = [...blog.content];
    updatedContent[sectionIndex].paragraphs = updatedContent[
      sectionIndex
    ].paragraphs.filter((_, i) => i !== paragraphIndex);
    setBlog({ ...blog, content: updatedContent });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(`${SERVER_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("Upload successful! Image URL saved to database.");
      console.log("Server response:", response.data);

      // Update the blog state with the new image URL
      setBlog({ ...blog, imageUrl: response.data.imageUrl });
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(blog);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 md:gap-4 p-4 shadow-md rounded-2xl bg-off-white"
    >
      <h4 className="switzer-sb text-base md:text-2xl">Blog Post Editor</h4>
      <p className="switzer-sb text-sm md:text-xl text-neutral-mid">
        {blog._id ? "Edit Blog Post" : "Create New Blog Post"}
      </p>
      {blog._id && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="mb-2 block">
              <Label htmlFor="_id" value="Blog ID" className="switzer-md" />
            </div>
            <TextInput
              id="_id"
              type="text"
              value={blog._id}
              readOnly
              required
              shadow
              className="switzer-r"
            />
          </div>
        </div>
      )}
      {/* Existing form fields */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="category"
              value="Blog Category"
              className="switzer-md"
            />
          </div>
          <Select
            id="category"
            value={blog.category}
            onChange={handleInputChange}
            required
            className="switzer-r"
          >
            <option value="">Select a Category</option>
            <option>General</option>
            <option>Value Equity Fund</option>
            <option>Money Market Fund</option>
            <option>Short Term Gilt Fund</option>
          </Select>
        </div>
        <div className="flex-grow">
          <div className="mb-2 block">
            <Label
              htmlFor="duration"
              value="Read Time (in minutes)"
              className="switzer-md"
            />
          </div>
          <TextInput
            id="duration"
            type="text"
            value={blog.duration}
            onChange={handleInputChange}
            required
            shadow
            className="switzer-r"
          />
        </div>
      </div>
      <div className="mb-2 block">
        <Label htmlFor="title" value="Blog Title" className="switzer-md" />
      </div>
      <TextInput
        id="title"
        type="text"
        value={blog.title}
        onChange={handleInputChange}
        required
        shadow
        className="switzer-r"
      />
      <div className="mb-2 block">
        <Label
          htmlFor="description"
          value="Blog Description"
          className="switzer-md"
        />
      </div>
      <Textarea
        id="description"
        value={blog.description}
        onChange={handleInputChange}
        required
        shadow
        className="switzer-r h-32"
      />
      {/* Image upload field */}
      <div className="mb-2 block">
        <Label htmlFor="imageUrl" value="Image URL" className="switzer-md" />
      </div>
      <TextInput
        id="imageUrl"
        type="text"
        value={blog.imageUrl}
        onChange={handleInputChange}
        required
        shadow
        className="switzer-r"
      />
      <div className="mb-2 block">
        <Label
          htmlFor="imageUpload"
          value="Upload Image"
          className="switzer-md"
        />
      </div>
      <p className="text-sm switzer-r text-neutral-mid">
        Preferred Size: 491px x 491px
      </p>
      <input
        type="file"
        onChange={handleFileChange}
        className="switzer-r border border-neutral-lighter rounded-lg text-sm w-fit "
      />
      <Button
        type="button"
        onClick={handleUpload}
        className="primary-button switzer-md mt-2"
      >
        Upload Image
      </Button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {/* Rest of the form remains the same */}
      <div>
        <h5 className="switzer-sb text-sm md:text-xl text-neutral-mid">
          Blog Content Sections
        </h5>
        {blog.content.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-4 mt-4">
            <div className="mb-2 block">
              <Label
                htmlFor={`section-${sectionIndex}-heading`}
                value={`Section ${sectionIndex + 1} Heading`}
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

            {/* Section Image Upload */}
            <div className="mb-2 block">
              <Label
                htmlFor={`section-${sectionIndex}-image-url`}
                value={`Section ${sectionIndex + 1} Image`}
                className="switzer-md"
              />
            </div>
            <TextInput
              id={`section-${sectionIndex}-image-url`}
              type="text"
              value={section.imageUrl || ""}
              onChange={(e) =>
                handleSectionChange(sectionIndex, "imageUrl", e.target.value)
              }
              shadow
              className="switzer-r"
            />
            <div className="mb-2 block">
              <Label
                htmlFor={`section-${sectionIndex}-image-upload`}
                value={`Upload Section ${sectionIndex + 1} Image`}
                className="switzer-md"
              />
            </div>
            <input
              type="file"
              onChange={(e) => handleSectionFileChange(e, sectionIndex)}
            />
            <Button
              type="button"
              onClick={() => handleSectionUpload(sectionIndex)}
              className="primary-button switzer-md mt-2"
            >
              Upload Section Image
            </Button>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <div key={paragraphIndex}>
                <div className="mb-2 block">
                  <Label
                    htmlFor={`section-${sectionIndex}-paragraph-${paragraphIndex}`}
                    value={`Section ${sectionIndex + 1} Paragraph ${
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
                <Button
                  type="button"
                  onClick={() => removeParagraph(sectionIndex, paragraphIndex)}
                  className="secondary-button switzer-md mt-2"
                >
                  Remove Paragraph
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addParagraph(sectionIndex)}
              className="secondary-button switzer-md mt-2"
            >
              Add Paragraph
            </Button>
            <Button
              type="button"
              onClick={() => removeSection(sectionIndex)}
              className="secondary-button switzer-md mt-2"
            >
              Remove Section
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addSection}
          className="secondary-button switzer-md mt-2"
        >
          Add Section
        </Button>
      </div>
      <div className="flex justify-between mt-4">
        <Button type="submit" className="primary-button switzer-md">
          Save Blog
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="secondary-button switzer-md"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BlogAdminForm;
