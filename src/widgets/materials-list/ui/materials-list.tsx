import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  createMockMaterials,
  MaterialIcon,
  type MaterialType,
} from "@/entities/material";
import { formatDuration, formatFileSize } from "@/shared/lib/format";

import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";

const materials = createMockMaterials(8);

export function MaterialsList() {
  const { t } = useTranslation();

  const typeLabels: Record<MaterialType, string> = {
    link: t("materials.link"),
    pdf: t("materials.pdf"),
    video: t("materials.video"),
    presentation: t("materials.presentation"),
  };

  return (
    <div className="space-y-3">
      {materials.map((material) => (
        <Card key={material.id}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <MaterialIcon type={material.type} className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline flex items-center gap-2"
              >
                {material.title}
                <ExternalLink className="h-3 w-3" />
              </a>
              {material.description && (
                <p className="text-sm text-muted-foreground truncate">
                  {material.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{typeLabels[material.type]}</Badge>
              {material.fileSize && (
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(material.fileSize)}
                </span>
              )}
              {material.duration && (
                <span className="text-xs text-muted-foreground">
                  {formatDuration(material.duration)}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
