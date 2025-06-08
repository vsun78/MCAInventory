/*
import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  // Load items from backend when page loads
  useEffect(() => { // only runs once when the page first loads
    fetch('http://localhost:8080/api/items') // send a GET request to Spring Boot
      .then(res => res.json()) // Convert the response to JSON
      .then(data => setItems(data)); // Store the data in the items state, so React can render it
  }, []);

  // Refresh the item list
  const refreshItems = () => { // same as above but call whenver you want to update the UI with the latest item list
    fetch('http://localhost:8080/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  };

  // Increase item quantity
  const increment = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/increment`, { // sends POST request to API and then refreshes the updated item list
      method: 'POST'
    }).then(() => refreshItems());
  };

  // Decrease item quantity
  const decrement = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/decrement`, { // sends POST request to API and then refreshes the updated item list but also decreases 1
      method: 'POST'
    }).then(() => refreshItems());
  };
  
  const getUrgency = (quantity) => {
    if (quantity <= 5) return <span style={{ color: 'red' }}>🔴 High</span>;
    if (quantity <= 10) return <span style={{ color: 'orange' }}>🟠 Medium</span>;
    return <span style={{ color: 'green' }}>🟢 Low</span>;
  };

  // Outer container with background
return (
  <div
    style={{
      backgroundImage: "url('/Goal-Zero-Logos-MC-ASPHALT-ENG-2021.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      minHeight: "100vh",
      width: '100%',
      padding: '40px',
    }}
  >
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "12px",
        padding: "30px",
        maxWidth: "100%",
        width: "100%",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Inventory Tracker</h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'flex-start',
          justifyContent: 'flex-start' // LEFT align cards here
        }}
      >
        {items.map(item => (
          <div
            key={item.name}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              width: '250px',
              height: '430px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}
          >
            <div>
              <img
                src={item.imageUrl || 'https://via.placeholder.com/250x150'}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              />
              <h3>{item.name}</h3>
              <p><strong>Model:</strong> {item.model}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Urgency:</strong> {getUrgency(item.quantity)}</p>
              <p><strong>Comment:</strong> {item.comment}</p>
            </div>
            <div>
              <button onClick={() => increment(item.id)} style={{ marginRight: '5px' }}>+</button>
              <button onClick={() => decrement(item.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);






}

export default App;
*/

/*
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const refreshItems = () => {
    fetch('http://localhost:8080/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  };

  const increment = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/increment`, {
      method: 'POST'
    }).then(() => refreshItems());
  };

  const decrement = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/decrement`, {
      method: 'POST'
    }).then(() => refreshItems());
  };

  const getUrgency = (quantity) => {
    if (quantity <= 5) return <span style={{ color: 'red' }}>🔴 High</span>;
    if (quantity <= 10) return <span style={{ color: 'orange' }}>🟠 Medium</span>;
    return <span style={{ color: 'green' }}>🟢 Low</span>;
  };

  return (
    <div
      className={darkMode ? 'dark' : ''}
      style={{
        backgroundImage: "url('/Goal-Zero-Logos-MC-ASPHALT-ENG-2021.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
        minHeight: "100vh",
        padding: '40px 60px'
      }}
    >
      <div
        style={{
          backgroundColor: darkMode ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.75)",
          borderRadius: "12px",
          padding: "30px",
          width: "100%",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          transition: 'background-color 0.3s ease'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ color: darkMode ? '#fff' : '#000' }}>Inventory Tracker</h1>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input
              type="checkbox"
              onChange={() => setDarkMode(!darkMode)}
              checked={darkMode}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: darkMode ? '#2196F3' : '#ccc',
                transition: '.4s',
                borderRadius: '34px'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  height: '26px',
                  width: '26px',
                  left: darkMode ? '30px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%'
                }}
              ></span>
            </span>
          </label>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'stretch',
            justifyContent: 'center'
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                width: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: darkMode ? '#2b2b2b' : 'white',
                color: darkMode ? '#fff' : '#000'
              }}
            >
              <div>
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/250x150'}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                />
                <h3>{item.name}</h3>
                <p><strong>Model:</strong> {item.model}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Urgency:</strong> {getUrgency(item.quantity)}</p>
                <p><strong>Comment:</strong> {item.comment}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '15px' }}>
                <button
                  onClick={() => increment(item.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                  +
                </button>
                <button
                  onClick={() => decrement(item.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
*/

