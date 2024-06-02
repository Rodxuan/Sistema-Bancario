const Prestamo = require('../models/prestamo');

const {response} =require('express')

const getPrestamo = async(req, resp)=>{
    const [prestamo] =  await Promise.all([
        Prestamo.find()
    ])

    resp.json({
        ok: true,
        prestamo
    })
}

const newPrestamo = async (req, resp = response)=>{
    try {
        let Montointeres = (req.body.balance * req.body.interes) / 100
    const prestamo = new Prestamo({...req.body, Montointeres})
    await prestamo.save()

    resp.json({
        ok: true,
        prestamo
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarPrestamo = async( req, resp) => {
    const uid = req.params.id

    try {
    const PrestamoDB = await Prestamo.findById(uid)

    if(!PrestamoDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe una Prestamo con ese id'
        })
    }
    let Montointeres = (req.body.balance * req.body.interes) / 100

     const prestamo = await Prestamo.findByIdAndUpdate(uid,{...req.body, Montointeres}, {new: true})
        resp.json({
        ok:true,
        prestamo
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarPrestamo = async(req, resp = response)=> {
    const uid = req.params.id

    try {

        const PrestamoDB = await Prestamo.findById(uid)
        
        if(!PrestamoDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe una Prestamo con ese id'
            })
        }

        await Prestamo.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Prestamo eliminada'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg:'Error inesperado... reivsar logs'
            })      
    }
    
    
}

module.exports = {getPrestamo, newPrestamo, actualizarPrestamo, eliminarPrestamo}