import mammoth from "mammoth";
import { getDocumentProxy, extractText } from "unpdf";

export class UnsupportedFileTypeError extends Error {
  constructor(mimeType: string) {
    super(`Unsupported file type: ${mimeType}`);
    this.name = "UnsupportedFileTypeError";
  }
}

export class EmptyResumeTextError extends Error {
  constructor() {
    super(
      "No readable text found in the uploaded file. It may be a scanned or image-based document.",
    );
    this.name = "EmptyResumeTextError";
  }
}

const PDF_TYPE = "application/pdf";
const DOCX_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/**
 * Extracts plain text from an uploaded resume file (PDF or DOCX).
 */
export async function extractResumeText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  let text: string;

  if (file.type === PDF_TYPE || file.name.toLowerCase().endsWith(".pdf")) {
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text: pages } = await extractText(pdf, { mergePages: true });
    text = Array.isArray(pages) ? pages.join(" ") : pages;
  } else if (
    file.type === DOCX_TYPE ||
    file.name.toLowerCase().endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    throw new UnsupportedFileTypeError(file.type || "unknown");
  }

  const cleaned = text.replace(/\s+/g, " ").trim();

  if (cleaned.length < 20) {
    throw new EmptyResumeTextError();
  }

  return cleaned;
}
