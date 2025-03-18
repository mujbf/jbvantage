import React from "react";

interface ContactCardProps {
  line1: string;
  line2: string;
  line3: string;
  imageUrl: string;
}

const contactCardData: ContactCardProps[] = [
  {
    line1: "info.financial@jb.lk",
    line2: "customercare@jb.lk",
    line3: "",
    imageUrl: "/icons/mail.svg",
  },
  {
    line1: "+94 70 211 1999",
    line2: "(Working Hours: Mon - Fri from 9AM -5PM)",
    line3: "",
    imageUrl: "/icons/phone.svg",
  },
  {
    line1: "150, St. Joseph’s Street,",
    line2: "Colombo 14,",
    line3: "Sri Lanka.",
    imageUrl: "/icons/map.svg",
  },
  // Add more contact card data here if needed
];

const ContactCard: React.FC<ContactCardProps> = ({
  line1,
  line2,
  line3,
  imageUrl,
}) => {
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMapClick = () => {
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${line1} ${line2} ${line3}`
    )}`;
  };

  return (
    <div className="flex items-center gap-4 py-4 md:py-16">
      <img src={imageUrl} alt="" className="w-12 lg:w-auto" />
      <div>
        {line1 && (
          <p
            className="bodyText text-neutral-mid hover:text-neutral-dark cursor-pointer"
            onClick={() => handleEmailClick(line1)}
          >
            {line1}
          </p>
        )}
        {line2 && (
          <p
            className="bodyText text-neutral-mid hover:text-neutral-dark cursor-pointer"
            onClick={() => handlePhoneClick(line2)}
          >
            {line2}
          </p>
        )}
        {line3 && (
          <p
            className="bodyText text-neutral-mid hover:text-neutral-dark cursor-pointer"
            onClick={handleMapClick}
          >
            {line3}
          </p>
        )}
      </div>
    </div>
  );
};

export { ContactCard, contactCardData };
