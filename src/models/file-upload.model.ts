export type FileUpload = {
  id: string;
  name: string;
  type: string;
  size: number;
  file: File;
  previewUrl?: string;
  isImage: boolean;
};
