import { Loader2 } from "lucide-react";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

export function FeedbackForm() {
  const { t } = useTranslation();
  const subjectId = useId();
  const messageId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubject("");
    setMessage("");
    setIsLoading(false);
    alert(t("feedback.success"));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={subjectId}>{t("feedback.subject")}</Label>
        <Input
          id={subjectId}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t("feedback.subjectPlaceholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={messageId}>{t("feedback.message")}</Label>
        <Textarea
          id={messageId}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("feedback.messagePlaceholder")}
          rows={6}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("common.loading")}
          </>
        ) : (
          t("feedback.send")
        )}
      </Button>
    </form>
  );
}
