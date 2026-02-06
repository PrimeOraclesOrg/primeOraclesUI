import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types";
import { FC } from "react";

interface FAQAccordionProps {
  questions: FAQ[];
}

export const FAQAccordion: FC<FAQAccordionProps> = ({ questions }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-3xl w-full mx-auto lg:text-xl text-lg border px-12 py-2 rounded-2xl bg-[#12121280]"
    >
      {questions.map((faq) => (
        <AccordionItem key={faq.position} value={faq.position.toString()} className="border-border">
          <AccordionTrigger className="text-foreground hover:text-primary">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground lg:text-lg">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
