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
    title = "Organic Origin - Premium Organic Cosmetics & Natural Skincare Products Pakistan",
    description = "Discover Organic Origin's premium organic cosmetics made with 100% natural ingredients. Shop organic skincare, lip care, hair care & body care products in Pakistan. Free delivery, cruelty-free, dermatologically tested.",
    keywords = "organic cosmetics, natural skincare, organic beauty products, herbal cosmetics Pakistan, organic lip care, natural hair care, organic body care, cruelty free cosmetics, organic skincare Pakistan, natural beauty products, Miss Organo",
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
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;