"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        id: "item-1",
        question: "How are artisans selected?",
        answer: "Artisans are reviewed based on skill, experience, and proof of work. Our curation process ensures that only professionals with a track record of quality craftsmanship are featured on the platform."
    },
    {
        id: "item-2",
        question: "Is Artisyn free to use?",
        answer: "Artisyn offers a transparent model. Browsing and discovery are free. We may charge a small service fee on successful connections or offer premium visibility features for artisans."
    },
    {
        id: "item-3",
        question: "What support does Artisyn provide?",
        answer: "We provide a dedicated dispute resolution system, secure payment options, and a profile management dashboard to help you showcase your portfolio effectively to potential clients."
    }
];

const FaqSection = () => {
    return (
        <section className="py-24 px-6 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">FAQs</h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </motion.div>
        </section>
    );
};

export default FaqSection;
