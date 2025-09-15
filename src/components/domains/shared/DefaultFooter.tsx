import { getContact, getFooterInfo } from '@/lib/siteConfig';
import Link from 'next/link';

export default function DefaultFooter() {
  const footer = getFooterInfo();
  const contact = getContact();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{footer.companyName}</h3>
            <p className="text-gray-400 mb-4">
              Building the future of web development with cutting-edge technology and design.
            </p>
            <div className="flex space-x-4">
              {contact.socialMedia.twitter && (
                <a
                  href={contact.socialMedia.twitter}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              )}
              {contact.socialMedia.linkedin && (
                <a
                  href={contact.socialMedia.linkedin}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {contact.socialMedia.github && (
                <a
                  href={contact.socialMedia.github}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/component-showcase" className="hover:text-white transition-colors">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="hover:text-white transition-colors">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
