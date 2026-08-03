import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://mgconnect.ca";
const logo = `${siteUrl}/assets-web/logo-wide.jpg`;
const orgLogo = `${siteUrl}/assets-web/logo-header-transparent.png`;
const today = "2026-08-03";

const pages = [
  {
    file: "index.html",
    url: "/",
    title: "Maghreb Global Connect Inc. | Importation et distribution au Canada",
    description:
      "Maghreb Global Connect Inc. relie les fabricants du Maghreb aux r\u00e9seaux de vente canadiens avec une approche B2B structur\u00e9e, progressive et professionnelle.",
    keywords:
      "Maghreb Global Connect, MG Connect, importation Canada, distribution Canada, produits du Maghreb",
    priority: "1.0",
    freq: "weekly",
  },
  {
    file: "produits.html",
    url: "/produits.html",
    title: "Produits alimentaires import\u00e9s au Canada | MG Connect",
    description:
      "Catalogue alimentaire MG Connect: boissons, gammes import\u00e9es et fiches commerciales destin\u00e9es aux d\u00e9taillants, distributeurs et partenaires au Canada.",
    keywords:
      "produits alimentaires import\u00e9s Canada, catalogue alimentaire, distribution alimentaire Canada, MG Connect",
    priority: "0.9",
    freq: "weekly",
  },
  {
    file: "produits-non-alimentaires.html",
    url: "/produits-non-alimentaires.html",
    title: "Produits non alimentaires | MG Connect",
    description:
      "Cat\u00e9gorie r\u00e9serv\u00e9e aux futures gammes non alimentaires s\u00e9lectionn\u00e9es par Maghreb Global Connect Inc.",
    keywords: "produits non alimentaires Canada, catalogue MG Connect",
    priority: "0.9",
    freq: "weekly",
  },
  {
    file: "izem-energy.html",
    url: "/izem-energy.html",
    title: "IZEM Energy Canada | Boisson \u00e9nergisante bient\u00f4t disponible",
    description:
      "Pr\u00e9sentation de la gamme IZEM Energy by Ifri: boissons \u00e9nergisantes, saveurs disponibles, formats 25 cl et 50 cl selon disponibilit\u00e9, bient\u00f4t au Canada.",
    keywords:
      "IZEM Energy Canada, boisson \u00e9nergisante Canada, Ifri Canada, importation IZEM Canada",
    priority: "0.9",
    freq: "weekly",
    product: {
      name: "IZEM Energy",
      brand: "Ifri / IZEM",
      category: "Boisson \u00e9nergisante",
    },
  },
  {
    file: "izem-catalogue.html",
    url: "/izem-catalogue.html",
    title: "Catalogue IZEM Energy | Saveurs et formats au Canada",
    description:
      "Catalogue des saveurs IZEM Energy pr\u00e9vues pour le march\u00e9 canadien: Classic, Juicy, Zero et formats disponibles selon les fiches produit.",
    keywords: "catalogue IZEM Energy, saveurs IZEM, formats IZEM 25cl 50cl",
    priority: "0.7",
    freq: "weekly",
  },
  {
    file: "fournisseurs.html",
    url: "/fournisseurs.html",
    title: "Devenir fournisseur | Maghreb Global Connect Inc.",
    description:
      "Proposez vos produits \u00e0 Maghreb Global Connect Inc. pour \u00e9valuer leur potentiel commercial et leur introduction sur le march\u00e9 canadien.",
    keywords: "devenir fournisseur Canada, exporter produits au Canada, partenariat MG Connect",
    priority: "0.7",
    freq: "monthly",
  },
  {
    file: "detaillants.html",
    url: "/detaillants.html",
    title: "Devenir d\u00e9taillant | Produits MG Connect",
    description:
      "Page destin\u00e9e aux \u00e9piceries, superettes, d\u00e9panneurs, restaurants et commerces souhaitant vendre les produits distribu\u00e9s par MG Connect.",
    keywords: "devenir d\u00e9taillant, produits import\u00e9s Canada, distributeur alimentaire Canada",
    priority: "0.7",
    freq: "monthly",
  },
  {
    file: "distribution.html",
    url: "/distribution.html",
    title: "Distribution au Canada | Grand Montr\u00e9al, Outaouais, Capitale-Nationale",
    description:
      "Maghreb Global Connect Inc. d\u00e9veloppe une distribution progressive au Grand Montr\u00e9al, en Outaouais et dans la Capitale-Nationale.",
    keywords: "distribution Canada, Grand Montr\u00e9al, Outaouais, Capitale-Nationale, MG Connect",
    priority: "0.7",
    freq: "monthly",
  },
  {
    file: "marche-canadien.html",
    url: "/marche-canadien.html",
    title: "March\u00e9 canadien | Passerelle commerciale MG Connect",
    description:
      "MG Connect accompagne l'adaptation commerciale des marques et produits au march\u00e9 canadien gr\u00e2ce \u00e0 une approche terrain, B2B et progressive.",
    keywords: "march\u00e9 canadien, importer au Canada, produits du Maghreb Canada",
    priority: "0.7",
    freq: "monthly",
  },
  {
    file: "a-propos.html",
    url: "/a-propos.html",
    title: "\u00c0 propos | Maghreb Global Connect Inc.",
    description:
      "D\u00e9couvrez l'histoire, la mission et les valeurs de Maghreb Global Connect Inc., entreprise qu\u00e9b\u00e9coise d'importation et de distribution.",
    keywords: "Maghreb Global Connect Inc, MG Connect, entreprise importation Qu\u00e9bec",
    priority: "0.7",
    freq: "monthly",
  },
  {
    file: "actualites.html",
    url: "/actualites.html",
    title: "Actualit\u00e9s | Nouveaux produits et annonces MG Connect",
    description:
      "Suivez les annonces, lancements, nouveaux produits et d\u00e9veloppements commerciaux de Maghreb Global Connect Inc.",
    keywords: "actualit\u00e9s MG Connect, lancements produits, nouveaux produits Canada",
    priority: "0.7",
    freq: "monthly",
  },
  {
    file: "contact.html",
    url: "/contact.html",
    title: "Contact | Maghreb Global Connect Inc.",
    description:
      "Contactez Maghreb Global Connect Inc. pour une demande fournisseur, d\u00e9taillant, distributeur ou toute autre collaboration commerciale.",
    keywords: "contact MG Connect, fournisseur Canada, d\u00e9taillant Canada, distributeur Canada",
    priority: "0.7",
    freq: "monthly",
  },
];

