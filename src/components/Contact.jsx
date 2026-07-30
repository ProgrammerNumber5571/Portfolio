import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, TriangleAlert } from 'lucide-react'
import Reveal, { StackedHeading } from './Reveal'
import { budgets, profile } from '../data/content'

/**
 * Set VITE_CONTACT_ENDPOINT to post submissions straight to your inbox
 * (Formspree, Resend, Basin, your own API — anything that accepts JSON POST).
 * Without it the form falls back to handing the message to the visitor's own
 * mail client / webmail, which never silently swallows a submission.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

const EMPTY = { name: '', email: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const [handoff, setHandoff] = useState(false)
  const [copied, setCopied] = useState(null) // 'address' | 'message'

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const subject = `New enquiry from ${form.name || 'your portfolio site'}`
  const bodyText = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Budget: ${form.budget || '—'}`,
    '',
    form.message,
  ].join('\n')

  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(bodyText)}`

  // Opens the visitor's Gmail compose — works with no desktop mail client at all.
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profile.email,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`

  const copy = async (what, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // clipboard blocked (insecure context or denied) — the address is on screen
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!ENDPOINT) {
      // No backend wired up: try the mail client, but always reveal the
      // alternatives so a missing mail app isn't a dead end.
      setHandoff(true)
      window.location.href = mailtoUrl
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: subject }),
      })
      if (!res.ok) throw new Error(`The server turned that away (error ${res.status}).`)

      setStatus('sent')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      // A TypeError here means the request never landed — offline, DNS, CORS.
      // Anything else is our own thrown message, which is already readable.
      setErrorMsg(
        err instanceof TypeError ? "Couldn't reach the server." : err.message || 'That failed to send.',
      )
      setHandoff(true)
    }
  }

  const sending = status === 'sending'

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="shell">
        <Reveal className="eyebrow mb-8">Contact</Reveal>

        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <StackedHeading top="Let's work" bottom="Together" />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-[16px] leading-relaxed text-muted">
                Got a project, a rough idea, or a codebase that needs a second pair of eyes? Tell me
                what you&apos;re building and I&apos;ll come back with an honest read on scope and
                timeline.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 space-y-3">
                <div className="card flex items-center justify-between gap-4 p-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/[0.15] text-accent-soft">
                      <Mail size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        Email
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="block truncate text-sm text-fg transition-colors hover:text-accent-soft"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy('address', profile.email)}
                    aria-label="Copy email address"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent/50 hover:text-fg"
                  >
                    {copied === 'address' ? (
                      <Check size={14} className="text-spark" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                <div className="card flex items-center gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/[0.15] text-accent-soft">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      Location
                    </p>
                    <p className="text-sm text-fg">{profile.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            {status === 'sent' ? (
              <div className="card flex h-full flex-col items-center justify-center p-9 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-spark/[0.15] text-spark">
                  <Check size={24} />
                </span>
                <h3 className="display mt-6 text-2xl">Message sent</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  Thanks — it landed in my inbox. I usually reply within a day or two.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-8"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-7 sm:p-9">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      Name
                    </span>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your name"
                      className="field"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@company.com"
                      className="field"
                    />
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Budget
                  </span>
                  <select value={form.budget} onChange={update('budget')} className="field">
                    <option value="">Select…</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Message
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="What are you building?"
                    className="field resize-none"
                  />
                </label>

                <button type="submit" disabled={sending} className="btn-primary group mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
                  {sending ? (
                    <>
                      Sending
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>

                <div aria-live="polite">
                  {status === 'error' && (
                    <p className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-[#FF8A4C]">
                      <TriangleAlert size={15} className="mt-0.5 shrink-0" />
                      {errorMsg} Use one of the options below instead.
                    </p>
                  )}

                  {handoff ? (
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-[13px] leading-relaxed text-fg/80">
                        {status === 'error'
                          ? 'Send it directly:'
                          : "If your mail app didn't open, send it directly:"}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={gmailUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="chip !py-2"
                        >
                          Open in Gmail
                        </a>
                        <a href={mailtoUrl} className="chip !py-2">
                          Open mail app
                        </a>
                        <button
                          type="button"
                          onClick={() => copy('message', `To: ${profile.email}\n\n${bodyText}`)}
                          className="chip !py-2"
                        >
                          {copied === 'message' ? 'Copied ✓' : 'Copy message'}
                        </button>
                      </div>
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        Or write to {profile.email}
                      </p>
                    </div>
                  ) : (
                    !ENDPOINT && (
                      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
                        Opens in your mail app — nothing is sent automatically
                      </p>
                    )
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
