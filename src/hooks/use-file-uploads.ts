"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { FileUpload } from "@/models/file-upload.model";

function toUploads(files: File[]): FileUpload[] {
  return files.map((file) => {
    const isImage = file.type.startsWith("image/");
    const previewUrl = isImage ? URL.createObjectURL(file) : undefined;

    return {
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      file,
      isImage,
      previewUrl,
    };
  });
}

type Options = {
  maxFiles?: number;
  dedupe?: boolean;
};

export function useFileUploads(options: Options = {}) {
  const { maxFiles = 1, dedupe = true } = options;

  const [files, setFiles] = useState<FileUpload[]>([]);
  const filesRef = useRef<FileUpload[]>([]);
  filesRef.current = files;

  const addFiles = useCallback(
    (incoming: File[]) => {
      const next = toUploads(incoming);

      setFiles((prev) => {
        let merged = [...prev, ...next];

        if (dedupe) {
          const seen = new Set<string>();

          merged = merged.filter((f) => {
            const key = `${f.name}:${f.size}`;

            if (seen.has(key)) {
              if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
              return false;
            }

            seen.add(key);
            return true;
          });
        }

        if (merged.length > maxFiles) {
          const overflow = merged.slice(maxFiles);

          overflow.forEach(
            (file) => file.previewUrl && URL.revokeObjectURL(file.previewUrl)
          );

          merged = merged.slice(0, maxFiles);
        }

        return merged;
      });
    },
    [dedupe, maxFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((x) => x.id === id);

      if (file?.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }

      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  useEffect(() => {
    return () => {
      filesRef.current.forEach(
        (file) => file.previewUrl && URL.revokeObjectURL(file.previewUrl)
      );
    };
  }, []);

  return { files, addFiles, removeFile, clearFiles };
}
