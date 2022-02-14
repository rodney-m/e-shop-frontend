// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {Product} from '@bluebits/products'
export interface OrderItem{
    product?: Product,
    quantity?: number
    price?: number
}