
import React, { useState } from 'react';
import SeoArticle from './SeoArticle';

interface ThemeLayoutProps {
  children: React.ReactNode;
}

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative text-slate-300" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-slate-900/80 backdrop-blur-md p-5 border-b border-slate-700 flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-2xl leading-none">&times;</button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const renderModalContent = () => {
        switch (activeModal) {
            case 'About':
                return <p>This Retirement Savings Planner is a powerful tool designed to help you visualize your financial future. By inputting key details about your current financial situation and future goals, our application uses proven financial models to project your path to retirement.</p>;
            case 'Contact':
                return (
                    <div>
                        <p>For inquiries, please contact us at:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Website: <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">doodax.com</a></li>
                            <li>Email: <a href="mailto:hsini.web@gmail.com" className="text-violet-400 hover:underline">hsini.web@gmail.com</a></li>
                        </ul>
                    </div>
                );
            case 'Guide':
                return <SeoArticle />;
            case 'Privacy Policy':
                return <p>Your privacy is important to us. This application is a client-side tool, meaning all calculations are performed in your browser. We do not collect, store, or transmit any of your personal financial data.</p>;
            case 'Terms of Service':
                return <p>This tool is for informational and educational purposes only. It is not financial advice. Please consult with a qualified financial advisor before making any financial decisions. We are not liable for any actions taken based on the results of this planner.</p>;
            case 'DMCA':
                return <p>If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our copyright agent, as set forth in the Digital Millennium Copyright Act of 1998 (DMCA).</p>;
            default:
                return null;
        }
    };
    
    const navLinks = ['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA'];

    return (
        <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden isolate">
            {/* Animated Nebula Background */}
            <div className="absolute inset-0 z-[-10] opacity-50" style={{
                backgroundImage: 'radial-gradient(circle at 20% 20%, #4c1d95, transparent), radial-gradient(circle at 80% 80%, #4338ca, transparent), radial-gradient(circle at 50% 50%, #1e1b4b, transparent)',
                backgroundSize: '200% 200%',
                animation: 'nebula 60s ease-in-out infinite'
            }}></div>
            <style>{`
                @keyframes nebula {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
             <div className="absolute inset-0 z-[-9] opacity-20" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                animation: 'starfield 120s linear infinite'
            }}></div>
             <style>{`
                @keyframes starfield {
                    from { background-position: 0 0; }
                    to { background-position: -10000px 5000px; }
                }
            `}</style>

            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="py-4 px-4 md:px-8 bg-black/20 backdrop-blur-sm border-b border-white/10">
                    <nav className="container mx-auto flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
                            Retirement Savings Planner
                        </h1>
                        <div className="hidden md:flex space-x-4">
                             {navLinks.map(link => (
                                <button key={link} onClick={() => setActiveModal(link)} className="text-slate-300 hover:text-white transition-colors text-sm">
                                    {link}
                                </button>
                            ))}
                        </div>
                         <div className="md:hidden">
                            <select onChange={(e) => setActiveModal(e.target.value)} className="bg-slate-800 border border-slate-700 rounded p-1 text-sm focus:ring-violet-500 focus:border-violet-500">
                                <option value="">Menu</option>
                                 {navLinks.map(link => <option key={link} value={link}>{link}</option>)}
                            </select>
                        </div>
                    </nav>
                </header>

                <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
                    {children}
                </main>

                <footer className="py-4 px-4 md:px-8 bg-black/20 backdrop-blur-sm border-t border-white/10 text-center text-sm text-slate-400">
                    <div className="container mx-auto">
                        <p>
                            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold" style={{ color: '#FFD700' }}>HSINI MOHAMED</a>
                        </p>
                        <p className="mt-1">
                            Contact: <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:underline">doodax.com</a> | <a href="mailto:hsini.web@gmail.com" className="hover:underline">hsini.web@gmail.com</a>
                        </p>
                    </div>
                </footer>
            </div>
            
            {activeModal && (
                <Modal title={activeModal} onClose={() => setActiveModal(null)}>
                    {renderModalContent()}
                </Modal>
            )}
        </div>
    );
};

export default ThemeLayout;
