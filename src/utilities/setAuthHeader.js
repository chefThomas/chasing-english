const setAuthHeader = userToken => {
  const token = userToken ? `bearer ${userToken}` : null;

  return { headers: { Authorization: token } };
};

module.exports = setAuthHeader;
