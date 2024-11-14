import ColumnsSection from "../components/sections/ColumnsSection";
import AccordionSection from "../components/sections/AccordionSection";

import FundHeader from "../components/sections/funds/FundHeader";
import FundDetailsSection from "../components/sections/funds/FundDetailsSection";
// import FundStatsSection from "../components/sections/funds/FundStatsSection";
import ChartSection from "../components/sections/funds/ChartSection";
import FundStewardSection from "../components/sections/funds/FundStewardSection";

const FundDetails: React.FC = () => {
  const groups = [
    { title: "30%", description: "Return since inception" },
    { title: "30%", description: "12M Yield" },
    {
      title: "15%",
      description: "Performance of benchmark during last 12 months",
    },
  ];
  const paragraphs = [
    "Murtaza Jafferjee has worked in the Sri Lankan equity market since 1994. His experience includes advising individual and institutional investors on investment in equities. At JB Financial, Murtaza functions in the capacity of Director overseeing the company, as a member of the Investment Committee and as portfolio manager for the JB Vantage Value Equity Fund.",
    "Murtaza is currently the chair of Advocata Institute, an independent policy think tank based in Colombo. He previously served as an independent Director of Nations Trust Bank PLC (2010 – 2019) and Serendib Hotels PLC (2010 – 2020). Additionally, he was a director of the Colombo Stock Exchange from April 2007 to August 2009 and February 2019 to July 2020. Murtaza is a past President of CFA Sri Lanka.",
    "Murtaza holds a Masters in Financial Economics from the University of Colombo, Bachelor of Computer Science and Mechanical Engineering from the University of NSW, Australia. He is also a Chartered Financial Analyst.",
  ];
  // const documents = [
  //   {
  //     title: "Value Equity Fund - Introduction",
  //     fileType: "PDF",
  //     fileSize: "3.8MB",
  //     tags: ["Introduction"],
  //     buttonText: "Download File",
  //     filePath: "",
  //   },
  //   {
  //     title: "Fund Charts 23/24",
  //     fileType: "XLSX",
  //     fileSize: "11.2MB",
  //     tags: ["Analysis", "Charts", "Patterns"],
  //     buttonText: "Download File",
  //     filePath: "",
  //   },
  // ];
  // const fundStats = {
  //   objective: "Growth | Value",
  //   strategy: "Bottom-Up | Active",
  //   benchmark: "S&P SL20",
  //   investment: "Value Seeking",
  // };
  return (
    <>
      <FundHeader
        title="JB Vantage Value Equity Fund"
        description="Consider investing in our Value Equity Fund for sustainable, long-term returns from the Colombo Stock Exchange with superior ease and efficiency."
        tags={["Diversified", "Sustainable", "High Returns"]}
      />
      <FundDetailsSection
        heading="Fund Objectives & Strategy"
        highlightText="Objectives & Strategy"
        description={[
          "The fundamental investment objective of the JB Vantage Value Equity Fund is to achieve long term capital appreciation through investments in securities of companies which we believe are undervalued by the market and as such, have strong appreciation potential. The Fund may invest in all categories of equity related securities of companies including voting and nonvoting common shares, preference shares, rights, warrants and other equity related issues.",
          "Equity funds are generally expected to be of high risk and/or a “growth” category of investment. This is due to the fact that the Fund invests for capital growth or appreciation, by trying to grow the investor’s money over time through investment in equities. That is, growth is generated through capital gains – profits earned from buying and selling equity securities.",
        ]}
        imageUrl="/images/unit-trusts/value-equity-fund.png"
      />
      {/* <FundStatsSection
        objective={fundStats.objective}
        strategy={fundStats.strategy}
        benchmark={fundStats.benchmark}
        investment={fundStats.investment}
      /> */}
      <ChartSection
        groups={groups}
        mainTitle="The numbers speak for themselves"
        mainDescription="For more than a decade, we have remained at the forefront of investment management in Sri Lanka. Our continuous growth is testament to our ability to generate healthy returns for our clients."
        primaryButtonText=""
        secondaryButtonText=""
      />
      <ColumnsSection
        subtitleText="Notes from our Portfolio Manager"
        bodyText="Performance reviews, insights on the economic climate, and more."
        buttonText="View all notes"
        buttonType="primary" // 'primary' | 'secondary'
        cardType="blog"
        alignText="left" // Change to "left" or "center"
      />
      <FundStewardSection
        name="Murtaza Jafferjee"
        designation="Fund Manager"
        imageSrc="/images/team/sample-team-1.png"
        paragraphs={paragraphs}
      />
      <AccordionSection
        title="Frequently asked questions"
        highlightedText="investment strategy"
        description="Find answers to common questions about our funds and the investment process."
        accordionType="faq"
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

export default FundDetails;
