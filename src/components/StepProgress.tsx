import React from 'react';
import { useLocation } from 'react-router-dom';
import ProgressSteps from './ui/ProgressSteps';

const StepProgress: React.FC = () => {
  const location = useLocation();
  
  const steps = [
    { id: 'numbers', label: 'Select Number' },
    { id: 'contacts', label: 'Import Contacts' },
    { id: 'compose', label: 'Compose Message' },
    { id: 'dashboard', label: 'Review' }
  ];
  
  const getCurrentStepIndex = () => {
    const pathSegment = location.pathname.split('/')[1];
    const index = steps.findIndex(step => step.id === pathSegment);
    return index >= 0 ? index : 0;
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ProgressSteps 
        steps={steps} 
        currentStep={getCurrentStepIndex()} 
      />
    </div>
  );
};

export default StepProgress;