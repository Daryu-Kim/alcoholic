export function setSessionStorage(name, value) {
  sessionStorage.setItem(name, value);
  return true;
}

export function getSessionStorage(name) {
  const value = sessionStorage.getItem(name);
  return value;
}

export function removeSessionStorage(name) {
  sessionStorage.removeItem(name);
  return true;
}

export function clearSessionStorage() {
  sessionStorage.clear();
  return true;
}
