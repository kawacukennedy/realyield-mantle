import React from 'react';

interface Step {
  label: string;
  completed: boolean;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index < currentStep
                  ? 'bg-success text-white'
                  : index === currentStep
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted'
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 ${
                index < currentStep ? 'bg-success' : 'bg-muted'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}