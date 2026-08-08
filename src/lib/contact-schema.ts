import { z } from "zod";

/** Esquema compartido cliente/servidor para el formulario de contacto. */
export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre")
    .max(80, "Máximo 80 caracteres"),
  email: z
    .string()
    .trim()
    .min(1, "Ingresa tu correo")
    .email("Correo no válido")
    .max(120),
  telefono: z
    .string()
    .trim()
    .min(7, "Teléfono no válido")
    .max(25, "Teléfono no válido"),
  pais: z.string().trim().max(56).optional().or(z.literal("")),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mín. 10 caracteres)")
    .max(2000, "Máximo 2000 caracteres"),
  consent: z.literal(true, {
    message: "Debes autorizar el tratamiento de datos",
  }),
  // Honeypot anti-spam: debe quedar vacío.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
