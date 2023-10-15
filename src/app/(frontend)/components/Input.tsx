import {
  FormControl,
  FormControlLabel,
  OutlinedInput,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps {
  id: string;
  required: boolean;
  errors: FieldErrors<FieldValues>;
  label: string;
  type: string;
  InputIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  register: UseFormRegister<FieldValues>;
  options?: RegisterOptions<FieldValues, string>;
  placholder?: string;
}

export default function Input({
  id,
  required,
  options,
  errors,
  placholder,
  label,
  type,
  register,
  InputIcon,
}: InputProps) {
  return (
    <FormControl variant='filled' fullWidth>
      <FormControlLabel
        control={
          <OutlinedInput
            fullWidth
            type={type}
            placeholder={placholder}
            size='small'
            startAdornment={<InputIcon color='primary' sx={{ pr: 1 }} />}
            sx={{ mt: 2, mb: errors[id] ? 1 : 3 }}
            color={errors[id] ? 'warning' : 'primary'}
          />
        }
        label={label}
        labelPlacement='top'
        sx={{
          alignItems: 'start',
          mx: 0,
        }}
        {...register(id, {
          required: {
            value: required,
            message: `${label} is required`,
          },
          ...options,
        })}
      />
      {errors[id]?.message && (
        <Typography
          mb={3}
          fontSize={14}
          color='error'
          component='small'
          textAlign='left'>
          {errors[id]?.message as string}
        </Typography>
      )}
    </FormControl>
  );
}
