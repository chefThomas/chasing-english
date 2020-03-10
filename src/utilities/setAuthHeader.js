const setAuthHeader = userToken => {
  const token = userToken ? `bearer ${userToken}` : null;

  console.log('set auth header token: ', token);
  return { headers: { Authorization: token } };
};

module.exports = setAuthHeader;
