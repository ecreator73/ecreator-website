/**
 * Die alte Seite /produkt-rechner/ war eine interne Seite und wird bewusst
 * nicht migriert. 410 Gone signalisiert Suchmaschinen, die URL dauerhaft zu entfernen.
 */
export function GET() {
  return new Response("Diese Seite existiert nicht mehr.", {
    status: 410,
    headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
  });
}
