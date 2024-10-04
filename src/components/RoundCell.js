import React from 'react';
import RoundBackgroundCell from './RoundBackgroundCell';

const RoundCell = ({ backgroundColor }) => (
  <RoundBackgroundCell>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', width: '50px', marginBottom: '10px', marginLeft: '10px', borderRadius: '50%', backgroundColor: backgroundColor }} />
  </RoundBackgroundCell>
);

export default RoundCell;