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

/****************************Proceso de Agregar Registros***************/
	async agregar (req,res){
	    try{
		/**************** Validación del ingreso correcto de los campos ***********/
		const {autor,nombre,categoria,anio_publicacion,ISBN} = req.body;

		if (!autor || !nombre || !categoria || !anio_publicacion || !ISBN){
		   console.log ("Verificar los parámetros definidos!!!");
		    
		    return res.status(400).json({ Error: 'Verificar los parámetros definidos!!!1' })
		
		   }

		/*************** Fin Validación del ingreso correcto de los campos  *************/
		
	        const libro = req.body;

		const [result] = await pool.query(`INSERT INTO libros(nombre,autor,categoria,anio_publicacion,ISBN) VALUES (?,?,?,?,?)`,[libro.nombre,libro.autor,libro.categoria,libro.anio_publicacion,libro.ISBN]);

		if (result.affectedRows > 0) {
			res.json({"ID insertado":result.insertId});
		    } else {
			res.status(400).json('No se registro correctamente el libro!!!');	
		    }		 


	    }catch (e){

	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	    }

	}

/********************** Proceso de Actualizar Registros ********************/

	async actualizar (req,res){

	   try{

		/**************** Validación del campo ISBN ***********/
		const {ISBN} = req.body;

		if (!ISBN){
		   console.log ("Error: Verificar parámetro ISBN!!!");

		    return res.status(400).json({ Error: 'Verificar parámetro ISBN!!!' });;
		   }

		/**************** FIN Validación del campo ISBN ***********/
	        const libro = req.body;
	    
		const [result] = await pool.query(`UPDATE libros set nombre=(?),autor=(?),categoria=(?),anio_publicacion=(?) WHERE ISBN=(?)`,[libro.nombre,libro.autor,libro.categoria,libro.anio_publicacion,libro.ISBN ]);

		
		
		if (result.affectedRows > 0) {
			res.json({"Registros actualizados ":result.changedRows});
		    } else {
			res.status(400).json("No se pudo actualizar los datos del libro!!!");	

		    }		 
		
	    }catch (e){
		
	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	
	
	    }

	}

/************************ Proceso de Eliminar Registros ************************/

	async eliminar (req,res){
	   try{
		/**************** Validación del campo ISBN ***********/
		const {ISBN} = req.body;

		if (!ISBN){
		   console.log ("Error: Verificar parámetro ISBN!!!");
		    
		    return res.status(400).json({ Error: 'Verificar parámetro ISBN!!!' })


		   }

		/**************** FIN Validación del campo ISBN ***********/


 	    const libro = req.body;
	    
		const [result] = await pool.query(`DELETE FROM libros  WHERE ISBN=(?)`,[libro.ISBN]);



		if (result.affectedRows > 0) {
			res.json({"Registros Eliminados ":result.affectedRows});
		    } else {
			res.status(400).json("No se pudo eliminar el libro especificado!!!");	
		    }		 




	    }catch (e){
	        console.log( e);
		const Error = e.message;
		res.status(400).json({Error });	

	    }
	}



}


export const libro = new LibroController();