const products = [
  ["izem-classic.html", "IZEM Energy Classic", "La signature originale IZEM Energy avec caf\u00e9ine d'origine naturelle, extrait naturel de guarana et vitamines B3, B5, B6 et B12."],
  ["izem-pomme-figue.html", "IZEM Energy Pomme-Figue", "Saveur Pomme-Figue de la gamme IZEM Energy, pens\u00e9e pour une offre \u00e9nergisante distinctive et bient\u00f4t disponible au Canada."],
  ["izem-coco-myrtille.html", "IZEM Energy Coco Myrtille", "Saveur Coco Myrtille de la gamme IZEM Energy, avec caf\u00e9ine d'origine naturelle et extrait naturel de guarana."],
  ["izem-poire.html", "IZEM Energy Poire", "Saveur Poire de la gamme IZEM Energy Juicy, avec jus naturel selon la fiche produit et format disponible au catalogue."],
  ["izem-mangue.html", "IZEM Energy Mangue", "Saveur Mangue de la gamme IZEM Energy Juicy, pens\u00e9e pour une pr\u00e9sence vive en rayon."],
  ["izem-fruits-rouges.html", "IZEM Energy Fruits rouges", "Saveur Fruits rouges de la gamme IZEM Energy Juicy, bient\u00f4t disponible au Canada."],
  ["izem-zero-classic.html", "IZEM Energy Zero Classic", "Version Zero Classic sans sucre de la gamme IZEM Energy, avec caf\u00e9ine d'origine naturelle."],
  ["izem-pasteque-fraise.html", "IZEM Energy Past\u00e8que Fraise", "Saveur Past\u00e8que Fraise de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-cerise.html", "IZEM Energy Cerise", "Saveur Cerise de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-tropical.html", "IZEM Energy Tropical", "Saveur Tropical de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-mojito.html", "IZEM Energy Mojito", "Saveur Mojito de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-grenade.html", "IZEM Energy Grenade", "Saveur Grenade de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-fraise-abricot.html", "IZEM Energy Fraise Abricot", "Saveur Fraise Abricot de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-vanille-mure.html", "IZEM Energy Vanille M\u00fbre", "Saveur Vanille M\u00fbre de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-zero-cerise.html", "IZEM Energy Zero Cerise", "Version Zero Cerise de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
  ["izem-zero-pomme-figue.html", "IZEM Energy Zero Pomme-Figue", "Version Zero Pomme-Figue de la gamme IZEM Energy, bient\u00f4t disponible au Canada."],
];

for (const [file, name, description] of products) {
  pages.push({
    file,
    url: `/${file}`,
    title: `${name} Canada | Fiche produit MG Connect`,
    description,
    keywords: `${name}, IZEM Energy Canada, boisson \u00e9nergisante Canada, MG Connect`,
    priority: "0.7",
    freq: "weekly",
    product: { name, brand: "Ifri / IZEM", category: "Boisson \u00e9nergisante" },
  });
}

const bodyRepairs = [
  ["d?taillants.html", "detaillants.html"],
  ["D?taillants", "D&eacute;taillants"],
  ["d?taillants", "d&eacute;taillants"],
  ["r?seaux", "r&eacute;seaux"],
  ["structur?e", "structur&eacute;e"],
  ["structur?es", "structur&eacute;es"],
  ["s?lectionn?s", "s&eacute;lectionn&eacute;s"],
  ["s?lectionn?es", "s&eacute;lectionn&eacute;es"],
  ["s?lectionn?e", "s&eacute;lectionn&eacute;e"],
  ["d?veloppement", "d&eacute;veloppement"],
  ["Grand Montr?al", "Grand Montr&eacute;al"],
  ["import?s", "import&eacute;s"],
  ["import?es", "import&eacute;es"],
  ["destin?es", "destin&eacute;es"],
  ["Cat?gorie", "Cat&eacute;gorie"],
  ["cat?gorie", "cat&eacute;gorie"],
  ["r?serv?e", "r&eacute;serv&eacute;e"],
  ["?nergisante", "&eacute;nergisante"],
  ["?nergisantes", "&eacute;nergisantes"],
  ["caf?ine", "caf&eacute;ine"],
  ["bient?t", "bient&ocirc;t"],
  ["disponibilit?", "disponibilit&eacute;"],
  ["sup?rettes", "sup&eacute;rettes"],
  ["?piceries", "&eacute;piceries"],
  ["?picerie", "&eacute;picerie"],
  ["march?", "march&eacute;"],
  ["? propos", "&Agrave; propos"],
  ["Actualit?s", "Actualit&eacute;s"],
  ["actualit?s", "actualit&eacute;s"],
  ["d?veloppements", "d&eacute;veloppements"],
  ["? venir", "&agrave; venir"],
  ["rafra?chissante", "rafra&icirc;chissante"],
];

function htmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function canonical(page) {
  return page.url === "/" ? `${siteUrl}/` : `${siteUrl}${page.url}`;
}

function headFor(page, existingHead) {
  const stylesheet = existingHead.match(/<link rel="stylesheet"[^>]+>/)?.[0] ?? '<link rel="stylesheet" href="styles.css" />';
  const scripts = [organizationSchema(), pageSchema(page), breadcrumbSchema(page)];
  if (page.product) scripts.push(productSchema(page));

  return `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${htmlAttr(page.title)}</title>
  <meta name="description" content="${htmlAttr(page.description)}" />
  <meta name="keywords" content="${htmlAttr(page.keywords)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical(page)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_CA" />
  <meta property="og:site_name" content="Maghreb Global Connect Inc." />
  <meta property="og:title" content="${htmlAttr(page.title)}" />
  <meta property="og:description" content="${htmlAttr(page.description)}" />
  <meta property="og:url" content="${canonical(page)}" />
  <meta property="og:image" content="${logo}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${htmlAttr(page.title)}" />
  <meta name="twitter:description" content="${htmlAttr(page.description)}" />
  <meta name="twitter:image" content="${logo}" />
  ${stylesheet}
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": scripts }, null, 2)}</script>
</head>`;
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Maghreb Global Connect Inc.",
    alternateName: ["MG Connect", "Maghreb Global Connect"],
    url: siteUrl,
    logo: orgLogo,
    slogan: "Votre passerelle vers l'excellence du Maghreb",
    description:
      "Entreprise d'importation et de distribution reliant des fabricants selectionnes aux reseaux de vente canadiens.",
    areaServed: ["Canada", "Grand Montreal", "Outaouais", "Capitale-Nationale"],
    knowsAbout: [
      "importation alimentaire",
      "distribution alimentaire",
      "produits du Maghreb",
      "developpement commercial Canada",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "contact@mgconnect.ca",
        areaServed: "CA",
        availableLanguage: ["fr", "en"],
      },
    ],
  };
}

