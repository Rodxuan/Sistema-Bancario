const Usuario = require('../models/usuario');
const cuentaAhorro = require('../models/cuentaAhorro');
const cooperativa = require('../models/cooperativa');
const prestamo = require('../models/prestamo');





const {response} =require('express')

const getUsuario = async(req, resp)=>{
    const [usuario] =  await Promise.all([
        Usuario.find()
    ])
    let users= []
    await Promise.all(usuario.map(async (user) => {
        let cuenta
        let prest
        let coope
        let usuario= {
        }

        usuario._id= user._id
        usuario.nombre= user.nombre
        usuario.cedula=user.cedula

        await Promise.all([
            cuenta = await cuentaAhorro.findById(user.cuentaAhorro),
        ])

        usuario.cuentaAhorro = {
            id:cuenta._id,
            balance: cuenta.balance
        }

        if(user.cooperativa.trim().length > 1){
            await Promise.all([
                    coope = await cooperativa.findById(user.cooperativa),
            ])
            usuario.cooperativa = {
                id:coope._id,
                balance:coope.balance,
                fechaDePago:coope.fecha
            }
        }
        if(user.prestamo.trim().length > 1){
            await Promise.all([
                prest = await prestamo.findById(user.prestamo),
            ])
            usuario.prestamo = {
                id:prest._id,
                balance:prest.balance,
                interes:prest.interes,
                MontoDeInteres:prest.Montointeres
            }
        }

        users.push(usuario)

        }))

    resp.json({
        ok: true,
        usuarios:users
    })
}

const newUsuario = async (req, resp = response)=>{
    try {

    const usuario = new Usuario(req.body)
    await usuario.save()

    resp.json({
        ok: true,
        usuario
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarUsuario = async( req, resp) => {
    const uid = req.params.id

    try {
    const UsuarioDB = await Usuario.findById(uid)

    if(!UsuarioDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe una Usuario con ese id'
        })
    }

     const usuario = await Usuario.findByIdAndUpdate(uid, req.body, {new: true})
        resp.json({
        ok:true,
        usuario
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const EliminarCooperativaUser = async( req, resp) => {
    const uid = req.params.id

    try {
    const UsuarioDB = await Usuario.findById(uid)

    if(!UsuarioDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe una Usuario con ese id'
        })
    }

    UsuarioDB.cooperativa = ""
    console.log(UsuarioDB)
     const usuario = await Usuario.findByIdAndUpdate(uid, UsuarioDB, {new: true})

        resp.json({
        ok:true,
        usuario
        })  

        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const eliminarUsuario = async(req, resp = response)=> {
    const uid = req.params.id

    try {

        const UsuarioDB = await Usuario.findById(uid)
        
        if(!UsuarioDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe una Usuario con ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Usuario eliminado'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg:'Error inesperado... reivsar logs'
            })      
    }
    
    
}

module.exports = {getUsuario, newUsuario, actualizarUsuario, eliminarUsuario, EliminarCooperativaUser}