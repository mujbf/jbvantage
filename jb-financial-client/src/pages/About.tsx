// Components
import HeroSection from "../components/sections/HeroSection";
import SideContentSection from "../components/sections/SideContentSection";
import ColumnsSection from "../components/sections/ColumnsSection";
import BannerSection from "../components/sections/BannerSection";
import NumbersSection from "../components/sections/NumbersSection";

const About: React.FC = () => {
  const groups = [
    { title: "LKR 22 Billion +", description: "Assets Under Management (AUM)" },
    { title: "850 + ", description: "Satisfied Investors" },
    { title: "14 Years", description: "Of Managing Investments" },
  ];

  return (
    <>
      <HeroSection
        title="Disciplined investing that suits your needs."
        highlightedText="investing that suits your needs."
        description="We are an active fund manager, focused on absolute returns. Our aim is to build, manage and preserve our clients’ wealth by generating consistent positive returns. We acknowledge that all investment involves risk but we believe firmly in the capital markets to deliver superior returns."
        button1Text=""
        button2Text=""
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/about-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/about-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/about-t.webp"
        renderLeftContent={false} // True [Content on the Left] , False [Content on the Right]
      />
      <SideContentSection
        title="Simplicity is often the hardest to get right."
        highlightedText=""
        description="That's why it's the best. From Day One, we have always wanted to provide simple and fair investment instruments to our clients. Explore our funds and see how they have performed before making your investment decision."
        buttonText=""
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/simplicity.webp"
      />
      {/* <SideContentSection
        title="Experienced & Award Winning"
        highlightedText="Award Winning"
        description="Our investment committee consists of some of the most experienced and well-known names in Sri Lanka's financial services sector."
        buttonText="Learn More"
        imageUrl="/images/other/award-winning.png"
        imageColumn={{
          title: "RECOGNIZED BY CFA",
          text: "We have been recognized multiple times by the CFA Institute as one of the best unit trusts in Sri Lanka.",
          imageUrl: "/images/awards/cfa.png",
        }}
        swapContentAndImage={true} // True [Content on the Right], False [Content on the Left]
      /> */}
      <NumbersSection
        groups={groups}
        mainTitle="The numbers speak for themselves"
        mainDescription="For more than a decade, we have remained at the forefront of investment management in Sri Lanka. Our continuous growth is testament to our ability to generate healthy returns for our clients."
        primaryButtonText=""
        secondaryButtonText=""
      />
      <BannerSection
        title="Meet our Team"
        description="The portfolio managers, analysts, and financial advisors who make it possible for us to help you achieve your financial goals."
        buttonText1="Learn More"
        buttonLink1="/team"
        buttonText2=""
        centerAlign={true}
      />
      <ColumnsSection
        subtitleText="Contact Us"
        bodyText=""
        buttonText=""
        buttonType="primary" // 'primary' | 'secondary'
        cardType="contact"
        alignText="left" // Change to "left" or "center"
      />
    </>
  );
};

export default About;
