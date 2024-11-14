const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <div className="h-[72px]"></div>
      <section className="bg-white px-4 py-8 md:p-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16">
        <h2 className="text-2xl md:text-5xl switzer-sb text-primary-900">
          JB Financial Pvt Ltd - Privacy Policy
        </h2>
        <div>
          <p className="bodyText text-neutral-mid mb-4 italic">
            Last updated: 12.09.2024
          </p>
          <p className="bodyText text-neutral-mid mb-4">
            JB Financial Pvt Ltd ("we", "our", or "us") is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our services or interact with our website.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            1. Information We Collect
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            We may collect the following types of information:
          </p>
          <ol className="list-[lower-alpha] bodyText text-neutral-mid mb-4 ml-6">
            <li>
              Personal Information: Name, address, email address, phone number,
              national identification number, financial information, and other
              information you provide to us.
            </li>
            <li>
              Usage Data: Information on how you interact with our website and
              services.
            </li>
            <li>
              Cookies and Tracking Technologies: We use cookies and similar
              tracking technologies to collect information about your browsing
              activities.
            </li>
          </ol>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            2. How We Use Your Information
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            We use your information for the following purposes:
          </p>
          <ol className="list-[lower-alpha] bodyText text-neutral-mid mb-4 ml-6">
            <li>To provide and maintain our services</li>
            <li>To process transactions and manage your account</li>
            <li>To comply with legal and regulatory requirements</li>
            <li>To communicate with you about our services</li>
            <li>To improve our services and develop new features</li>
            <li>To prevent fraud and enhance security</li>
          </ol>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            3. Information Sharing and Disclosure
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            We may share your information in the following circumstances:
          </p>
          <ol className="list-[lower-alpha] bodyText text-neutral-mid mb-4 ml-6">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>
              With service providers who assist us in operating our business
            </li>
            <li>
              In connection with a merger, sale, or acquisition of our company
            </li>
          </ol>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            4. Data Security
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            We implement appropriate technical and organizational measures to
            protect your information. However, no method of transmission over
            the Internet or electronic storage is 100% secure.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            5. Your Rights
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            You have the right to access, correct, or delete your personal
            information. Please contact us to exercise these rights.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            6. Changes to This Privacy Policy
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            7. Contact Us
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a href="mailto:info.financial@jb.lk"> info.financial@jb.lk</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
