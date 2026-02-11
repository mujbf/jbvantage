import ColumnsSection from "../components/sections/ColumnsSection";
import AccordionSection from "../components/sections/AccordionSection";

import FundHeader from "../components/sections/funds/FundHeader";
import FundDetailsSection from "../components/sections/funds/FundDetailsSection";
import FundStatsSection from "../components/sections/funds/FundStatsSection";
// import FundChart4 from "../components/sections/funds/charts/FundChart4";
import FundStewardSection from "../components/sections/funds/FundStewardSection";
import FundDocumentsSection from "../components/sections/funds/FundDocumentsSection";
import React from "react";

const COF: React.FC = () => {
  // Embedded data for preview - no backend calls needed
  //   const creditOpportunityFundUrl = "/docs/cof/monthly_factsheet.pdf";
  //   const creditOpportunityFundUrl2 = "/docs/cof/historical_unit_prices.xlsx";

  const paragraphs = [
    "Sashika joined JB Financial as CIO in 2023, bringing 14 years of experience in the Sri Lankan investment industry. He began his career at Guardian Fund Management, where he progressed from Investment Analyst to Portfolio Manager over nine years. He then joined Capital Alliance, managing Unit Trusts, followed by a role at the Softlogic Group, where he managed insurance portfolio investments and oversaw Unit Trusts and private client assets.",
    "Sashika holds a BSc in Business Administration from the University of Sri Jayawardenepura and is a finalist of the Chartered Institute of Management Accounting. He is currently pursuing the CFA designation.",
  ];

  const documents = [
    // {
    //   title: "Explanatory Memorandum",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["A detailed overview of fund specifics."],
    //   buttonText: "View Document",
    //   filePath: "/docs/cof/explanatory_memorandum.pdf",
    //   imagePath: "/images/documents/cof-em.jpg",
    // },
    {
      title: "Trust Deed",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Trust Deed for the fund."],
      buttonText: "View Document",
      filePath: "/docs/cof/cof-trust-deed.pdf",
      imagePath: "/docs/cof/cof-trust-deed.PNG",
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
      filePath: "/docs/new/purchase_form.pdf",
      imagePath: "/docs/new/purchase-form.PNG",
    },
    {
      title: "Redemption Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Redeem units of the fund."],
      buttonText: "View Document",
      filePath: "/docs/new/redemption_form.pdf",
      imagePath: "/docs/new/redemption-form.PNG",
    },
    {
      title: "Switch Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["Switch investments from one fund to another."],
      buttonText: "View Document",
      filePath: "/docs/new/switch_form.pdf",
      imagePath: "/docs/new/switch-form.PNG",
    },
    {
      title: "KYC Form",
      fileType: "PDF",
      fileSize: "3.9MB",
      tags: ["KYC Form for JB Vantage Unit Holders"],
      buttonText: "View Document",
      filePath: "/docs/kyc_compliance_f.pdf",
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
    // {
    //   title: "Monthly Factsheet",
    //   fileType: "PDF",
    //   fileSize: "3.9MB",
    //   tags: ["Latest monthly factsheet for the fund."],
    //   buttonText: "View Document",
    //   filePath: creditOpportunityFundUrl,
    //   imagePath: "/images/documents/cof-mf.jpg",
    // },
    // {
    //   title: "Historical Unit Prices",
    //   fileType: "XLSX",
    //   fileSize: "3.9MB",
    //   tags: ["Historical unit price sheet of the fund."],
    //   buttonText: "Download File",
    //   filePath: creditOpportunityFundUrl2,
    //   imagePath: "/images/documents/cof-hup.jpg",
    // },
  ];

  //   const fundStats = {
  //     objective: "Higher risk adjusted returns and liquidity",
  //     strategy: "Invest in long and short term debt instruments",
  //     benchmark: "NDBIB-CRISIL 365 Day T-Bill Index",
  //     investment: "'Investment grade', short and long term instruments",
  //     fundSize: "LKR 100 Millions",
  //     totalRatio: "N/A",
  //   };

  const faqData = [
    {
      question: "What is the minimum investment?",
      answer: "LKR 100,000.",
    },
    {
      question: "What does the fund primarily invest in?",
      answer:
        "The Fund invests in a diversified mix of short- and long-term government and corporate debt instruments, including deposits and money market securities.",
    },
    {
      question: "Is this fund suitable for risk-averse investors?",
      answer: "Yes, it's designed for investors with medium-risk tolerance.",
    },
    {
      question: "Are the returns taxable?",
      answer:
        "Yes, returns are subject to taxation based on the investor's residency status, but can change depending on applicable tax laws.",
    },
    {
      question: "How liquid is this fund?",
      answer:
        "The Fund offers regular liquidity with redemptions processed within a few business days, making it suitable for investors with a medium-term investment horizon.",
    },
  ];

  return (
    <>
      <FundHeader
        title="JB Vantage Credit Opportunity Fund"
        description="Consider investing in the JBF Credit Opportunity Fund as a compelling alternative to traditional fixed-income investments, offering enhanced yield potential through carefully selected credit opportunities backed by rigorous research and disciplined risk management."
        tags={["Flexible", "Attractive risk-adjusted returns"]}
      />
      <FundDetailsSection
        heading="Fund Objectives & Strategy"
        highlightText="Objectives & Strategy"
        description={[
          "The JB Vantage Credit Opportunity Fund is designed for investors seeking higher income potential than traditional savings products through exposure to carefully selected credit instruments. The Fund invests in a diversified mix of short- and long-term interest-bearing securities and is suited to investors with a medium-term horizon who are comfortable with moderate risk. With no penalty on withdrawals and access to competitive market-linked yields, the Fund presents a flexible alternative to fixed deposits and other fixed-income investments.",
          "Because the Fund invests across different maturities, returns may vary with movements in interest rates and credit conditions. Short-term instruments tend to reprice more quickly when rates change, while longer-term holdings may experience valuation movements, resulting in periodic fluctuations in unit prices.",
        ]}
        imageUrl="/images/funds/credit-opportunity.jpeg"
      />
      {/* change type */}
      <FundStatsSection
        objective="Higher risk adjusted returns and liquidity"
        strategy="Invest in long and short term debt instruments"
        benchmark="NDBIB-CRISIL 365 Day T-Bill Index"
        investment="Investment grade, short and long term instruments"
        fundType="moneyMarket"
        totalRatio="N/A"
        customFundSize="LKR 100 Million (Jan '26)"
      />
      {/* <FundChart4
        // groups={groups}
        mainTitle="The numbers speak for themselves"
        mainDescription="For more than a decade, we have remained at the forefront of investment management in Sri Lanka. Our continuous growth is testament to our ability to generate healthy returns for our clients."
        primaryButtonText=""
        secondaryButtonText=""
      /> */}

      <FundDocumentsSection
        sectionTitle="Fund Documents"
        description="Explore our current up to date insights on the fund."
        documents={documents}
      />
      <FundStewardSection
        name="Sashika Wickremaratne"
        designation="Chief Investment Officer"
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

export default COF;
