import { sendRequest } from "./AppService";

const addExercise = async (exerciseData) => {
    return sendRequest('http://localhost:5000/create-exercise', 'POST', exerciseData);
};

const updateExercise = async (exerciseData) => {
    return sendRequest('http://localhost:5000/update-exercise', 'POST', exerciseData);
};

const deleteExercise = async (exerciseData) => {
    return sendRequest('http://localhost:5000/delete-exercise', 'DELETE', exerciseData);
}

const getExerciseById = async (exerciseData) => {
    return sendRequest('http://localhost:5000/get-exercise', 'GET', exerciseData);
}

const getExercises = async (exerciseData) => {
    return sendRequest('http://localhost:5000/get-exercises', 'GET', exerciseData);
}


export { validateExercise, addExercise };