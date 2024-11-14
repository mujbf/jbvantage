const Terms: React.FC = () => {
  return (
    <>
      <div className="h-[72px]"></div>
      <section className="bg-white px-4 py-8 md:p-8 lg:px-20 2xl:px-40 2xl:py-20 flex flex-col gap-4 md:gap-16">
        <h2 className="text-2xl md:text-5xl switzer-sb text-primary-900">
          JB Financial Pvt Ltd - Terms and Conditions
        </h2>
        <div>
          <p className="bodyText text-neutral-mid mb-4 italic">
            Last updated: 12.09.2024
          </p>
          <p className="bodyText text-neutral-mid mb-4">
            Please read these Terms and Conditions ("Terms", "Terms and
            Conditions") carefully before using the services offered by JB
            Financial Pvt Ltd ("we", "us", or "our").
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            1. Agreement to Terms
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            By accessing or using our services, you agree to be bound by these
            Terms. If you disagree with any part of the terms, you may not use
            our services.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            2. Description of Services
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            JB Financial Pvt Ltd provides investment management services in Sri
            Lanka. Our services include [brief description of services].
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            3. User Responsibilities
          </h3>
          <p className="bodyText text-neutral-mid mb-4">You agree to:</p>
          <ol className="list-[lower-alpha] bodyText text-neutral-mid mb-4 ml-6">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>
              Not use our services for any illegal or unauthorized purpose
            </li>
          </ol>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            4. Fees and Payments
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            Details of our fees are provided in our fee schedule. We reserve the
            right to change our fees upon notice.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            5. Limitation of Liability
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            To the maximum extent permitted by law, JB Financial Pvt Ltd shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages resulting from your use of our services.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            6. Disclaimers
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            Our services are provided "as is" without any warranty. We do not
            guarantee the accuracy, completeness, or usefulness of any
            information on our website or through our services.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            7. Governing Law
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of Sri Lanka.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            8. Changes to Terms
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            We reserve the right to modify or replace these Terms at any time.
            We will provide notice of any significant changes.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            9. Termination
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            We may terminate or suspend your account and access to our services
            at our sole discretion, without notice, for any reason.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-0 md:gap-4">
          <h3 className="switzer-md text-lg md:text-3xl text-primary-900 mb-4">
            10. Contact Information
          </h3>
          <p className="bodyText text-neutral-mid mb-4">
            For any questions about these Terms, please contact us at:
            <a href="mailto:info.financial@jb.lk"> info.financial@jb.lk</a>
          </p>
          <p className="bodyText text-neutral-mid mb-4">
            By using our services, you acknowledge that you have read and
            understood this Agreement and agree to be bound by its terms.
          </p>
        </div>
      </section>
    </>
  );
};

export default Terms;
