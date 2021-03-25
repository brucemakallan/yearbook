import React from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const CustomStepper = ({ steps, activeStep }) => (
  <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map((step) => (
      <Step key={step}>
        <StepLabel>{step}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default CustomStepper;
