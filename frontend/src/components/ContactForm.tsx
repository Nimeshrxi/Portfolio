"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";

import { postContact } from "@/lib/api";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const result = await postContact(form);
    if (result.error) {
      setStatus("error");
      setMessage(result.error);
      return;
    }

    setStatus("success");
    setMessage(result.data?.message || "Signal received.");
    setForm(initialForm);
  }

  return (
    <form className="glass-panel sense-target rounded p-5" onSubmit={handleSubmit}>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded border border-spider-red/50 bg-spider-red/15">
          <Mail className="h-5 w-5 text-spider-red-bright" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-fog">
            Contact relay
          </p>
          <h3 className="font-display text-2xl uppercase text-white">Send a signal</h3>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-mist">
          Name
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="mt-2 w-full rounded border border-white/15 bg-black/40 px-3 py-3 text-white outline-none transition focus:border-electric-blue/80"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm text-mist">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="mt-2 w-full rounded border border-white/15 bg-black/40 px-3 py-3 text-white outline-none transition focus:border-electric-blue/80"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm text-mist">
        Subject
        <input
          value={form.subject}
          onChange={(event) => setForm({ ...form, subject: event.target.value })}
          className="mt-2 w-full rounded border border-white/15 bg-black/40 px-3 py-3 text-white outline-none transition focus:border-electric-blue/80"
        />
      </label>

      <label className="mt-4 block text-sm text-mist">
        Message
        <textarea
          required
          minLength={10}
          rows={6}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="mt-2 w-full resize-none rounded border border-white/15 bg-black/40 px-3 py-3 text-white outline-none transition focus:border-electric-blue/80"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex items-center gap-2 rounded border border-spider-red/60 bg-spider-red/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-spider-red/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {status === "loading" ? "Sending" : "Contact me"}
      </button>

      {message ? (
        <p
          className={`mt-4 rounded border px-3 py-2 text-sm ${
            status === "error"
              ? "border-spider-red/50 bg-spider-red/10 text-red-100"
              : "border-electric-blue/50 bg-electric-blue/10 text-blue-100"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
