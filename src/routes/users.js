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
    under.find(usuarios,(user,i)=>{
        if(user.id == id){
            res.json(usuarios[i]);
        }
    });
    //este for sirve igual para mostrar usuario por id
    // for(let i =0; i < usuarios.length; i++){
    //     if(usuarios[i].id == id){
    //         res.json(usuarios[i]);
    //     }
    // }
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
    for(let i =0; i < usuarios.length; i++){
        if(usuarios[i].id == id){
            usuarios.splice(i,1);
        }
    }

// queda comentado porque tira un error con la funcion splice, sin embargo funciona al segundo intento
//    under.each(usuarios, (user,i) => {
//         const {id}  = req.params;
//         if(user.id == id){
//             usuarios.splice(i,1);
//         }
//     });
    res.send(usuarios);
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
    if(nombre)
    {
        user.nombre = nombre;
    }
    if(apellidos)
    {
        user.apellidos = apellidos;
    }
    res.json(usuarios);

});




module.exports = router;