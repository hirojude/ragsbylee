export const convertTimestamps = (data) => {
  if (!data) return null;
  
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value?.toDate) {
      acc[key] = value.toDate().toISOString();
    } else if (Array.isArray(value)) {
      acc[key] = value.map(convertTimestamps);
    } else if (typeof value === 'object' && value !== null) {
      acc[key] = convertTimestamps(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
}; 