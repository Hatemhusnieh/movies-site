import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/tabGroup.scss';

function TabGroup(props) {
  return (
    <div className="tab-group">
      <li className={props.selected === 'upcoming' ? 'selected-tab' : ''} onClick={() => props.setSelected('upcoming')}>
        <Link to="/upcoming">UPCOMING</Link>
      </li>
      <li className={props.selected === 'popular' ? 'selected-tab' : ''} onClick={() => props.setSelected('popular')}>
        <Link to="/popular"> POPULAR </Link>
      </li>
      <li
        className={props.selected === 'top-rated' ? 'selected-tab' : ''}
        onClick={() => props.setSelected('top-rated')}
      >
        <Link to="/top-rated"> TOP RATED </Link>
      </li>
    </div>
  );
}

export default TabGroup;
