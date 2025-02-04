import ColumnsSection from "../components/sections/ColumnsSection";
import AccordionSection from "../components/sections/AccordionSection";

import FundHeader from "../components/sections/funds/FundHeader";
import FundDetailsSection from "../components/sections/funds/FundDetailsSection";
import FundStatsSection from "../components/sections/funds/FundStatsSection";
import FundChart3 from "../components/sections/funds/charts/FundChart3";
import FundStewardSection from "../components/sections/funds/FundStewardSection";
import FundDocumentsSection from "../components/sections/funds/FundDocumentsSection";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants.tsx";

const SGF: React.FC = () => {
  // const groups = [
  //   { title: "30%", description: "7 Day Yield" },
  //   { title: "30%", description: "12M Return" },
  //   {
  //     title: "15%",
  //     description: "Benchmark 12M Return",
  //   },
  // ];

  const [shortTermGiltFundUrl, setShortTermGiltFundUrl] = useState("");
  const [shortTermGiltFundUrl2, setShortTermGiltFundUrl2] = useState("");

  useEffect(() => {
    const fetchDocumentUrl = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/fund-doc-urls`);
        const { shortTermGiltFundUrl } = response.data;
        const { shortTermGiltFundUrl2 } = response.data;
        setShortTermGiltFundUrl(shortTermGiltFundUrl);
        setShortTermGiltFundUrl2(shortTermGiltFundUrl2);
      } catch (error) {
        console.error("Error fetching document URL:", error);
      }
    };

    fetchDocumentUrl();
  }, []);
  const paragraphs = [
    "Set up JB Financial's wealth management operation at in 2011 and has worked in private and institutional fund management since 1996. Christine began her career with TD Bank Financial Group of Canada in mutual funds and retail treasury, moving onto private asset management. In Sri Lanka, she worked in corporate finance at CitiNational Investment Bank, Colombo and has independently advised institutions on setting investment policy.​",
  ];
  const documents = [
    {
      title: "Explanatory Memorandum",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["A detailed overview of fund specifics."],
      buttonText: "View Document",
      filePath: "/docs/sgf/explanatory_memorandum.pdf",
      imagePath: "/images/documents/sgf-em.jpg",
    },
    {
      title: "Trust Deed",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Trust Deed for the fund."],
      buttonText: "View Document",
      filePath: "/docs/sgf/trust_deed.pdf",
      imagePath: "/images/documents/td.jpg",
    },
    {
      title: "Application Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["So we can get to know you."],
      buttonText: "View Document",
      filePath: "/docs/sgf/application_form.pdf",
      imagePath: "/images/documents/pf.jpg",
    },
    {
      title: "Purchase Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Purchase units of the fund."],
      buttonText: "View Document",
      filePath: "/docs/sgf/purchase_form.pdf",
      imagePath: "/images/documents/af.jpg",
    },
    {
      title: "KYC Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["KYC Form for JB Vantage Unit Holders"],
      buttonText: "View Document",
      filePath: "/docs/kyc_compliance.pdf",
      imagePath: "/images/documents/kyc.jpg",
    },
    {
      title: "Nominee Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["JBF Nominee Form"],
      buttonText: "View Document",
      filePath: "/docs/nominee_form.pdf",
      imagePath: "/images/documents/nominee.jpg",
    },
    {
      title: "Application Checklist",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Check whether your application is complete."],
      buttonText: "View Document",
      filePath: "/docs/sgf/application_checklist.pdf",
      imagePath: "/images/documents/ac.jpg",
    },
    {
      title: "Monthly Factsheet",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Latest monthly factsheet for the fund."],
      buttonText: "View Document",
      filePath: shortTermGiltFundUrl,
      imagePath: "/images/documents/sgf-mf.jpg",
    },
    {
      title: "Historical Unit Prices",
      fileType: "XLSX",
      fileSize: "3.9MB",
      tags: ["Historical unit price sheet of the fund."],
      buttonText: "Download File",
      filePath: shortTermGiltFundUrl2,
      imagePath: "/images/documents/sgf-hup.jpg",
    },
    // {
    //   title: "GIPS Report",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["GIPS Report for September 2024."],
    //   buttonText: "View Document",
    //   filePath: shortTermGiltFundUrl2,
    //   imagePath: "/images/documents/sgf-gr.jpg",
    // },
    // {
    //   title: "Semi Annual Report",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["2024 Semi Annual Report as at June 2024."],
    //   buttonText: "View Document",
    //   filePath: "/docs/sgf/semi_annual_report.pdf",
    //   imagePath: "/images/documents/sgf-sar.jpg",
    // },
  ];
  const fundStats = {
    objective: "Capital preservation with moderate returns",
    strategy: "Invest in government securities",
    benchmark: "NDBIB-CRISIL 91 Day T-Bill index",
    investment: "Short-term government securities and REPOs",
    fundSize: "LKR 2.58 Billion (Dec '24)",
    totalRatio: "0.56% (Dec 31, 2023)",
  };
  const faqData = [
    {
      question: "What is the minimum investment?",
      answer: "LKR 1 Million.",
    },
    {
      question: "What securities does this fund invest in?",
      answer: "Government securities like treasury bills, bonds and REPOs.",
    },
    {
      question: "Is this fund regulated?",
      answer:
        "Yes, like all our other funds, it's regulated by the Securities and Exchange Commission of Sri Lanka.",
    },
    {
      question: "How does the risk level compare to other funds?",
      answer:
        "This fund has a lower risk compared to most investments including regular bank savings accounts, money market funds holding corporate securities, and equity funds.",
    },
    {
      question: "Is this fund suitable for short-term investing?",
      answer:
        "Yes, it's designed for short-term investors seeking safety and liquidity.",
    },
  ];

  return (
    <>
      <FundHeader
        title="JB Vantage Short Term Gilt Fund"
        description="Consider investing in our Short Term Gilt Fund to gain exposure to relatively risk-free investments such as T-bills and bonds."
        tags={["Flexible", "Low-Risk"]}
      />
      <FundDetailsSection
        heading="Fund Objectives & Strategy"
        highlightText="Objectives & Strategy"
        description={[
          "The JB Vantage Short Term Gilt Fund specializes in investing in gilt-edged securities issued or guaranteed by the Government of Sri Lanka. Common examples of such instruments are treasury bills, treasury bonds and repurchase agreements (REPOs).",
          "Treasury funds are generally expected to be a low risk investment category when compared to both equity and money market funds. However, any dividend paid, or interest accruing will change in line with changes in current interest rates due to the short-term and liquid nature of the fund.",
        ]}
        imageUrl="/images/funds/short-term-gilt.jpg"
      />
      <FundStatsSection
        fundType="shortTermGilt"
        objective={fundStats.objective}
        strategy={fundStats.strategy}
        benchmark={fundStats.benchmark}
        investment={fundStats.investment}
        // fundSize={fundStats.fundSize}
        totalRatio={fundStats.totalRatio}
      />
      <FundChart3
        // groups={groups}
        mainTitle="The numbers speak for themselves"
        mainDescription="For more than a decade, we have remained at the forefront of investment management in Sri Lanka. Our continuous growth is testament to our ability to generate healthy returns for our clients."
        primaryButtonText=""
        secondaryButtonText=""
      />
      <FundDocumentsSection
        sectionTitle="Fund Documents"
        description="Explore our current up to date insights on the fund."
        documents={documents}
      />
      <ColumnsSection
        subtitleText="Notes from our Portfolio Manager"
        bodyText="Performance reviews, insights on the economic climate, and more."
        buttonText="View all notes"
        buttonLink="/blog"
        blogCategory="Short Term Gilt Fund"
        buttonType="primary" // 'primary' | 'secondary'
        cardType="blog"
        alignText="left" // Change to "left" or "center"
      />
      <FundStewardSection
        name="Christine Dias Bandaranaike, CFA"
        designation="Portfolio Manager & CEO"
        imageSrc="/images/team/christine.png"
        paragraphs={paragraphs}
      />
      <AccordionSection
        title="Frequently Asked Questions"
        highlightedText="Questions"
        description="Here are some of the most common questions about our services."
        accordionType="faq"
        accordionProps={{ faqs: faqData }}
      />

      <ColumnsSection
        subtitleText="Contact Us"
        bodyText=""
        buttonText=""
        buttonType="primary"
        cardType="contact"
        alignText="left"
      />
    </>
  );
};

export default SGF;
