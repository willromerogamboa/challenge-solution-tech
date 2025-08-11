"use client";

import Image from "next/image";
import Link from "next/link";

import { FileIcon } from "lucide-react";

import { Message } from "@/models/message.model";

type MessageItemProps = {
  message: Message;
};

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div className="mb-3">
      <div className="font-semibold text-sm mb-1">
        {message.role === "user" ? "You" : "Assistant"}
      </div>

      <p className="whitespace-pre-wrap">{message.content}</p>

      {message.files?.length ? (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {message.files.map((file, idx) =>
            file.isImage ? (
              <Image
                priority
                key={idx}
                src={file.url}
                alt={file.name}
                className="h-40 w-full object-cover rounded-md"
                width={500}
                height={500}
              />
            ) : (
              <Link
                key={idx}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border rounded-md px-2 py-1"
              >
                <FileIcon className="h-4 w-4 mr-2" />
                <span className="text-sm truncate">{file.name}</span>
              </Link>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
