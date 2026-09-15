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

        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {familyMembers.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/80 text-center shadow-md ring-1 ring-plum/5">
                <div className="aspect-square w-full">
                  <PlaceholderImage
                    src={member.image}
                    alt={member.name}
                    label={`[${member.name}'s photo]`}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center p-6 sm:p-8">
                  <h3 className="font-display text-xl text-plum">{member.name}</h3>
                  <p className="mb-4 font-body text-xs uppercase tracking-wide text-terracotta">
                    {member.relationship}
                  </p>
                  <p className="whitespace-pre-line font-body text-sm leading-relaxed text-plum/75">
                    {member.message}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
