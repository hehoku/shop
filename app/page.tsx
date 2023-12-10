import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
  })

  return (
    <div className="flex flex-col gap-10">
      <div className="hero rounded-md bg-base-200">
        <div className="hero-content flex flex-row text-center md:flex-col">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={500}
            height={500}
            className="w-full max-w-sm rounded-lg object-cover shadow-2xl"
          />
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link href={`/products/${products[0].id}`}>
              <button className="btn btn-primary">CHECKOUT IT OUT</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {products.map((product) => (
          <div
            className="w-full rounded-2xl bg-base-200 md:w-1/3"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
