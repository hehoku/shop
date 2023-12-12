'use client'

import { ShoppingCart } from '@/lib/db/cart'
import { formatPrice } from '@/lib/format'
import Link from 'next/link'
import { FiShoppingCart } from 'react-icons/fi'

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null
}
export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropdown() {
    if (document.activeElement) {
      const elem = document.activeElement as HTMLElement
      if (elem) {
        elem.blur()
      }
    }
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost m-1">
        <div className="indicator">
          <FiShoppingCart size={24} />
          <span className="badge indicator-item badge-sm">
            {cart?.size || 0}
          </span>
        </div>
      </div>
      <div className="card dropdown-content card-compact z-30 mt-3 w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0}Items</span>
          <span className="text-gray-400">
            Subtotal: {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className="card-action">
            <Link
              className="btn btn-primary btn-block"
              href="/cart"
              onClick={closeDropdown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
