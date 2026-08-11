import React from 'react';
import Button from '../ui/Button';

const FlyerTable = ({ flyers, onView, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="responsive-table" aria-label="Frequent Flyers List">
        <thead>
          <tr>
            <th scope="col">Member ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Tier</th>
            <th scope="col">Points</th>
            <th scope="col">Status</th>
            <th scope="col">Joined Date</th>
            <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flyers.map((flyer) => (
            <tr key={flyer.id}>
              <td data-label="Member ID">{flyer.id}</td>
              <td data-label="Full Name" style={{ fontWeight: 500 }}>{flyer.firstName} {flyer.lastName}</td>
              <td data-label="Email">{flyer.email}</td>
              <td data-label="Tier">
                <span className={`badge ${flyer.tier === 'Platinum' || flyer.tier === 'Gold' ? 'active' : ''}`} style={
                  flyer.tier === 'Standard' ? { backgroundColor: 'var(--color-light-gray)', color: 'var(--color-black)' } :
                  flyer.tier === 'Silver' ? { backgroundColor: '#e0e0e0', color: 'var(--color-black)' } :
                  flyer.tier === 'Gold' ? { backgroundColor: '#ffd700', color: 'var(--color-black)' } :
                  { backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }
                }>
                  {flyer.tier}
                </span>
              </td>
              <td data-label="Points">{Number(flyer.points).toLocaleString()}</td>
              <td data-label="Status">
                <span className={`badge ${flyer.status === 'Active' ? 'active' : 'inactive'}`}>
                  {flyer.status}
                </span>
              </td>
              <td data-label="Joined Date">{flyer.joinedDate}</td>
              <td data-label="Actions">
                <div style={{ display: 'flex', gap: 'var(--space-1)', justifyContent: 'center' }}>
                  <Button variant="secondary" size="sm" onClick={() => onView(flyer)} aria-label={`View details for ${flyer.firstName} ${flyer.lastName}`}>
                    View
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => onEdit(flyer)} aria-label={`Edit ${flyer.firstName} ${flyer.lastName}`}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onDelete(flyer)} aria-label={`Delete ${flyer.firstName} ${flyer.lastName}`}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlyerTable;
