import { prisma } from "../config/prisma";
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";

afterAll(() => prisma.$disconnect());

describe("Rutas de Auth (con DB)", () => {
  // 1. Login exitoso con credenciales del seed
  it("credenciales del seed → 200 con token y usuario sin passwordHash", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Cliente1234" });

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({ email: "cliente@libreria.test", rol: "CLIENTE" });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  // 2. Contraseña incorrecta
  it("password mal → el MISMO 401 'Credenciales inválidas'", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "PasswordIncorrecta123" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });

  // 3. Email inexistente
  it("mail que no existe → el MISMO 401 (no revela si el mail existe)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nadie@libreria.test", password: "Cliente1234" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });

  // 4. Perfil /yo con token válido
  it("GET /api/auth/yo con token del login → 200", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Cliente1234" });

    const token = loginRes.body.token;

    const res = await request(app)
      .get("/api/auth/yo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ email: "cliente@libreria.test", rol: "CLIENTE" });
  });
});