import mammoth from "mammoth";
// @ts-expect-error Types for pdf-parse are slightly mismatched
import { PDFParse } from "pdf-parse";

if (typeof globalThis.DOMMatrix === "undefined") {
  class DOMMatrixShim {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;
    constructor(_init?: string | number[]) {}
    multiplySelf(): DOMMatrixShim { return this; }
    translateSelf(): DOMMatrixShim { return this; }
    scaleSelf(): DOMMatrixShim { return this; }
    rotateSelf(): DOMMatrixShim { return this; }
    inverseSelf(): DOMMatrixShim { return this; }
    setTransformValue(): DOMMatrixShim { return this; }
    invertSelf(): DOMMatrixShim { return this; }
    multiply(): DOMMatrixShim { return new DOMMatrixShim(); }
    translate(): DOMMatrixShim { return new DOMMatrixShim(); }
    scale(): DOMMatrixShim { return new DOMMatrixShim(); }
    rotate(): DOMMatrixShim { return new DOMMatrixShim(); }
    inverse(): DOMMatrixShim { return new DOMMatrixShim(); }
    transformPoint(): { x: number; y: number; z: number; w: number } {
      return { x: 0, y: 0, z: 0, w: 1 };
    }
    get isIdentity() { return true; }
    get is2D() { return true; }
    toString() { return "matrix(1, 0, 0, 1, 0, 0)"; }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.DOMMatrix = DOMMatrixShim as any;
}



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
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    text = result.text;
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
