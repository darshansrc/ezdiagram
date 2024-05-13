import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "What is EzDiagram?",
    answer:
      "EzDiagram is a web-based application that simplifies the process of creating, editing, and generating Mermaid.js diagrams using AI.",
  },
  {
    id: "item-2",
    question: "What is Mermaid.js?",
    answer:
      "Mermaid.js is a JavaScript-based diagramming and charting tool that uses a simple syntax to create various types of diagrams and charts. EzDiagram supports all the diagram types offered by Mermaid.js, including flowcharts, sequence diagrams, class diagrams, state diagrams, entity relationship diagrams, user journey diagrams, Gantt charts, and pie charts.",
  },
  {
    id: "item-3",
    question: "What are the benefits of using EzDiagram?",
    answer:
      "EzDiagram offers several benefits, including real-time collaboration, import and export capabilities for various formats, version control and revision history, and unique shareable URLs for diagrams.",
  },
  {
    id: "item-4",
    question: "Can I collaborate with others on diagrams?",
    answer:
      "Yes, EzDiagram supports real-time collaboration, allowing multiple users to work on the same diagram simultaneously.",
  },
  {
    id: "item-5",
    question: "Can I import or export diagrams?",
    answer:
      "Yes, EzDiagram allows you to import and export diagrams in various formats, including Mermaid.js syntax, PNG, SVG, and more.",
  },
  {
    id: "item-6",
    question: "How do I share a diagram with others?",
    answer:
      "Diagrams are stored on EzDiagram's servers and are accessible via unique URLs. These URLs can be shared with others for collaboration or viewing purposes.",
  },
  {
    id: "item-7",
    question: "Does EzDiagram offer version control?",
    answer:
      "Yes, EzDiagram maintains a revision history for each diagram on browser's local storage, allowing you to view and revert to previous versions if needed.",
  },
  {
    id: "item-8",
    question: "Is EzDiagram free to use?",
    answer:
      "EzDiagram offers a free plan with basic features, as well as paid plans with additional capabilities and resources.",
  },
  {
    id: "item-9",
    question: "Which AI model does EzDiagram use?",
    answer: "EzDiagram uses the Claude AI model for generating AI diagrams.",
  },
];

export function FaqSection() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="mt-3 text-balance text-center pb-8 text-base text-muted-foreground">
        Email{" "}
        <a
          className="font-medium text-primary hover:underline"
          href="mailto:support@ezdiagram.com"
        >
          support@ezdiagram.com
        </a>{" "}
        to contact our support team.
        <br />
        {/* <strong>
      You can test the subscriptions and won&apos;t be charged.
    </strong> */}
      </p>
    </section>
  );
}
