import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  completed: boolean;
  description?: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export default function ProgressStepper({ steps, currentStep, className = '' }: ProgressStepperProps) {
  return (
    <div className={`flex items-center justify-center space-x-2 md:space-x-4 ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-gradient-to-r from-success to-success/80 text-white shadow-lg shadow-success/25'
                  : index === currentStep
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 animate-pulse'
                  : 'bg-bg-muted text-text-muted border border-border'
              }`}
              whileHover={index <= currentStep ? { scale: 1.1 } : {}}
              whileTap={index <= currentStep ? { scale: 0.95 } : {}}
            >
              {index < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Check size={16} />
                </motion.div>
              ) : (
                <span>{index + 1}</span>
              )}
              {index === currentStep && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <motion.span
              className={`text-xs mt-2 text-center max-w-20 leading-tight ${
                index <= currentStep ? 'text-text font-medium' : 'text-text-muted'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {step.label}
            </motion.span>
            {step.description && (
              <motion.span
                className="text-xs text-text-muted mt-1 text-center max-w-24 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {step.description}
              </motion.span>
            )}
          </motion.div>
          {index < steps.length - 1 && (
            <motion.div
              className="hidden md:block relative"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <div className="w-16 h-0.5 bg-bg-muted relative overflow-hidden">
                <motion.div
                  className={`h-full ${
                    index < currentStep
                      ? 'bg-gradient-to-r from-success to-success/80'
                      : 'bg-primary'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: index < currentStep ? '100%' : index === currentStep ? '50%' : '0%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}