"use client";

/*
  A small, working slice of the BookWitMe booking flow, for an example salon.
  Pick a service → pick a time → request it. Nothing is sent anywhere; it only
  shows how the real flow feels. In BookWitMe, the business then confirms.
*/

import { useState } from "react";

const SERVICES = ["Wash and style", "Silk press", "Box braids"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["9:00", "10:30", "12:00", "1:30", "3:00", "4:30"];
const TAKEN = new Set(["12:00"]); // shows that booked times can't be picked twice

export default function BookingPreview() {
  const [service, setService] = useState(SERVICES[1]);
  const [day, setDay] = useState(DAYS[1]);
  const [time, setTime] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

  if (requested) {
    return (
      <div className="booking booking--done" role="status">
        <span className="booking__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="booking__done-title">Request sent</p>
        <p className="booking__done-text">
          {service}, {day} at {time}. The salon confirms your time.
        </p>
        <button
          type="button"
          className="booking__reset"
          onClick={() => {
            setRequested(false);
            setTime(null);
          }}
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <div className="booking">
      <div className="booking__bar">
        <span className="booking__salon">Example salon</span>
        <span className="booking__tag">Try it</span>
      </div>

      <fieldset className="booking__group">
        <legend>Service</legend>
        <div className="booking__chips">
          {SERVICES.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              aria-pressed={service === s}
              onClick={() => setService(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="booking__group">
        <legend>Day</legend>
        <div className="booking__days">
          {DAYS.map((d) => (
            <button
              key={d}
              type="button"
              className="chip chip--day"
              aria-pressed={day === d}
              onClick={() => {
                setDay(d);
                setTime(null);
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="booking__group">
        <legend>Time</legend>
        <div className="booking__times">
          {TIMES.map((t) => {
            const taken = TAKEN.has(t);
            return (
              <button
                key={t}
                type="button"
                className="chip chip--time"
                aria-pressed={time === t}
                disabled={taken}
                aria-label={taken ? `${t}, booked` : t}
                onClick={() => setTime(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        className="booking__submit"
        disabled={!time}
        onClick={() => setRequested(true)}
      >
        {time ? `Request ${day} at ${time}` : "Pick a time"}
      </button>
    </div>
  );
}
