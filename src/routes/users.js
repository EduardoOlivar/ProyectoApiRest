const { Router} = require('express');
const router = Router();
const under = require('underscore');

const usuarios = require('../ejemplo.json');  // importa usuarios desde ejemplo.json

//obtiene usuarios
router.get('/',(req,res)=>{
    res.json(usuarios);
});

//obtiene usuario por su id
router.get('/:id',(req,res)=>{
    const {id}  = req.params;

    const user =usuarios.find((user)=> user.id == id);
    if(user){
        res.json(user);
    }else{
        res.status(400).json({error:'No se encontro el id'});
    }
    
});

//agrega usuarios
router.post('/',(req,res)=>{
    const {nombre, apellidos}=req.body;
    if(nombre && apellidos){
        const id = usuarios.length +1; 
        const newUser = {id,...req.body};
        console.log(newUser); // para mostrar el nuevo usuario
        usuarios.push(newUser); // se agrega el nuevo usuario
        res.json(usuarios);   // da la respuesta con la lista de usuarios y el nuevo incluido
    }else{
        res.status(400).json({error:'Error de solicitud'});
    }
    
});

//borra usuarios a partir de su id 
router.delete('/:id', (req,res) => {
    const {id}  = req.params;
    let estaId = false;
    for(let i =0; i < usuarios.length; i++){
        if(usuarios[i].id == id){
        estaId = true;
        usuarios.splice(i,1);
        }
    }

    if(estaId){
        res.send(usuarios);
    }else{
        res.status(400).json({error:'No se encontro el id'}); 
    }
});


//metodo put para cambiar los datos desde su id
router.put('/:id',(req,res)=>{
    const {id}  = req.params;
    const {nombre, apellidos}=req.body;
    if(nombre && apellidos){
        under.each(usuarios,(user,i)=>{
            if(user.id == id){
                user.nombre = nombre;
                user.apellidos = apellidos;
            }
        });
        res.json(usuarios);
    }else{
        res.status(400).json({error:'error al realizar el cambio'});
    }
});

router.patch('/:id',(req,res)=>{
    const {id}  = req.params;
    const {nombre,apellidos}= req.body;
    const user = usuarios.find((user)=> user.id == id);
    if(user){
        if(nombre)
        {
            user.nombre = nombre;
        }
        if(apellidos)
        {
            user.apellidos = apellidos;
        }
        res.json(user);
    }else{
        res.status(400).json({error: "No se encontro el id deseado"});
    }

});




module.exports = router;