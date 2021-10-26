import React, { useEffect } from 'react';

function Home(props) {
  useEffect(() => {
    props.setSelected('');
  });

  return <div>welcome...!</div>;
}

export default Home;
