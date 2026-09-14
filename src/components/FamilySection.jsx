import { content } from '../data/content'
import { familyMembers } from '../data/family'
import PlaceholderImage from './PlaceholderImage'
import Reveal from './Reveal'

export default function FamilySection() {
  return (
    <section id="family" className="bg-blush/10 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <h2 className="font-display text-3xl text-plum sm:text-5xl">
            {content.family.heading}
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {familyMembers.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <article className="flex h-full flex-col items-center rounded-2xl bg-white/80 p-8 text-center shadow-md ring-1 ring-plum/5">
                <div className="mb-5 h-24 w-24 overflow-hidden rounded-full ring-4 ring-blush/40">
                  <PlaceholderImage
                    src={member.image}
                    alt={member.name}
                    label={`[${member.name}'s photo]`}
                    className="h-full w-full"
                  />
                </div>
                <h3 className="font-display text-xl text-plum">{member.name}</h3>
                <p className="mb-4 font-body text-xs uppercase tracking-wide text-terracotta">
                  {member.relationship}
                </p>
                <p className="font-body text-sm leading-relaxed text-plum/75">
                  {member.message}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
