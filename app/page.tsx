import DotsBackground from "@/components/dots-background";
import { Code, Workflow, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between text-[#111827] relative">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <svg
            className="h-8 w-8"
            viewBox="0 0 256 256"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="16" y="16" width="224" height="224" />
            <rect x="144" y="16" width="96" height="96" fill="#FB923C" />
          </svg>
          <span className="text-2xl font-bold">Agent Canvas</span>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex flex-col items-center justify-center py-20 px-4">
        <DotsBackground />
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 border border-transparent bg-[#FB923C] text-[#FFFFFF] px-3 py-1 rounded-full animate-appear">
            <span>New!</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-r from-[#111827] to-[#6B7280] bg-clip-text text-transparent drop-shadow-2xl animate-appear">
            Chain Your LLMs Visually
          </h1>

          <p className="max-w-xl mx-auto text-lg text-[#6B7280] animate-appear delay-100">
            Build complex, agentic workflows by visually chaining together LLMs.
            Enjoy the freedom of a tool that&apos;s completely free and open
            source.
          </p>

          <div className="flex justify-center gap-4 animate-appear delay-300">
            <a
              href="/canvas"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#FB923C] text-[#FFFFFF] hover:bg-[#FB923C]/90 transition"
            >
              Get Started for Free
            </a>
            <a
              href="https://github.com/johnnyvish/agent-canvas"
              className="bg-white inline-flex items-center justify-center h-12 px-6 rounded-xl border border-[#D1D5DB] hover:bg-[#E5E7EB] hover:text-[#374151] transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to build AI workflows
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              With our intuitive visual editor, pre-built templates, and live
              testing, create and deploy complex LLM chains effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-6 w-6" />,
                title: "Visual Editor",
                description:
                  "Drag and drop to build intricate workflows without coding.",
              },
              {
                icon: <Workflow className="h-6 w-6" />,
                title: "Workflow Templates",
                description:
                  "Jumpstart your projects with pre-built templates for common scenarios.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Real-Time Testing",
                description:
                  "Test your agentic workflows live and iterate with ease.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#FB923C] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FB923C]/10 flex items-center justify-center mb-4 text-[#FB923C] group-hover:bg-[#FB923C] group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#6B7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-[#FB923C]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create your canvas",
                description:
                  "Start with a blank canvas or choose from our templates.",
              },
              {
                step: "02",
                title: "Chain your LLMs",
                description:
                  "Visually add and connect LLM blocks to form an agentic workflow.",
              },
              {
                step: "03",
                title: "Test and deploy",
                description:
                  "Run your workflow in real-time and deploy with confidence.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#FB923C] mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[#6B7280]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#6B7280]">
              Everything you need to know about Agent Canvas.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "What is Agent Canvas?",
                answer:
                  "Agent Canvas is a visual platform for building and deploying AI workflows by chaining LLMs together into agentic systems. Its drag-and-drop interface makes creating complex workflows simple and intuitive.",
              },
              {
                question: "Do I need coding experience?",
                answer:
                  "No. Our platform is designed for everyone—from beginners to experts—so you can build advanced AI workflows without writing a single line of code.",
              },
              {
                question: "Which LLM models are supported?",
                answer:
                  "We support all major LLM models including GPT-4, Claude, and open-source models like Llama 2, giving you the flexibility to choose the best tool for your needs.",
              },
              {
                question: "Is Agent Canvas free?",
                answer:
                  "Absolutely. Agent Canvas is completely free and open source, empowering you to build and iterate without any licensing fees.",
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#FB923C]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Join developers building the future of AI workflows with a tool
            that&apos;s both innovative and 100% free.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/canvas"
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#FB923C] text-[#FFFFFF] hover:bg-[#FB923C]/90 transition"
            >
              Get Started for Free
            </a>
            <a
              href="https://github.com/johnnyvish/agent-canvas"
              className="bg-white inline-flex items-center justify-center h-12 px-6 rounded-xl border border-[#D1D5DB] hover:bg-[#E5E7EB] hover:text-[#374151] transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-[#6B7280]">
        © {new Date().getFullYear()} Agent Canvas. All rights reserved.
      </footer>
    </div>
  );
}
