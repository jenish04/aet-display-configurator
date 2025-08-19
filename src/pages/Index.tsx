import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConfigurationPanel from "@/components/ConfigurationPanel";
import VisualizationArea from "@/components/VisualizationArea";
import SpecificationTables from "@/components/SpecificationTables";

const Index = () => {
  const [config, setConfig] = useState({
    product: "ZRD-BH12D",
    configMethod: "Columns / Rows",
    unit: "Feet",
    width: 8,
    height: 8,
    showOptical: false,
    showPerson: true,
    contentImage: "None",
    activeTab: "PANEL GRID"
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <ConfigurationPanel onConfigChange={setConfig} />
          <VisualizationArea config={config} />
        </div>
        <SpecificationTables config={config} />
      </div>
    </div>
  );
};

export default Index;
