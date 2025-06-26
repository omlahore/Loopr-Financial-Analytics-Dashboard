export const formatDateWithDay = (dateString: string | Date): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};

export const formatDateShort = (dateString: string | Date): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
}; 