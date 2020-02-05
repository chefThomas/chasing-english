import moment from 'moment';

const formatMongoDate = mongoDate => moment(mongoDate).format('MM-DD-YYYY');

export default formatMongoDate;
