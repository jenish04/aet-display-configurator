interface VisualizationAreaProps {
  config: {
    width: number;
    height: number;
    showPerson: boolean;
    unit: string;
  };
}

const VisualizationArea = ({ config }: VisualizationAreaProps) => {
  const { width, height, showPerson, unit } = config;
  
  // Calculate dimensions based on panel size (assuming each panel is ~2ft x 1.125ft)
  const panelWidth = unit === "Feet" ? 2.0 : 0.61; // feet or meters
  const panelHeight = unit === "Feet" ? 1.125 : 0.34; // feet or meters
  
  const totalWidth = width * panelWidth;
  const totalHeight = height * panelHeight;
  
  const formatDimension = (value: number) => {
    return unit === "Feet" ? `${value.toFixed(2)} ft` : `${value.toFixed(2)} m`;
  };

  return (
    <div className="flex-1 bg-white p-8 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Dimension labels */}
        <div className="absolute -top-8 left-0 right-0 text-center text-sm text-gray-600">
          {formatDimension(totalWidth)}
        </div>
        <div className="absolute -left-12 top-0 bottom-0 flex items-center">
          <div className="transform -rotate-90 text-sm text-gray-600 whitespace-nowrap">
            {formatDimension(totalHeight)}
          </div>
        </div>

        {/* Panel Grid */}
        <div 
          className="grid gap-px bg-gray-300 p-px"
          style={{ 
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${height}, 1fr)`
          }}
        >
          {Array.from({ length: width * height }).map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-gray-200 border border-gray-300 hover:bg-gray-300 transition-colors"
            />
          ))}
        </div>

        {/* Person for scale */}
        {showPerson && (
          <div className="absolute -right-20 bottom-0 flex flex-col items-center">
            <div className="w-6 h-16 relative">
              {/* Simple person silhouette */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-3 h-3 bg-black rounded-full mb-1"></div>
                <div className="w-1 h-8 bg-black mx-auto mb-1"></div>
                <div className="w-4 h-1 bg-black mb-2"></div>
                <div className="w-1 h-6 bg-black mx-auto"></div>
                <div className="flex justify-center space-x-px">
                  <div className="w-px h-4 bg-black"></div>
                  <div className="w-px h-4 bg-black"></div>
                </div>
              </div>
            </div>
            <div className="text-xs text-center mt-2">
              <div className="font-medium">Person</div>
              <div className="text-gray-600">
                {unit === "Feet" ? "5.58 ft" : "1.70 m"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationArea;