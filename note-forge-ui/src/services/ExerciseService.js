import { sendRequest } from "./AppService";

const addExercise = async (exerciseData) => {
    return sendRequest('http://localhost:5000/create-exercise', 'POST', exerciseData);  
};

const updateExercise = async (id, exerciseData) => {
    return sendRequest(`http://localhost:5000/update-exercise/${id}`, 'PUT', exerciseData); 
};

const deleteExercise = async (id) => {
    return sendRequest(`http://localhost:5000/delete-exercise/${id}`, 'DELETE'); 
};

const getExerciseById = async (id) => {
    return sendRequest(`http://localhost:5000/exercise/${id}`, 'GET'); 
};

const getExercises = async () => {
    return sendRequest('http://localhost:5000/exercises', 'GET');  
};

export { addExercise, updateExercise, deleteExercise, getExerciseById, getExercises };
