import React from 'react';
import { Accordion } from 'flowbite-react';
import JobListing from './JobListing';

interface JobCategory {
    title: string;
    jobs: {
        title: string;
        location: string;
        tags: string[];
        applyLink?: string;
    }[];
}

interface AccordionPanelProps {
    category: JobCategory;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ category }) => {
    return (
        <Accordion.Panel>
            <Accordion.Title className="switzer-sb text-neutral-light focus:text-primary-800 text-base md:text-2xl">
                {category.title}
            </Accordion.Title>
            <Accordion.Content className="p-6">
                {category.jobs.map((job, index) => (
                    <JobListing key={index} {...job} />
                ))}
            </Accordion.Content>
        </Accordion.Panel>
    );
};

export default AccordionPanel;