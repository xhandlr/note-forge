const createExercise = async (exerciseData) => {
    const response = await fetch('http://localhost:5000/create-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exerciseData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error al guardar ejercicio');
    }

    return data;
};

export { createExercise };