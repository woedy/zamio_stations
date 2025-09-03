export const getStationId = (): string => {
  try {
    return localStorage.getItem('station_id') || '';
  } catch {
    return '';
  }
};

export const getToken = (): string => {
  try {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  } catch {
    return '';
  }
};

