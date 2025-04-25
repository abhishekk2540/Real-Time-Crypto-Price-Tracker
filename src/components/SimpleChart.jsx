import React, { useMemo } from 'react';
const SimpleChart = ({ data, color = '#22c55e' }) => {
  const points = useMemo(() => {
    const basePrice = data.price;
    const volatility = 0.05;
    const numPoints = 20;
    const result = [];
    for (let i = 0; i < numPoints; i++) {
      const randomChange = 1 + (Math.random() - 0.5) * volatility;
      result.push(basePrice * randomChange);
    }
    return result;
  }, [data.price]);


  const path = useMemo(() => {
    const width = 144; 
    const height = 64; 
    const padding = 4;
 const maxPrice = Math.max(...points);
    const minPrice = Math.min(...points);
    const range = maxPrice - minPrice;
     const xStep = (width - padding * 2) / (points.length - 1);
    const scaleY = (height - padding * 2) / range;
     const pathPoints = points.map((price, i) => {
      const x = padding + i * xStep;
      const y = height - padding - (price - minPrice) * scaleY;
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    });
const areaPath = [
      ...pathPoints,
      `L ${width - padding},${height - padding}`,
      `L ${padding},${height - padding}`,
      'Z'
    ];

    return {
      line: pathPoints.join(' '),
      area: areaPath.join(' ')
    };
  }, [points]);

  return (
    <svg
      viewBox="0 0 144 64"
      className="w-full h-full"
      preserveAspectRatio="none">
    
    <path
        d={path.area}
        fill={color}
        fillOpacity="0.1"/>
   
      <path
        d={path.line}
        stroke={color}
        strokeWidth="2"
        fill="none"/>
    </svg>
  );
};

export default SimpleChart; 