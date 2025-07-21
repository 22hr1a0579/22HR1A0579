// src/utils/logger.js
const logs = [];

export const logAction = (actionType, data) => {
  logs.push({
    type: 'ACTION',
    action: actionType,
    timestamp: new Date().toISOString(),
    data,
  });
};

export const logError = (errorType, message) => {
  logs.push({
    type: 'ERROR',
    error: errorType,
    timestamp: new Date().toISOString(),
    message,
  });
};

export const getLogs = () => logs;
