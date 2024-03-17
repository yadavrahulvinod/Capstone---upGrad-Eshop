// OrderSkeleton.js

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Address from "./Address";
import Display_order from "./Display_order";
import { Container } from "@mui/material";
import Confirmed_order from "./Confirmed_order";

const steps = [
  "Review order",
  "Give addresss",
  "Confirmed order",
];

const OrderSkeleton = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handlePlaceOrder = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Display_order onNext={handlePlaceOrder} />;
      case 1:
        return <Address onNext={handlePlaceOrder} />; 
      case 2:
        return <Confirmed_order/>;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          {getStepContent(activeStep)}
        </Box>
        <Stepper nonLinear activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed.has(index)}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Container>
  );
};

export default OrderSkeleton;
