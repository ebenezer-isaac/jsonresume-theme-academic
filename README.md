# jsonresume-theme-academic

> Academic serif theme for [JSON Resume](https://jsonresume.org) with EB Garamond typography, small caps headings, and gold accents. Designed for print and PDF.

[![npm version](https://img.shields.io/npm/v/jsonresume-theme-academic.svg)](https://www.npmjs.com/package/jsonresume-theme-academic)
[![npm downloads](https://img.shields.io/npm/dm/jsonresume-theme-academic.svg)](https://www.npmjs.com/package/jsonresume-theme-academic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)

![Preview](examples/preview.png)

## Features

- Academic serif typography (EB Garamond)
- A4 print layout with precise margins
- Built in HTML sanitization (XSS safe)
- Customizable section headings via `meta.headings`
- Zero runtime dependencies
- ESM + CJS + UMD builds with TypeScript declarations

## Quick Start

### With resumed (recommended)

```bash
npm install jsonresume-theme-academic
npx resumed render resume.json --theme jsonresume-theme-academic
# → resume.html ready
```

### With resume-cli

```bash
npm install -g resume-cli jsonresume-theme-academic
resume export resume.pdf --theme academic
```

### Programmatic Usage

```typescript
import { render, pdfRenderOptions } from 'jsonresume-theme-academic';

const html = render(resumeJson);
// html is a self-contained HTML document

// For Puppeteer PDF rendering:
await page.pdf(pdfRenderOptions);
```

## Customization

### Section Headings

Override default headings via `meta.headings`:

```json
{
  "meta": {
    "headings": {
      "experience": "Professional Experience",
      "skills": "Technical Skills",
      "education": "Academic Background"
    }
  }
}
```

Available keys: `skills`, `experience`, `projects`, `education`, `volunteer`, `certifications`, `additional`

### PDF Rendering Options

The exported `pdfRenderOptions` provides optimized settings for Puppeteer/Gotenberg:

```typescript
{
  mediaType: 'print',
  format: 'A4',
  margin: { top: '12mm', right: '14mm', bottom: '12mm', left: '14mm' }
}
```

## Development

```bash
git clone https://github.com/ebenezer-isaac/jsonresume-theme-academic.git
cd jsonresume-theme-academic
npm install
npm run dev       # Start dev server
npm test          # Run tests
npm run build     # Build ESM + CJS + UMD
```

## Community

This theme is part of the open-source toolkit from [LLM Conveyors](https://llmconveyors.com), an AI-powered career platform that uses this theme for generating polished, print-ready resumes. We open-sourced it so anyone building with JSON Resume can have a production-quality academic theme out of the box.

If you're using this theme in your project, we'd love to hear about it — open an issue or start a discussion!

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT
