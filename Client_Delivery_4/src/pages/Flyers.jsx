import React, { useState, useMemo, useEffect } from 'react';
import FlyerTable from '../components/flyers/FlyerTable';
import FlyerFilters from '../components/flyers/FlyerFilters';
import FlyerForm from '../components/flyers/FlyerForm';
import FlyerDetails from '../components/flyers/FlyerDetails';
import DeleteConfirmation from '../components/flyers/DeleteConfirmation';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { logAnalytics } from '../utils/analytics';
import { sanitizeObject } from '../utils/sanitize';

const Flyers = ({ flyers, onAddFlyer, onUpdateFlyer, onDeleteFlyer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        logAnalytics('member_searched', { term: searchTerm });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm]);

  const filteredFlyers = useMemo(() => {
    return flyers.filter(flyer => {
      const matchSearch = searchTerm === '' || 
        `${flyer.firstName} ${flyer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flyer.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchTier = tierFilter === 'All' || flyer.tier === tierFilter;
      const matchStatus = statusFilter === 'All' || flyer.status === statusFilter;
      
      return matchSearch && matchTier && matchStatus;
    });
  }, [flyers, searchTerm, tierFilter, statusFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setTierFilter('All');
    setStatusFilter('All');
  };

  const handleOpenAdd = () => {
    setSelectedFlyer(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (flyer) => {
    setSelectedFlyer(flyer);
    setIsFormOpen(true);
  };

  const handleOpenView = (flyer) => {
    setSelectedFlyer(flyer);
    logAnalytics('member_viewed', { memberId: flyer.id });
    setIsDetailsOpen(true);
  };

  const handleOpenDelete = (flyer) => {
    setSelectedFlyer(flyer);
    setIsDeleteOpen(true);
  };

  const handleSubmitForm = async (formData) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const sanitizedData = sanitizeObject(formData);
    
    if (selectedFlyer) {
      onUpdateFlyer({ ...selectedFlyer, ...sanitizedData });
    } else {
      const newId = `FF-${1000 + flyers.length + Math.floor(Math.random() * 100)}`;
      onAddFlyer({ 
        ...sanitizedData, 
        id: newId,
        joinedDate: new Date().toISOString().split('T')[0]
      });
    }
    
    setIsLoading(false);
    setIsFormOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (selectedFlyer) {
      onDeleteFlyer(selectedFlyer.id);
    }
    
    setIsLoading(false);
    setIsDeleteOpen(false);
    setSelectedFlyer(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h1 style={{ margin: 0 }}>Members Management</h1>
        <Button onClick={handleOpenAdd}>Add Member</Button>
      </div>

      <FlyerFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tierFilter={tierFilter}
        onTierChange={setTierFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onReset={handleResetFilters}
      />

      {flyers.length === 0 ? (
        <EmptyState 
          title="No frequent flyer members found"
          description="There are currently no members in the system. Get started by adding a new member."
          actionText="Add New Member"
          onAction={handleOpenAdd}
        />
      ) : filteredFlyers.length === 0 ? (
        <EmptyState 
          title="No data found"
          description="No frequent flyer records match your search. Try another name, member ID, or email."
          actionText="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <FlyerTable 
          flyers={filteredFlyers}
          onView={handleOpenView}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Modals */}
      <FlyerForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={selectedFlyer}
        isLoading={isLoading}
      />

      <FlyerDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        flyer={selectedFlyer}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        flyerName={selectedFlyer ? `${selectedFlyer.firstName} ${selectedFlyer.lastName}` : ''}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Flyers;
