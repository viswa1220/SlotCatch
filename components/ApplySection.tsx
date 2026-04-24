"use client";
import { useState } from "react";
import Icon from "./Icon";
import { useInView } from "@/lib/hooks";

export default function ApplySection() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [form, setForm] = useState({ biz: "", owner: "", email: "", phone: "", type: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setSubmitting(false);
    setDone(true);
  };
  const change = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <section id="apply" className="section apply-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head center ${inView ? "in" : ""}`}>
          <div className="eyebrow">Apply</div>
          <h2>Let&apos;s set you up.</h2>
          <p className="section-sub">Tell us about your business — we&apos;ll set up your WhatsApp agent in 48 hours.</p>
        </div>
        <form className={`apply-form glass ${inView ? "in" : ""}`} onSubmit={submit}>
          {done ? (
            <div className="apply-done">
              <div className="done-check"><Icon name="check" size={28} /></div>
              <h3>Application received.</h3>
              <p>We&apos;ll reach out within 48 hours to schedule a setup call.</p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <label>
                  <span>Business name</span>
                  <input required value={form.biz} onChange={change("biz")} placeholder="Prime Auto Detailing" />
                </label>
                <label>
                  <span>Owner name</span>
                  <input required value={form.owner} onChange={change("owner")} placeholder="Jordan Reyes" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span>Email</span>
                  <input required type="email" value={form.email} onChange={change("email")} placeholder="you@business.com" />
                </label>
                <label>
                  <span>Phone</span>
                  <input required value={form.phone} onChange={change("phone")} placeholder="+1 (555) 000-0000" />
                </label>
              </div>
              <label className="full">
                <span>Type of service business</span>
                <select required value={form.type} onChange={change("type")}>
                  <option value="">Select one…</option>
                  <option>Car Detailing</option>
                  <option>Cleaning</option>
                  <option>HVAC</option>
                  <option>Lawn Care</option>
                  <option>Dental</option>
                  <option>Other</option>
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
                {submitting ? (<><span className="spinner" /> Applying…</>) : (<>Apply Now <Icon name="arrow" size={16} /></>)}
              </button>
            </>
          )}
        </form>
        <footer className="footer">
          <div className="footer-links">
            <a>Instagram</a>
            <a>LinkedIn</a>
            <a>hello@slotcatch.ai</a>
          </div>
          <div className="footer-fine">
            Built with passion by SlotCatch.ai · © 2026
          </div>
        </footer>
      </div>
    </section>
  );
}