function pageSchema(page) {
  return {
    "@type": "WebPage",
    "@id": `${canonical(page)}#webpage`,
    url: canonical(page),
    name: page.title,
    description: page.description,
    inLanguage: "fr-CA",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

function breadcrumbSchema(page) {
  const name = page.title.split("|")[0].trim();
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name, item: canonical(page) },
    ],
  };
}

function productSchema(page) {
  return {
    "@type": "Product",
    name: page.product.name,
    brand: { "@type": "Brand", name: page.product.brand },
    category: page.product.category,
    description: page.description,
    url: canonical(page),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      priceCurrency: "CAD",
      seller: { "@id": `${siteUrl}/#organization` },
    },
  };
}

function applyRepairs(source) {
  let output = source;
  for (const [from, to] of bodyRepairs) {
    output = output.split(from).join(to);
  }
  return output;
}

for (const page of pages) {
  const absolute = path.join(root, page.file);
  if (!fs.existsSync(absolute)) continue;
  const source = fs.readFileSync(absolute, "utf8");
  const headMatch = source.match(/<head>[\s\S]*?<\/head>/i);
  if (!headMatch) continue;
  const repaired = applyRepairs(source);
  const currentHead = repaired.match(/<head>[\s\S]*?<\/head>/i)?.[0] ?? headMatch[0];
  const updated = repaired.replace(/<head>[\s\S]*?<\/head>/i, headFor(page, currentHead));
  fs.writeFileSync(absolute, updated, "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${canonical(page)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
