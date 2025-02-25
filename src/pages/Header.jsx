import React from 'react';

function Header({ logo, question }) {
  return (
    <header className="card-header">
      <img
        src={logo}
        alt="CineTrivia Logo"
        style={{ maxWidth: '300px', marginBottom: '10px' }}
      />
      {question && (
        <h2 style={{ marginTop: '0.5px', fontSize: '17px', color: 'gold' }}>
          {question}
        </h2>
      )}
    </header>
  );
}

export default Header;
