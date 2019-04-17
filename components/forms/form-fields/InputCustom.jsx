import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const InputCustom = ({
  type,
  label,
  field,
  name,
  autoComplete,
  required,
  form: { touched, errors },
  ...props
}) => (
  <FormControl margin="normal" required={required} fullWidth>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Input type={type} name={name} autoComplete={autoComplete} {...field} {...props} />
  </FormControl>
);

export default InputCustom;
