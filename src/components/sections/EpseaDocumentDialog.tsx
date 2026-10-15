"use client";

import { useRef } from "react";
import { epsea } from "@/lib/content";

export function EpseaDocumentDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" className="epsea-cta" onClick={open} aria-haspopup="dialog">
        Conoce más <span aria-hidden="true">→</span>
      </button>

      <dialog
        ref={dialogRef}
        className="epsea-dialog"
        aria-labelledby="epsea-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="epsea-dialog-panel">
          <header className="epsea-dialog-header">
            <h3 id="epsea-dialog-title">{epsea.documentTitle}</h3>
            <div className="epsea-dialog-actions">
              <a href={epsea.documentHref} target="_blank" rel="noopener noreferrer">
                Abrir en pestaña nueva
              </a>
              <button type="button" onClick={close} aria-label="Cerrar documento">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </header>
          <iframe
            className="epsea-dialog-frame"
            src={`${epsea.documentHref}#view=FitH&navpanes=0`}
            title={epsea.documentTitle}
            loading="lazy"
          />
        </div>
      </dialog>
    </>
  );
}
