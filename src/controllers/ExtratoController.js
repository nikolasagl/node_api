const ExtratoModel = require('../model/ExtratoModel')
const SubscricaoModel = require('../model/SubscricaoModel')
const moment = require('moment')
// const PDFDocument = require('pdfkit')
// const fs = require('fs')
// const path = require('path')

async function buscaExtratoTotal(req, res) {
   
   if (parseInt(req.params.id) === req.userId)
      var id = req.params.id
   else
      res.json({ error: 'Problema de autenticação. Faça login novamente.' })

   try {
      var aux = await ExtratoModel.buscaExtratoTotal(id)
      aux = aux[0]
      var extrato = []
      var total = 0

      var dataInicial = moment(req.body.dataInicial)
      var dataFinal = moment(req.body.dataFinal)

      aux.forEach((element) => {
         if (element.data != null && element.data != undefined) {
            var data = moment(element.data)
            total += element.valor
            console.log(element)
            if (data >= dataInicial && data <= dataFinal && element.valor != 0) {
               element.total = total
               extrato.push(element)
            }
         }
      })

      if (extrato.length > 0) {
         if (req.body.pdf === false) {
            res.json({ extrato })
         } else {
            res.json({ extrato })
         }
      }
   } catch (error) {
      res.json({ error: 'Não foi possivel recuperar os dados do Extrato. Error: ' + error })
   }
}

async function buscaSaldo(req, res) {

   if (parseInt(req.params.id) === req.userId)
      var id = req.params.id
   else
      res.json({ error: 'Problema de autenticação. Faça login novamente.' })

   try {
      var saldo = await SubscricaoModel.buscaSaldo(id)

      if (saldo) 
         return res.json(saldo)
      else
         return false

   } catch (error) {
      console.log(error)
      return res.json({ error: "Não foi possivel recuperar o saldo do Cliente. Tente novamente mais tarde." })
   }
}

module.exports = { buscaExtratoTotal, buscaSaldo }