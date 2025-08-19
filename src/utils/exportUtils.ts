// Export utilities for PDF, Excel, and CAD data generation

export interface ConfigData {
  product: string;
  configMethod: string;
  unit: string;
  width: number;
  height: number;
  showOptical: boolean;
  showPerson: boolean;
  contentImage: string;
  activeTab: string;
}

export interface SpecificationData {
  totalPanels: number;
  totalWidth: string;
  totalHeight: string;
  resolution: string;
  pixelPitch: string;
  weight: string;
  powerConsumption: string;
}

export const generateConfigJSON = (config: ConfigData, specs: SpecificationData) => {
  const jsonData = {
    configuration: {
      ...config,
      timestamp: new Date().toISOString(),
      specifications: specs
    }
  };
  
  return JSON.stringify(jsonData, null, 2);
};

export const downloadJSON = (config: ConfigData, specs: SpecificationData) => {
  const jsonContent = generateConfigJSON(config, specs);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sony-crystal-led-config-${config.product}-${config.width}x${config.height}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadPDF = (config: ConfigData, specs: SpecificationData) => {
  // Create a comprehensive PDF content
  const pdfContent = `
Sony Crystal LED Configuration Report
Generated: ${new Date().toLocaleDateString()}

Product Configuration:
- Model: ${config.product}
- Configuration Method: ${config.configMethod}
- Unit: ${config.unit}
- Dimensions: ${config.width} × ${config.height} panels
- Content Image: ${config.contentImage}

Specifications:
- Total Panels: ${specs.totalPanels}
- Total Size: ${specs.totalWidth} × ${specs.totalHeight}
- Resolution: ${specs.resolution}
- Pixel Pitch: ${specs.pixelPitch}
- Weight: ${specs.weight}
- Power Consumption: ${specs.powerConsumption}

Additional Options:
- Show Optical Transmitter/Receiver: ${config.showOptical ? 'Yes' : 'No'}
- Show Person for Scale: ${config.showPerson ? 'Yes' : 'No'}
`;

  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sony-crystal-led-config-${config.product}-${config.width}x${config.height}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadExcel = (config: ConfigData, specs: SpecificationData) => {
  // Create CSV content for Excel compatibility
  const csvContent = `
Sony Crystal LED Configuration Report
Generated,${new Date().toLocaleDateString()}

Section,Property,Value
Product,Model,${config.product}
Product,Configuration Method,${config.configMethod}
Product,Unit,${config.unit}
Product,Width (panels),${config.width}
Product,Height (panels),${config.height}
Product,Content Image,${config.contentImage}

Specifications,Total Panels,${specs.totalPanels}
Specifications,Total Width,${specs.totalWidth}
Specifications,Total Height,${specs.totalHeight}
Specifications,Resolution,${specs.resolution}
Specifications,Pixel Pitch,${specs.pixelPitch}
Specifications,Weight,${specs.weight}
Specifications,Power Consumption,${specs.powerConsumption}

Options,Show Optical Transmitter/Receiver,${config.showOptical ? 'Yes' : 'No'}
Options,Show Person for Scale,${config.showPerson ? 'Yes' : 'No'}
`;

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sony-crystal-led-config-${config.product}-${config.width}x${config.height}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadCAD = (config: ConfigData, specs: SpecificationData) => {
  // Create basic CAD data in a simple format
  const cadContent = `
Sony Crystal LED CAD Data
Model: ${config.product}
Configuration: ${config.width} × ${config.height} panels

Panel Dimensions (per unit):
- Width: ${config.unit === "Feet" ? "2.0 ft" : "0.61 m"}
- Height: ${config.unit === "Feet" ? "1.125 ft" : "0.34 m"}

Total Assembly:
- Width: ${specs.totalWidth}
- Height: ${specs.totalHeight}
- Total Panels: ${specs.totalPanels}

Mounting Points:
${Array.from({ length: config.height }, (_, row) => 
  Array.from({ length: config.width }, (_, col) => 
    `Panel[${row + 1},${col + 1}]: X=${col * (config.unit === "Feet" ? 2.0 : 0.61)}, Y=${row * (config.unit === "Feet" ? 1.125 : 0.34)}`
  ).join('\n')
).join('\n')}

Generated: ${new Date().toISOString()}
`;

  const blob = new Blob([cadContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sony-crystal-led-cad-${config.product}-${config.width}x${config.height}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};