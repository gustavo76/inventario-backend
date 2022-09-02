const express = require('express');
const router = express.Router();
const empresas=[
  {
      "id":1,
      "nome":"Jimmy Johns",
      "responsavel":"Jimmy John Liautaud",
      "contato":"9292-9292"
  },
  {
      "id":2,
      "nome":"Peter Buck",
      "responsavel":"Subway",
      "contato":"9292-9292"
  },
  {
      "id":3,
      "nome":"McDonald s",
      "responsavel":"Ray Kroc",
      "contato":"9292-9292"
  },
  {
      "id":4,
      "nome":"Dunkin Donuts",
      "responsavel":"William Rosenberg",
      "contato":"9292-9292"
  },
]

//para consultar todos os dados
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:"aqui é a lista das empresas!!!!",
        empresas:empresas,
      })
})

//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    let listaempresas=empresas.filter(value=>value.id==id);
    res.status(200).send({
        mensagem:`aqui é a lista de um usuário com id:${id}`,
        empresas:listaempresas
      })
})

// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
          let msg=[];
          let i=0;
          const empresas={
            nome : req.body.nome,
            responsavel : req.body.responsavel,
            contato : req.body.contato,
          }
          if(empresas.nome.length<3){
            msg.push({mensagem:"campo com menos de 3 caracteristicas!"})
            i++;
          }
          if(empresas.responsavel.length<3){
            msg.push({mensagem:"Campo com menos de 3 caracteres!"})
            i++;
          }
          if(empresas.contato.length<9){
            msg.push({mensagem:"contato invalido"})
            i++;
          }
          if(i==0){
            res.status(201).send({
              mensagem:"Dados Inseridos!",
              empresaCriada:empresas
            });
          }else{
            res.status(400).send({
              mensagem:msg,
            })
          }
});

router.patch('/',(req,res,next)=>{
  let msg=[];
  let i=0;
    const{id,nome,responsavel,contato}=req.body;
    
    let dadosalterados=empresas.map((item)=>{
      if(item.id==id){
        item.nome=nome;
        item.responsavel=responsavel;
        item.contato=contato;
      }
    })

    if(nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteristicas!"})
      i++;
    }
    if(responsavel.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteristicas!"})
      i++;
    }
    if(contato.length<9){
      msg.push({mensagem:"campo com menos de 3 caracteristicas!"})
      i++;
    }
    if(i==0){
      res.status(201).send({
        mensagem:"Dados Alterados!",
        dados:dadosalterados

      });
    }else{
      res.status(400).send({
        mensagem:msg,
      })
    }
});
  
  
router.delete('/:id',(req,res,next)=>{
  const {id} = req.params;
  let dadosnovos=empresas.filter(value=>value.id==id);
  let listaempresas=empresas.filter(value=>value.id!=id);
  res.status(201).send({
    mensagem:"Dados deletados com sucesso",
    dadosnovos:listaempresas,
    deletado:dadosnovos
  })

})

module.exports = router;

