import React, { useState } from "react";
import { Table, Button, Pagination } from "flowbite-react";

interface BlogContent {
    heading: string;
    paragraphs: string[];
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

interface BlogAdminTableProps {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

const BlogAdminTable: React.FC<BlogAdminTableProps> = ({
                                                           blogs,
                                                           onEdit,
                                                           onDelete,
                                                           onAdd,
                                                       }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    // Calculate the current entries to display
    const indexOfLastBlog = currentPage * entriesPerPage;
    const indexOfFirstBlog = indexOfLastBlog - entriesPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate total pages
    const totalPages = Math.ceil(blogs.length / entriesPerPage);

    return (
        <div>
            <Button onClick={onAdd} className="mt-4 switzer-sb text-neutral-dark">
                + Add New Blog
            </Button>
            <Table className="switzer-r" striped>
                <Table.Head className="w-full">
                    <Table.HeadCell>#</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentBlogs.map((blog, index) => (
                        <Table.Row
                            key={blog._id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {indexOfFirstBlog + index + 1}
                            </Table.Cell>
                            <Table.Cell>{blog.title}</Table.Cell>
                            <Table.Cell className="flex space-x-2">
                                <Button
                                    onClick={() => onEdit(blog)}
                                    size="xs"
                                    className="mr-2"
                                    color="success"
                                    pill
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => onDelete(blog._id!)}
                                    size="xs"
                                    color="failure"
                                    pill
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Pagination
                className="mt-4 switzer-r text-xs"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BlogAdminTable;
