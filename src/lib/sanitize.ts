import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes rich-text HTML coming from the Admin editor before it's stored,
 * and again on the way out to the public page (defense-in-depth — matches
 * the "Output Encoding / XSS Protection" requirement from the brief).
 * Allow-list only: anything not explicitly listed is stripped, including
 * <script>, event handlers (onClick etc.), and javascript: URLs.
 */
const options: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "strong", "em", "u", "s", "mark",
    "h1", "h2", "h3", "h4",
    "ul", "ol", "li",
    "blockquote", "pre", "code", "span",
    "a", "img",
    "table", "thead", "tbody", "tr", "th", "td",
    "hr",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title"],
    code: ["class"], // needed for hljs language-xxx / hljs-* classes
    span: ["class"],
    pre: ["class"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, options);
}
