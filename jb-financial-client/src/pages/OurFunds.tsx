import HeroSection from "../components/sections/HeroSection";
import ColumnsSection from "../components/sections/ColumnsSection";
import SideContentSection from "../components/sections/SideContentSection";
import AccordionSection from "../components/sections/AccordionSection";
import FundTableSection from "../components/sections/funds/FundTableSection";
import GridSection from "../components/sections/GridSection";

const faqData = [
  {
    question: "What is a unit trust?",
    answer:
      "A unit trust is a collective investment scheme where investors' money is pooled together and professionally managed to invest in a diversified portfolio of securities.",
  },
  {
    question: "Why should I invest in a unit trust?",
    answer:
      "Pooling your money with other investors can offer three key advantages. The first is diversification, as a single unit trust can most likely hold more securities than you as an individual or a company could buy on your own. The second is professional management, as a portfolio manager handles the trusts’ investment management responsibilities, taking the burden off you to keep track of them yourself. And finally, you benefit from convenience. Units can be bought and sold any business day, so you have easy access to your money.",
  },
  {
    question: "Why invest through JB Vantage?",
    answer:
      "Private banking typically requires minimum investments of Rs. 10-20 million and high fees. JB Vantage offers similar investment quality through a centralized, automated platform, with minimums as low as Rs. 1 million per fund, making private banking-level investments more accessible and cost-effective.",
  },
  {
    question:
      "Why not just stick to well known and familiar investment strategies, such as fixed deposit investing?",
    answer:
      "Fixed deposits offer predictability but lack diversification and flexibility compared to unit trusts. While suitable during high interest rates, they represent only a narrow subset of fixed income investments. A diversified portfolio, including other assets like debentures, is crucial for successful investing across all interest rate cycles.",
  },
  {
    question: "Who can invest with JB Vantage?",
    answer:
      "The minimum investment is LKR 1 million per fund and you need to be at least 18 years of age. Other than that, there are no restrictions.",
  },
  {
    question:
      "I am a non-Sri Lankan investor. Can I sign up for an account with JB Vantage?",
    answer:
      "Yes. If you are a non-Sri Lankan, or a non-resident, you can still become part of the JB Vantage community. However, certain investor information may be requested of you by the Central Bank or Securities and Exchange Commission of Sri Lanka.",
  },
  {
    question: "How do I redeem my investment?",
    answer:
      "You can choose to redeem your investment by sending us a signed redemption form. We will lock in your redemption price (buying price). Bear in mind to check whether your fund has a lock-up period and whether early redemption fees may apply.",
  },
  {
    question:
      "How do cash transfers work? Does JB Vantage take custody of my cash?",
    answer:
      "All transfers are done via cheque, SLIPS, RTGS, CEFTS, or international wire transfer directly from your bank account. JB Vantage does not take custody of cash at any point – money is transferred directly from your account to our unit trusts’ bank accounts in the name of each Trust at Deutsche Bank AG, Colombo Branch.",
  },
  {
    question: "How quickly is my money available if I decide to sell?",
    answer:
      "JB Vantage Money Market and Short Term Gilt Funds offer quick access, with redemptions typically processed within 2 working days. The Value Equity Fund may take up to 7 business days. While you can sell anytime, investments in non-money market funds are best viewed as medium to long-term (3-5 years) due to market cycles of their underlying assets.",
  },
  {
    question:
      "How can I monitor the returns of the investment in JB Vantage Unit Trust?",
    answer:
      "JB Vantage Unit Trust prices are published in national newspapers and on their website. Your investment's market value is calculated by multiplying your unit count by the current manager's buying price. For instance, 80,049.19 units bought at Rs. 12.4853 each would increase from Rs. 1,000,000 to Rs. 1,016,330.03 if the price rose to Rs. 12.6893 after 6 weeks. You can also log in to your online portal to see how your investments are performing.",
  },
  {
    question: "What about Taxation?",
    answer:
      "You can expect to be taxed at the marginal tax rate. But, as tax laws are subject to change, please talk to your tax advisor on this matter. Separately, while JB Financial is not a participating FFI* under FATCA, we have given our consent to the Trustee, Deutsche Bank AG, to disclose relevant transaction information to the United States Internal Revenue Service or any FATCA related legal body as required.",
  },
];

// const headers = [
//   "Fund Type",
//   "1 Month",
//   "3 Months",
//   "6 Months",
//   "YTD",
//   "1 Year",
//   "SI*",
//   "TER**",
// ];
// const rows = [
//   [
//     "JBVEF",
//     "15.20%",
//     "16.05%",
//     "17.75%",
//     "15.20%",
//     "23.52%",
//     "12.52%",
//     "0.61%",
//   ],
//   [
//     "JBMMF",
//     "15.20%",
//     "16.05%",
//     "17.75%",
//     "15.20%",
//     "23.52%",
//     "12.52%",
//     "0.61%",
//   ],
//   [
//     "JBGILT",
//     "15.20%",
//     "16.05%",
//     "17.75%",
//     "15.20%",
//     "23.52%",
//     "12.52%",
//     "0.61%",
//   ],
// ];

function OurFunds() {
  return (
    <>
      <HeroSection
        title="Invest with confidence and clarity."
        highlightedText="confidence clarity."
        description="Explore our range of unit trusts designed to help you achieve your financial goals."
        button1Text="Learn More"
        button2Text=""
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/our-funds-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/our-funds-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/our-funds-t.webp"
        renderLeftContent={true} // True [Content on the Left] , False [Content on the Right]
      />
      {/* <ColumnsSection
        subtitleText="Explore our *Unit  Trusts*"
        bodyText=""
        buttonText=""
        buttonType="secondary" // 'primary' | 'secondary'
        cardType="unitTrust"
        alignText="center" // Change to "left" or "center"
      /> */}
      <GridSection
        subtitleText="Explore our *Unit  Trusts*"
        bodyText=""
        buttonText="View All Funds"
        buttonLink="/funds"
        buttonType="secondary"
        cardType="unitTrust"
        alignText="center"
      />
      <FundTableSection />
      <SideContentSection
        title="A proactive investment strategy for each fund"
        highlightedText="A proactive investment strategy"
        description="Our funds are carefully managed by our experienced investment committee, utilizing a combination of fundamental analysis and quantitative models to identify attractive investment opportunities. Each fund has a distinct investment strategy tailored to meet specific objectives and risk profiles."
        buttonText=""
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/proactive-strategy.webp"
      />
      <AccordionSection
        title="Frequently Asked Questions"
        highlightedText="Questions"
        description="Here are some of the most common questions about our services."
        accordionType="faq"
        accordionProps={{ faqs: faqData }}
      />
    </>
  );
}

export default OurFunds;
