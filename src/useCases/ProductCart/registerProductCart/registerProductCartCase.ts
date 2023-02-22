import { Cart, ProductCart } from "@prisma/client"
import {client} from "../../../prisma/client"
import { PrismaCartRepository } from "../../../repository/PrismaCartRepository"
import { isProductInCartProps, PrismaProductCartRepository, RegisterProductCartProps, UpdateQuantityProps } from "../../../repository/PrismaProductCartRepository"

interface iProductCartRequest{
    productId:string,
    userId:string,
    quantity: number
}

class RegisterProductCartCase{

    async execute({productId, userId,quantity}: iProductCartRequest){
 
        // Importar repositorios necessarios
            const cartRepo          = new PrismaCartRepository(client)
            const productCartRepo   = new PrismaProductCartRepository(client)
        //

        // Procura carrinho
            const cartAlreadyExists : Cart = await cartRepo.getByUserId(userId)
        //
 
         // Se ja houver um carrinho registra o produto
            if(cartAlreadyExists){
            // Valida se o produto ja nao esta no carrinho 
            const reqGetById : isProductInCartProps = {
                productId,
                cartId: cartAlreadyExists?.id
            }
            const productAlreadyInCart : ProductCart = await productCartRepo.isProductInCart(reqGetById)
            //
                
            // Se ja existir esse produto no carrinho adiciona mais unidades
                if (productAlreadyInCart) {
                    const reqRegisterProduct : UpdateQuantityProps = {
                        productCart: productAlreadyInCart,
                    quantity
                }
                await productCartRepo.updateQuantity(reqRegisterProduct)
                return cartAlreadyExists;
                }
            //
                const inputProductCart : RegisterProductCartProps = {
                    productId,
                    quantity,
                    cartId: cartAlreadyExists.id
                }
                await productCartRepo.register(inputProductCart)
                return cartAlreadyExists 
            }
        //
 
        // Cria novo carrinho
            const newCart : Cart = await cartRepo.register(userId)
        //
            
        // Registra productCart no novo carrinho 
            const inputProductCart : RegisterProductCartProps = {
                productId,
                quantity,
                cartId: newCart.id
            }
            const updateCart = await productCartRepo.register(inputProductCart)
            console.log(updateCart)
        //

        /* const newCartUpdated : Cart = await cartRepo.getByUserId(userId) */
    
        return newCart 
    }
}

export {RegisterProductCartCase}