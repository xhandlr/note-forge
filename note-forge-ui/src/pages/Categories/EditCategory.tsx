import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryForm from './CategoryForm';

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <CategoryForm mode="edit" categoryId={id} />;
};

export default EditCategory;