/*
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setAllItems(data);
      });
  }, []);

  const refreshItems = () => {
    fetch('http://localhost:8080/api/items')
      .then(res => res.json())
      .then(data => {
        setAllItems(data);
        if (!searching) setItems(data);
      });
  };

  const increment = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/increment`, {
      method: 'POST'
    }).then(() => refreshItems());
  };

  const decrement = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/decrement`, {
      method: 'POST'
    }).then(() => refreshItems());
  };

  const getUrgency = (quantity) => {
    if (quantity <= 5) return <span style={{ color: 'red' }}>🔴 High</span>;
    if (quantity <= 10) return <span style={{ color: 'orange' }}>🟠 Medium</span>;
    return <span style={{ color: 'green' }}>🟢 Low</span>;
  };

  const handleSearch = () => {
    const matches = allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(matches);
    setSearching(true);
  };

  const clearSearch = () => {
    setItems(allItems);
    setSearchQuery('');
    setSearching(false);
  };

  return (
    <div
      className={darkMode ? 'dark' : ''}
      style={{
        backgroundImage: "url('/Goal-Zero-Logos-MC-ASPHALT-ENG-2021.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center top",
        backgroundColor: darkMode ? '#121212' : '#f0f0f0',
        minHeight: "100vh",
        padding: '40px',
      }}
    >
      <div
        style={{
          backgroundColor: darkMode ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.75)",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "100%",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          transition: 'background-color 0.3s ease'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ color: darkMode ? '#fff' : '#000' }}>Inventory Tracker</h1>
          <label style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              onChange={() => setDarkMode(!darkMode)}
              checked={darkMode}
              style={{ display: 'none' }}
            />
            <img
              src="/slider-toggle-icon.png"
              alt="Dark Mode Toggle"
              style={{ width: '60px', height: '34px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Inventory..."
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button onClick={handleSearch} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Search
          </button>
          {searching && (
            <button onClick={clearSearch} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              Back
            </button>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'stretch',
            justifyContent: 'center'
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                width: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: darkMode ? '#2b2b2b' : 'white',
                color: darkMode ? '#fff' : '#000'
              }}
            >
              <div>
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/250x150'}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                />
                <h3>{item.name}</h3>
                <p><strong>Model:</strong> {item.model}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Urgency:</strong> {getUrgency(item.quantity)}</p>
                <p><strong>Comment:</strong> {item.comment}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: 'auto', paddingTop: '15px' }}>
                <button
                  onClick={() => increment(item.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                  +
                </button>
                <button
                  onClick={() => decrement(item.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
*/

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setAllItems(data);
      });
  }, []);

  const refreshItems = () => {
    fetch('http://localhost:8080/api/items')
      .then(res => res.json())
      .then(data => {
        setAllItems(data);
        setItems(currentItems =>
          currentItems.map(item => data.find(d => d.id === item.id) || item)
        );
      });
  };

  const increment = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/increment`, {
      method: 'POST'
    }).then(() => refreshItems());
  };

  const decrement = (id) => {
    fetch(`http://localhost:8080/api/items/${id}/decrement`, {
      method: 'POST'
    }).then(() => refreshItems());
  };

  const getUrgency = (quantity) => {
    if (quantity <= 5) return <span style={{ color: 'red' }}>🔴 High</span>;
    if (quantity <= 10) return <span style={{ color: 'orange' }}>🟠 Medium</span>;
    return <span style={{ color: 'green' }}>🟢 Low</span>;
  };

  const handleSearch = () => {
    const matches = allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(matches);
    setSearching(true);
  };

  const clearSearch = () => {
    setItems(allItems);
    setSearchQuery('');
    setSearching(false);
  };

  return (
    <div
      className={darkMode ? 'dark' : ''}
      style={{
        backgroundImage: "url('/Goal-Zero-Logos-MC-ASPHALT-ENG-2021.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center top",
        backgroundColor: darkMode ? '#121212' : '#f0f0f0',
        minHeight: "100vh",
        padding: '40px',
      }}
    >
      <div
        style={{
          backgroundColor: darkMode ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.75)",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "100%",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          transition: 'background-color 0.3s ease'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ color: darkMode ? '#fff' : '#000' }}>McAsphalt Head Office</h1>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input
              type="checkbox"
              onChange={() => setDarkMode(!darkMode)}
              checked={darkMode}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: darkMode ? '#2196F3' : '#ccc',
                transition: '.4s',
                borderRadius: '34px'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  height: '26px',
                  width: '26px',
                  left: darkMode ? '30px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%'
                }}
              ></span>
            </span>
          </label>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Inventory..."
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button onClick={handleSearch} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Search
          </button>
          {searching && (
            <button onClick={clearSearch} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              Back
            </button>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'stretch',
            justifyContent: 'center'
          }}
        >
          {items.map(item => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                width: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: darkMode ? '#2b2b2b' : 'white',
                color: darkMode ? '#fff' : '#000'
              }}
            >
              <div>
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/250x150'}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                />
                <h3>{item.name}</h3>
                <p><strong>Model:</strong> {item.model}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Urgency:</strong> {getUrgency(item.quantity)}</p>
                <p><strong>Comment:</strong> {item.comment}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: 'auto', paddingTop: '15px' }}>
                <button
                  onClick={() => increment(item.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                  +
                </button>
                <button
                  onClick={() => decrement(item.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
