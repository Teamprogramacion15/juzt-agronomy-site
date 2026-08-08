export {};

declare global {
  interface Window {
    /** Señal de que el preloader terminó y el hero puede animar. */
    __juztReady?: boolean;
  }
}
