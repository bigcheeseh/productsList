import React from 'react';
import InputMask from 'components/InputMask';
import Input from 'components/InputMask/Input';

export function setInputField(
  name,
  placeholder,
  type,
  value,
  onChange,
  disabled,
  required,
  options,
  autoFocus,
) {
  return options ? (
    <InputMask
      placeholder={placeholder}
      mask={options.mask}
      regexp={options.regexp}
      type={type}
      name={name}
      id={name}
      disabled={disabled}
      value={value || ''}
      onChange={text => onChange(name, text)}
      required={required}
    />
  ) : (
    <Input
      type={type}
      name={name}
      id={name}
      value={value || ''}
      disabled={disabled}
      placeholder={placeholder}
      onChange={e => onChange(name, e.target.value)}
      required={required}
      autoFocus={autoFocus}
    />
  );
}
