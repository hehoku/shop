'use client'

import { useState, useTransition } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { incrementProductQuantity } from './actions'

interface AddToCartButtonProps {
  productId: string
  incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isPending, startTransaction] = useTransition()
  const [success, setSuccess] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false)
          startTransaction(async () => {
            await incrementProductQuantity(productId)
            setSuccess(true)
          })
        }}
      >
        Add To Cart
        <FiShoppingCart />
      </button>
      {isPending && <span className="loading loading-spinner">Adding...</span>}
      {!isPending && success && <span className="text-success">Added!</span>}
    </div>
  )
}
