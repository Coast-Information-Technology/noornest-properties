"use client";

import clsx from "clsx";

type Step = {
  label: string;
  step: number;
};

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  const steps: Step[] = [
    { step: 1, label: "Role" },
    { step: 2, label: "Account" },
    { step: 3, label: "Verify" },
    { step: 4, label: "Policy" },
    { step: 5, label: "Done" },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium text-gray-900">Registration</span>
        <span>Step {currentStep} of {steps.length}</span>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1">
        {steps.map((item) => {
          const isActive = item.step === currentStep;
          const isCompleted = item.step < currentStep;
          return (
            <div
              key={item.step}
              className={clsx(
                "h-2 rounded-full transition-all",
                isCompleted && "bg-primary",
                isActive && "bg-primary",
                !isActive && !isCompleted && "bg-gray-200"
              )}
              title={`${item.label} step`}
            />
          );
        })}
      </div>
    </div>
  );
}
