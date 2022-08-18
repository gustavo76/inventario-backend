const express = require('express');
const app = express();

app.use("/listausuarios",(req,res,next)=>{

    res.status(200).send({
        mensagem:"deu certo!!!!",
        nome:"carlos"
    })



});

module.exports = app