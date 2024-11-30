import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
// FAQ component receiving faq object as a prop
const FAQ = ({ faq }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: faq.bgColor, color: faq.textColor }}>
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* Title and Subtitle */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">
              {faq.title}
                              <FaChevronDown /> {/* React Icons down arrow */}
            </h2>
            <p className="mx-auto max-w-screen-md text-center md:text-lg">
              {faq.subtitle}
            </p>
          </div>

          {/* FAQs */}
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3">
            {faq.faqs.map((faqItem, index) => (
              <div 
                key={index} 
                className="relative rounded-lg p-5 pt-8" 
                style={{ backgroundColor: faq.faqBgColor, color: faq.faqTextColor }} // Use the colors from the FAQ object
              >
                <span className="absolute -top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </span>

                <h3 className="mb-3 text-lg font-semibold md:text-xl flex items-center gap-2" onClick={() => toggleFAQ(index)}>
                  {faqItem.question} {/* Access the question from the correct item */}
                  <FaChevronDown /> 
                </h3>
                {activeIndex === index && <p>{faqItem.answer}</p>} {/* Access the answer from the correct item */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
