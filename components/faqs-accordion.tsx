"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
  id?: string;
}

const DEFAULT_FAQ_DATA: FaqItem[] = [
  {
    id: "return-policy",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Items must be returned in their original condition for a full refund.",
  },
  {
    id: "shipping-time",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3–5 business days. Express shipping is available and takes 1–2 business days.",
  },
  {
    id: "international-shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
];

interface FaqAccordionProps {
  items?: FaqItem[];
  defaultOpenIndex?: number;
  className?: string;
  showCard?: boolean;
  allowMultipleOpen?: boolean;
  searchable?: boolean;
}

export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  className,
  showCard = true,
  allowMultipleOpen = false,
  searchable = false,
}: FaqAccordionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = useMemo(() => items || DEFAULT_FAQ_DATA, [items]);

  const filteredFaqData = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return faqData;
    }

    const query = searchQuery.toLowerCase();
    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [faqData, searchQuery, searchable]);

  if (faqData.length === 0) {
    return (
      <div
        className={cn(
          "w-full p-4 text-center text-muted-foreground",
          className
        )}
      >
        <p>No frequently asked questions available.</p>
      </div>
    );
  }

  const accordionContent = (
    <>
      {searchable && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      )}
      {filteredFaqData.length === 0 ? (
        <div className="w-full p-4 text-center text-muted-foreground">
          <p>No FAQs found matching your search.</p>
        </div>
      ) : allowMultipleOpen ? (
        <Accordion type="multiple" className="w-full">
          {filteredFaqData.map((faq, index) => {
            const itemValue = faq.id || `item-${index}`;
            return (
              <AccordionItem key={itemValue} value={itemValue}>
                <AccordionTrigger
                  className="cursor-pointer no-underline hover:no-underline"
                  aria-label={`Toggle ${faq.question}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-sm text-balance text-muted-foreground">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue={
            filteredFaqData[defaultOpenIndex]?.id || `item-${defaultOpenIndex}`
          }
          className="w-full"
        >
          {filteredFaqData.map((faq, index) => {
            const itemValue = faq.id || `item-${index}`;
            return (
              <AccordionItem key={itemValue} value={itemValue}>
                <AccordionTrigger
                  className="cursor-pointer no-underline hover:no-underline"
                  aria-label={`Toggle ${faq.question}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-sm text-balance text-muted-foreground">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </>
  );

  if (!showCard) {
    return <div className={cn("w-full", className)}>{accordionContent}</div>;
  }

  return (
    <Card
      className={cn(
        "w-full overflow-hidden transition-all hover:shadow-md",
        className
      )}
    >
      <CardHeader className="flex flex-col gap-1 p-4">
        {accordionContent}
      </CardHeader>
    </Card>
  );
}
