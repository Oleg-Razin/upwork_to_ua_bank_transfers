import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const Header = () => {

  return (
    <header className="border-b border-zinc-200 bg-white py-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={60}
            priority
          />
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link 
            href="https://github.com/Oleg-Razin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaGithub size={24} />
          </Link>
          <Link 
            href="https://www.upwork.com/freelancers/~0148ba9638629539c1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <SiUpwork size={24} />
          </Link>
          <Link 
            href="https://www.linkedin.com/in/oleg-razin-frontend/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaLinkedin size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;