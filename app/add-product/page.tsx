import FormSubmitButton from '@/components/FormSubmitButton'
import { prisma } from '@/lib/db/prisma'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Add Product - Shop',
}

async function addProduct(formData: FormData) {
  'use server'

  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const imageUrl = formData.get('imageUrl')?.toString()
  const price = Number(formData.get('price') || 0)

  if (!name || !description || !imageUrl || !price) {
    throw new Error('Missing required fields')
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  })

  redirect('/')
}

export default function AddProductPage() {
  return (
    <div className="mb-3 text-lg font-bold">
      <h1>Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
          type="text"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image Url"
          className="input input-bordered mb-3 w-full"
          type="url"
        />
        <input
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
          type="text"
        />
        <FormSubmitButton className="btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  )
}
