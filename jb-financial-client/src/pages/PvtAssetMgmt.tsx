import HeroSection from "../components/sections/HeroSection";
import SideContentSection from "../components/sections/SideContentSection";
import TextSection from "../components/sections/TextSection";
import TestimonialSection from "../components/sections/TestimonialSection";

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
  const testimonials = [
    {
      logoSrc: "/images/testimonials/logo/1.png",
      testimonialText:
        "Investing in JB Vantage's unit trusts has been a game changer for our financial strategy. With a rich history of successful client outcomes, their expertise and management have consistently delivered impressive returns over the years. We couldn't be happier with their service!",
      testimonialImageSrc: "/images/testimonials/user/1.png",
      name: "Alex Johnson",
      designation: "Managing Director, Financial Solutions Ltd.",
    },
    {
      logoSrc: "/images/testimonials/logo/2.png",
      testimonialText:
        "Our experience with JB Vantage has been exceptional. Their unit trusts are meticulously managed, offering a blend of safety and growth that has greatly benefited our portfolio. The track record of satisfied clients speaks volumes about their commitment to excellence.",
      testimonialImageSrc: "/images/testimonials/user/2.png",
      name: "Emily Davis",
      designation: "Senior Investment Analyst, Capital Growth Inc.",
    },
    {
      logoSrc: "/images/testimonials/logo/3.png",
      testimonialText:
        "JB Vantage's unit trusts have proven to be a reliable investment with consistent performance. The firm’s dedication to client satisfaction and their ability to navigate market changes effectively make them a top choice for anyone looking to grow their wealth responsibly.",
      testimonialImageSrc: "/images/testimonials/user/3.png",
      name: "Michael Brown",
      designation: "Chief Financial Officer, Wealth Builders Co.",
    },
    {
      logoSrc: "/images/testimonials/logo/4.png",
      testimonialText:
        "We have been investing with JB Vantage for several years and have always been impressed with their unit trusts' performance. Their team is highly knowledgeable and their strategic approach has resulted in substantial gains for our investments. Highly recommended!",
      testimonialImageSrc: "/images/testimonials/user/4.png",
      name: "Sarah Wilson",
      designation: "Portfolio Manager, Secure Invest Ltd.",
    },
    {
      logoSrc: "/images/testimonials/logo/5.png",
      testimonialText:
        "JB Vantage has delivered outstanding results through their unit trusts. Their deep understanding of market dynamics and dedication to achieving client goals are evident in the consistent and strong returns we've experienced. It’s been a pleasure working with them.",
      testimonialImageSrc: "/images/testimonials/user/5.png",
      name: "David Lee",
      designation: "Director of Investments, Horizon Financial Group",
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
      <TestimonialSection testimonials={testimonials} />
    </>
  );
}

export default PvtAssetMgmt;
