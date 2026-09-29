import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/** Breadcrumbs als kleine Zeile mit Schrägstrich + BreadcrumbList-Schema. Home wird automatisch vorangestellt. */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ name: "Startseite", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Brotkrumen" className={`t-meta text-grey-600 [.studio_&]:text-grey-400 ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-grey-400 [.studio_&]:text-grey-500">
                    /
                  </span>
                )}
                {last ? (
                  <span aria-current="page" className="text-ink [.studio_&]:text-paper">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="py-2 hover:text-ink [.studio_&]:hover:text-paper">
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
