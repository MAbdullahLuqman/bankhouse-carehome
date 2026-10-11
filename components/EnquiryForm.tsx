"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { siteDetails } from "@/lib/data";

export function EnquiryForm() {
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [focusedDate, setFocusedDate] = useState(() => dateKey(new Date()));
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const summary = useRef<HTMLDivElement>(null);
  const dayButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const mounted = useRef(false);
  useEffect(() => setReady(true), []);
  useEffect(() => { if (Object.keys(errors).length) summary.current?.focus(); }, [errors]);
  useEffect(() => {
    if (mounted.current) dayButtons.current[focusedDate]?.focus();
    mounted.current = true;
  }, [focusedDate]);

  const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const calendarStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), -monthStart.getDay() + 1);
  const days = Array.from({ length: 42 }, (_, index) => new Date(calendarStart.getFullYear(), calendarStart.getMonth(), calendarStart.getDate() + index));

  function changeMonth(amount: number) {
    const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1);
    const firstDay = dateKey(nextMonth);
    setVisibleMonth(nextMonth);
    setFocusedDate(firstDay);
  }

  function moveFocus(event: React.KeyboardEvent<HTMLButtonElement>, date: Date) {
    const amount = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
    if (!amount) return;
    event.preventDefault();
    const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
    setVisibleMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
    setFocusedDate(dateKey(nextDate));
  }

  function check(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.namedItem("full-name") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const nextErrors: Record<string, string> = {};
    if (!name.value.trim()) nextErrors["full-name"] = "Enter your full name.";
    if (!email.value.trim()) nextErrors.email = "Enter your email address.";
    else if (email.validity.typeMismatch) nextErrors.email = "Enter an email address in the format name@example.com.";
    setErrors(nextErrors);
    setChecked(Object.keys(nextErrors).length === 0);
  }

  return <form id="enquiry" className="consultation-card" noValidate onSubmit={check} onChange={() => setChecked(false)} aria-describedby="preview-explanation">
    <div className="consultation-side">
      <p className="eyebrow">Bank House Care Home</p><h1>Contact us</h1>
      <p>Ask about arranging a visit or talk through the care and support you’re looking for.</p>
      <section className="date-picker" aria-labelledby="preferred-day-heading">
        <div className="calendar-heading">
          <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}><ChevronLeft size={22} aria-hidden="true" /></button>
          <h2 id="preferred-day-heading">Preferred day</h2>
          <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}><ChevronRight size={22} aria-hidden="true" /></button>
        </div>
        <p className="calendar-month" aria-live="polite">{new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(visibleMonth)}</p>
        <div className="calendar-weekdays" aria-hidden="true">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => <span key={day}>{day}</span>)}</div>
        <div className="calendar-days" role="group" aria-label="Choose a preferred visit day">
          {days.map(day => {
            const key = dateKey(day);
            const isCurrentMonth = day.getMonth() === visibleMonth.getMonth();
            const isToday = key === dateKey(new Date());
            return <button
              key={key}
              ref={element => { dayButtons.current[key] = element; }}
              type="button"
              tabIndex={key === focusedDate ? 0 : -1}
              aria-label={new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(day)}
              aria-pressed={key === selectedDate}
              aria-current={isToday ? "date" : undefined}
              className={`${isCurrentMonth ? "" : "calendar-outside-month "}${key === selectedDate ? "calendar-selected" : ""}`}
              onClick={() => { setSelectedDate(key); setFocusedDate(key); setVisibleMonth(new Date(day.getFullYear(), day.getMonth(), 1)); }}
              onKeyDown={event => moveFocus(event, day)}
            >{day.getDate()}</button>;
          })}
        </div>
        <input type="hidden" name="visit-date" value={selectedDate} />
      </section>
      <div className="consultation-address"><MapPin size={20} aria-hidden="true" /><span>{siteDetails.address}</span></div>
    </div>
    <div className="enquiry-form">
      <p className="eyebrow">Book a visit or ask a question</p><h2>What time works best?</h2>
      <p id="preview-explanation"><strong>Design preview — enquiries are not sent.</strong> Your entries are not transmitted or saved.</p>
      <fieldset className="time-options"><legend>Preferred time</legend>{[["Morning", "morning"], ["Afternoon", "afternoon"], ["No preference", "any"]].map(([label, value], index) => <label key={value}><input type="radio" name="visit-time" value={value} defaultChecked={index === 0} /><span>{label}</span></label>)}</fieldset>
      {Object.keys(errors).length > 0 && <div ref={summary} className="error-summary" tabIndex={-1} role="alert"><h3>Please check the following</h3><ul>{Object.entries(errors).map(([id, message]) => <li key={id}><a href={`#${id}`} onClick={() => document.getElementById(id)?.focus()}>{message}</a></li>)}</ul></div>}
      <div className="form-grid">
        <div className="form-field full-width"><label htmlFor="full-name">Name <span>(required)</span></label><input id="full-name" name="full-name" autoComplete="name" required maxLength={150} aria-invalid={Boolean(errors["full-name"])} aria-describedby={errors["full-name"] ? "full-name-error" : undefined} />{errors["full-name"] && <p id="full-name-error" className="field-error">{errors["full-name"]}</p>}</div>
        <div className="form-field full-width"><label htmlFor="email">Email address <span>(required)</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div>
        <div className="form-field"><label htmlFor="phone">Phone <span>(optional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
        <div className="form-field"><label htmlFor="enquiry-type">I’d like to</label><select id="enquiry-type" name="enquiry-type" defaultValue="visit"><option value="visit">Arrange a visit</option><option value="care">Discuss care</option><option value="fees">Discuss fees</option><option value="other">Ask a question</option></select></div>
        <div className="form-field full-width"><label htmlFor="message">What would you like to discuss? <span>(optional)</span></label><textarea id="message" name="message" maxLength={2000} aria-describedby="message-hint" /><p id="message-hint" className="form-footnote">Please avoid entering sensitive health information in this preview.</p></div>
      </div>
      <button type={ready ? "submit" : "button"} disabled={!ready} className="button">Prepare enquiry<ArrowUpRight size={18} aria-hidden="true" /></button>
      <noscript><p className="pending-note">Form checking requires JavaScript. This preview cannot send enquiries. Use the postal address shown on this page.</p></noscript>
      {checked && <p className="form-status" role="status">The required fields are complete. This is a preview; no enquiry has been sent or saved.</p>}
      <p className="form-footnote">This preview does not send enquiries. <Link className="text-link" href="/privacy">Privacy notice</Link></p>
    </div>
  </form>;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
