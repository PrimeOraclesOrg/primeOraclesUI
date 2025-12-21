import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/types";

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = "Часто задаваемые вопросы:" }: FAQSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 text-center">
        {title}
      </h2>

      <Accordion type="single" collapsible className="max-w-2xl mx-auto">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border-border">
            <AccordionTrigger className="text-foreground hover:text-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
