import React from 'react';

interface JobListingProps {
    title: string;
    location: string;
    tags: string[];
    applyLink?: string;
}

const JobListing: React.FC<JobListingProps> = ({ title, location, tags, applyLink }) => {
    return (
        <div className="flex flex-col p-4 md:p-12 gap-4 md:gap-12 border-b-2 border-neutral-lightest">
            <div className="flex flex-col gap-4">
                <h5 className="zodiak-r text-xl md:text-4xl text-neutral-mid">{title}</h5>
                <p className="bodyText text-neutral-mid">{location}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-2 md:gap-6 h-fit">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="switzer-sb text-xs md:text-base text-neutral-mid uppercase px-3 md:px-6 py-2 border border-neutral-mid rounded-lg"
                        >
              {tag}
            </span>
                    ))}
                </div>
                {applyLink ? (
                    <a href={applyLink}>
                        <button className="primary-button">Apply Now</button>
                    </a>
                ) : (
                    <button className="primary-button">Apply Now</button>
                )}
            </div>
        </div>
    );
};

export default JobListing;