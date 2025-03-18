import React, { useState, useEffect } from "react";
import BlogAdminForm from "../../admin/BlogAdminForm";
import BlogAdminTable from "../../admin/BlogAdminTable";
import { SERVER_URL } from "../../../Constants";
import { TextInput, Button } from "flowbite-react";

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

const BlogAdmin: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [featuredBlogId, setFeaturedBlogId] = useState<string>("");
  const [isUpdatingFeatured, setIsUpdatingFeatured] = useState<boolean>(false);
  const [featuredUpdateMessage, setFeaturedUpdateMessage] =
    useState<string>("");

  // New state for carousel blogs - changed to 5 max to match backend validation
  const [carouselBlogIds, setCarouselBlogIds] = useState<string[]>(
    Array(6).fill("")
  );
  const [isUpdatingCarousel, setIsUpdatingCarousel] = useState<boolean>(false);
  const [carouselUpdateMessage, setCarouselUpdateMessage] =
    useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${SERVER_URL}/api/blogs`);
      const blogsData: Blog[] = await response.json();
      setBlogs(blogsData);
    };
    fetchFeaturedBlog();
    fetchCarouselBlogs();
    fetchBlogs();
  }, []);

  const fetchFeaturedBlog = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/feature-blog`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && data.data.blogId) {
          setFeaturedBlogId(data.data.blogId);
        }
      }
    } catch (error) {
      console.error("Error fetching featured blog:", error);
    }
  };

  // New function to fetch carousel blogs
  const fetchCarouselBlogs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/latest-blogs`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && data.data.blogIds) {
          // Fill the state array with the fetched IDs and pad with empty strings if less than 5
          const fetchedIds = data.data.blogIds;
          const paddedIds = [
            ...fetchedIds,
            ...Array(6 - fetchedIds.length).fill(""),
          ];
          setCarouselBlogIds(paddedIds.slice(0, 6));
        }
      }
    } catch (error) {
      console.error("Error fetching carousel blogs:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedBlogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(updatedBlogs);
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleAdd = () => {
    const newBlog: Blog = {
      category: "",
      duration: "",
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      content: [],
    };
    setSelectedBlog(newBlog);
  };

  const handleSave = async (blog: Blog) => {
    try {
      if (blog._id) {
        // Update existing blog
        const response = await fetch(`${SERVER_URL}/api/blogs/${blog._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        });

        if (response.ok) {
          const updatedBlog = await response.json();
          console.log("Blog updated successfully:", updatedBlog);

          // Update the local state with the updated blog
          const updatedBlogs = blogs.map((b) =>
            b._id === blog._id ? updatedBlog : b
          );
          setBlogs(updatedBlogs);
        } else {
          console.error("Failed to update blog");
        }
      } else {
        // Create new blog (ensure _id is not included)
        const response = await fetch(`${SERVER_URL}/api/blogs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        });

        if (response.ok) {
          const newBlog = await response.json();
          setBlogs([...blogs, newBlog]);
        } else {
          console.error("Failed to create blog");
        }
      }

      setSelectedBlog(null);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleCancel = () => {
    setSelectedBlog(null);
  };

  const handleFeaturedBlogIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFeaturedBlogId(e.target.value);
  };

  // New function to handle carousel blog ID changes
  const handleCarouselBlogIdChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCarouselBlogIds = [...carouselBlogIds];
    newCarouselBlogIds[index] = e.target.value;
    setCarouselBlogIds(newCarouselBlogIds);
  };

  const handleSetFeaturedBlog = async () => {
    if (!featuredBlogId.trim()) {
      setFeaturedUpdateMessage("Please enter a valid blog ID");
      return;
    }

    setIsUpdatingFeatured(true);
    setFeaturedUpdateMessage("");

    try {
      const response = await fetch(`${SERVER_URL}/api/feature-blog`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: featuredBlogId }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setFeaturedUpdateMessage("Featured blog updated successfully!");
        } else {
          setFeaturedUpdateMessage("Failed to update featured blog");
        }
      } else {
        setFeaturedUpdateMessage("Failed to update featured blog");
      }
    } catch (error) {
      console.error("Error setting featured blog:", error);
      setFeaturedUpdateMessage("Error setting featured blog");
    } finally {
      setIsUpdatingFeatured(false);
    }
  };

  // New function to handle setting carousel blogs
  const handleSetCarouselBlogs = async () => {
    // Filter out empty strings from the carousel blog IDs
    const filteredIds = carouselBlogIds.filter((id) => id.trim() !== "");

    if (filteredIds.length === 0) {
      setCarouselUpdateMessage("Please enter at least one valid blog ID");
      return;
    }

    // Backend validates max 6 items, so ensure we're not exceeding that
    if (filteredIds.length > 6) {
      setCarouselUpdateMessage("Maximum 6 blog IDs are allowed");
      return;
    }

    setIsUpdatingCarousel(true);
    setCarouselUpdateMessage("");

    try {
      const response = await fetch(`${SERVER_URL}/api/latest-blogs`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogIds: filteredIds }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setCarouselUpdateMessage("Carousel blogs updated successfully!");
          // Refresh the carousel blogs to ensure UI reflects the server state
          fetchCarouselBlogs();
        } else {
          setCarouselUpdateMessage(
            result.message || "Failed to update carousel blogs"
          );
        }
      } else {
        const errorData = await response.json();
        setCarouselUpdateMessage(
          errorData.message || "Failed to update carousel blogs"
        );
      }
    } catch (error) {
      console.error("Error setting carousel blogs:", error);
      setCarouselUpdateMessage("Error setting carousel blogs");
    } finally {
      setIsUpdatingCarousel(false);
    }
  };

  return (
    <section className="w-full bg-off-white px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16 items-start">
      <h3 className="switzer-sb text-xl md:text-4xl">Blogs</h3>
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-full">
        <div className="w-full md:w-1/4">
          <div className="overflow-x-auto">
            <BlogAdminTable
              blogs={blogs}
              onEdit={handleEdit}
              onDelete={(id) => handleDelete(id)}
              onAdd={handleAdd}
            />
            {/* Featured Blog */}
            <div className="flex w-full flex-col gap-4 md:gap-4 p-4 shadow-md rounded-2xl bg-off-white mt-8">
              <p className="switzer-sb text-sm md:text-xl text-neutral-mid">
                Set Featured Blog
              </p>
              <p className="switzer-r text-sm">Paste Blog ID</p>
              <TextInput
                id="featuredBlogId"
                type="text"
                value={featuredBlogId}
                onChange={handleFeaturedBlogIdChange}
                required
                shadow
                className="switzer-r"
              />
              {featuredUpdateMessage && (
                <p
                  className={`switzer-r text-sm ${
                    featuredUpdateMessage.includes("success")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {featuredUpdateMessage}
                </p>
              )}
              <Button
                type="button"
                className="primary-button switzer-md mt-2"
                onClick={handleSetFeaturedBlog}
                disabled={isUpdatingFeatured}
              >
                {isUpdatingFeatured ? "Updating..." : "Set as Featured Blog"}
              </Button>
            </div>

            {/* Carousel Blogs */}
            <div className="flex w-full flex-col gap-4 md:gap-4 p-4 shadow-md rounded-2xl bg-off-white mt-8">
              <p className="switzer-sb text-sm md:text-xl text-neutral-mid">
                Set Carousel Blogs
              </p>
              <p className="switzer-r text-sm">Paste Blog IDs (maximum 5)</p>
              {carouselBlogIds.map((id, index) => (
                <TextInput
                  key={`carousel-blog-${index}`}
                  id={`carouselBlogId-${index}`}
                  type="text"
                  value={id}
                  onChange={(e) => handleCarouselBlogIdChange(e, index)}
                  placeholder={`Blog ID ${index + 1}`}
                  required={index === 0}
                  shadow
                  className="switzer-r"
                />
              ))}
              {carouselUpdateMessage && (
                <p
                  className={`switzer-r text-sm ${
                    carouselUpdateMessage.includes("success")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {carouselUpdateMessage}
                </p>
              )}
              <Button
                type="button"
                className="primary-button switzer-md mt-2"
                onClick={handleSetCarouselBlogs}
                disabled={isUpdatingCarousel}
              >
                {isUpdatingCarousel ? "Updating..." : "Set Carousel Blogs"}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          {selectedBlog && (
            <BlogAdminForm
              blog={selectedBlog}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogAdmin;
