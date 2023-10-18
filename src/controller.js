import { pool } from './database.js';

class LibroController{

	async getAll (req,res){
		const [result] = await pool.query("SELECT * FROM libros");
		res.json(result);
	}

	async getOne (req,res){
                const libro = req.body;
		const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`,[libro.id]);
		res.json(result);
	}

}

export const libro = new LibroController();
