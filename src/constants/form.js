import { Map } from 'immutable';

export const username = 'username';
export const password = 'password';
export const passwordRepeat = 'passwordRepeat';

export const firstName = 'firstName';
export const lastName = 'lastName';
export const email = 'email';
export const phone = 'phone';
export const country = 'country';
export const city = 'city';
export const interests = 'interests';
export const sex = 'sex';
export const age = 'age';
export const weight = 'weight';
export const healthProblems = 'healthProblems';
export const notes = 'notes';

export const spouse = 'spouse';
export const child = 'child';
export const father = 'father';
export const mother = 'mother';

const interestsSportId = 'interests.sport';
const interestsCreationId = 'interests.creation';
const interestsFilmsId = 'interests.films';
const interestsMusicId = 'interests.music';
const interestsBooksId = 'interests.books';
const interestsTravelsId = 'interests.travels';
const interestsOtherId = 'interests.other';

const interestsListMap = Map({
  [interestsSportId]: { id: interestsSportId },
  [interestsCreationId]: { id: interestsCreationId },
  [interestsFilmsId]: { id: interestsFilmsId },
  [interestsMusicId]: { id: interestsMusicId },
  [interestsBooksId]: { id: interestsBooksId },
  [interestsTravelsId]: { id: interestsTravelsId },
  [interestsOtherId]: { id: interestsOtherId },
});

const healthProblemAllergyId = 'healthProblem.allergy';
const healthProblemDiabetesId = 'healthProblem.diabetes';
const healthProblemDepressionId = 'healthProblem.depression';
const healthProblemObesityId = 'healthProblem.obesity';
const healthProblemHighBloodPressureId = 'healthProblem.highBloodPressure';
const healthProblemOtherId = 'healthProblem.other';

const healthProblemsListMap = Map({
  [healthProblemAllergyId]: { id: healthProblemAllergyId },
  [healthProblemDiabetesId]: { id: healthProblemDiabetesId },
  [healthProblemDepressionId]: { id: healthProblemDepressionId },
  [healthProblemObesityId]: { id: healthProblemObesityId },
  [healthProblemHighBloodPressureId]: { id: healthProblemHighBloodPressureId },
  [healthProblemOtherId]: { id: healthProblemOtherId },
});

export { interestsListMap, healthProblemsListMap };

export const formNames = {
  username,
  password,
  passwordRepeat,
  firstName,
  lastName,
  email,
  phone,
  country,
  city,
  interests,
  spouse,
  child,
  father,
  mother,
  sex,
  age,
  weight,
  healthProblems,
  notes,
};
