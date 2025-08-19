interface SpecificationTablesProps {
  config: {
    product: string;
    width: number;
    height: number;
    unit: string;
  };
}

const SpecificationTables = ({ config }: SpecificationTablesProps) => {
  const { product, width, height, unit } = config;
  
  const totalUnits = width * height;
  
  // Calculate dimensions
  const panelWidth = unit === "Feet" ? 2.0 : 0.61;
  const panelHeight = unit === "Feet" ? 1.125 : 0.34;
  const totalWidth = width * panelWidth;
  const totalHeight = height * panelHeight;
  const diagonal = Math.sqrt(totalWidth * totalWidth + totalHeight * totalHeight);
  
  const formatDimension = (value: number) => {
    if (unit === "Feet") {
      return `${value.toFixed(2)} ft | ${(value * 12).toFixed(2)} in | ${(value * 0.3048).toFixed(2)} m`;
    } else {
      return `${(value * 3.28084).toFixed(2)} ft | ${(value * 39.3701).toFixed(2)} in | ${value.toFixed(2)} m`;
    }
  };

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Product Table */}
      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="text-left p-3 font-medium">Product</th>
              <th className="text-left p-3 font-medium">Model</th>
              <th className="text-left p-3 font-medium">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <td className="p-3">Crystal LED Display Cabinet</td>
              <td className="p-3">{product}</td>
              <td className="p-3">{totalUnits}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3">Crystal LED Display Controller</td>
              <td className="p-3">ZRCT-300</td>
              <td className="p-3">1</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Specification Table */}
      <div>
        <div className="bg-gray-700 text-white p-3 font-medium">
          Specification
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium w-1/3">Wall Type</td>
              <td className="p-3">Flat</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium">Display Units</td>
              <td className="p-3">{totalUnits}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium">Width</td>
              <td className="p-3">{width}</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium">Height</td>
              <td className="p-3">{height}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium" rowSpan={3}>Dimensions</td>
              <td className="p-3">
                <div className="flex">
                  <span className="font-medium w-16">Width</span>
                  <span>{formatDimension(totalWidth)}</span>
                </div>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3">
                <div className="flex">
                  <span className="font-medium w-16">Height</span>
                  <span>{formatDimension(totalHeight)}</span>
                </div>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3">
                <div className="flex">
                  <span className="font-medium w-16">Diagonal</span>
                  <span>{diagonal.toFixed(2)} in</span>
                </div>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium">Surface Area</td>
              <td className="p-3">
                {unit === "Feet" 
                  ? `${(totalWidth * totalHeight).toFixed(2)} ft² | ${(totalWidth * totalHeight * 0.092903).toFixed(2)} m²`
                  : `${(totalWidth * totalHeight * 10.7639).toFixed(2)} ft² | ${(totalWidth * totalHeight).toFixed(2)} m²`
                }
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium">Depth</td>
              <td className="p-3">69 mm</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium">Resolution</td>
              <td className="p-3">{width * 480}px × {height * 270}px ({((width * 480 * height * 270) / 1000000).toFixed(1)} MP)</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium">Aspect Ratio</td>
              <td className="p-3">16:9</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium">Pixel Pitch</td>
              <td className="p-3">1.27 mm</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium">Brightness (cd/m²)</td>
              <td className="p-3">1,700</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium">Display Weight (excluding frame)</td>
              <td className="p-3">{(totalUnits * 18.96).toFixed(1)} lbs | {(totalUnits * 8.6).toFixed(1)} kg</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium">Power Consumption</td>
              <td className="p-3">{(totalUnits * 0.12).toFixed(2)} kW max | {(totalUnits * 0.055).toFixed(2)} kW average</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium">Heat dissipation</td>
              <td className="p-3">{(totalUnits * 410).toFixed(0)} BTU/hr max | {(totalUnits * 188).toFixed(0)} BTU/hr average</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecificationTables;