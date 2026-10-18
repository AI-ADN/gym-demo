import { describe, expect, it } from "vitest";
import { emptyRequest, hasErrors, prepareRequest, validateRequest, type RequestValues } from "./request";

const valid: RequestValues = {
  name: "Ana Prueba",
  email: "ana@ejemplo.com",
  reason: "visita",
  plan: "",
  message: "",
};

describe("validateRequest", () => {
  it("accepts a minimal valid request with optional fields empty", () => {
    expect(validateRequest(valid)).toEqual({});
  });

  it("requires name and email on an empty form", () => {
    const errors = validateRequest(emptyRequest);
    expect(errors).toEqual({ name: "required", email: "required" });
    expect(hasErrors(errors)).toBe(true);
  });

  it("treats whitespace-only values as empty", () => {
    expect(validateRequest({ ...valid, name: "   ", email: "  " })).toEqual({
      name: "required",
      email: "required",
    });
  });

  it("rejects malformed emails", () => {
    for (const email of ["ana", "ana@", "ana@dominio", "ana @x.com"]) {
      expect(validateRequest({ ...valid, email }).email).toBe("invalidEmail");
    }
  });

  it("limits name and message length", () => {
    expect(validateRequest({ ...valid, name: "A" }).name).toBe("tooShort");
    expect(validateRequest({ ...valid, name: "A".repeat(81) }).name).toBe("tooLong");
    expect(validateRequest({ ...valid, message: "x".repeat(501) }).message).toBe("tooLong");
    expect(validateRequest({ ...valid, message: "x".repeat(500) })).toEqual({});
  });

  it("keeps a selected plan and reason", () => {
    const values: RequestValues = { ...valid, reason: "paquetes", plan: "integral" };
    expect(validateRequest(values)).toEqual({});
    expect(prepareRequest(values)).toMatchObject({ reason: "paquetes", plan: "integral" });
  });
});

describe("prepareRequest", () => {
  it("trims text fields without dropping data", () => {
    expect(prepareRequest({ ...valid, name: "  Ana  ", message: " Hola " })).toMatchObject({
      name: "Ana",
      message: "Hola",
    });
  });
});
