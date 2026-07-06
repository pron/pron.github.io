const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/public": "." });
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addFilter("newest", (items) =>
    [...items].sort((left, right) => right.date - left.date),
  );
  eleventyConfig.addFilter("limit", (items, count, offset = 0) =>
    items.slice(offset, offset + count),
  );
  eleventyConfig.addFilter("readableDate", (date) => dateFormatter.format(date));
  eleventyConfig.addFilter("xmlEscape", (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;"),
  );

  return {
    templateFormats: ["njk"],
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
}
