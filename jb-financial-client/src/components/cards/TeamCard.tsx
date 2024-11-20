import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaTimes } from "react-icons/fa"; // Importing close icon from react-icons
import { ReadCvLogo } from "@phosphor-icons/react";

interface TeamCardProps {
  name: string;
  designation: string;
  imageUrl: string;
  description: string; // Added description field
}

const teamCardData: TeamCardProps[] = [
  {
    name: "Christine Dias Bandaranaike, CFA",
    designation: "CEO & Portfolio Manager",
    imageUrl: "/images/team/christine.png",
    description:
      "Set up JB Financial's (JBF) wealth management operation at in 2011 and has worked in private and institutional fund management since 1996. Christine began her career with TD Bank Financial Group of Canada in mutual funds and retail treasury, moving onto private asset management. In Sri Lanka, she worked in corporate finance at CitiNational Investment Bank, Colombo and independently advised institutions on setting investment policy.",
  },
  {
    name: "Murtaza Jafferjee, CFA",
    designation: "Director & Chief Strategist",
    imageUrl: "/images/team/murtaza.png",
    description:
      "Worked in the Sri Lankan equity market since 1994. He is a former director at Nations Trust Bank PLC, Serendib Hotels PLC and the Colombo Stock Exchange and is a past President of CFA Sri Lanka. He is the current chair of Advocata, a policy think tank based in Colombo.",
  },
  {
    name: "Sonali Perera",
    designation: "Chief Ethics and Compliance Officer",
    imageUrl: "/images/team/sonali.png",
    description:
      "Sonali joined JBF in 2013 and set up robust processes to prevent fraud, manage conflicts of interest and uphold fiduciary responsibility towards clients. She has over two decades of experience in banking and finance. She began her financial career with Deutsche Bank AG, Colombo branch in 1996, including several years in Trustee & Fund Management Operations.",
  },
  {
    name: "Sashika Wickramaratne",
    designation: "Portfolio Manager & CIO",
    imageUrl: "/images/team/sashika.png",
    description:
      "Sashika joined JBF in 2023 as the Chief Investment Officer and Portfolio Manager, primarily focused on the private wealth portfolios and the unit trusts. Prior to joining JB, he served as Vice President at Capital Alliance Investments and Assistant Vice President Treasury at Softlogic Life managing unit trusts and insurance portfolios.",
  },
  // {
  //   name: "Nirodh Weliwitigoda",
  //   designation: "Assistant Portfolio Manager",
  //   imageUrl: "/images/team/nirodh.png",
  //   description:
  //     "Nirodh joined JBF in 2023 as an assistant portfolio manager. He focuses mainly on the Gilt and Money Market unit trusts. Prior to JBF he worked at the investment department of Union Assurance. He holds an MBA in Finance from University of Colombo and a B.B Mgt Finance (Special) degree from the University of Kelaniya.",
  // },
  {
    name: "Jehan Fernando",
    designation: "Head of Sales",
    imageUrl: "/images/team/jehan.png",
    description:
      "Jehan joined JBF in 2021 as an Investment Specialist and now heads the sales team, setting sales targets and conducting sales and competitor analysis. Prior to JBF, Jehan counts 12.5 years of extensive customer and operations experience at Standard Chartered Bank, Colombo",
  },
  {
    name: "Shanuka Jayaweera",
    designation: "Head of Operations",
    imageUrl: "/images/team/shanuka.png",
    description:
      "Shanuka joined JBF in 2014 as its Senior Fund Accountant and now heads both the unit trust and private wealth management operations. She is responsible for fund valuations, financial accounts of the funds and overall operational reporting and trade verification. Formerly at KPMG, Sri Lanka, she spent 3.5 years with the firm.",
  },
  {
    name: "Avishka de Silva",
    designation: "Assistant Portfolio Manager",
    imageUrl: "/images/team/avishka.png",
    description:
      "Avishka joined in 2024. Prior to JBF, he worked at Acuity Knowledge Partners as an investment research analyst serving a US-based hedge fund client. He graduated with a BCom (Major in Econometrics and Minor in Actuarial Studies) from Monash University, Australia. Avishka has completed the CFA program and is a pending charter holder.",
  },
  {
    name: "Malmi Dewage",
    designation: "Portfolio Assistant",
    imageUrl: "/images/team/malmi.png",
    description:
      "Malmi joined JBF in Feb. 2024 as a Portfolio Assistant and primarily focuses on daily UT cash flows management, monthly and quarterly portfolio performance report preparation and supporting the portfolio managers. She graduated with a second-class upper division in BSc. Hons. in Financial Management from Sabaragamuwa University of Sri Lanka.",
  },
  {
    name: "Pavithra Karunakaran",
    designation: "Fund Accountant",
    imageUrl: "/images/team/pavithra.png",
    description:
      "Pavithra joined JBF in 2021 as assistant Fund Accountant after 1.5 years at HSBC. She performs the daily valuations of the Gilt and other unit trusts as well as providing back office support for all investment transactions. Pavithra holds a BA Hons in Business Administration and has completed the Strategic level at CA Sri Lanka",
  },
  {
    name: "Dhanushika Saubhagya",
    designation: "Registrar",
    imageUrl: "/images/team/danu.png",
    description:
      "Dhanushika joined JBF in 2018 as Assistant Registrar and now takes overall responsibility for the registrar function at JBF. Dhanushika counts 2 years experience in finance with Swarnamahal Finance prior to joining. Dhanushika has completed a postgraduate Diploma (Pearson BTEC L7) Strategic Management & Leadership",
  },
];

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  designation,
  imageUrl,
  description,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300 p-8 md:p-12 gap-8 md:gap-12 items-center">
      <img src={imageUrl} alt={name} className="w-60 h-auto rounded-full" />
      <div className="flex flex-col gap-1 items-center">
        <h5 className="switzer-sb text-lg md:text-2xl primaryText text-center">
          {name}
        </h5>
        <p className="bodyText text-neutral-light text-center">{designation}</p>
        <button
          onClick={() => setOpen(true)}
          className="flex justify-center mt-4 p-3 border border-neutral-light hover:shadow-md hover:border-primary-900 rounded-full w-fit"
        >
          <ReadCvLogo size={24} color="#930010" className="info-icon" />
        </button>
        <Popup
          open={open}
          onClose={() => setOpen(false)}
          modal
          contentStyle={{
            width: "95%",
            maxWidth: "800px",
            borderRadius: "16px",
            padding: 0,
            border: "none",
          }}
          overlayStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="popup-content p-6 bg-white rounded-lg shadow-lg w-full mx-auto flex flex-col gap-4">
            {/* Close Icon */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="switzer-sb text-lg md:text-2xl primaryText">
              {name}
            </h2>
            <p className="regularText text-neutral-mid">{description}</p>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export { TeamCard, teamCardData };
