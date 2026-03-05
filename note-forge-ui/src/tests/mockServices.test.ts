import { describe, it, expect, beforeEach } from 'vitest';
import { mockCategoryService, mockExerciseService, mockGuideService } from '../mocks/mockServices';

describe('mockCategoryService', () => {
    it('getAll devuelve un array de categorías', async () => {
        const result = await mockCategoryService.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    it('getById devuelve la categoría correcta', async () => {
        const all = await mockCategoryService.getAll();
        const first = all[0];
        const result = await mockCategoryService.getById(first.id);
        expect(result.id).toBe(first.id);
        expect(result.name).toBe(first.name);
    });

    it('getById lanza error si no existe', async () => {
        await expect(mockCategoryService.getById(99999)).rejects.toThrow('Categoría no encontrada');
    });

    it('create con objeto plano agrega categoría', async () => {
        const before = await mockCategoryService.getAll();
        const prevCount = before.length;

        await mockCategoryService.create({ name: 'Test Cat', description: 'desc' });

        const after = await mockCategoryService.getAll();
        expect(after.length).toBe(prevCount + 1);
        const created = after[after.length - 1];
        expect(created.name).toBe('Test Cat');
    });

    it('create con FormData agrega categoría', async () => {
        const fd = new FormData();
        fd.append('name', 'FormData Cat');
        fd.append('description', 'vía FormData');

        const before = await mockCategoryService.getAll();
        const prevCount = before.length;

        await mockCategoryService.create(fd);

        const after = await mockCategoryService.getAll();
        expect(after.length).toBe(prevCount + 1);
        expect(after[after.length - 1].name).toBe('FormData Cat');
    });

    it('delete elimina la categoría', async () => {
        const created = await mockCategoryService.create({ name: 'Para eliminar', description: '' });
        const before = await mockCategoryService.getAll();
        const prevCount = before.length;

        await mockCategoryService.delete(created.id);

        const after = await mockCategoryService.getAll();
        expect(after.length).toBe(prevCount - 1);
        expect(after.find(c => c.id === created.id)).toBeUndefined();
    });
});

describe('mockExerciseService', () => {
    it('getAll devuelve un array de ejercicios', async () => {
        const result = await mockExerciseService.getAll();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    it('getById devuelve el ejercicio correcto', async () => {
        const all = await mockExerciseService.getAll();
        const first = all[0];
        const result = await mockExerciseService.getById(first.id);
        expect(result.id).toBe(first.id);
    });

    it('getById lanza error si no existe', async () => {
        await expect(mockExerciseService.getById(99999)).rejects.toThrow('Ejercicio no encontrado');
    });

    it('getByCategoryId filtra por categoría', async () => {
        const all = await mockExerciseService.getAll();
        const catId = all[0].category_id;
        const result = await mockExerciseService.getByCategoryId(catId);
        expect(result.every(e => e.category_id === catId)).toBe(true);
    });
});

describe('mockGuideService', () => {
    it('getAll devuelve guías con exercises y exercise_count', async () => {
        const result = await mockGuideService.getAll();
        expect(Array.isArray(result)).toBe(true);
        result.forEach(guide => {
            expect(Array.isArray(guide.exercises)).toBe(true);
            expect(typeof guide.exercise_count).toBe('number');
            expect(guide.exercise_count).toBe(guide.exercises.length);
        });
    });

    it('getById devuelve guía enriquecida con exercises', async () => {
        const all = await mockGuideService.getAll();
        const first = all[0];
        const result = await mockGuideService.getById(first.id);
        expect(result.id).toBe(first.id);
        expect(Array.isArray(result.exercises)).toBe(true);
    });

    it('getById lanza error si no existe', async () => {
        await expect(mockGuideService.getById(99999)).rejects.toThrow('Guía no encontrada');
    });

    it('delete elimina la guía', async () => {
        const all = await mockGuideService.getAll();
        const prevCount = all.length;
        const target = all[all.length - 1];

        await mockGuideService.delete(target.id);

        const after = await mockGuideService.getAll();
        expect(after.length).toBe(prevCount - 1);
    });
});
