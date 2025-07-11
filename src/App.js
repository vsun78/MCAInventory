// Added state to track comment edits
import React, { useEffect, useState } from 'react';
import './App.css';
import TrueFocus from './TrueFocus';
import ProfileCard from './ProfileCard';
import ScrollVelocity from './ScrollVelocity';
import * as XLSX from 'xlsx'; //  Excel export
import { useNavigate } from 'react-router-dom';


const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
function App() 
{
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [editedComments, setEditedComments] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    model: '',
    quantity: '',
    comment: '',
    imageUrl: ''
  });

  const velocity = 40;
  // NEW: Handles image click for only 6 serial-tracked items
const handleImageClick = (itemId) => {
  const itemsWithSerials = [
    'L01',
    'monitor',
    'pc',
    'L02',
    'extreme-network-big',
    'extreme-network-small'
  ];
  if (itemsWithSerials.includes(itemId)) {
    console.log("➡️ Navigating to /serials/" + itemId); // DEBUG
    navigate(`/serials/${itemId}`);
  }else {
    console.log("❌ Not a serial-tracked item"); // DEBUG
  }
};



  useEffect(() => {
    fetch(`${BASE_URL}/api/items`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setAllItems(data);
      });
  }, []);
  const refreshItems = () => {
    fetch(`${BASE_URL}/api/items`)
      .then(res => res.json())
      .then(data => {
        setAllItems(data);
        setItems(currentItems =>
          currentItems.map(item => data.find(d => d.id === item.id) || item)
        );
      });
  };
  const increment = (id) => {
    fetch(`${BASE_URL}/api/items/${id}/increment`, { method: 'POST' }).then(() => refreshItems());
  };
  const decrement = (id) => {
    fetch(`${BASE_URL}/api/items/${id}/decrement`, { method: 'POST' }).then(() => refreshItems());
  };
  const handleCommentChange = (id, newComment) => {
    setEditedComments(prev => ({ ...prev, [id]: newComment }));
  };
  const saveComment = (id) => {
    const updatedComment = editedComments[id];
    fetch(`${BASE_URL}/api/items/${id}/comment`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: updatedComment })
    }).then(() => refreshItems());
  };
  const handleAddNewItem = () => {
    fetch(`${BASE_URL}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: newItem.id,
        name: newItem.name,
        model: newItem.model,
        quantity: parseInt(newItem.quantity),
        comment: newItem.comment,
        imageUrl: newItem.imageUrl
      })
    })
      .then(() => {
        setShowAddForm(false);
        setNewItem({ id: '', name: '', model: '', quantity: '', comment: '', imageUrl: '' });
        refreshItems();
      });
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
  const handleDownloadExcel = () => {
    const worksheetData = items.map(({ id, name, model, quantity, comment, imageUrl }) => ({
      ID: id,
      Name: name,
      Model: model,
      Quantity: quantity,
      Comment: comment,
      'Image URL': imageUrl,
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory_data.xlsx");
  };
  return (
    <div className={darkMode ? 'dark' : ''} style={{ backgroundImage: "url('/Goal-Zero-Logos-MC-ASPHALT-ENG-2021.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center top", backgroundColor: darkMode ? '#121212' : '#f0f0f0', minHeight: "100vh", padding: '40px', position: 'relative' }}>
      <div style={{ backgroundColor: darkMode ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.75)", borderRadius: "12px", padding: "30px", maxWidth: "100%", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", transition: 'background-color 0.3s ease', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', color: darkMode ? 'white' : 'black' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <TrueFocus sentence="McAsphalt Head Office" manualMode={false} blurAmount={5} borderColor="red" animationDuration={2} pauseBetweenAnimations={1} />
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} checked={darkMode} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: darkMode ? '#2196F3' : '#ccc', transition: '.4s', borderRadius: '34px' }}>
              <span style={{ position: 'absolute', height: '26px', width: '26px', left: darkMode ? '30px' : '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
            </span>
          </label>
          
        </div>
        {/* Search and Add Button */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search Inventory..." style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <button onClick={handleSearch} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Search</button>
          <button onClick={() => setShowAddForm(true)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>Add Item</button>
          <button onClick={handleDownloadExcel} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>Download Excel</button>
          {searching && <button onClick={clearSearch} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Back</button>}
        </div>
        {showAddForm && (
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
            <h3>Add New Item</h3>
            <input placeholder="ID" value={newItem.id} onChange={e => setNewItem({ ...newItem, id: e.target.value })} style={{ margin: '6px', padding: '8px', width: '100%' }} />
            <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} style={{ margin: '6px', padding: '8px', width: '100%' }} />
            <input placeholder="Model" value={newItem.model} onChange={e => setNewItem({ ...newItem, model: e.target.value })} style={{ margin: '6px', padding: '8px', width: '100%' }} />
            <input placeholder="Quantity" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} style={{ margin: '6px', padding: '8px', width: '100%' }} type="number" />
            <input placeholder="Image URL" value={newItem.imageUrl} onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })} style={{ margin: '6px', padding: '8px', width: '100%' }} />
            <textarea placeholder="Comment" value={newItem.comment} onChange={e => setNewItem({ ...newItem, comment: e.target.value })} style={{ margin: '6px', padding: '8px', width: '100%' }} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleAddNewItem} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Submit</button>
              <button onClick={() => setShowAddForm(false)} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'stretch', justifyContent: 'center' }}>
          {items.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: darkMode ? '#2b2b2b' : 'white', color: darkMode ? '#fff' : '#000', position: 'relative' }}>
              <div>
                {/*<img src={item.imageUrl || 'https://via.placeholder.com/250x150'} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} /> */}

                 <img
  src={item.imageUrl || 'https://via.placeholder.com/250x150'}
  alt={item.name}
  onClick={() => handleImageClick(item.id)}
  style={{
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer' 
  }}
/> 
                <h3>{item.name}</h3>
                <p><strong>Model:</strong> {item.model}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Urgency:</strong> {getUrgency(item.quantity)}</p>
                <div style={{ marginTop: '10px' }}>
                  <strong>Comment:</strong>
                  <textarea value={editedComments[item.id] ?? item.comment} onChange={e => handleCommentChange(item.id, e.target.value)} style={{ width: '100%', borderRadius: '6px', border: '1px solid #ccc', padding: '6px', marginTop: '5px', fontSize: '0.9rem', resize: 'vertical' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => increment(item.id)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#000', color: '#fff', fontSize: '20px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}>+</button>
                  <button onClick={() => decrement(item.id)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', color: '#000', fontSize: '20px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}>−</button>
                </div>
                <button onClick={() => saveComment(item.id)} style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
              </div>
            </div>
          ))}
        </div>
        {/* ScrollVelocity Section */}
        <div style={{ margin: '60px 0' }}>
          <ScrollVelocity texts={['Built With The Right Mix', 'Meet Our Team']} velocity={velocity} className="custom-scroll-text" />
        </div>

        {/* Profile Cards */}
        <div onClick={() => navigate('/team')} style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          <ProfileCard
            name="McAsphalt IT"
            title="Elevate Customer Service Through Advanced Technology"
            handle="mcasupport@mcasphalt.com"
            status="Online"
            contactText="Contact Us"
            avatarUrl="/MCAteam1.png"
            showUserInfo={true}
            enableTilt={true}
            onClick={() => navigate('/team')} // Custom click handler
          />
          
          
          {/*<ProfileCard name="Balasubramaniam Balamugunthan" title="Technical Support Analyst" handle="balab@colasiss.com" status="Online" contactText="Contact Me" avatarUrl="/BalaAvatar.jpg" showUserInfo={true} enableTilt={true} onContactClick={() => console.log('Contact clicked')} />
          <ProfileCard name="Jennifer Su Cao" title="IT Service Desk Assitant" handle="jennifer.sucao@mcasphalt.com" status="Online" contactText="Contact Me" avatarUrl="/JenPFP.jpg" showUserInfo={true} enableTilt={true} onContactClick={() => console.log('Contact clicked')} />
          <ProfileCard name="Ryan Duncan" title="Technical Support Analyst" handle="rduncan@colasiss.com" status="Online" contactText="Contact Me" avatarUrl="/RyanPFP.jpg" showUserInfo={true} enableTilt={true} onContactClick={() => console.log('Contact clicked')} />
          <ProfileCard name="Angel Yang" title="IT Service Desk Assitant" handle="angel.yang@mcasphalt.com" status="Online" contactText="Contact Me" avatarUrl="/AngelPFP.jpg" showUserInfo={true} enableTilt={true} onContactClick={() => console.log('Contact clicked')} />
          */}
          </div>
      </div>
    </div>
  );
}
export default App;