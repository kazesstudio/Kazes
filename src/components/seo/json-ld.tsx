/**
 * Renders a JSON-LD graph as a native `<script>` tag.
 *
 * `<` is escaped to its unicode equivalent so a stray angle bracket in content
 * can never close the script element early (XSS).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
       
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
