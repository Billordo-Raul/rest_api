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

	/*Proceso de Agregar Registros*/
	async agregar (req,res){
	    const libro = req.body;
	    try{
	
		const [result] = await pool.query(`INSERT INTO libros(nombre,autor,categoria,anio_publicacion,ISBN) VALUES (?,?,?,?,?)`,[libro.nombre,libro.autor,libro.categoria,libro.anio_publicacion,libro.ISBN]);
		res.json({"ID insertado":result.insertId});

		 
	    }catch (e){

	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	    }

	}

	/*Proceso de Actualizar Registros*/

	async actualizar (req,res){
	    const libro = req.body;
	    try{
		const [result] = await pool.query(`UPDATE libros set nombre=(?),autor=(?),categoria=(?),anio_publicacion=(?) WHERE ISBN=(?)`,[libro.nombre,libro.autor,libro.categoria,libro.anio_publicacion,libro.ISBN ]);

		res.json({"Registros actualizados ":result.changedRows});
		
		
	    }catch (e){
		
	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	
	    }

	}

	/*Proceso de Eliminar Registros*/

	async eliminar (req,res){
 	    const libro = req.body;
	    try{
		const [result] = await pool.query(`DELETE FROM libros  WHERE ISBN=(?)`,[libro.ISBN]);
		res.json({"Registros Eliminados ":result.affectedRows});

	    }catch (e){
	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	

	    }
	}



}


export const libro = new LibroController();
