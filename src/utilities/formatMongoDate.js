import moment from 'moment';

const formatMongoDate = (mongoDate) => {
  return moment.utc(mongoDate).format('YYYY-MM-DD');
};

export default formatMongoDate;
