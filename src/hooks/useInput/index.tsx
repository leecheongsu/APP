import { useCallback, useState } from 'react';

export default function useInput(intialValue: string) {
  const [value, setValue] = useState<string>(intialValue);
  const onChangeText = useCallback((text: string) => {
    setValue(text);
  }, []);
  return { value, onChangeText, setValue };
}
