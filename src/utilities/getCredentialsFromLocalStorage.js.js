const getCredentialFromLocalStorage = () => {
  const email = window.localStorage.getItem('email');
  const password = window.localStorage.getItem('password');
  return email && password ? { email, password } : null;
};

module.exports = getCredentialFromLocalStorage;
