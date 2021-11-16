import { useState } from 'react';

export default function useInputs(initialState) {
  const [values, setValues] = useState(initialState);

  function storeInputValue({ target }) {
    setValues({
      ...values,
      [target.id]: target.type === 'checkbox' ? target.checked : target.value,
    });
  }

  return [values, storeInputValue];
}
