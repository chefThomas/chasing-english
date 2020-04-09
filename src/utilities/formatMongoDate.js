import moment from 'moment';

const formatMongoDate = (mongoDate) => moment(mongoDate).format('YYYY-MM-DD');

export default formatMongoDate;
