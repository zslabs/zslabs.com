import { useContext } from 'react';
import { ThemeContext } from '@emotion/core';

export default function useTheme() {
  return useContext(ThemeContext);
}
