import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProfileCarousel } from "@/components/ui/ProfileCarousel";

const principles = [
  {
    title: "Clarity first",
    description:
      "A dashboard is only useful if a decision-maker understands it in seconds.",
  },
  {
    title: "End to end",
    description:
      "From raw data and modeling to the final visual layer — every step built with the same care.",
  },
  {
    title: "Built for performance",
    description:
      "Lean models and precise measures — dashboards should answer at the speed of the conversation.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-24">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <Reveal className="md:h-full">
            <ProfileCarousel />
          </Reveal>

          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="About"
              title="Data is only valuable when it drives a decision."
            />
            <Reveal delay={0.15}>
              <p className="text-[15px] leading-relaxed text-body md:text-base">
                I&apos;m João Victor, a Business Intelligence analyst focused on
                solving real business problems through data. My work sits at the
                intersection of analytics and engineering: I model data, write
                the measures and design the dashboards that executives actually
                use.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-[15px] leading-relaxed text-muted md:text-base">
                What drives me is the moment a messy dataset becomes a clear
                answer — a number a team can act on. I care deeply about the
                craft: clean models, precise DAX, and interfaces that feel
                simple no matter how complex the logic behind them is.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="border-l-2 border-accent pl-5 font-serif text-base italic leading-relaxed text-heading md:text-lg">
                I design complete BI solutions — from modeling and DAX to
                automation and dashboards — with a focus on clarity,
                performance and decision-making.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={0.1 + index * 0.1}>
              <div className="h-full bg-surface p-8 md:p-10">
                <span className="font-serif text-lg text-accent">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-body">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
