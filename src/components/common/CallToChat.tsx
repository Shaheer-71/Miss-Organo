import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';


export default function CallToChat() {

    const whatsappNumber = "+923164000647"; // your WhatsApp number
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`;

    return (
        <div>
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp className="w-6 h-6" />
            </a>
        </div>
    )
}
