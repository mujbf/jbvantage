import React, { useState, useEffect } from "react";
import BlogAdminForm from "../../admin/BlogAdminForm";
import BlogAdminTable from "../../admin/BlogAdminTable";
import { SERVER_URL } from "../../../Constants";

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

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${SERVER_URL}/api/blogs`);
      const blogsData: Blog[] = await response.json();
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

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
