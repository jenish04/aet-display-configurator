import { Search } from "lucide-react";

const Header = () => {
  const navItems = [
    "Professional Products",
    "Solutions", 
    "Case Studies",
    "Support",
    "Where to Buy"
  ];

  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold">SONY</div>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm hover:text-gray-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <Search className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
      </div>
    </header>
  );
};

export default Header;