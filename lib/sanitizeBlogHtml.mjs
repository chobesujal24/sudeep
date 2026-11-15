import sanitizeHtml from "sanitize-html";

// CMS content is untrusted, even when it comes from an authenticated editor.
export function sanitizeBlogHtml(html) {
  return sanitizeHtml(typeof html === "string" ? html : "", {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
  });
}

// JSON-LD is inside a script element, so JSON escaping alone is not enough.
export function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
