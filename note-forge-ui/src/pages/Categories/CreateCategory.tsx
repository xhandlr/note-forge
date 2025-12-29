import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../services/CategoryService';
import { ArrowLeft, Camera, Layers, Check, Info } from 'lucide-react';
import Navbar from '../../components/Dashboard/Navbar';
import Footer from '../../components/UI/Footer';

function CreateCategory() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: null as File | null,
    isPinned: false
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryData(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData(prev => ({ ...prev, isPinned: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('description', categoryData.description);
    if (categoryData.image) formData.append('image', categoryData.image);
    formData.append('isPinned', categoryData.isPinned ? '1' : '0');

    try {
      const response = await addCategory(formData);
      if (response.message) {
        alert(`Categoría ${categoryData.isPinned ? 'fijada y ' : ''}creada con éxito! ID: ${response.categoryId}`);
        navigate('/categories');
      }
    } catch (error) {
      setErrors(error as {[key: string]: string});
      console.error('Error al crear categoría:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 text-left mt-20">

        {/* Header de página */}
        <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-lg border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-inner">
              <Layers size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Nueva Categoría</h1>
              <p className="text-slate-500 font-semibold text-xs">Define un nuevo espacio de aprendizaje.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="p-3 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all hover:cursor-pointer"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Formulario Sólido */}
        <form onSubmit={handleSubmit} className="bg-white p-7 lg:p-9 rounded-[2.5rem] shadow-xl border border-slate-200 space-y-8">

          {/* Título */}
          <div className="space-y-3">
            <label className="text-slate-900 font-black text-base ml-1 flex items-center gap-2">
              Nombre de la categoría *
            </label>
            <input
              required
              type="text"
              name="name"
              maxLength={120}
              value={categoryData.name}
              onChange={handleChange}
              placeholder="Ej: Física Mecánica"
              className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all font-bold text-slate-800 text-base"
            />
            {errors.name && <p className="text-red-500 text-xs font-bold pl-2">{errors.name}</p>}
          </div>

          {/* Imagen de Portada */}
          <div className="space-y-3">
            <label className="text-slate-900 font-black text-base ml-1 flex items-center gap-2">
              Imagen de portada
              <Info size={14} className="text-slate-300" />
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {!imagePreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 bg-slate-50 border-2 border-slate-200 rounded-[1.5rem] flex flex-col items-center justify-center gap-3 hover:bg-slate-100 hover:border-rose-400 transition-all group"
              >
                <div className="p-4 bg-white rounded-full group-hover:scale-110 transition-transform shadow-lg">
                  <Camera size={30} className="text-slate-400 group-hover:text-rose-500 transition-colors" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <p className="text-slate-900 font-black text-base">Subir Imagen</p>
                  <p className="text-slate-400 font-medium text-sm mt-1">Haz clic para seleccionar una imagen</p>
                </div>
              </button>
            ) : (
              <div className="relative w-full h-48 rounded-[1.5rem] overflow-hidden border-2 border-slate-200 shadow-lg group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <div className="p-3 bg-white rounded-full">
                    <Camera size={26} className="text-slate-900" strokeWidth={2} />
                  </div>
                </button>
              </div>
            )}
            {errors.image && <p className="text-red-500 text-xs font-bold pl-2">{errors.image}</p>}
          </div>

          {/* Descripción */}
          <div className="space-y-6">
            <label className="text-slate-900 font-black text-base ml-1">Descripción de la categoría</label>
            <textarea
              rows={3}
              name="description"
              maxLength={255}
              value={categoryData.description}
              onChange={handleChange}
              placeholder="¿De qué trata esta categoría? Define objetivos o temas principales..."
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all resize-none font-bold text-sm leading-relaxed text-slate-800 mt-3"
              required
            />
            {errors.description && <p className="text-red-500 text-xs font-bold pl-2">{errors.description}</p>}
          </div>

          {/* Fijar Categoría */}
          <div className="flex items-center gap-3 p-3.5 bg-amber-50 border-2 border-amber-200 rounded-[1.5rem]">
            <input
              id="isPinned"
              name="isPinned"
              type="checkbox"
              checked={categoryData.isPinned}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
            />
            <label htmlFor="isPinned" className="text-slate-900 font-bold text-sm cursor-pointer flex-1">
              Fijar esta categoría en la pantalla de Inicio
            </label>
          </div>

          {/* Acciones */}
          <div className="pt-5 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-rose-500 text-white py-3.5 rounded-[1.5rem] font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-900/20 hover:bg-rose-600 transition-all active:scale-95"
            >
              <Check size={20} strokeWidth={3} /> Guardar Categoría
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-slate-100 text-slate-500 py-3.5 rounded-[1.5rem] font-black text-base hover:bg-slate-200 transition-all"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}

export default CreateCategory;