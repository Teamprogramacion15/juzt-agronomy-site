"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_KEY = "juzt:analytics-consent:v1";
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

type Consent = "accepted" | "declined" | null;

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    const frame = window.requestAnimationFrame(() => {
      if (saved === "accepted" || saved === "declined") {
        setConsent(saved);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!googleTagId && !metaPixelId && !clarityId) return null;

  function saveConsent(value: Exclude<Consent, null>) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  const metaPixelScript =
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;" +
    "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" +
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}" +
    "(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
    "fbq('init','" +
    metaPixelId +
    "');fbq('track','PageView');";

  return (
    <>
      {consent === "accepted" && googleTagId ? (
        <GoogleAnalytics gaId={googleTagId} />
      ) : null}

      {consent === "accepted" && metaPixelId ? (
        <Script id="juzt-meta-pixel" strategy="afterInteractive">
          {metaPixelScript}
        </Script>
      ) : null}

      {consent === "accepted" && clarityId ? (
        <Script id="juzt-microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      ) : null}

      {consent === null ? (
        <aside
          className="analytics-consent"
          aria-label="Preferencias de medición"
        >
          <p>
            JUZT usa medición opcional para entender el rendimiento del sitio.
            Solo se activa con su autorización.{" "}
            <a href="/privacidad">Ver aviso de privacidad</a>.
          </p>
          <div>
            <button type="button" onClick={() => saveConsent("declined")}>
              Rechazar
            </button>
            <button
              type="button"
              className="analytics-consent-accept"
              onClick={() => saveConsent("accepted")}
            >
              Autorizar
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
