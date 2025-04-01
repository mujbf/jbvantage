import React from "react";

import ContactFormN from "../components/forms/ContactFormN";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  return (
    <>
      <section className="w-screen h-fit md:h-auto px-4 py-8 md:p-20 2xl:px-40 2xl:py-20 flex flex-col md:flex-row gap-4 md:gap-16 items-center">
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-12 ">
          <h1 className="titleText text-primary-900 mt-[72px] md:mt-0">
            Contact Us
          </h1>
          <p className="bodyText text-neutral-mid">
            For any inquiries, please feel free to reach out to us.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <img src="/icons/mail-primary.svg" alt="Email icon" />
              <p className="bodyText text-neutral-mid">
                <a
                  href="mailto:info.financial@jb.lk"
                  className="hover:text-neutral-dark"
                >
                  info.financial@jb.lk
                </a>{" "}
                <br />
                <a
                  href="mailto:customercare@jb.lk"
                  className="hover:text-neutral-dark"
                >
                  customercare@jb.lk
                </a>
              </p>
            </div>
            <div className="flex gap-4">
              <img src="/icons/phone-primary.svg" alt="Phone icon" />
              <p className="bodyText text-neutral-mid flex flex-col">
                <a href="tel:+94702111999" className="hover:text-neutral-dark">
                  +94 70 211 1999 (Hotline)
                </a>{" "}
                <a href="tel:+94112490900" className="hover:text-neutral-dark">
                  +94 11 249 0900 (General)
                </a>{" "}
                {/* <br /> */}
                <span>(Working Hours: Mon - Fri from 9AM - 5PM)</span>
                {/* <a href="tel:+94112490950" className="hover:text-neutral-dark">
                  +94 11 249 0950
                </a>{" "}
                <br />
                <a href="tel:+94112490952" className="hover:text-neutral-dark">
                  +94 11 249 0952
                </a> */}
              </p>
            </div>
            <div className="flex gap-4">
              <img src="/icons/map-primary.svg" alt="Map icon" />
              <p className="bodyText text-neutral-mid">
                <a
                  href="https://www.google.com/maps?q=150,+St.+Joseph%E2%80%99s+Street,+Colombo+14,+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-dark"
                >
                  150, St. Joseph’s Street, <br />
                  Colombo 14, Sri Lanka.
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <ContactFormN />
        </div>
      </section>
    </>
  );
};

export default Contact;
