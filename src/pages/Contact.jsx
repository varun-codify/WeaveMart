import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-brand-white min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif text-brand-charcoal mb-4">Contact Us</h1>
                    <p className="text-stone-500">We'd love to hear from you. Visit our showroom or get in touch.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* Contact Info */}
                    <div className="bg-stone-50 p-8 md:p-12 space-y-10 h-full">
                        <div>
                            <h3 className="text-lg font-serif text-brand-charcoal mb-6 border-b border-brand-charcoal/10 pb-2">Business Address</h3>
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-brand-maroon mt-1 mr-4 flex-shrink-0" />
                                <address className="not-italic text-stone-600 leading-relaxed">
                                    <strong>Home Fashion</strong><br />
                                    59, Vellammal Layout,<br />
                                    Kamarajapuram West,<br />
                                    Karur – 639002<br />
                                    Tamil Nadu, India
                                </address>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-serif text-brand-charcoal mb-6 border-b border-brand-charcoal/10 pb-2">Get in Touch</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-brand-maroon mr-4" />
                                    <a href="tel:+919942944744" className="text-stone-600 hover:text-brand-charcoal transition-colors">+91 99429 44744</a>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-brand-maroon mr-4" />
                                    <a href="mailto:karurhomefashion@gmail.com" className="text-stone-600 hover:text-brand-charcoal transition-colors">karurhomefashion@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-serif text-brand-charcoal mb-6 border-b border-brand-charcoal/10 pb-2">Hours & Legal</h3>
                            <div className="space-y-4 text-stone-600">
                                <div className="flex items-start">
                                    <Clock className="w-5 h-5 text-brand-maroon mr-4 mt-1" />
                                    <div>
                                        <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                                        <p>Sunday: 10:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                                <div className="pt-4 text-xs opacity-70">
                                    <p>GSTIN: 33BBRPD7436E1ZP</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map / Form Area */}
                    <div className="h-full flex flex-col">
                        <div className="w-full aspect-video bg-stone-200 mb-8 relative group overflow-hidden">
                            {/* Placeholder for Map - Using an image for visual appeal in absence of API key */}
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
                                alt="Map Location"
                                className="w-full h-full object-cover grayscale opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <a
                                    href="https://maps.google.com/?q=59+Vellammal+Layout+Karur+639002"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white px-6 py-3 shadow-lg text-sm font-medium hover:bg-brand-maroon hover:text-white transition-colors"
                                >
                                    View on Google Maps
                                </a>
                            </div>
                        </div>

                        <div className="flex-grow bg-white border border-stone-200 p-8">
                            <h3 className="text-lg font-serif text-brand-charcoal mb-4">Send us a message</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input type="text" id="name" placeholder="Name" className="w-full bg-stone-50 border-stone-200 focus:border-brand-maroon focus:ring-0 p-3 text-sm placeholder-stone-400" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input type="email" id="email" placeholder="Email" className="w-full bg-stone-50 border-stone-200 focus:border-brand-maroon focus:ring-0 p-3 text-sm placeholder-stone-400" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea id="message" rows="3" placeholder="Message" className="w-full bg-stone-50 border-stone-200 focus:border-brand-maroon focus:ring-0 p-3 text-sm placeholder-stone-400 resize-none"></textarea>
                                </div>
                                <button type="button" className="w-full bg-stone-800 text-white py-3 uppercase text-xs tracking-widest hover:bg-brand-charcoal transition-colors">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
