"use client";

import { useState } from "react";
import styles from "./landing.module.scss";
import { siteConfig, formspreeEndpoint } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { contact } = siteConfig;
  const endpoint = formspreeEndpoint();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!endpoint) {
      setStatus("error");
      setMessage(
        "Form is not configured yet. Please reach out on WhatsApp in the meantime.",
      );
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        setMessage(
          "Thanks! Your message is in — I'll reply within 1 business day.",
        );
        form.reset();
      } else {
        setStatus("error");
        setMessage(
          "Something went wrong. Please try again or message me on WhatsApp.",
        );
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or message me on WhatsApp.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="company">
          Company
        </label>
        <input
          className={styles.input}
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Brand or company"
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="niche">
            Niche
          </label>
          <select
            className={styles.select}
            id="niche"
            name="niche"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            {contact.niches.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="budget">
            Budget band
          </label>
          <select
            className={styles.select}
            id="budget"
            name="budget"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            {contact.budgets.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="timeline">
          Timeline
        </label>
        <select
          className={styles.select}
          id="timeline"
          name="timeline"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select…
          </option>
          {contact.timelines.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Project details
        </label>
        <textarea
          className={styles.textarea}
          id="message"
          name="message"
          placeholder="Tell me about your goals, deliverables, and any deadlines."
          required
        />
      </div>

      <button
        className={`${styles.btn} ${styles.btnPrimary}`}
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send inquiry"}
      </button>

      {message ? (
        <p
          className={styles.formStatus}
          data-state={status}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
