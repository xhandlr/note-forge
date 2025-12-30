import React from 'react';
import { useParams } from 'react-router-dom';
import GuideForm from './GuideForm';

const EditGuide: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <GuideForm mode="edit" guideId={id} />;
};

export default EditGuide;
