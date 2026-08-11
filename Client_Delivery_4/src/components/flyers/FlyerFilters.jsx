import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const FlyerFilters = ({ 
  searchTerm, 
  onSearchChange, 
  tierFilter, 
  onTierChange, 
  statusFilter, 
  onStatusChange,
  onReset
}) => {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)',
    alignItems: 'flex-end',
    marginBottom: 'var(--space-3)',
    backgroundColor: 'var(--color-white)',
    padding: 'var(--space-3)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--color-border)',
  };

  const itemStyle = {
    flex: '1 1 200px',
  };

  return (
    <div style={containerStyle} aria-label="Filter Members">
      <div style={itemStyle}>
        <Input
          label="Search Members"
          placeholder="Name, ID, or Email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search members by name, ID, or email"
          style={{ marginBottom: 0 }}
        />
      </div>
      <div style={itemStyle}>
        <Select
          label="Tier"
          value={tierFilter}
          onChange={(e) => onTierChange(e.target.value)}
          options={[
            { label: 'All Tiers', value: 'All' },
            'Standard', 
            'Silver', 
            'Gold', 
            'Platinum'
          ]}
          style={{ marginBottom: 0 }}
        />
      </div>
      <div style={itemStyle}>
        <Select
          label="Status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[
            { label: 'All Statuses', value: 'All' },
            'Active', 
            'Inactive'
          ]}
          style={{ marginBottom: 0 }}
        />
      </div>
      <div style={{ paddingBottom: 'var(--space-2)' }}>
        <Button variant="secondary" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FlyerFilters;
