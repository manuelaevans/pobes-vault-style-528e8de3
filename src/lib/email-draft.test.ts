import { test } from "node:test";
import { strict as assert } from "node:assert";
import { emailDraftLinks } from "./email-draft";

test("mobile Gmail compose preserves private drop recipients and complete message", () => {
  const draft = { bcc: "first@example.com,second@example.com", subject: "New drop 🆕", body: "ASICS Gel-NYC\nSHOP NOW → https://example.com/product/asics" };
  const link = new URL(emailDraftLinks(draft).gmailApp);
  assert.equal(link.protocol, "googlegmail:");
  assert.equal(link.pathname, "/co");
  assert.equal(link.searchParams.get("bcc"), draft.bcc);
  assert.equal(link.searchParams.has("to"), false);
  assert.equal(link.searchParams.get("subject"), draft.subject);
  assert.equal(link.searchParams.get("body"), draft.body);
});

test("receipt email alternatives preserve recipient and order code", () => {
  const draft = { to: "customer@example.com", subject: "Order received — PV123", body: "Payment received for PV123." };
  const links = emailDraftLinks(draft);
  for (const value of Object.values(links)) {
    const link = new URL(value);
    assert.equal(link.searchParams.get("to"), "customer@example.com");
    assert.equal(link.searchParams.get("body"), "Payment received for PV123.");
    assert.equal(link.searchParams.get(value === links.gmailWeb ? "su" : "subject"), draft.subject);
  }
});