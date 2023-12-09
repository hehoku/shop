import ProductCard from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
  })
  return (
    <div className="flex flex-col gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
