import { contact } from "@/lib/content";

export function WhatsAppFloating() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating"
      aria-label="Escribir a JUZT por WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4a10.5 10.5 0 1 1 9.2 4.9Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.6 8.6 0 0 1-2.6-1.6 9.5 9.5 0 0 1-1.8-2.3c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
