import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-charcoal text-stone-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand & Address */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div>
                            <h3 className="font-serif text-2xl text-white tracking-wider mb-2">HOME FASHION</h3>
                            <p className="text-xs uppercase tracking-widest text-brand-beige">Quality Textiles. Crafted for Comfort.</p>
                        </div>
                        <address className="not-italic text-sm leading-relaxed opacity-80">
                            59, Vellammal Layout,<br />
                            Kamarajapuram West,<br />
                            Karur – 639002,<br />
                            Tamil Nadu, India.
                        </address>
                        <div className="text-sm space-y-1 opacity-80">
                            <p>Phone: <a href="tel:+919942944744" className="hover:text-white transition-colors">+91 99429 44744</a></p>
                            <p>Email: <a href="mailto:karurhomefashion@gmail.com" className="hover:text-white transition-colors">karurhomefashion@gmail.com</a></p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-medium tracking-wide uppercase text-sm">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/shop?category=Bedroom" className="hover:text-brand-beige transition-colors">Bedroom</Link></li>
                            <li><Link to="/shop?category=Living" className="hover:text-brand-beige transition-colors">Living</Link></li>
                            <li><Link to="/shop?category=Dining" className="hover:text-brand-beige transition-colors">Dining</Link></li>
                            <li><Link to="/shop?category=Bathroom" className="hover:text-brand-beige transition-colors">Bathroom</Link></li>
                            <li><Link to="/shop" className="hover:text-brand-beige transition-colors">All Collections</Link></li>
                        </ul>
                    </div>

                    {/* Legal / Info */}
                    <div className="space-y-6">
                        <h4 className="text-white font-medium tracking-wide uppercase text-sm">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:text-brand-beige transition-colors">Our Story</Link></li>
                            <li><Link to="/contact" className="hover:text-brand-beige transition-colors">Contact Us</Link></li>
                            <li><span className="opacity-50 cursor-not-allowed">Shipping Policy</span></li>
                            <li><span className="opacity-50 cursor-not-allowed">Returns & Exchange</span></li>
                        </ul>
                        <div className="pt-4">
                            <p className="text-xs opacity-60">GSTIN: 33BBRPD7436E1ZP</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
                    <p>&copy; {new Date().getFullYear()} Home Fashion. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
