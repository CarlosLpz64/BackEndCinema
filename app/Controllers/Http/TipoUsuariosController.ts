import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import TUsuario from 'App/Models/TUsuario'
import User from 'App/Models/User'

export default class TipoUsuariosController {

    public async VerificarExistencia({response, params, auth}: HttpContextContract){
        try{
            await User.findOrFail(params.id)

            await auth.use('api').check()
            response.status(200).json({
                message: "USUARIO EXISTE",
                data: true
            })
        }
        catch(error){
            response.status(400).json({
                message: "USUARIO NO EXISTE",
                data: false
            })
        }
    }

    public async VerificarPermiso({response, params}: HttpContextContract){

                 /* EL 1 ES ADMINISTRADOR - EL O ES EMPLEADO GENERAL */

        try{
            const tusu = await TUsuario.findOrFail(params.id)

            if(tusu.puesto == 1){
                response.status(200).json({
                    message: "ES ADMINISTRADOR",
                    data: true
                })
            }

            else{
                response.status(200).json({
                    message: "NO ES ADMINISTRADOR",
                    data: false
                })
            }
        }
        catch(error){
            response.status(401)
        }
    }

    public async InsertarTipo({request, response}: HttpContextContract){
        try{
            const tusuSchema = schema.create({
                puesto: schema.number([rules.required()]),
                user_id: schema.number([rules.required()])
            })
    
            const tusu = await request.validate({schema: tusuSchema})
            TUsuario.create(tusu)
    
            response.status(200).json({
                menssage: "Se inserto correctamente"
            })
        }
        catch(error){
            response.status(400).json({
                menssage: "NO inserto correctamente"
            })
        }
    }

    public async Index({response}: HttpContextContract){
        const tpusu = await TUsuario.query().preload('User')

        response.status(200).json({
            data: tpusu
        })
    }
}
