import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
    {
        title: "13-BMSM",
        path: "/",
    },
    {
        title: "Maktab",
        dropdown: [
            { title: "Maktab haqida", path: "/page/maktab/haqida" },
            { title: "Rahbariyat", path: "/page/maktab/rahbariyat" },
            { title: "O'qituvchi va xodimlar", path: "/page/maktab/oqituvchilar" },
        ]
    },
    {
        title: "Faoliyat",
        dropdown: [
            { title: "Maktabimiz faxrlari", path: "/page/faoliyat/faxrlar" },
            { title: "Yo'nalishlar", path: "/page/faoliyat/yonalishlar" },
        ]
    },
    {
        title: "Hujjatlar",
        dropdown: [
            { title: "Rasmiy hujjatlar", path: "/page/hujjatlar/rasmiy" },
        ]
    },
    {
        title: "Ta'lim Jarayoni",
        dropdown: [
            { title: "O'quv reja", path: "/page/talim/reja" },
        ]
    }
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const toggleDropdown = (index) => {
        if (activeDropdown === index) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(index);
        }
    };

    return (
        <nav className={`navbar ${scrolled || location.pathname !== '/' ? 'glass' : 'transparent-nav'}`}>
            <div className="container nav-wrapper">
                <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/images/logo.png" alt="13-BMSM Logo" style={{ height: '40px', width: 'auto' }} />
                    <div className="logo-text">
                        <span>Farg'ona viloyat 13-BMSM</span>
                    </div>
                </Link>

                <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </div>

                <ul className={`nav-menu ${isOpen ? 'active islimi-bg' : ''}`}>
                    {navLinks.map((link, index) => (
                        <li key={index} className="nav-item">
                            {link.dropdown ? (
                                <div
                                    className="nav-link dropdown-toggle"
                                    onClick={() => toggleDropdown(index)}
                                    onMouseEnter={() => window.innerWidth > 960 && setActiveDropdown(index)}
                                    onMouseLeave={() => window.innerWidth > 960 && setActiveDropdown(null)}
                                >
                                    {link.title} <FiChevronDown className={`chevron ${activeDropdown === index ? 'up' : ''}`} />
                                    {activeDropdown === index && (
                                        <ul className="dropdown-menu">
                                            {link.dropdown.map((dropItem, dropIndex) => (
                                                <li key={dropIndex}>
                                                    <Link to={dropItem.path} className="dropdown-link">
                                                        {dropItem.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <Link to={link.path} className="nav-link">
                                    {link.title}
                                </Link>
                            )}
                        </li>
                    ))}
                    <li className="nav-item mobile-contact">
                        <Link to="#contact" className="btn-primary" onClick={() => {
                            const footer = document.getElementById('contact');
                            if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                            setIsOpen(false);
                        }}>
                            Bog'lanish
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
