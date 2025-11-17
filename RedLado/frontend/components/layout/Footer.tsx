import Link from "next/link";
import { Twitter, Github, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg-elev-1 dark:bg-[#111316] border-t border-stroke-muted dark:border-[#1F2937] py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Product */}
          <div>
            <h4 className="text-text-primary dark:text-[#E5E7EB] mb-4 font-semibold">Product</h4>
            <ul className="space-y-3">
              {['Trade', 'Market', 'Inventory', 'Trade History'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-text-primary dark:text-[#E5E7EB] mb-4 font-semibold">Support</h4>
            <ul className="space-y-3">
              {['FAQ', 'Guides', 'System Status', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-text-primary dark:text-[#E5E7EB] mb-4 font-semibold">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Terms', 'Privacy', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-text-primary dark:text-[#E5E7EB] mb-4 font-semibold">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Github, label: 'GitHub' },
                { icon: MessageCircle, label: 'Discord' }
              ].map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-bg-elev-2 dark:bg-[#1a1d1f] border border-stroke-muted dark:border-[#1F2937] flex items-center justify-center text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] hover:border-[#E11D48] dark:hover:border-[#F43F5E] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stroke-muted dark:border-[#1F2937] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E11D48] to-[#BE123C] dark:from-[#F43F5E] dark:to-[#E11D48] flex items-center justify-center font-bold text-white text-xs">
              N
            </div>
            <p className="text-text-muted dark:text-[#8B93A7] text-sm">
              © 2025 RedLado. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link 
              href="#" 
              className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="#" 
              className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="#" 
              className="text-text-muted dark:text-[#8B93A7] hover:text-[#E11D48] dark:hover:text-[#F43F5E] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
