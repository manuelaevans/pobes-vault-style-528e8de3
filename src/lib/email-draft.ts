export type EmailDraft = { to?: string; bcc?: string; subject: string; body: string };

export function emailDraftLinks(draft: EmailDraft) {
  const query = Object.entries(draft)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const webQuery = Object.entries({ to: draft.to, bcc: draft.bcc, su: draft.subject, body: draft.body })
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value ?? "")}`)
    .join("&");
  return {
    gmailApp: `googlegmail:///co?${query}`,
    gmailWeb: `https://mail.google.com/mail/u/0/?view=cm&fs=1&${webQuery}`,
    mail: `mailto:?${query}`,
  };
}