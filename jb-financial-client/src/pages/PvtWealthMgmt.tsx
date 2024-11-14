import HeroSection from "../components/sections/HeroSection";
import SideContentSection from "../components/sections/SideContentSection";
import BannerSection from "../components/sections/BannerSection";

function PvtWealthMgmt() {
  return (
    <>
      <HeroSection
        title="Wealth Management Exclusively For You."
        highlightedText="Exclusively For You."
        description="We provide bespoke wealth management services to HNWIs and institutional investors in Sri Lanka, with specific attention paid to investing goals and circumstances with the strictest degree of confidentiality."
        button1Text=""
        button2Text=""
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/private-wealth-management-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/private-wealth-management-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/private-wealth-management-t.webp"
        renderLeftContent={true} // True [Content on the Left] , False [Content on the Right]
      />
      <SideContentSection
        title="Unlocking Opportunities for Institutional Investors"
        highlightedText="Institutional Investors"
        description="Our wealth management service offers improved price discovery and access to our team's expertise, giving you a competitive edge in the market and helping you make better financial decisions to achieve success."
        buttonText="Why Us?"
        buttonLink="/institutional-wealth-management"
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/institutional-wealth.webp"
        swapContentAndImage={true} // True [Content on the Right], False [Content on the Left]
      />
      <SideContentSection
        title="Pass down your wealth to the next generation confidently"
        highlightedText="next generation"
        description="Our private asset management service offers dedicated investment advisory services to meet the unique needs of high-net-worth individuals."
        buttonText="How We Can Help"
        buttonLink="/private-asset-management"
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/next-generation.webp"
        swapContentAndImage={false} // True [Content on the Right], False [Content on the Left]
      />
      <BannerSection
        title="Learn More About Our Investment Committee"
        description="Our investment committee consists of experienced professionals dedicated to managing your wealth."
        buttonText2="Meet Our Team"
        buttonLink2="/team"
        centerAlign={false}
      />
    </>
  );
}

export default PvtWealthMgmt;
