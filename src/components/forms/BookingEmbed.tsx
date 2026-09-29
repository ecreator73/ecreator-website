"use client";

import { useState } from "react";
import { strategyCall } from "@/content/site";
import { RingArrow } from "@/components/ui/ButtonLink";

/**
 * Terminbuchung (Google Calendar Appointment Schedules).
 * Der Kalender wird erst nach Klick geladen: keine Datenübertragung an Google ohne Zustimmung.
 * Provider austauschbar über strategyCall.bookingUrl (z.B. Cal.com, HubSpot).
 */
export function BookingEmbed() {
  const [load, setLoad] = useState(false);

  if (load) {
    return (
      <div className="border border-line-strong bg-white">
        <iframe
          src={strategyCall.bookingUrl}
          title="Termin für den Strategie-Call auswählen"
          className="block h-[760px] w-full md:h-[720px]"
          loading="lazy"
        />
        <p className="t-meta border-t border-line px-4 py-3 text-grey-600">
          Buchung über Google Calendar / Bestätigung per E-Mail / Zeitzone Zürich
        </p>
      </div>
    );
  }

  return (
    <div className="hatch flex min-h-[420px] flex-col justify-between border border-line-strong p-6 md:p-8">
      <div>
        <p className="t-meta text-grey-600">Termin wählen</p>
        <p className="t-h2 mt-6 max-w-[14ch]">{strategyCall.duration}. Kostenlos. Per Video-Call.</p>
      </div>
      <div>
        <button type="button" onClick={() => setLoad(true)} className="btn btn-primary w-full sm:w-auto" data-cta="booking-load">
          <span>Kalender laden und Termin wählen</span>
          <RingArrow />
        </button>
        <p className="t-small mt-4 max-w-[52ch] text-grey-700">
          Der Kalender wird von Google bereitgestellt. Beim Laden werden Daten an Google übertragen. Lieber ohne Google?{" "}
          <a href={strategyCall.bookingUrl} target="_blank" rel="noopener noreferrer" className="link">
            Kalender in neuem Tab öffnen
          </a>{" "}
          oder schreib uns über das Formular unten.
        </p>
      </div>
    </div>
  );
}
