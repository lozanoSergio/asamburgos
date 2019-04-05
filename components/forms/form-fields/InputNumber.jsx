import React from "react";
import NumberFormat from 'react-number-format';
import CustomInput from "../../../src/components/CustomInput/CustomInput.jsx";

function NumberFormatCustom(props) {
    const { id, inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
          }}
        getInputRef={inputRef}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        prefix="€"
      />
    );
  }
  

function InputNumber({ ...props }) {
  const { id, labelText, color } = props;

  return (
    <CustomInput
      formControlProps={{
        fullWidth: true
      }}
      id={id}
      placeholder={"€29,99"}
      value={null}
      color={color}
      inputComponent={NumberFormatCustom}
      labelText={labelText}
    />
  );
}

export default InputNumber;
