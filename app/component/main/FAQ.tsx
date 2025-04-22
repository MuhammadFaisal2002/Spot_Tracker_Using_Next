'use client';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    number: '01',
    question: 'How does Spot Tracker help reduce costs?',
    answer:
      'Spot Tracker helps reduce costs by optimizing delivery routes, reducing idle time, and improving fleet efficiency.',
  },
  {
    number: '02',
    question: 'Can it integrate with your existing ERP system?',
    answer:
      'Yes, Spot Tracker offers seamless integration with most ERP systems through its flexible API.',
  },
  {
    number: '03',
    question: 'Is there a free trial available?',
    answer:
      'Absolutely! We offer a 14-day free trial with full access to all features.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const questions = gsap.utils.toArray('.question');

    questions.forEach((el: any, i) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: -100,
          rotationX: 90,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 60%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section className="mx-4 md:mx-16 lg:mx-[105px]" aria-labelledby="faq-heading">
      <header className="text-center mb-16">
        <h2
          id="faq-heading"
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-bold"
        >
          FAQ’s
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          We’ve got answers to your most pressing questions about Spot Tracker
        </p>
      </header>

      <div className="max-w-4xl mx-auto mt-20 px-2 sm:px-4" role="list">
        {faqs.map((faq, index) => (
          <article
            key={faq.number}
            className="question border-b border-gray-300 py-6"
            role="listitem"
          >
            <header
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-${index}`}
            >
              <div className="flex items-center gap-4 sm:gap-10 md:gap-16 lg:gap-20">
                <span className="text-[#055FA8] text-[32px] sm:text-[40px] md:text-[50px] font-[500] w-10 sm:w-12">
                  {faq.number}
                </span>
                <h3 className="text-[18px] sm:text-[22px] md:text-[26px] font-[500]">
                  {faq.question}
                </h3>
              </div>
              <ChevronDown
                className={`text-blue-700 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                size={28}
              />
            </header>

            {openIndex === index && (
              <p
                id={`faq-${index}`}
                className="ml-[50px] sm:ml-[60px] md:ml-[70px] mt-4 text-gray-600 text-sm sm:text-base leading-relaxed"
              >
                {faq.answer}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
