import { FileText, Link, Presentation, Video } from "lucide-react";
import type { MaterialType } from "../model/types";

interface MaterialIconProps {
  type: MaterialType;
  className?: string;
}

const icons: Record<MaterialType, typeof FileText> = {
  pdf: FileText,
  video: Video,
  presentation: Presentation,
  link: Link,
};

export function MaterialIcon({ type, className }: MaterialIconProps) {
  const Icon = icons[type];

  return <Icon className={className} />;
}
