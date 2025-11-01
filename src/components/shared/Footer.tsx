// components/home/FAQSection.tsx
import Container from "@/components/Container";
import Logo from "../logo";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <div className="mb-3" />
            <p className="text-slate-400 text-sm">
              Bridging the gap between talented candidates and great companies.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Talentra. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
