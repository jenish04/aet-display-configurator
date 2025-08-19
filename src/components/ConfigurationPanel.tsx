import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  const [activeTab, setActiveTab] = useState("PANEL GRID");

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

  // Call handleConfigChange whenever any config changes
  useState(() => {
    handleConfigChange();
  });

  return (
    <div className="bg-gray-100 p-6 w-80 space-y-6">
      {/* Product Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Product</Label>
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
        <Label className="text-sm font-medium">Configuration Method</Label>
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
        <Label className="text-sm font-medium">Unit of Measurement</Label>
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
        <Label className="text-sm font-medium">Number of CLED Cabinets (Width × Height)</Label>
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
            max={20}
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
            max={20}
          />
        </div>
      </div>

      {/* Tab Selection */}
      <div className="flex">
        <Button
          variant={activeTab === "PANEL GRID" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setActiveTab("PANEL GRID");
            handleConfigChange();
          }}
          className="rounded-r-none"
        >
          PANEL GRID
        </Button>
        <Button
          variant={activeTab === "CABLING" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setActiveTab("CABLING");
            handleConfigChange();
          }}
          className="rounded-l-none"
        >
          CABLING
        </Button>
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
        <Label className="text-sm font-medium">Content Image</Label>
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
      <div className="space-y-2 pt-4">
        <Button variant="outline" className="w-full justify-start">
          Configuration (PDF)
        </Button>
        <Button variant="outline" className="w-full justify-start">
          Configuration (CSV)
        </Button>
        <Button variant="outline" className="w-full justify-start">
          Product CAD data
        </Button>
      </div>

      {/* Link Section */}
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-2">Link</h4>
        <p className="text-sm text-gray-600 mb-2">Mounting System</p>
        <Button variant="link" className="p-0 h-auto text-blue-600">
          Link to PEERLESS-AV site
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationPanel;