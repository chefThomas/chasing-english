const makeTimeStampString = () => {
  const dateObj = new Date();
  return dateObj.toLocaleString();
};

export default makeTimeStampString;
