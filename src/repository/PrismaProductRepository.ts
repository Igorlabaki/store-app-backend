import { PrismaClient,Product } from "@prisma/client";

export interface IProductRequest {
  name: string;
  price:  string;
  brand: string;
  brandImage: string;
  productImage: string;
  description: string;
}

export interface IUpdateProductNameRequest {
  id: string,
  name: string
}

export interface IUserRepository {
  register:(client:IProductRequest) => Promise<Product>
  getById:(reference: string) => Promise<Product>
  delete:(reference: string) => Promise<Product>
  getByName:(reference: string) => Promise<Product>
  list:() => Promise<Product[]>
}

export class PrismaProductRepository implements IUserRepository {

  constructor (private readonly prisma: PrismaClient){}

  async register ({brand,brandImage,description,name,price,productImage}: IProductRequest): Promise<Product> {
    return await this.prisma.product.create({
      data:{
        name,
        price: price.toString(),
        image:        productImage,
        brand,
        brandImage,
        description
      },
      include:{
        ProductCart:{
          include:{
            cart: true
          }
        }
      }
  })
  }

  async getById (reference: string): Promise<Product> {
     return await this.prisma.product.findUnique({
      where:{
        id: reference
      },
      include:{
        ProductCart:{
          include:{
            cart: true
          }
        }
      }
    })
  }

  async getByName (reference: string): Promise<Product> {
    return await this.prisma.product.findUnique({
      where:{
        name: reference
      },
      include:{
        ProductCart:{
          include:{
            cart: true
          }
        }
      }
    })
 }

 async delete (reference: string): Promise<Product> {
  console.log(reference)
  return await this.prisma.product.delete({
    where:{
      id: reference
    }
  })
}

/* async updateName (reference: IUpdateProductNameRequest): Promise<Product> {
  return await this.prisma.product.update({
   where:{
    id: reference.id
   },
   data:{
    name: reference.name
   },
   include:{
    ProductCart:{
      include:{
        cart: true
      }
    }
  }
 })
} */


  async list (): Promise<Product[]> {
    return await this.prisma.product.findMany()
  }
  
}