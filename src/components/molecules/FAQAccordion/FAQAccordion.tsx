import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/types";
import { FC } from "react";

interface FAQAccordionProps {
    questions: FAQ[];
}

export const FAQAccordion: FC<FAQAccordionProps> = ({ questions }) => {
    return (
        <Accordion type="single" collapsible className="max-w-2xl w-full mx-auto text-xl">
            {questions.map((faq) => (
                <AccordionItem value={faq.id} className="border-border">
                    <AccordionTrigger className="text-foreground hover:text-primary">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-lg">{faq.answer}</AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
    );
}