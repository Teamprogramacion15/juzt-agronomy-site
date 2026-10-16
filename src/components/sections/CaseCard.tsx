"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import styles from "./HomeReform.module.css";

export type CaseGalleryImage = { src: string; alt: string };

export type CaseCardProps = {
  id: string;
  photo: string;
  photoAlt: string;
  title: string;
  place?: string;
  text?: string;
  result?: string;
  gallery?: CaseGalleryImage[];
  galleryLayout?: "feature" | "wide";
  index: number;
};

export function CaseCard({ id, photo, photoAlt, title, place, text, result, gallery = [], galleryLayout = "feature", index }: CaseCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hasDetail = Boolean(result || gallery.length);
  const titleId = `case-dialog-${id}`;
  const galleryClass = gallery.length >= 4 ? styles.gallery4 : gallery.length >= 3 ? (galleryLayout === "wide" ? styles.galleryWide3 : styles.gallery3) : gallery.length === 2 ? (galleryLayout === "wide" ? styles.galleryStack : styles.gallery2) : styles.gallery1;

  return (
    <article className={styles.caseCard}>
      <div className={styles.casePhoto} data-motion="image" data-motion-exit="true">
        <Image src={`/img/reform/${photo}-hq.webp`} alt={photoAlt} fill sizes="(max-width: 760px) 85vw, 36vw" quality={100} />
      </div>
      <div className={styles.caseCopy} data-motion="quiet" data-motion-delay="100">
        <h3>{title}</h3>
        {place && <p className={styles.caseMeta}>{place}</p>}
        {!hasDetail && text && <p>{text}</p>}
        <button
          type="button"
          className={styles.blueLink}
          onClick={() => dialogRef.current?.showModal()}
          aria-haspopup="dialog"
          aria-label={`Conoce más sobre ${title || `el caso ${index + 1}`}`}
          disabled={!hasDetail}
        >
          Conoce más <ArrowRight aria-hidden="true" strokeWidth={1.5} />
        </button>
      </div>

      {hasDetail && (
        <dialog
          ref={dialogRef}
          className={styles.caseDialog}
          aria-labelledby={titleId}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
        >
          <div className={`${styles.caseDialogPanel} ${gallery.length === 0 ? styles.caseDialogPanelSolo : ""}`}>
            <button type="button" className={styles.caseDialogClose} onClick={() => dialogRef.current?.close()} aria-label="Cerrar">
              <X aria-hidden="true" strokeWidth={1.8} />
            </button>
            <div className={styles.caseDialogBody}>
              <header>
                {place && <p className={styles.caseDialogPlace}>{place}</p>}
                <h3 id={titleId}>{title}</h3>
              </header>
              {text && <p className={styles.caseDialogText}>{text}</p>}
              {result && <p className={styles.caseDialogResult}>{result}</p>}
            </div>
            {gallery.length > 0 && (
              <div className={`${styles.caseGallery} ${galleryClass}`}>
                {gallery.map((img) => (
                  <figure key={img.src}>
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 760px) 90vw, 520px" quality={90} />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </dialog>
      )}
    </article>
  );
}
