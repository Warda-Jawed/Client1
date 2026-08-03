import { FormEvent, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Bath, BedDouble, Car, Check, ChevronRight, Compass, Home, MapPin, Menu, Search, ShieldCheck, X } from 'lucide-react'

const propertyImages = [
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85',
]

const links = [{ label: 'Buy', href: '#services' }, { label: 'Our approach', href: '#approach' }, { label: 'Properties', href: '#properties' }, { label: 'Contact', href: '#contact' }]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function Logo({ light = false }: { light?: boolean }) {
  return <a href="#top" aria-label="Belle Property home" className={`display inline-flex items-baseline text-[1.5rem] sm:text-[1.65rem] leading-none ${light ? 'text-white' : 'text-forest'}`}>belle<span className="font-sans text-[.5rem] sm:text-[.55rem] tracking-[.16em] sm:tracking-[.2em] uppercase ml-1.5 sm:ml-2">Property</span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); e.currentTarget.reset() }
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close) }
  }, [menuOpen])

  return <main id="top" className="overflow-x-hidden">
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f9f7f2]/90 backdrop-blur-xl border-b border-black/8">
      <div className="max-w-[1440px] mx-auto h-16 md:h-20 px-4 sm:px-5 md:px-10 flex items-center justify-between">
        <Logo />
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-sm">
          {links.map(l => <a key={l.label} className="hover:text-coral transition-colors" href={l.href}>{l.label}</a>)}
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-forest text-white px-5 py-3 text-sm hover:bg-coral transition-colors">Find an agent <ArrowRight size={16} /></a>
        <button className="md:hidden grid h-11 w-11 -mr-2 place-items-center rounded-full hover:bg-black/5" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {menuOpen && <motion.nav id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-[#f9f7f2] border-t border-black/8 px-4 sm:px-5 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]" aria-label="Mobile navigation">
        {links.map(l => <a key={l.label} onClick={() => setMenuOpen(false)} className="flex min-h-14 items-center justify-between border-b border-black/8 text-lg" href={l.href}>{l.label}<ChevronRight size={18}/></a>)}
        <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-6 flex min-h-14 items-center justify-center rounded-full bg-forest text-white px-5">Find an agent</a>
        <p className="pt-8 text-center text-xs text-ink/45">Australian property, thoughtfully found.</p>
      </motion.nav>}
    </header>

    <section className="relative min-h-[680px] h-[100svh] bg-forest text-white pt-16 md:pt-20">
      <img src={propertyImages[0]} alt="Contemporary Australian home surrounded by native landscaping" className="absolute inset-0 w-full h-full object-cover opacity-70" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/10 md:bg-gradient-to-r md:from-forest-deep/95 md:via-forest-deep/50 md:to-transparent" />
      <div className="noise absolute inset-0" />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-5 md:px-10 h-full flex items-end pb-8 sm:pb-12 md:pb-20">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="max-w-3xl">
          <p className="eyebrow text-white/70 mb-4 md:mb-5">Australian property, thoughtfully found</p>
          <h1 className="display text-[clamp(3.25rem,15vw,7.8rem)] leading-[.88] mb-5 md:mb-7">Make yourself<br/><em className="text-sand">at home.</em></h1>
          <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed">Discover considered homes and trusted local guidance through Belle Property’s connected Australian network.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7 md:mt-9">
            <a href="#properties" className="inline-flex min-h-13 justify-center items-center gap-2 bg-coral text-white rounded-full px-6 py-3.5 hover:bg-white hover:text-forest transition-colors">Explore properties <ArrowRight size={18}/></a>
            <a href="#contact" className="inline-flex min-h-13 justify-center items-center gap-2 border border-white/40 rounded-full px-6 py-3.5 hover:bg-white hover:text-forest transition-colors">Speak with a local agent</a>
          </div>
        </motion.div>
        <a aria-label="Scroll to services" href="#services" className="hidden md:flex absolute bottom-20 right-10 h-14 w-14 rounded-full border border-white/30 items-center justify-center hover:bg-white hover:text-forest transition-colors"><ArrowDown/></a>
      </div>
    </section>

    <section id="services" className="scroll-mt-16 md:scroll-mt-20 py-16 sm:py-20 md:py-32 px-4 sm:px-5 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <Reveal className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20 items-end mb-10 sm:mb-14 md:mb-20">
          <div><p className="eyebrow text-coral mb-4">A clearer way forward</p><h2 className="display text-[2.65rem] sm:text-5xl md:text-7xl leading-[.95]">Property expertise,<br/><em>made personal.</em></h2></div>
          <p className="text-ink/65 leading-relaxed max-w-xl lg:ml-auto">From your first search to the keys in your hand, Belle Property connects you with local expertise, useful market insight and homes that suit the way you want to live.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 border-t border-black/15">
          {[
            [Search, 'Find your next home', 'Explore properties for sale across Belle Property’s national network, with filters that keep your search focused.'],
            [Compass, 'Understand the market', 'Use suburb guides, buying advice and local knowledge to make a more informed property decision.'],
            [Home, 'See it sooner', 'Register for First to See and discover selected opportunities before they reach the wider market.']
          ].map(([Icon, title, text], i) => <Reveal key={String(title)} delay={i*.08} className="py-7 sm:py-9 md:px-8 first:pl-0 border-b md:border-b-0 md:border-r border-black/15 last:border-r-0 last:border-b-0">
            <Icon size={27} strokeWidth={1.5} className="text-coral mb-7 sm:mb-12"/><h3 className="display text-[1.75rem] sm:text-3xl mb-3 sm:mb-4">{String(title)}</h3><p className="text-sm leading-6 text-ink/60">{String(text)}</p>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section id="approach" className="scroll-mt-16 md:scroll-mt-20 bg-cream py-16 sm:py-20 md:py-32 px-4 sm:px-5 md:px-10">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-24 items-center">
        <Reveal className="relative min-h-[430px] sm:min-h-[520px] md:min-h-[680px]">
          <img src={propertyImages[1]} alt="Refined modern living room with warm natural materials" loading="lazy" className="absolute top-0 left-0 w-[90%] sm:w-[86%] h-[84%] sm:h-[82%] object-cover rounded-[2px]"/>
          <div className="absolute bottom-0 right-0 bg-coral text-white w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full flex flex-col justify-center items-center text-center p-5 sm:p-7 shadow-2xl">
            <span className="display text-4xl sm:text-5xl md:text-6xl">20+</span><span className="text-[.58rem] sm:text-xs uppercase tracking-widest mt-1.5 sm:mt-2">years in lifestyle-led markets</span>
          </div>
        </Reveal>
        <Reveal><p className="eyebrow text-coral mb-4">Why Belle Property</p><h2 className="display text-[2.65rem] sm:text-5xl md:text-7xl leading-[.95] mb-6 sm:mb-8">Local insight.<br/><em>Connected reach.</em></h2><p className="text-ink/65 leading-relaxed mb-8 sm:mb-10">Belle Property brings together local agents across a premium national network, helping buyers navigate residential property with relevant advice and a strong understanding of place.</p>
          <ul className="space-y-5">{['Local experts who understand their markets', 'A connected network across Australia', 'Residential, projects and lifestyle property expertise', 'Early-access opportunities through First to See'].map(x => <li key={x} className="flex gap-4 items-center border-b border-black/10 pb-5"><span className="w-8 h-8 rounded-full bg-forest text-white grid place-items-center shrink-0"><Check size={15}/></span><span>{x}</span></li>)}</ul>
        </Reveal>
      </div>
    </section>

    <section className="bg-forest text-white py-16 sm:py-20 md:py-28 px-4 sm:px-5 md:px-10">
      <div className="max-w-[1440px] mx-auto"><Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"><p className="eyebrow text-sand mb-4">Your buying journey</p><h2 className="display text-[2.65rem] sm:text-5xl md:text-6xl leading-none">From search to settlement.</h2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15">{[['01','Share your brief','Tell a local Belle agent what, where and how you want to buy.'],['02','Explore the market','Review suitable listings, local insight and upcoming inspections.'],['03','Inspect & decide','See the homes that fit and ask the questions that matter.'],['04','Make your move','Work with your agent through the offer or auction process.']].map((x,i)=><Reveal key={x[0]} delay={i*.08} className="bg-forest p-6 sm:p-7 md:p-9 min-h-0 sm:min-h-60"><span className="text-sand text-sm">{x[0]}</span><h3 className="display text-[1.75rem] sm:text-3xl mt-8 sm:mt-12 md:mt-16 mb-3 sm:mb-4">{x[1]}</h3><p className="text-white/55 text-sm leading-6">{x[2]}</p></Reveal>)}</div>
      </div>
    </section>

    <section id="properties" className="scroll-mt-16 md:scroll-mt-20 py-16 sm:py-20 md:py-32 px-4 sm:px-5 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-9 sm:mb-12"><div><p className="eyebrow text-coral mb-4">Selected homes</p><h2 className="display text-[2.65rem] sm:text-5xl md:text-7xl">Find your place.</h2></div><a href="https://www.belleproperty.com/listings" className="inline-flex min-h-11 gap-2 items-center hover:text-coral">View all properties <ArrowRight size={18}/></a></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">{[
          ['Thornleigh, NSW','23 Lockerbie Road','5','3','2'],['Port Macquarie, NSW','43 Swift Street','2','1','2'],['Collaroy, NSW','1009 Pittwater Road','4','2','5']
        ].map((p,i)=><Reveal key={p[1]} delay={i*.08} className="group"><a href="https://www.belleproperty.com/listings" aria-label={`View ${p[1]}, ${p[0]}`}><div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-sand"><img src={propertyImages[i]} alt={`Property exterior in ${p[0]}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"/></div><div className="pt-4 sm:pt-5"><p className="text-[.68rem] sm:text-xs uppercase tracking-widest text-coral">{p[0]}</p><h3 className="display text-[1.75rem] sm:text-3xl mt-1">{p[1]}</h3><div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-ink/60"><span className="flex gap-2 items-center"><BedDouble size={16}/>{p[2]}</span><span className="flex gap-2 items-center"><Bath size={16}/>{p[3]}</span><span className="flex gap-2 items-center"><Car size={16}/>{p[4]}</span></div></div></a></Reveal>)}</div>
      </div>
    </section>

    <section id="contact" className="scroll-mt-16 md:scroll-mt-20 px-3 sm:px-5 md:px-10 pb-3 sm:pb-5 md:pb-10">
      <div className="max-w-[1440px] mx-auto bg-[#d9cfc1] rounded-2xl sm:rounded-3xl overflow-hidden grid lg:grid-cols-2">
        <div className="p-6 sm:p-7 md:p-14 lg:p-20"><p className="eyebrow text-coral mb-4">Start a conversation</p><h2 className="display text-[2.65rem] sm:text-5xl md:text-7xl leading-[.95] mb-5 sm:mb-6">Ready to find<br/><em>your place?</em></h2><p className="text-ink/65 max-w-md leading-relaxed">Tell us a little about your property search and we’ll help connect you with the right local Belle Property office.</p>
          <div className="mt-10 space-y-4 text-sm"><p className="flex gap-3"><MapPin size={18}/>Australia-wide network</p><p className="flex gap-3"><ShieldCheck size={18}/>Your details are treated with care</p></div></div>
        <form onSubmit={submit} className="bg-white p-5 sm:p-7 md:p-14 lg:p-16" noValidate={false}>
          {sent ? <div role="status" className="h-full min-h-80 flex flex-col justify-center items-center text-center"><span className="w-14 h-14 rounded-full bg-forest text-white grid place-items-center mb-5"><Check/></span><h3 className="display text-4xl">Thanks for reaching out.</h3><p className="text-ink/60 mt-3">This demonstration form has captured your enquiry locally.</p><button type="button" onClick={()=>setSent(false)} className="mt-6 underline">Send another enquiry</button></div> : <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5"><label className="text-sm">Name<input required name="name" autoComplete="name" className="mt-2 w-full border border-black/20 rounded-xl px-4 py-3.5" placeholder="Your name"/></label><label className="text-sm">Phone<input required name="phone" type="tel" autoComplete="tel" className="mt-2 w-full border border-black/20 rounded-xl px-4 py-3.5" placeholder="04xx xxx xxx"/></label></div>
            <label className="text-sm block">Email<input required name="email" type="email" autoComplete="email" className="mt-2 w-full border border-black/20 rounded-xl px-4 py-3.5" placeholder="you@email.com"/></label>
            <label className="text-sm block">Buying location<input required name="location" className="mt-2 w-full border border-black/20 rounded-xl px-4 py-3.5" placeholder="Suburb, city or region"/></label>
            <label className="text-sm block">How can we help?<textarea required name="message" rows={4} className="mt-2 w-full border border-black/20 rounded-xl px-4 py-3.5 resize-none" placeholder="Tell us about your property search"/></label>
            <button className="w-full min-h-13 flex justify-center items-center gap-2 rounded-full bg-forest text-white px-6 py-3.5 hover:bg-coral transition-colors">Make an enquiry <ArrowRight size={18}/></button><p className="text-xs leading-5 text-ink/45 text-center">Demonstration only — no information is submitted to a server.</p>
          </div>}
        </form>
      </div>
    </section>

    <footer className="bg-forest-deep text-white px-4 sm:px-5 md:px-10 pt-12 sm:pt-16 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="max-w-[1440px] mx-auto"><div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 pb-10 sm:pb-14"><div className="col-span-2 lg:col-span-2"><Logo light/><p className="text-white/50 text-sm leading-6 max-w-sm mt-5 sm:mt-6">A premium Australian real estate network for residential sales, property management, projects and lifestyle property.</p></div><div><p className="eyebrow text-white/40 mb-4 sm:mb-5">Explore</p>{links.map(l=><a key={l.label} href={l.href} className="flex min-h-10 items-center text-sm text-white/70 hover:text-white">{l.label}</a>)}</div><div><p className="eyebrow text-white/40 mb-4 sm:mb-5">Belle Property</p><a href="https://www.belleproperty.com/contact-us" className="flex min-h-10 items-center text-sm text-white/70 hover:text-white">Contact us</a><a href="https://www.belleproperty.com/find-agent-office" className="flex min-h-10 items-center text-sm text-white/70 hover:text-white">Find an agent or office</a><a href="https://www.belleproperty.com/privacy" className="flex min-h-10 items-center text-sm text-white/70 hover:text-white">Privacy policy</a></div></div><div className="border-t border-white/10 pt-6 sm:pt-7 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between text-xs leading-5 text-white/35"><p>© {new Date().getFullYear()} Belle Property. Concept redesign.</p><p>Designed for a considered property journey.</p></div></div>
    </footer>
  </main>
}

export default App
