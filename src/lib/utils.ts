import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenIfNeeded(text: string | null | undefined, length = 60) {
  if (!text) return '';
  else if (text.length > length)
    return `${text.slice(0, length).replace(/\s*$/, '')}...`;
  else return text;
}
