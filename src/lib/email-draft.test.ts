import { test, expect } from "bun:test";
import { emailDraftLinks } from "./email-draft";

test("mobile Gmail compose preserves private drop recipients and complete message", () => {
  const draft = { bcc: "first@example.com,second@example.com", subject: "New drop 🆕", body: "ASICS Gel-NYC\nSHOP NOW → https://example.com/product/asics" };
  const link = new URL(emailDraftLinks(draft).gmailApp);
  expect(link.protocol).toBe("googlegmail:");
  expect(link.pathname).toBe("/co");
  expect(link.searchParams.get("bcc")).toBe(draft.bcc);
  expect(link.searchParams.has("to")).toBe(false);
  expect(link.searchParams.get("subject")).toBe(draft.subject);
  expect(link.searchParams.get("body")).toBe(draft.body);
});

test("receipt email alternatives preserve recipient and order code", () => {
  const draft = { to: "customer@example.com", subject: "Order received — PV123", body: "Payment received for PV123." };
  const links = emailDraftLinks(draft);
  for (const value of Object.values(links)) {
    const link = new URL(value);
    expect(link.searchParams.get("to")).toBe("customer@example.com");
    expect(link.searchParams.get("body")).toBe("Payment received for PV123.");
    expect(link.searchParams.get(value === links.gmailWeb ? "su" : "subject")).toBe(draft.subject);
  }
});