const HeroSection = () => {
  return (
    <section className="relative h-64 bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 overflow-hidden">
      {/* Background image overlay effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Breadcrumb */}
      <div className="absolute top-4 left-6 text-sm text-white/70">
        Technology &gt; Crystal LED Configurator Tool - Sony Pro
      </div>
      
      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl font-light text-white mb-4">Crystal LED</h1>
        <p className="text-xl text-white/90">A window to a new world</p>
      </div>
      
      {/* Abstract background elements */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-60">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 right-1/6 w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;