import { useEffect, useState } from "react";
import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { emailDraftLinks, type EmailDraft } from "@/lib/email-draft";

export function EmailDraftDialog({ draft, onClose }: { draft: EmailDraft | null; onClose: () => void }) {
  const [ios, setIos] = useState(false);
  useEffect(() => {
    setIos(/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
  }, []);
  if (!draft) return null;
  const links = emailDraftLinks(draft);
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied");
    } catch {
      toast.error("Could not copy. Select the text to copy it.");
    }
  };
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-sm">
        <DialogHeader>
          <DialogTitle>Email draft</DialogTitle>
          <DialogDescription>Not sent</DialogDescription>
        </DialogHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{draft.bcc ? "Bcc" : "To"}</p>
            <p className="break-all text-sm">{draft.bcc || draft.to}</p>
          </div>
          <Button variant="outline" size="icon" title="Copy recipients" aria-label="Copy recipients" onClick={() => copy(draft.bcc || draft.to || "")}><Copy /></Button>
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0"><p className="text-xs text-muted-foreground">Subject</p><p className="break-words text-sm font-semibold">{draft.subject}</p></div>
          <Button variant="outline" size="icon" title="Copy subject" aria-label="Copy subject" onClick={() => copy(draft.subject)}><Copy /></Button>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between"><p className="text-xs text-muted-foreground">Message</p><Button variant="outline" size="icon" title="Copy message" aria-label="Copy message" onClick={() => copy(draft.body)}><Copy /></Button></div>
          <p className="whitespace-pre-wrap break-words text-sm">{draft.body}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="gold"><a href={ios ? links.gmailApp : links.gmailWeb} target={ios ? undefined : "_blank"} rel="noreferrer"><Mail />{ios ? "Open Gmail app" : "Open Gmail"}</a></Button>
          <Button asChild variant="outline"><a href={links.mail}><Mail />Open mail app</a></Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}