import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/tabGroup.scss';

function TabGroup() {
  const [selected, setSelected] = useState('');

  return (
    <div className="tab-group">
      <li className={selected === 'upcoming' ? 'selected-tab' : ''} onClick={() => setSelected('upcoming')}>
        <Link to="/upcoming">UPCOMING</Link>
      </li>
      <li className={selected === 'popular' ? 'selected-tab' : ''} onClick={() => setSelected('popular')}>
        <Link to="/popular"> POPULAR </Link>
      </li>
      <li className={selected === 'top-rated' ? 'selected-tab' : ''} onClick={() => setSelected('top-rated')}>
        <Link to="/top-rated"> TOP RATED </Link>
      </li>
    </div>
  );
}

export default TabGroup;
