import ColumnsSection from "../components/sections/ColumnsSection";
import AccordionSection from "../components/sections/AccordionSection";

import FundHeader from "../components/sections/funds/FundHeader";
import FundDetailsSection from "../components/sections/funds/FundDetailsSection";
import FundStatsSection from "../components/sections/funds/FundStatsSection";
import FundChart1 from "../components/sections/funds/charts/FundChart1";
import FundStewardSection from "../components/sections/funds/FundStewardSection";
import FundDocumentsSection from "../components/sections/funds/FundDocumentsSection";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants.tsx";

const VEF: React.FC = () => {
  // const groups = [
  //   { title: "30%", description: "YTD Return" },
  //   { title: "30%", description: "12M Return" },
  //   {
  //     title: "15%",
  //     description: "Benchmark 12M Return",
  //   },
  // ];

  const [valueEquityFundUrl, setValueEquityFundUrl] = useState("");
  const [valueEquityFundUrl2, setValueEquityFundUrl2] = useState("");

  useEffect(() => {
    const fetchDocumentUrl = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/fund-doc-urls`);
        const { valueEquityFundUrl } = response.data;
        const { valueEquityFundUrl2 } = response.data;
        setValueEquityFundUrl(valueEquityFundUrl);
        setValueEquityFundUrl2(valueEquityFundUrl2);
      } catch (error) {
        console.error("Error fetching document URL:", error);
      }
    };

    fetchDocumentUrl();
  }, []);
  const paragraphs = [
    "Sashika joined JB Financial in 2023 as the Chief Investment Officer and Portfolio Manager for the JB Financial Value Equity Fund. Prior to joining JB, he served as Vice President at Capital Alliance Investments and Assistant Vice President Treasury at Softlogic Life, managing unit trusts and insurance portfolios. He has been in the investment management industry for over 10 years.",
  ];
  const documents = [
    {
      title: "Explanatory Memorandum",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["A detailed overview of fund specifics."],
      buttonText: "View Document",
      filePath: "/docs/vef/explanatory_memorandum.pdf",
      imagePath: "/images/documents/vef-em.jpg",
    },
    {
      title: "Trust Deed",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Trust Deed of the fund."],
      buttonText: "View Document",
      filePath: "/docs/vef/trust_deed.pdf",
      imagePath: "/images/documents/td.jpg",
    },
    {
      title: "Application Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["So we can get to know you."],
      buttonText: "View Document",
      filePath: "/docs/vef/application_form.pdf",
      imagePath: "/images/documents/af.jpg",
    },
    {
      title: "Purchase Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Purchase units of the fund."],
      buttonText: "View Document",
      filePath: "/docs/vef/purchase_form.pdf",
      imagePath: "/images/documents/pf.jpg",
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
      filePath: "/docs/vef/application_checklist.pdf",
      imagePath: "/images/documents/ac.jpg",
    },
    {
      title: "Monthly Factsheet",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Latest monthly factsheet for the fund."],
      buttonText: "View Document",
      filePath: valueEquityFundUrl,
      imagePath: "/images/documents/vef-mf.jpg",
    },
    {
      title: "Historical Unit Prices",
      fileType: "XLSX",
      fileSize: "3.9MB",
      tags: ["Historical unit price sheet of the fund."],
      buttonText: "Download File",
      filePath: valueEquityFundUrl2,
      imagePath: "/images/documents/vef-hup.jpg",
    },
    // {
    //   title: "GIPS Report",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["GIPS Report for September 2024."],
    //   buttonText: "View Document",
    //   filePath: valueEquityFundUrl2,
    //   imagePath: "/images/documents/vef-gr.jpg",
    // },
    // {
    //   title: "Semi Annual Report",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["2024 Semi Annual Report as at June 2024."],
    //   buttonText: "View Document",
    //   filePath: "/docs/vef/semi_annual_report.pdf",
    //   imagePath: "/images/documents/vef-sar.jpg",
    // },
  ];
  const fundStats = {
    objective: "Long-term capital growth",
    strategy: "Invest in undervalued large and mid-cap stocks",
    benchmark: "S&P Sri Lanka 20 Total Returns Index",
    investment: "Value investing",
    fundSize: "LKR 3.9 Billion (Dec '24)",
    totalRatio: "2.15% (Dec 31, 2023)",
  };
  const faqData = [
    {
      question: "What is the minimum investment?",
      answer: "LKR 1 Million.",
    },
    {
      question: "What types of companies does the fund invest in?",
      answer: "Large and mid-capitalization companies in Sri Lanka.",
    },
    {
      question: "Is this fund suitable for short-term investors?",
      answer: "No, it's designed for medium to long-term investors.",
    },
    {
      question: "What is the risk level of this fund?",
      answer: "Moderate to high risk.",
    },
    {
      question: "Are there any fees involved?",
      answer:
        "Yes, front-end fees and other expenses detailed in the fund’s documents.",
    },
  ];

  return (
    <>
      <FundHeader
        title="JB Vantage Value Equity Fund"
        description="Consider investing in our Value Equity Fund for superior, long-term returns from the Colombo Stock Exchange with ease and efficiency."
        tags={["Growth", "Long Term", "High Returns"]}
      />
      <FundDetailsSection
        heading="Fund Objectives & Strategy"
        highlightText="Objectives & Strategy"
        description={[
          "The fundamental investment objective of the JB Vantage Value Equity Fund is to achieve long term capital appreciation through investments in securities of listed companies which we believe are undervalued by the market and as such, have strong appreciation potential. The Fund may invest in all categories of equity related securities including voting and nonvoting common shares, preference shares, rights, warrants and other equity related issues.",
          "Equity funds are generally expected to be of high risk and/or “growth” category of investment. This is due to the fact that the Fund invests for capital growth or appreciation, by trying to grow the investor’s money over time. That is, growth is generated through capital gains – profits earned from buying and selling equity securities.",
        ]}
        imageUrl="/images/funds/value-equity.jpg"
      />
      <FundStatsSection
        objective={fundStats.objective}
        strategy={fundStats.strategy}
        benchmark={fundStats.benchmark}
        investment={fundStats.investment}
        fundSize={fundStats.fundSize}
        totalRatio={fundStats.totalRatio}
      />
      <FundChart1
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
        blogCategory="Value Equity Fund"
        buttonType="primary" // 'primary' | 'secondary'
        cardType="blog"
        alignText="left" // Change to "left" or "center"
      />
      <FundStewardSection
        name="Sashika Wickramaratne"
        designation="Portfolio Manager & CIO"
        imageSrc="/images/team/sashika.png"
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

export default VEF;
