const SENSITIVE_HEADER_KEYS = new Set([
  'authorization',
  'cookie',
  'set-cookie',
  'x-api-key',
  'x-auth-token',
]);

const SENSITIVE_DATA_KEYS = new Set([
  'password',
  'token',
  'accesstoken',
  'refreshtoken',
  'secret',
  'authorization',
  'ssn',
  'creditcard',
  'apikey',
]);

function sanitizeHeaders(headers = {}) {
  if (!headers || typeof headers !== 'object') {
    return headers;
  }

  const sanitized = { ...headers };

  for (const key of Object.keys(sanitized)) {
    if (SENSITIVE_HEADER_KEYS.has(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    }
  }

  return sanitized;
}

function sanitizeData(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  const sanitized = {};

  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_DATA_KEYS.has(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function sanitizeAxiosError(error) {
  if (!error || typeof error !== 'object') {
    return error;
  }

  const sanitized = {
    message: error.message || 'Request failed',
    name: error.name || 'AxiosError',
    code: error.code,
    status: error.response?.status,
  };

  if (error.config) {
    sanitized.config = {
      method: error.config.method,
      url: error.config.url,
      baseURL: error.config.baseURL,
      headers: sanitizeHeaders(error.config.headers),
      data: sanitizeData(error.config.data),
    };
  }

  if (error.response) {
    sanitized.response = {
      status: error.response.status,
      statusText: error.response.statusText,
      headers: sanitizeHeaders(error.response.headers),
      data: sanitizeData(error.response.data),
    };
  }

  return sanitized;
}
