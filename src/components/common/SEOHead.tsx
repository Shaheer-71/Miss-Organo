import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = "Organic Origin - Premium Organicorigin Cosmetics & Natural Skincare Pakistan",
    description = "Explore Organic Origin, your go-to for organicorigin cosmetics and 100% natural skincare products in Pakistan. Shop organic lip care, hair care, and body care. Free delivery, cruelty-free, dermatologically tested.",
    keywords = "organicorigin, organic cosmetics, natural skincare, organicorigin beauty products, herbal cosmetics Pakistan, organicorigin lip care, natural hair care, organicorigin body care, cruelty free cosmetics, organicorigin skincare Pakistan, natural beauty products, Miss Organo",
    image = "https://organicorigin.pk/og-image.jpg",
    url = "https://organicorigin.pk",
    type = "website",
    structuredData
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        ...structuredData,
                        "@context": "https://schema.org",
                        "@type": "Product",
                        name: "Organic Origin Products",
                        description: description,
                        brand: {
                            "@type": "Brand",
                            name: "Organic Origin"
                        },
                        offers: {
                            "@type": "Offer",
                            url: url,
                            priceCurrency: "PKR",
                            availability: "https://schema.org/InStock"
                        }
                    })}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;