export const COLORS = {
  primary: '#4361ee',
  secondary: '#3a0ca3',
  success: '#4cc9f0',
  warning: '#f72585',
  info: '#7209b7',
  light: '#f8f9fa',
  dark: '#212529',
  gray: '#6c757d',
  lightGray: '#e9ecef',
};

export const TASK_STATUS = {
  PENDING: 'pendiente',
  IN_PROGRESS: 'en progreso',
  COMPLETED: 'completada',
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.PENDING]: 'Pendiente',
  [TASK_STATUS.IN_PROGRESS]: 'En progreso',
  [TASK_STATUS.COMPLETED]: 'Completada',
};

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.PENDING]: '#f72585',
  [TASK_STATUS.IN_PROGRESS]: '#7209b7',
  [TASK_STATUS.COMPLETED]: '#4cc9f0',
};
