import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer islimi-bg">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">13-BMSM</h3>
                    <p className="footer-desc">
                        Farg'ona viloyati Quva tumani 13-sonli musiqa va san'at maktabi rasmiy veb-sayti.
                        Iste'dodli yoshlarni kashf etamiz va tarbiyalaymiz.
                    </p>
                    <div className="social-links">
                        <a target="_blank" href="https://www.instagram.com/quva_13_bmsm" className="social-icon"><FiInstagram /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Tezkor havolalar</h3>
                    <ul className="footer-links">
                        <li><a href="/page/maktab/haqida">Maktab haqida</a></li>
                        <li><a href="/page/faoliyat/yonalishlar">Yo'nalishlar</a></li>
                        <li><a href="/page/hujjatlar/rasmiy">Hujjatlar</a></li>
                        <li><a href="/page/talim/reja">Ta'lim jarayoni</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Biz bilan bog'laning</h3>
                    <ul className="contact-info">
                        <li>
                            <FiMapPin className="contact-icon" />
                            <a href="https://maps.app.goo.gl/wVuZjuUvhXGeXYMe6" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                Farg‘ona viloyati, Quva tumani, So‘fi MFY, 55A-uy
                            </a>
                        </li>
                        <li>
                            <FiPhone className="contact-icon" />
                            <a href="tel:+998913276301" style={{ color: 'inherit', textDecoration: 'none' }}>+998 91 327 63 01</a>
                        </li>
                        <li>
                            <FiMail className="contact-icon" />
                            <span>quva13bmsm@umail.uz</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} 13-sonli musiqa va san'at maktabi. Barcha huquqlar himoyalangan.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
