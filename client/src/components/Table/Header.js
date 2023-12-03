import React from 'react';


const Header = ({ setIsAdding,  title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add {title}</button>
      </div>
    </header>
  );
};

export default Header;
