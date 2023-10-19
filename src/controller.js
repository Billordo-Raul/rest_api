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

	async agregar (req,res){
	    const libro = req.body;
	    try{
		/* Agregar registro */
		const [result] = await pool.query(`INSERT INTO libros(nombre,autor,categoria,anio_publicacion,ISBN) VALUES (?,?,?,?,?)`,[libro.nombre,libro.autor,libro.categoria,libro.anio_publicacion,libro.ISBN]);
		res.json({"ID insertado":result.insertId});
		res.json(result);
		 
	    }catch (e){

	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	    }

	}

}


export const libro = new LibroController();
