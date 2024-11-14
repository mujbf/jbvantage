// Components
import HeroSection from "../components/sections/HeroSection";
import ColumnsSection from "../components/sections/ColumnsSection";
import BannerSection from "../components/sections/BannerSection";

const Team: React.FC = () => {
  return (
    <>
      <HeroSection
        title="Meet The Team"
        highlightedText="Team"
        description="Our fast growing team comprises of seasoned investment professionals, compliance experts, intellectually brilliant portfolio managers, and everyone in between."
        button1Text=""
        button2Text=""
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/team-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/team-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/team-t.webp"
        renderLeftContent={false} // True [Content on the Left] , False [Content on the Right]
      />
      <ColumnsSection
        subtitleText=""
        bodyText=""
        buttonText=""
        buttonType="primary" // 'primary' | 'secondary'
        cardType="team"
        alignText="left" // Change to "left" or "center"
      />
      <BannerSection
        title="We’re Hiring!"
        description="Explore our current job openings."
        buttonText1="Open Positions"
        buttonLink1="/careers"
        buttonText2="Contact Us"
        buttonLink2="/contact"
        centerAlign={true}
      />
    </>
  );
};

export default Team;
