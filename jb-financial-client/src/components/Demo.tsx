import card1img from "/card-1.png";
import card2img from "/card-2.png";
import card3img from "/card-3.png";
import pwmimg from "/a1.png";
import awrdsimg from "/a2.png";
import cfaimg from "/cfa.png";
import accimg from "/acc1.jpg";
import "./App.css";

("use client");
import { Button, Accordion } from "flowbite-react";

function Demo() {
  return (
    <>
      <section className="w-screen h-screen relative z-[-1]">
        {/* Desktop and Laptop Background Image */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/hero-d.jpg")' }}
        />

        {/* Tablet and Mobile Background Image */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/hero-m.jpg")' }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-20 2xl:px-40 gap-12">
          <h1 className="titleText text-gray-600">
            Reach your <br />{" "}
            <span className="primaryText">financial goals</span>
            <br /> with ease.
          </h1>
          <p className="bodyText neutralText w-[40%]">
            With our investment products, anyone can easily invest and grow
            their wealth. Take advantage of our diverse range of investment
            options which includes both unit trusts and private wealth
            management services.
          </p>
          <Button as="button" className="primary-button">
            SCHEDULE AN APPOINTMENT
          </Button>
        </div>
      </section>
      <section className="bg-white p-20 flex flex-col gap-16 items-center">
        <h2 className="subtitleText text-gray-600">
          Explore our <span className="primaryText">Unit Trusts</span>
        </h2>
        <div className="flex justify-between gap-12">
          {/* Card 01 */}
          <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300">
            <div className="flex flex-col px-4 py-6">
              <span className="regularText">JB Vantage</span>
              <span className="switzer-sb text-2xl primaryText">
                Value Equity Fund
              </span>
            </div>
            <img src={card1img} className="" alt="card-1-image" />
            <div className="flex flex-col gap-6 px-4 pt-9 pb-6">
              <p className="regularText neutralText">
                Invest in equities of publicly listed companies in Sri Lanka and
                benefit from our rigorous research deep dive research
                methodology.
              </p>
              <a href="" className="switzer-md ">
                Learn More
              </a>
            </div>
          </div>

          {/* Card 02 */}
          <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300">
            <div className="flex flex-col px-4 py-6">
              <span className="regularText">JB Vantage</span>
              <span className="switzer-sb text-2xl primaryText">
                Money Market Fund
              </span>
            </div>
            <img src={card2img} className="" alt="card-1-image" />
            <div className="flex flex-col gap-6 px-4 pt-9 pb-6">
              <p className="regularText neutralText">
                Invest in equities of publicly listed companies in Sri Lanka and
                benefit from our rigorous research deep dive research
                methodology.
              </p>
              <a href="" className="switzer-md ">
                Learn More
              </a>
            </div>
          </div>

          {/* Card 03 */}
          <div className="flex flex-col bg-[#fbfbfd] rounded-2xl border-2 border-solid border-gray-300">
            <div className="flex flex-col px-4 py-6">
              <span className="regularText">JB Vantage</span>
              <span className="switzer-sb text-2xl primaryText">
                Short Term Gilt Fund
              </span>
            </div>
            <img src={card3img} className="" alt="card-1-image" />
            <div className="flex flex-col gap-6 px-4 pt-9 pb-6">
              <p className="regularText neutralText">
                Invest in equities of publicly listed companies in Sri Lanka and
                benefit from our rigorous research deep dive research
                methodology.
              </p>
              <a href="" className="switzer-md ">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <Button as="button" className="secondary-button">
          View All Funds
        </Button>
      </section>
      <section className="bg-white p-20 flex gap-16">
        <div className="flex flex-col justify-center gap-12 w-[60%]">
          <h2 className="subtitleText primaryText">
            Private Wealth Management
          </h2>
          <p className="bodyText neutralText w-[80%]">
            Invest in equities of publicly listed companies in Sri Lanka and
            benefit from our rigorous research deep dive research methodology.
          </p>
          <Button as="button" className="secondary-button w-[260px]">
            Learn More
          </Button>
        </div>
        <div className="w-[40%]">
          <img src={pwmimg} className="" alt="card-1-image" />
        </div>
      </section>

      <section className="bg-white p-20 flex gap-16">
        <div className="w-[40%]">
          <img src={awrdsimg} className="" alt="card-1-image" />
        </div>
        <div className="flex flex-col justify-center gap-12 w-[60%]">
          <h2 className="subtitleText text-gray-600">
            Experienced & <span className="primaryText">Award Winning</span>
          </h2>
          <p className="bodyText neutralText w-[80%]">
            Our investment committee consists of some of the most experienced
            and well-known names in Sri Lanka's financial services sector.
          </p>
          <div className="flex">
            <div className="flex flex-col gap-4">
              <span className="switzer-sb text-2xl primaryText">
                Recognized by CFA
              </span>
              <p className="regularText neutralText w-[80%]">
                Our investment committee consists of some of the most
                experienced and well-known names in Sri Lanka's financial
                services sector.
              </p>
            </div>
            <div>
              <img src={cfaimg} className="" alt="card-1-image" />
            </div>
          </div>
          <Button as="button" className="secondary-button w-[260px]">
            Learn More
          </Button>
        </div>
      </section>
      <section className="p-20 flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <h2 className="subtitleText text-gray-600">
            What kind of investment strategy{" "}
            <span className="primaryText">works for you?</span>
          </h2>
          <p className="bodyText neutralText">
            Here are some capital allocation strategies we recommend. They're
            not definitive, so we encourage talking to our investment advisors
            to tailor them for you.
          </p>
        </div>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title className="switzer-sb text-neutral-light focus:text-primary-800 text-2xl">
              Young Professional
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex gap-12 justify-between">
                <div className="flex-grow flex flex-col gap-12">
                  <p className="bodyText neutralText">
                    You've just started doing well in your career, and you've
                    got many decades of professional life ahead of you. You can
                    afford to take a little more risk, so we recommend
                    allocating a higher proportion of funds into the JB Vantage
                    Value Equity Fund.
                  </p>
                  <div className="flex">
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Equity Markets
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        80%
                      </p>
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Money and Debt Market
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        20%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-none w-120">
                  <img src={accimg} className="" alt="card-1-image" />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="switzer-sb text-neutral-light focus:text-primary-800 text-2xl">
              Young Professional
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex gap-12 justify-between">
                <div className="flex-grow flex flex-col gap-12">
                  <p className="bodyText neutralText">
                    You've just started doing well in your career, and you've
                    got many decades of professional life ahead of you. You can
                    afford to take a little more risk, so we recommend
                    allocating a higher proportion of funds into the JB Vantage
                    Value Equity Fund.
                  </p>
                  <div className="flex">
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Equity Markets
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        80%
                      </p>
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Money and Debt Market
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        20%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-none w-120">
                  <img src={accimg} className="" alt="card-1-image" />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="switzer-sb text-neutral-light focus:text-primary-800 text-2xl">
              Young Professional
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex gap-12 justify-between">
                <div className="flex-grow flex flex-col gap-12">
                  <p className="bodyText neutralText">
                    You've just started doing well in your career, and you've
                    got many decades of professional life ahead of you. You can
                    afford to take a little more risk, so we recommend
                    allocating a higher proportion of funds into the JB Vantage
                    Value Equity Fund.
                  </p>
                  <div className="flex">
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Equity Markets
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        80%
                      </p>
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Money and Debt Market
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        20%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-none w-120">
                  <img src={accimg} className="" alt="card-1-image" />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="switzer-sb text-neutral-light focus:text-primary-800 text-2xl">
              Young Professional
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex gap-12 justify-between">
                <div className="flex-grow flex flex-col gap-12">
                  <p className="bodyText neutralText">
                    You've just started doing well in your career, and you've
                    got many decades of professional life ahead of you. You can
                    afford to take a little more risk, so we recommend
                    allocating a higher proportion of funds into the JB Vantage
                    Value Equity Fund.
                  </p>
                  <div className="flex">
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Equity Markets
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        80%
                      </p>
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Money and Debt Market
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        20%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-none w-120">
                  <img src={accimg} className="" alt="card-1-image" />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="switzer-sb text-neutral-light focus:text-primary-800 text-2xl">
              Young Professional
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex gap-12 justify-between">
                <div className="flex-grow flex flex-col gap-12">
                  <p className="bodyText neutralText">
                    You've just started doing well in your career, and you've
                    got many decades of professional life ahead of you. You can
                    afford to take a little more risk, so we recommend
                    allocating a higher proportion of funds into the JB Vantage
                    Value Equity Fund.
                  </p>
                  <div className="flex">
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Equity Markets
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        80%
                      </p>
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <h4 className="switzer-sb text-2xl text-neutral-dark uppercase">
                        Money and Debt Market
                      </h4>
                      <p className="zodiak-r text-[64px] text-primary-900">
                        20%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-none w-120">
                  <img src={accimg} className="" alt="card-1-image" />
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </section>
      <section className="flex flex-col "></section>
    </>
  );
}

export default Demo;
