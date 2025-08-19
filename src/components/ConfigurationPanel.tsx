import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, FileText, FileSpreadsheet, Box } from "lucide-react";
import { downloadPDF, downloadExcel, downloadCAD, type ConfigData, type SpecificationData } from "@/utils/exportUtils";

interface ConfigurationPanelProps {
  onConfigChange: (config: any) => void;
}

const ConfigurationPanel = ({ onConfigChange }: ConfigurationPanelProps) => {
  const [product, setProduct] = useState("ZRD-BH12D");
  const [configMethod, setConfigMethod] = useState("Columns / Rows");
  const [unit, setUnit] = useState("Feet");
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [showOptical, setShowOptical] = useState(false);
  const [showPerson, setShowPerson] = useState(true);
  const [contentImage, setContentImage] = useState("None");
  const [activeTab] = useState("PANEL GRID");

  const products = [
    "ZRD-BH12D", "ZRD-BH15D", "ZRD-CH12D", "ZRD-CH15D", 
    "ZRD-VP15EB", "ZRD-VP23EB", "ZRD-VP15EM", "ZRD-VP23EM",
    "ZRD-VS25FB", "ZRD-VS25FM", "ZRD-B12A", "ZRD-B15A",
    "ZRD-C12A", "ZRD-C15A"
  ];

  const contentImages = [
    "None", "Custom", "Paint", "Museum", "Auditorium / Conference",
    "Live / Event", "Lobby / Showroom 1", "Lobby / Showroom 2", 
    "Sport", "News / Broadcast", "Retail", "Command & Control", "Digital Signage"
  ];

  const handleConfigChange = () => {
    onConfigChange({
      product,
      configMethod,
      unit,
      width,
      height,
      showOptical,
      showPerson,
      contentImage,
      activeTab
    });
  };

  const handleDownload = (type: 'pdf' | 'excel' | 'cad') => {
    const config: ConfigData = {
      product,
      configMethod,
      unit,
      width,
      height,
      showOptical,
      showPerson,
      contentImage,
      activeTab
    };

    // Calculate specifications
    const panelWidth = unit === "Feet" ? 2.0 : 0.61;
    const panelHeight = unit === "Feet" ? 1.125 : 0.34;
    const totalWidth = width * panelWidth;
    const totalHeight = height * panelHeight;
    
    const specs: SpecificationData = {
      totalPanels: width * height,
      totalWidth: unit === "Feet" ? `${totalWidth.toFixed(2)} ft` : `${totalWidth.toFixed(2)} m`,
      totalHeight: unit === "Feet" ? `${totalHeight.toFixed(2)} ft` : `${totalHeight.toFixed(2)} m`,
      resolution: `${width * 1920} × ${height * 1080}`, // Assuming 1920x1080 per panel
      pixelPitch: "1.26mm",
      weight: `${(width * height * 45).toFixed(0)} kg`, // Estimated 45kg per panel
      powerConsumption: `${(width * height * 250).toFixed(0)}W` // Estimated 250W per panel
    };

    switch (type) {
      case 'pdf':
        downloadPDF(config, specs);
        break;
      case 'excel':
        downloadExcel(config, specs);
        break;
      case 'cad':
        downloadCAD(config, specs);
        break;
    }
  };

  // Call handleConfigChange whenever any config changes
  useState(() => {
    handleConfigChange();
  });

  return (
    <div className="bg-muted p-6 w-80 space-y-6 font-sans">
      {/* Product Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground">Product</Label>
        <Select value={product} onValueChange={(value) => {
          setProduct(value);
          handleConfigChange();
        }}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {products.map((prod) => (
              <SelectItem key={prod} value={prod}>{prod}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Configuration Method */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground">Configuration Method</Label>
        <div className="flex">
          <Button
            variant={configMethod === "Columns / Rows" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setConfigMethod("Columns / Rows");
              handleConfigChange();
            }}
            className="rounded-r-none"
          >
            Columns / Rows
          </Button>
          <Button
            variant={configMethod === "Video Wall Area" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setConfigMethod("Video Wall Area");
              handleConfigChange();
            }}
            className="rounded-l-none"
          >
            Video Wall Area
          </Button>
        </div>
      </div>

      {/* Unit of Measurement */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground">Unit of Measurement</Label>
        <div className="flex">
          <Button
            variant={unit === "Feet" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setUnit("Feet");
              handleConfigChange();
            }}
            className="rounded-r-none"
          >
            Feet
          </Button>
          <Button
            variant={unit === "Metres" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setUnit("Metres");
              handleConfigChange();
            }}
            className="rounded-l-none"
          >
            Metres
          </Button>
        </div>
      </div>

      {/* Number of CLED Cabinets */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground">Number of CLED Cabinets (Width × Height)</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={width}
            onChange={(e) => {
              setWidth(parseInt(e.target.value) || 1);
              handleConfigChange();
            }}
            className="w-16"
            min={1}
            max={80}
          />
          <span>×</span>
          <Input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(parseInt(e.target.value) || 1);
              handleConfigChange();
            }}
            className="w-16"
            min={1}
            max={80}
          />
        </div>
      </div>

      {/* Active Tab Display - Panel Grid Only */}
      <div className="p-3 bg-primary text-primary-foreground rounded text-center font-semibold">
        PANEL GRID
      </div>

      {/* Display Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="optical"
            checked={showOptical}
            onCheckedChange={(checked) => {
              setShowOptical(checked as boolean);
              handleConfigChange();
            }}
          />
          <Label htmlFor="optical" className="text-sm">
            Show optical transmitter/receiver quantity
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="person"
            checked={showPerson}
            onCheckedChange={(checked) => {
              setShowPerson(checked as boolean);
              handleConfigChange();
            }}
          />
          <Label htmlFor="person" className="text-sm">
            Show person for scale
          </Label>
        </div>
      </div>

      {/* Content Image */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground">Content Image</Label>
        <Select value={contentImage} onValueChange={(value) => {
          setContentImage(value);
          handleConfigChange();
        }}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contentImages.map((img) => (
              <SelectItem key={img} value={img}>{img}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Export Buttons */}
      <div className="space-y-3 pt-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 font-semibold"
          onClick={() => handleDownload('pdf')}
        >
          <FileText className="w-4 h-4" />
          Configuration (PDF)
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 font-semibold"
          onClick={() => handleDownload('excel')}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Configuration (Excel)
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 font-semibold"
          onClick={() => handleDownload('cad')}
        >
          <Box className="w-4 h-4" />
          Product CAD data
        </Button>
      </div>

      {/* Link Section */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-semibold mb-2 text-foreground">Link</h4>
        <p className="text-sm text-muted-foreground mb-2">Mounting System</p>
        <Button variant="link" className="p-0 h-auto text-primary font-semibold">
          Link to PEERLESS-AV site
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationPanel;