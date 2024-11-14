import HeroSection from "../components/sections/HeroSection";
import SideContentSection from "../components/sections/SideContentSection";
import TextSection from "../components/sections/TextSection";
import TestimonialSection from "../components/sections/TestimonialSection";

function InsWealthMgmt() {
  const groups = [
    {
      title: "+ BETTER INSIGHTS AND MARKET ACCESSS",
      description:
        "As we are in tune with the daily ups-and-downs of the markets we invest in, we are better placed to gauge the impact of a given development and its long term impact, which is what matters.",
    },
    {
      title: "+ Better price discovery due to scale",
      description:
        "As one of the larger investment and fund managers in the country, our long-standing relationships and scale grant us significantly better negotiating power, allowing us to obtain better prices and rates.",
    },
    {
      title: "+ Experience and expertise in public markets",
      description:
        "Investing is an art and a science where both experience and expertise counts. Our lead fund managers have been in the industry since 1994 and possess the wisdom that comes with it.",
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
        title="Prudent investing, guided by your objectives."
        highlightedText="objectives."
        description="Discover the benefits of our Institutional Wealth Management service."
        button1Text=""
        button2Text=""
        desktopImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/institutional-wealth-management-d.webp"
        mobileImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/institutional-wealth-management-m.webp"
        tabletImage="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/institutional-wealth-management-t.webp"
        renderLeftContent={true} // True [Content on the Left] , False [Content on the Right]
      />
      <SideContentSection
        title="Active investment management made easy."
        highlightedText="made easy."
        description="Our Institutional Wealth Management service offers expert guidance and tailored investment strategies to maximize returns and minimize risk for institutions. With our experienced professionals and comprehensive services, we provide a better option to generate healthy returns without any additional burden on treasury and corporate finance professionals on your team."
        buttonText=""
        imageUrl="https://jbfinance-images.s3.eu-north-1.amazonaws.com/static/active-investment-strategy.webp"
        // textColumns={[
        //   {
        //     title: "EXPERT GUIDANCE",
        //     text: "Access to a team of experienced professionals who understand the unique needs of institutions.",
        //   },
        //   {
        //     title: "TAILORED STRATEGIES",
        //     text: "Customized investment strategies designed to align with your goals and risk tolerance.",
        //   },
        // ]}
        swapContentAndImage={true}
      />
      <TextSection
        groups={groups}
        mainTitle="A better way to manage an institutional portfolio"
        mainDescription="Our Institutional Wealth Management service is tailored to meet the needs of corporates and family offices, providing them with the expertise and support they need to maximize the return of their public market investments."
      />
      <TestimonialSection testimonials={testimonials} />
    </>
  );
}

export default InsWealthMgmt;
