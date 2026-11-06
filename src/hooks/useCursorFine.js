import { useMediaQuery } from './useMediaQuery.js';

export const useCursorFine = () => {
  // Active only on desktop viewports (>= 1025px) with fine mouse pointer
  return useMediaQuery('(min-width: 1025px) and (hover: hover) and (pointer: fine)');
};
