import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/types";
import { cn } from "@/utils";
import { FC } from "react";

interface FAQAccordionProps {
  questions: FAQ[];
}

export const FAQAccordion: FC<FAQAccordionProps> = ({ questions }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-3xl w-full mx-auto lg:text-xl text-lg border border-border px-12 py-2 rounded-2xl bg-[#12121280]"
    >
      {questions.map((faq, index) => (
        <AccordionItem
          key={faq.position}
          value={faq.position.toString()}
          className={cn("border-border", index === questions.length - 1 && "border-none")}
        >
          <AccordionTrigger className="text-foreground hover:text-primary text-start break-words min-w-0">
            <span className="overflow-hidden">{faq.question}</span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground lg:text-lg break-words">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
