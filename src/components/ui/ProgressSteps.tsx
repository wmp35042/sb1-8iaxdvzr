import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  steps, 
  currentStep,
  className 
}) => {
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div className={clsx(
                "relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all",
                currentStep > index 
                  ? "bg-primary-600 border-primary-600" 
                  : currentStep === index 
                    ? "bg-white border-primary-600 text-primary-600" 
                    : "bg-white border-gray-300 text-gray-400"
              )}>
                {currentStep > index ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={clsx(
                "mt-2 text-xs font-medium transition-colors",
                currentStep >= index ? "text-primary-600" : "text-gray-500"
              )}>
                {step.label}
              </span>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2">
                <div className={clsx(
                  "h-1 rounded-full",
                  currentStep > index ? "bg-primary-600" : "bg-gray-200"
                )} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;