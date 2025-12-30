import React from 'react';
import { useParams } from 'react-router-dom';
import ExerciseForm from './ExerciseForm';

const EditExercise: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ExerciseForm mode="edit" exerciseId={id} />;
};

export default EditExercise;
