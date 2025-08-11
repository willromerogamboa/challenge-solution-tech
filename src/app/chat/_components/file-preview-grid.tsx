import { FileIcon, ImageIcon, X } from "lucide-react";
import Image from "next/image";

import { formatBytes } from "@/lib/format-bytes";
import { FileUpload } from "@/models/file-upload.model";

type FilePreviewGridProps = {
  files: FileUpload[];
  onRemove: (id: string) => void;
  disabled?: boolean;
};

export default function FilePreviewGrid({
  files,
  onRemove,
  disabled,
}: FilePreviewGridProps) {
  if (!files.length) return null;

  return (
    <div className="mt-3 mb-2 border rounded-xl p-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative border rounded-lg overflow-hidden group"
          >
            <button
              type="button"
              onClick={() => onRemove(file.id)}
              className="absolute right-2 top-2 z-10 inline-flex items-center justify-center rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition"
              aria-label={`Eliminar ${file.name}`}
              title="Eliminar"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>

            {file.isImage && file.previewUrl ? (
              <div className="flex flex-col">
                <Image
                  src={file.previewUrl}
                  alt={file.name}
                  className="h-36 w-full object-cover"
                  width={144}
                  height={144}
                />
                <div className="p-2 w-full">
                  <div className="truncate text-sm font-medium">
                    {file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-32 w-full flex flex-col items-center justify-center p-3">
                <div className="mb-2">
                  {file.type === "application/pdf" ||
                  file.type === "video/mp4" ? (
                    <FileIcon className="h-8 w-8" />
                  ) : (
                    <ImageIcon className="h-8 w-8" />
                  )}
                </div>

                <div className="px-2 text-center w-full">
                  <div
                    title={file.name}
                    className="truncate text-sm font-medium"
                  >
                    {file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
