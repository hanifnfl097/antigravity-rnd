import Link from 'next/link';
import { Mail, MapPin, Phone, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight">TechSolution</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Mitra transformasi digital terpercaya untuk bisnis Anda. Kami menghadirkan inovasi teknologi yang relevan dan berdampak.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Perusahaan</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#home" className="hover:text-indigo-400 transition-colors block w-fit">Home</Link>
                            </li>
                            <li>
                                <Link href="#services" className="hover:text-indigo-400 transition-colors block w-fit">Services</Link>
                            </li>
                            <li>
                                <Link href="#about" className="hover:text-indigo-400 transition-colors block w-fit">About Us</Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:text-indigo-400 transition-colors block w-fit">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Kontak</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">Jl. Teknologi Raya No. 12<br />Jakarta Selatan, 12345</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                <span className="text-sm">hello@techsolution.id</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                <span className="text-sm">+62 21 555 0123</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 text-center md:text-left">
                        &copy; {new Date().getFullYear()} TechSolution. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
