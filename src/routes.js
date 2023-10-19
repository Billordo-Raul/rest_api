import { Router }  from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros',libro.getAll);
router.get('/consulta',libro.getOne);

router.post('/agregar',libro.agregar); 
router.put('/actualizar',libro.actualizar);