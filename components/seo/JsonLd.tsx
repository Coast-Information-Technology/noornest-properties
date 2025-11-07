import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
  id?: string;
}

export default function JsonLd({ data, id = "json-ld" }: JsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
