import HeroSection from "../components/sections/HeroSection";
import SideContentSection from "../components/sections/SideContentSection";
import TextSection from "../components/sections/TextSection";

function PvtAssetMgmt() {
  const groups = [
    {
      title: "+ Personalized Risk Management",
      description:
        "We understand the importance of managing risk in your investment portfolio. Our team of experts will work closely with you to develop a personalized risk management strategy that aligns with your financial goals and risk tolerance.",
    },
    {
      title: "+ Dedicated Financial Advisors",
      description:
        "Our dedicated team of experienced financial advisors is committed to providing you with personalized guidance and support. We will work closely with you to understand your financial goals and help you make informed investment decisions.",
    },
    {
      title: "+ Comprehensive Portfolio Monitoring",
      description:
        "We continuously monitor your investment portfolio to ensure it remains aligned with your financial objectives. Our proactive approach allows us to make necessary adjustments and seize opportunities to optimize your portfolio performance.",
    },
  ];

  return (
    <>
      <HeroSection
        title="Your portfolio, invested to suit you."
        highlightedText="Your portfolio,"
        description="Discover the benefits of our private portfolio management service for high net worth individuals."
        button1Text=""
        button2Text=""
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/private-asset-management-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/private-asset-management-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/private-asset-management-t.webp"
        renderLeftContent={true} // True [Content on the Left] , False [Content on the Right]
      />
      <SideContentSection
        title="You are unique, so are your goals"
        highlightedText=""
        description="Shouldn't your investment portfolio reflect that too? With our Private Asset Management service, we advise HNWIs on their portfolios by taking into account their personal and financial goals for the future."
        buttonText=""
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/you-are-unique.webp"
        swapContentAndImage={true}
      />
      <TextSection
        groups={groups}
        mainTitle="Customized investment strategies designed around you."
        mainDescription="Whatever your goals may be, we design your portfolio around them. Our diverse team and longstanding expertise allow us to provide a highly personalized advisory service with respect to investing in public markets."
      />
    </>
  );
}

export default PvtAssetMgmt;
