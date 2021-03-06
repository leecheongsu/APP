declare module '*.bmp' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare type LooseObject = {
  [key: string]: any;
};

export type FontweightTypes = 'THIN' | 'LIGHT' | 'REGULAR' | 'MEDIUM' | 'BOLD';

export type InputTypes = {
  value: string;
  onChangeText: (text: string) => void;
  // eslint-disable-next-line no-undef
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
