import axios from 'axios';
import setAuthHeader from './setAuthHeader';

const URI_STUB =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://blooming-beach-67877.herokuapp.com';

const checkCourseAvailability = async (items, token) => {
  const config = setAuthHeader(token);
  const programsArr = items.map(
    async program =>
      await axios.get(`${URI_STUB}/api/programs/${program.id}`, config)
  );

  const programs = await Promise.all(programsArr);

  // array of full programs where number enrolled >= capacity
  const fullCourses = programs.filter(({ data }) => {
    return data.enrolled >= data.capacity;
  });

  return fullCourses;
};

export default checkCourseAvailability;
