import React, { useEffect, useState } from 'react';
import SplashScreenPresenter from '@app/screens/SplashScreen/SplashScreenPresenter';

export default function SplashScreenContainer() {
  const [value, setValue] = useState(0);

  //progress bar
  useEffect(() => {
    let timer = setTimeout(() => {
      setValue(value + 0.1);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  return <SplashScreenPresenter value={value} />;
}
