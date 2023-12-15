import { getCart } from '@/lib/db/cart'
import { formatPrice } from '@/lib/format'
import CartEntry from './CartEntry'
import { setProductQuantity } from './actions'

export const metadata = {
  title: 'Your Cart - Shop',
}

export default async function CartPage() {
  const cart = await getCart()
  return (
    <div className="flex flex-col gap-8">
      <h1 className="mb-6 text-3xl">Shopping Cart</h1>
      {cart?.items.map((item) => (
        <CartEntry
          setProductQuantity={setProductQuantity}
          key={item.id}
          cartItem={item}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  )
}
