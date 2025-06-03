import ColumnsSection from "../components/sections/ColumnsSection";
import AccordionSection from "../components/sections/AccordionSection";

import FundHeader from "../components/sections/funds/FundHeader";
import FundDetailsSection from "../components/sections/funds/FundDetailsSection";
import FundStatsSection from "../components/sections/funds/FundStatsSection";
import FundChart2 from "../components/sections/funds/charts/FundChart2";
import FundStewardSection from "../components/sections/funds/FundStewardSection";
import FundDocumentsSection from "../components/sections/funds/FundDocumentsSection";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants.tsx";

const MMF: React.FC = () => {
  // const groups = [
  //   { title: "30%", description: "YTD Return" },
  //   { title: "30%", description: "12M Return" },
  //   {
  //     title: "15%",
  //     description: "Benchmark 12M Return",
  //   },
  // ];

  const [moneyMarketFundUrl, setMoneyMarketFundUrl] = useState("");
  const [moneyMarketFundUrl2, setMoneyMarketFundUrl2] = useState("");

  useEffect(() => {
    const fetchDocumentUrls = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/fund-doc-urls`);
        const { moneyMarketFundUrl } = response.data;
        const { moneyMarketFundUrl2 } = response.data;
        setMoneyMarketFundUrl(moneyMarketFundUrl);
        setMoneyMarketFundUrl2(moneyMarketFundUrl2);
      } catch (error) {
        console.error("Error fetching document URLs:", error);
      }
    };

    fetchDocumentUrls();
  }, []);
  const paragraphs = [
    "Set up JB Financial's wealth management operation at in 2011 and has worked in private and institutional fund management since 1996. Christine began her career with TD Bank Financial Group of Canada in mutual funds and retail treasury, moving onto private asset management. In Sri Lanka, she worked in corporate finance at CitiNational Investment Bank, Colombo and has independently advised institutions on setting investment policy.​​",
  ];
  const documents = [
    {
      title: "Explanatory Memorandum",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["A detailed overview of fund specifics."],
      buttonText: "View Document",
      filePath: "/docs/mmf/explanatory_memorandum.pdf",
      imagePath: "/images/documents/mmf-em.jpg",
    },
    {
      title: "Trust Deed",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Trust Deed for the fund."],
      buttonText: "View Document",
      filePath: "/docs/mmf/trust_deed.pdf",
      imagePath: "/images/documents/td.jpg",
    },
    {
      title: "Application Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["So we can get to know you."],
      buttonText: "View Document",
      filePath: "/docs/mmf/application_form.pdf",
      imagePath: "/images/documents/pf.jpg",
    },
    {
      title: "Purchase Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Purchase units of the fund."],
      buttonText: "View Document",
      filePath: "/docs/mmf/purchase_form.pdf",
      imagePath: "/images/documents/af.jpg",
    },
    {
      title: "Redemption Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Redeem units of the fund."],
      buttonText: "View Document",
      filePath: "/docs/redemption_form.pdf",
      imagePath: "/images/documents/mmf-rf.jpg",
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
      filePath: "/docs/mmf/application_checklist.pdf",
      imagePath: "/images/documents/ac.jpg",
    },
    {
      title: "Monthly Factsheet",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Latest monthly factsheet for the fund."],
      buttonText: "View Document",
      filePath: moneyMarketFundUrl,
      imagePath: "/images/documents/mmf-mf.jpg",
    },
    {
      title: "Historical Unit Prices",
      fileType: "XLSX",
      fileSize: "3.9MB",
      tags: ["Historical unit price sheet of the fund."],
      buttonText: "Download File",
      filePath: moneyMarketFundUrl2,
      imagePath: "/images/documents/mmf-hup.jpg",
    },
    // {
    //   title: "GIPS Report",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["GIPS Report for September 2024."],
    //   buttonText: "View Document",
    //   filePath: moneyMarketFundUrl2,
    //   imagePath: "/images/documents/mmf-gr.jpg",
    // },
    // {
    //   title: "Semi Annual Report",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["2024 Semi Annual Report as at June 2024."],
    //   buttonText: "View Document",
    //   filePath: "/docs/mmf/semi_annual_report.pdf",
    //   imagePath: "/images/documents/mmf-sar.jpg",
    // },
  ];
  const fundStats = {
    objective: "Regular income and liquidity",
    strategy: "Invest in short-term corporate issues",
    benchmark: "NDBIB-CRISIL 91 Day T-Bill index",
    investment: "‘Investment grade’, short term instruments",
    fundSize: "LKR 18.33 Billion (Dec '24)",
    totalRatio: "0.80% (Dec 31, 2024)",
  };
  const faqData = [
    {
      question: "What is the minimum investment?",
      answer: "LKR 1 Million.",
    },
    {
      question: "What does the fund primarily invest in?",
      answer:
        "Short-term corporate notes like commercial papers, and trust certificates. It may also invest in fixed deposits and treasury bills.",
    },
    {
      question: "Is this fund suitable for risk-averse investors?",
      answer: "Yes, it's designed for investors with low risk tolerance.",
    },
    {
      question: "Are the returns taxable?",
      answer:
        "Yes, returns are subject to taxation based on the investor's residency status, but can change depending on applicable tax laws.",
    },
    {
      question: "How liquid is this fund?",
      answer:
        "The fund is highly liquid and very suitable as a short term investment.",
    },
  ];

  return (
    <>
      <FundHeader
        title="JB Vantage Money Market Fund"
        description="Consider investing in our Money Market Fund as a better alternative to traditional fixed deposits and bank savings accounts."
        tags={["Flexible", "Attractive Returns"]}
      />
      <FundDetailsSection
        heading="Fund Objectives & Strategy"
        highlightText="Objectives & Strategy"
        description={[
          "The JB Vantage Money Market Fund is intended for the short-term investment of excess cash. The amount of income that a unit holder may receive will be largely dependent on the current interest-rate environment. It suits investors who have a short-term savings goal and seek a competitive yield. Withdrawals are speedy, and the fund is a very good alternative to traditional short-term savings options such as savings accounts or fixed deposits.",
          "Compared to rates “locked in” over a longer time horizon, money market funds will generate less income when rates fall due to their shorter time horizon. Conversely, when interest rates rise, money market fund yields tend to rise faster than longer-term maturity products.",
        ]}
        imageUrl="/images/funds/money-market.jpg"
      />
      <FundStatsSection
        fundType="moneyMarket"
        objective={fundStats.objective}
        strategy={fundStats.strategy}
        benchmark={fundStats.benchmark}
        investment={fundStats.investment}
        investmentTooltip="Rated BBB - and above"
        // fundSize={fundStats.fundSize}
        totalRatio={fundStats.totalRatio}
      />
      <FundChart2
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
        buttonType="primary" // 'primary' | 'secondary'
        buttonLink="/blog"
        blogCategory="Money Market Fund"
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

export default MMF;
