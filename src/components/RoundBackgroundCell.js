import React from 'react';

const RoundBackgroundCell = ({ children }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '67.2px', width: '277px', marginBottom: '10px', marginLeft: '10px', borderRadius: '9.98px', backgroundColor: 'rgba(53, 53, 53, 0)' }}>
        {children}
  </div>
);

export default RoundBackgroundCell;