import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import PriceTag from './PriceTag'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

  return (
    <Link
      href={'/products/' + product.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p className="">
          {' '}
          {product.description.length > 100
            ? product.description.substring(0, 100) + '...'
            : product.description}
        </p>
        <PriceTag price={product.price} className="badge-primary" />
      </div>
    </Link>
  )
}
