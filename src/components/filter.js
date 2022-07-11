import React from 'react';
import { any } from 'prop-types';

export const Filter = ({ filter, setFilter }) => {
  return (
    <div className="center">
      <span>
        Search:{' '}
        <input
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
          className="input"
        ></input>
      </span>
    </div>
  );
};

Filter.propTypes = {
  filter: any,
  setFilter: any,
};
