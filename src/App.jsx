import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(null);

  const [isWeight, setIsWeight] = useState(true);
  const [isHeight, setIsHeight] = useState(true);

  const validate = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (!!value.match(/^[0-9]*$/)) {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(true);
      } else {
        setHeight(value);
        setIsHeight(true);
      }
    } else {
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(false);
      } else {
        setHeight(value);
        setIsHeight(false);
      }
    }
  };

  const handleReset = () => {
    setWeight(0);
    setHeight(0); 
    setBmi(null);
    setIsWeight(true);
    setIsHeight(true);
  };

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters

    if (isNaN(weightInKg) || isNaN(heightInMeters) || heightInMeters === 0) {
      alert('Please enter valid weight and height.');
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh' }}>
        <div className="bg-light p-5 rounded" style={{ width: '500px' }}>
          <h2 className="animated-text text-center">BMI Calculator</h2>
          <div className="mt-5 flex-column rounded shadow details-section d-flex justify-content-center align-items-center p-4">
            <h5 className="fs-1 fw-bolder">{bmi ? `BMI: ${bmi}` : 'Enter your details'}</h5>
            {bmi && (
              <p>
                {bmi < 18.5 ? 'Underweight' :
                  bmi >= 18.5 && bmi < 24.9 ? 'Normal weight' :
                    bmi >= 25 && bmi < 29.9 ? 'Overweight' :
                      'Obesity'}
              </p>
            )}
          </div>
          <form className="mt-3">
            <div className="mb-3">
              <TextField
                id="outlined-basic"
                value={weight || ""}
                label="Weight (kg)"
                name="weight"
                onChange={validate}
                fullWidth
              />
              {!isWeight && <p className="text-danger">*Invalid input</p>}
            </div>
            <div className="mb-3">
              <TextField
                id="outlined-basic"
                value={height || ""}
                label="Height (cm)"
                name="height"
                onChange={validate}
                fullWidth
              />
              {!isHeight && <p className="text-danger">*Invalid input</p>}
            </div>
            <div className="d-flex justify-content-between w-100 mt-4">
              <Button
                className="button-gradient"
                variant="outlined"
                onClick={calculateBMI}
                disabled={isWeight && isHeight ? false : true}
              >
                CHECK
              </Button>
              <Button
                className="button-gradient"
                variant="outlined"
                onClick={handleReset}
              >
                RESET
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
