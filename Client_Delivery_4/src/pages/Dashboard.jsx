import React, { useMemo } from 'react';

const Dashboard = ({ flyers }) => {
  const stats = useMemo(() => {
    return flyers.reduce((acc, f) => {
      acc.total += 1;
      if (f.status === 'Active') acc.active += 1;
      if (f.tier === 'Gold') acc.gold += 1;
      if (f.tier === 'Platinum') acc.platinum += 1;
      return acc;
    }, { total: 0, active: 0, gold: 0, platinum: 0 });
  }, [flyers]);

  const recentMembers = useMemo(() => {
    return [...flyers]
      .sort((a, b) => b.joinedDate.localeCompare(a.joinedDate))
      .slice(0, 5);
  }, [flyers]);

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-4)',
  };

  const cardStyle = {
    backgroundColor: 'var(--color-white)',
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--color-border)',
  };

  const cardTitleStyle = {
    color: 'var(--color-medium-gray)',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 'var(--space-2)',
    fontWeight: '600',
  };

  const cardValueStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--color-black)',
  };

  const sectionStyle = {
    backgroundColor: 'var(--color-white)',
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--color-border)',
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 'var(--space-2) 0',
    borderBottom: '1px solid var(--color-light-gray)',
  };

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-4)' }}>Dashboard Overview</h1>
      
      <div style={cardGridStyle}>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Total Members</div>
          <div style={cardValueStyle}>{stats.total}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Active Members</div>
          <div style={cardValueStyle}>{stats.active}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Gold Members</div>
          <div style={cardValueStyle}>{stats.gold}</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Platinum Members</div>
          <div style={cardValueStyle}>{stats.platinum}</div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ marginBottom: 'var(--space-3)', fontSize: '1.25rem' }}>Recently Joined Members</h2>
        {recentMembers.length > 0 ? (
          <div>
            {recentMembers.map(member => (
              <div key={member.id} style={listItemStyle}>
                <div>
                  <div style={{ fontWeight: '500' }}>{member.firstName} {member.lastName}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-medium-gray)' }}>{member.email}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '500' }}>{member.tier}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-medium-gray)' }}>{member.joinedDate}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-medium-gray)' }}>No members found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
