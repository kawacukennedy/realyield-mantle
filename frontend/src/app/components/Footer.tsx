import { Github, Twitter, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-gradient-to-r from-bg-card to-bg-muted border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-6 text-text bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RealYield
            </h3>
            <p className="text-text-muted leading-relaxed mb-6">
              Compliant on-chain yield vaults for real-world assets on Mantle Network.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kawacukennedy/realyield-mantle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-bg-muted rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
              >
                <Github size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="p-2 bg-bg-muted rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
              >
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:contact@realyield.com"
                className="p-2 bg-bg-muted rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-text">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Dashboard</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/vault" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Vaults</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/create-asset" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Create Asset</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-text">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/docs" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Documentation</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/api" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>API Reference</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Support Center</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-text">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Privacy Policy</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Terms of Service</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                  <span>Compliance</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-text-muted">Powered by</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold text-lg">
              Mantle Network
            </span>
          </div>
          <p className="text-text-muted">© 2024 RealYield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}