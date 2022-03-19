import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TUsuario from 'App/Models/TUsuario'
import User from 'App/Models/User'

export default class TipoUsuariosController {
    public async VerificarExistencia({response, params, auth}: HttpContextContract){

        try{
            await User.findOrFail(params.id)

            try{
                await auth.use('api').check()
                response.status(401).json({
                    message: "USUARIO CON TOKEN VALIDA"
                })
                return true
            }
            
            catch(error){
                response.status(401).json({
                    message: "USUARIO SIN TOKEN VALIDA"
                })
                return false
            }

        }
        catch(error){
            response.status(401).json({
                message: "USUARIO NO EXISTE"
            })
        }
    }
}
