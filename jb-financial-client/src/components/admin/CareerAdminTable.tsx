import React, { useState } from "react";
import { Table, Button, Pagination } from "flowbite-react";

interface CareerContent {
    heading: string;
    paragraphs: string[];
}

interface Career {
    _id?: string;
    title: string;
    location: string;
    category: string;
    tags: string[];  // Updated to array of strings
    content: CareerContent[];
}

interface CareerAdminTableProps {
    careers: Career[];
    onEdit: (career: Career) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

const CareerAdminTable: React.FC<CareerAdminTableProps> = ({
                                                               careers,
                                                               onEdit,
                                                               onDelete,
                                                               onAdd,
                                                           }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    // Calculate the current entries to display
    const indexOfLastCareer = currentPage * entriesPerPage;
    const indexOfFirstCareer = indexOfLastCareer - entriesPerPage;
    const currentCareers = careers.slice(indexOfFirstCareer, indexOfLastCareer);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate total pages
    const totalPages = Math.ceil(careers.length / entriesPerPage);

    return (
        <div>
            <Button onClick={onAdd} className="mt-4 switzer-sb text-neutral-dark">
                + Add New Career
            </Button>
            <Table className="switzer-r" striped>
                <Table.Head className="w-full">
                    <Table.HeadCell>#</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Location</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentCareers.map((career, index) => (
                        <Table.Row
                            key={career._id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {indexOfFirstCareer + index + 1}
                            </Table.Cell>
                            <Table.Cell>{career.title}</Table.Cell>
                            <Table.Cell>{career.location}</Table.Cell>
                            <Table.Cell className="flex space-x-2">
                                <Button
                                    onClick={() => onEdit(career)}
                                    size="xs"
                                    className="mr-2"
                                    color="success"
                                    pill
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => onDelete(career._id!)}
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

export default CareerAdminTable;
