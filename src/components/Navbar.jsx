import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const adminLinks = [
        { name: 'Admin', path: '/admin/orders' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm transition-shadow duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex flex-col items-center group">
                        <span className="font-serif text-2xl tracking-wider font-bold text-brand-charcoal transition-colors duration-300 group-hover:text-brand-maroon">
                            HOME FASHION
                        </span>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-brand-indigo/80 transition-colors duration-300 group-hover:text-brand-indigo">
                            Est. Karur
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-12 items-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm tracking-wide transition-all duration-300 border-b-2 hover:text-brand-maroon ${isActive
                                        ? 'border-brand-maroon text-brand-charcoal font-medium'
                                        : 'border-transparent text-stone-600'
                                    }`
                                }
                            >
                                {link.name.toUpperCase()}
                            </NavLink>
                        ))}

                        {/* Admin Link */}
                        {adminLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm tracking-wide transition-all duration-300 border-b-2 hover:text-brand-indigo ${isActive
                                        ? 'border-brand-indigo text-brand-indigo font-medium'
                                        : 'border-transparent text-stone-400'
                                    }`
                                }
                            >
                                {link.name.toUpperCase()}
                            </NavLink>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <button className="text-stone-600 hover:text-brand-charcoal transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        <Link to="/cart" className="relative group text-stone-600 hover:text-brand-charcoal transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-maroon text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Authentication */}
                        {user ? (
                            <div className="relative group font-medium text-sm text-brand-charcoal cursor-pointer flex items-center">
                                <span className="mr-1">{user.name.split(' ')[0]}</span>
                                <button
                                    onClick={logout}
                                    className="text-stone-400 hover:text-brand-maroon text-xs ml-2 border border-stone-200 px-2 py-1 rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-brand-charcoal transition-colors">
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} className="md:hidden text-brand-charcoal focus:outline-none">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-brand-white border-t border-stone-100">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `block px-3 py-3 text-base font-medium transition-colors ${isActive ? 'text-brand-maroon bg-stone-50' : 'text-stone-600 hover:bg-stone-50 hover:text-brand-charcoal'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
