"use client";

import { useRef } from "react";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type UploadTriggerProps = {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  disabled?: boolean;
};

export default function UploadTrigger({
  accept = "image/*,.pdf,.mp4",
  multiple = false,
  onFiles,
  disabled,
}: UploadTriggerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        hidden
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => {
          const files = event.target.files
            ? Array.from(event.target.files)
            : [];

          if (files.length) {
            onFiles(files);
          }

          event.currentTarget.value = "";
        }}
      />
      <Button
        size="icon"
        type="button"
        variant="outline"
        className="cursor-pointer"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        aria-label="Adjuntar archivos"
        title="Adjuntar archivos"
      >
        <PlusCircle />
      </Button>
    </>
  );
}
