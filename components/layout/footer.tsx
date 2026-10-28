import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
export default function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <Link href="/" className="footer-brand">
        Abdulhaq<span>.it</span>
      </Link>
      <a
        className="footer-agency"
        href={site.agencyUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {site.agencyName} — My IT agency <ArrowUpRight size={13} />
      </a>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
        WhatsApp <ArrowUpRight size={13} />
      </a>
      <div>
        <span>
          © {new Date().getFullYear()} {site.brand}
        </span>
        <Link href="/#home">BACK TO TOP ↑</Link>
      </div>
    </footer>
  );
}
