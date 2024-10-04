import React, { useState, useRef, useLayoutEffect } from 'react';
import BackgroundCell from './BackgroundCell';
import chroma from 'chroma-js';

const PercentLineCell = ({ percent, backgroundColor }) => {

  // const [percent, setPercent] = useState(0);
  // useLayoutEffect(() => {
  //   const handleFrame = () => {
  //     setPercent(Math.round((Math.sin(performance.now() / 500) * 0.5 + 0.5) * 100));
  //     requestAnimationFrame(handleFrame);
  //   };
  //   requestAnimationFrame(handleFrame);
  // }, []);

  const containerRef = useRef(null);
  const percentLabelRef = useRef(null);

  const containerWidth = useElementWidth(containerRef);
  const percentLabelWidth = useElementWidth(percentLabelRef);

  const textPadding = 8; // pixels
  let textLeft = 0;
  if (containerWidth !== null) {
    const idealX = (0.01 * percent * containerWidth);
    // const minX = 0.5 * percentLabelWidth + textPadding;
    // const maxX = containerWidth - 0.5 * percentLabelWidth - textPadding;
    const minX = textPadding;
    const maxX = containerWidth - percentLabelWidth - textPadding;
    textLeft = Math.min(Math.max(idealX, minX), maxX);
  }

  return (
    <BackgroundCell>
      {percent > 0 &&  
        <div ref={containerRef} style={{ 
          position: 'relative',
          display: 'flex', 
          justifyContent: 'start', 
          alignItems: 'end', 
          height: '100%', 
          width: '100%', 
          borderRadius: 10, 
          backgroundColor: backgroundColor, 
          fontWeight: 'bold', 
          fontSize: '1rem',
          overflow: 'hidden'
          }}>
          <div style={{
            height: '15%',
            width: `${percent}%`,
            // borderRadius: 10,
            backgroundColor: chroma(backgroundColor).brighten(2).css() ,
            fontSize: '1rem'
          }} />
          <div ref={percentLabelRef} style={{
            position: 'absolute',
            bottom: '15%',
            left: textLeft,
            // transform: 'translateX(-50%)',
            fontWeight: 'bold',
            fontSize: '1rem',
            color: chroma.contrast(backgroundColor, '#fff') > 4.5 ? '#fff' : '#000'
          }}>
            {percent}%
          </div>
        </div>
      }
    </BackgroundCell>
  );
};

const useElementWidth = (elementRef) => {
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;
  
    setWidth(elementRef.current.getBoundingClientRect().width);

    const handleResize = () => setWidth(elementRef.current.getBoundingClientRect().width);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return width;
};

export default PercentLineCell;