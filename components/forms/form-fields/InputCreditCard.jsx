import React from "react";
import MaskedInput from "react-text-mask";
import CustomInput from "../../../src/components/CustomInput/CustomInput.jsx";

function TextMaskCustom(props) {
  const { id, mask, inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
    />
  );
}

function InputCreditCard({ ...props }) {
  const { id, labelText, color } = props;

  return (
    <CustomInput
      formControlProps={{
        fullWidth: true
      }}
      id={id}
      color={color}
      placeholder={"4242 4242 4242 4242"}
      inputComponent={TextMaskCustom}
      labelText={labelText}
    />
  );
}

export default InputCreditCard;
