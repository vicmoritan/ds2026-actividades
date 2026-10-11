import { describe, it, expect } from "vitest";
import { loginSchema, registroSchema } from "./auth.validation";

describe("loginSchema", () => {
  it("normaliza el email: saca espacios y pasa a minúsculas", () => {
    const r = loginSchema.safeParse({ email: "  Admin@Libreria.TEST ", password: "x" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("admin@libreria.test");
  });

  it("rechaza email con formato inválido", () => {
    const r = loginSchema.safeParse({ email: "no-es-un-email", password: "password123" });
    expect(r.success).toBe(false);
  });

  it("rechaza si no se envía la contraseña", () => {
    const r = loginSchema.safeParse({ email: "admin@libreria.test" });
    expect(r.success).toBe(false);
  });
});

describe("registroSchema", () => {
  it("una contraseña débil acumula los tres errores", () => {
    const r = registroSchema.safeParse({ nombre: "Ana", email: "ana@libreria.test", password: "corta" });
    if (!r.success) expect(r.error.issues.map(i => i.message)).toHaveLength(3);
  });

  it("acepta un registro con datos correctos", () => {
    const r = registroSchema.safeParse({
      nombre: "Ana",
      email: "ana@libreria.test",
      password: "Password123!",
    });
    expect(r.success).toBe(true);
  });

  it("rechaza si el nombre está vacío", () => {
    const r = registroSchema.safeParse({
      nombre: "",
      email: "ana@libreria.test",
      password: "Password123!",
    });
    expect(r.success).toBe(false);
  });
});