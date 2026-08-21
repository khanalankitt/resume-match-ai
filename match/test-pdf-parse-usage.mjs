import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function test() {
  const buf = Buffer.from("%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n"); // fake buffer
  // Wait, I need a real pdf to test
}
