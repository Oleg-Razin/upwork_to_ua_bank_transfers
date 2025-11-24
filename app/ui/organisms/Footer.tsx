import Link from "next/link";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import Container from "../components/Container";
import Section from "../components/Section";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Section background="white" padding="lg" className="border-t border-gray-200">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Про калькулятор
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Калькулятор для фрілансерів з України, які працюють на Upwork. 
              Розраховує реальну суму до отримання з урахуванням 
              всіх комісій та зборів.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Корисні посилання
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://www.upwork.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Upwork
                </Link>
              </li>
              <li>
                <Link 
                  href="https://privatbank.ua" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  ПриватБанк
                </Link>
              </li>
              <li>
                <Link 
                  href="https://monobank.ua" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Монобанк
                </Link>
              </li>
              <li>
                <Link 
                  href="https://payoneer.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Payoneer
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Контакти
            </h3>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/Oleg-Razin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaGithub size={20} />
              </Link>
              <Link 
                href="https://www.upwork.com/freelancers/~0148ba9638629539c1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                <SiUpwork size={20} />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/oleg-razin-frontend/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm flex items-center">
              Зроблено з <FaHeart className="text-red-500 mx-1" size={14} /> в Україні
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              © {currentYear} Upwork Калькулятор. Всі права захищені.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Footer;