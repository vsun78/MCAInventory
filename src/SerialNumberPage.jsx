import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './SerialNumberPage.css';

// Trigger redploy test

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
export default function SerialNumberPage() {
  const { itemId } = useParams();
  const [serials, setSerials] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSerial, setNewSerial] = useState({
    serial: '',
    status: 'In Stock'
  });
  useEffect(() => {
    fetch(`${BASE_URL}/api/items/${itemId}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch item: ${res.status}`);
        return res.text();
      })
      .then(text => {
        if (!text) return;
        return JSON.parse(text);
      })
      .then(data => setItemDetails(data))
      .catch(err => {
        console.error("❌ Error fetching item:", err);
        setItemDetails(null);
      });
    fetch(`${BASE_URL}/api/items/${itemId}/serials`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch serials: ${res.status}`);
        return res.text();
      })
      .then(text => {
        if (!text) return [];
        return JSON.parse(text);
      })
      .then(data => setSerials(data))
      .catch(err => {
        console.error("❌ Error fetching serials:", err);
        setSerials([]);
      });
  }, [itemId]);
  const handleStatusChange = (id, newStatus) => {
    setSerials(prev =>
      prev.map(s =>
        s.id === id ? { ...s, status: newStatus } : s
      )
    );
    fetch(`${BASE_URL}/api/serials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(err => console.error("❌ Error updating status:", err));
  };
  const handleAddSerial = () => {
    if (!newSerial.serial.trim()) return;
    fetch(`${BASE_URL}/api/items/${itemId}/serials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSerial)
    })
      .then(res => res.json())
      .then(added => {
        setSerials(prev => [...prev, added]);
        setNewSerial({ serial: '', status: 'In Stock' });
        setShowAddModal(false);
      })
      .catch(err => console.error('❌ Failed to add serial:', err));
  };
  return (
    <div className="serial-container">
      {itemDetails && (
        <div className="item-header">
          <div>
            <h3>{itemDetails.name}</h3>
            <p className="model">{itemDetails.model}</p>
          </div>
          <img src={itemDetails.imageUrl} alt="item" className="item-image" />
        </div>
      )}
      <table className="serial-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {serials.map((serial, index) => (
            <tr key={serial.id}>
              <td>{index + 1}</td>
              <td>{serial.serial}</td>
              <td>
                <select
                  value={serial.status}
                  onChange={e => handleStatusChange(serial.id, e.target.value)}
                  className={`status-dropdown ${serial.status?.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="In Use">In Use</option>
                  <option value="In Repair">In Repair</option>
                  <option value="Retired">Retired</option>
                </select>
              </td>
              <td>{new Date(serial.dateAdded).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer-buttons">
        <a href="/inventory" className="back-link">Back to Item List</a>
        <button className="add-button" onClick={() => setShowAddModal(true)}>+ Add Serial Number</button>
      </div>
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Serial Number</h3>
            <input
              type="text"
              placeholder="Serial Number"
              value={newSerial.serial}
              onChange={e => setNewSerial({ ...newSerial, serial: e.target.value })}
            />
            <select
              value={newSerial.status}
              onChange={e => setNewSerial({ ...newSerial, status: e.target.value })}
            >
              <option value="In Stock">In Stock</option>
              <option value="In Use">In Use</option>
              <option value="In Repair">In Repair</option>
              <option value="Retired">Retired</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddSerial}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}