import { Request, Response } from "express"
import { RegisterProductCase } from "./registerProductCase"

class RegisterProductController{
    async handle(req: Request, resp: Response){
        const {price ,name,productImage,brand,brandImage,description} = req.body

        const registerProductCase = new RegisterProductCase()

        const product = await registerProductCase.execute({
            price,
            name,
            productImage,
            brand,
            brandImage,
            description
        })
        return resp.json(product)
    }
}

export {RegisterProductController}