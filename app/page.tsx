import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import Link from 'next/link'

interface HomeProps {
  searchParams: { page: string }
}

export default async function Home({
  searchParams: { page = '1' },
}: HomeProps) {
  const currentPage = parseInt(page)

  const pageSize = 6
  const heroItemCount = 1

  const totalItemCount = await prisma.product.count()

  const totalPage = Math.ceil((totalItemCount - heroItemCount) / pageSize)

  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  })

  return (
    <div className="flex flex-col items-center gap-10">
      {currentPage === 1 && (
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
      )}

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPage > 1 && (
        <PaginationBar currentPage={currentPage} totalPage={totalPage} />
      )}
    </div>
  )
}
