import authOptions from '@/app/api/auth/[...nextauth]/options'
import { getCart } from '@/lib/db/cart'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ShoppingCartButton from './ShoppingCartButton'
import UserMenuButton from './UserMenuButton'

async function searchProduct(formData: FormData) {
  'use server'

  const searchQuery = formData.get('searchQuery')?.toString()

  if (searchQuery) {
    redirect('/search?query=' + searchQuery)
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const cart = await getCart()

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            🛒 Shop
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProduct}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  )
}
