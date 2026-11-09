import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { authenticate, authorize } from "./auth.middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

function mocks(req: Partial<Request> = {}) {
  const res = { 
    status: vi.fn().mockReturnThis(), 
    json: vi.fn().mockReturnThis() 
  } as unknown as Response;
  const next = vi.fn() as unknown as NextFunction;
  return { req: req as Request, res: res as Response, next };
}

describe("authorize middleware", () => {
  it("responde 403 a un CLIENTE cuando la ruta pide ADMIN", () => {
    const { req, res, next } = mocks({ usuario: { id: 2, rol: "CLIENTE" } });
    authorize("ADMIN")(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("llama a next cuando el usuario tiene el rol permitido", () => {
    const { req, res, next } = mocks({ usuario: { id: 1, rol: "ADMIN" } });
    authorize("ADMIN")(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("authenticate middleware", () => {
  it("con un token válido llena req.usuario y llama a next", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
    const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` } });
    authenticate(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(req.usuario).toEqual({ id: 7, rol: "CLIENTE" });
  });

  it("401 'Token expirado' con un token vencido", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "-1s" });
    const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` } });
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token expirado" });
  });

  it("401 'Token inválido' con un token firmado con otro secret", () => {
    const token = jwt.sign({ id: 7, rol: "CLIENTE" }, "otro-secret-falso", { expiresIn: "1h" });
    const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` } });
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
  });

  it("401 'Falta el token' si no viene el header de autorización", () => {
    const { req, res, next } = mocks({ headers: {} });
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Falta el token" });
  });

  it("401 'Falta el token' si el header no empieza con Bearer", () => {
    const { req, res, next } = mocks({ headers: { authorization: "Basic 123456" } });
    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Falta el token" });
  });
});