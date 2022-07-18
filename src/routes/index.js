const { Router } = require('express');
const router = Router();


// probando el obtener usuarios desde una url /test
router.get('/test',(req,res)=>{
    const data ={
        name:"Eduardo",
        lastName: "Olivar"
    };
    res.json(data);
});



module.exports = router;