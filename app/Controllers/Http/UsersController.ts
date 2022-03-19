// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import {schema, rules} from '@ioc:Adonis/Core/Validator'


export default class UsersController {

    public async login({auth, request, response}){
        const email = request.input('email')
        const password = request.input('password')

        try{
            const token = await auth.use('api').attempt(email, password)
            //return token.id;
            return token; 
            
        }catch{
            return response.badRequest('Error al iniciar')
        }
    }

    public async logout({auth}){
        await auth.use('api').revoke()
        return true;
    }
    
    public async signup({request, response}){

        const UsersSchema = schema.create({
            email: schema.string(
                {trim: true},
                [rules.email(), rules.required(), rules.unique({table: 'users', column: 'email'})]
            ),
            password: schema.string(
                {trim: true},
                [rules.required()]
            ),
            username: schema.string(
                {trim: true},
                [rules.required(), rules.unique({table: 'users', column: 'username'})]
            ),
            age: schema.number(
                [rules.required()]
            ),
            curp: schema.string(
                {trim: true},
                [rules.required(), rules.unique({table: 'users', column: 'curp'})]
            )
        })

        const myUser: any = await request.validate({schema: UsersSchema})
        await User.create(myUser)

        return response.created(myUser)
    }

    public async index({response}){
        const user = await User.all();
        return response.ok(user);
    }

    public async deleteUser({response, params}){
        const user = await User.findOrFail(params.id)
        await user.delete()
        return response.ok(user);
    }

    public async updateUser({response,request, params}){
        const {curp, age, username} = request.all();
        const user = await User.findOrFail(params.id)
        user.curp = curp;
        user.age = age;
        user.username = username;
        await user.save()
        return response.ok(user);
    }

    public async verificarToken({auth}){
        var logged;
        var admin;
        //Manejar modelo que devuelva permiso general y permiso de admin
        try{
            await auth.use('api').authenticate()
            //return response.ok(true);
            logged = true;
            admin = true;
        } catch{
            //return response.forbidden(false);
            logged = false;
            admin = true;
        }
        const respuesta ={
            "logged": logged,
            "admin": admin
        }
        return respuesta;
    }

    /*
    RESPONSES:
    return response.forbidden(false); 403
    return response.ok(true);
    return response.created(myUser) 201
    return response.badRequest('Error al iniciar')
    */

}

