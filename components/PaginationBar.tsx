import Link from 'next/link'

interface PaginationBarProps {
  currentPage: number
  totalPage: number
}

export default function PaginationBar({
  currentPage,
  totalPage,
}: PaginationBarProps) {
  const numberedPageItems: JSX.Element[] = []

  const maxPage = Math.min(totalPage, Math.max(currentPage + 4, 10))
  const minPage = Math.max(1, Math.min(currentPage - 5, totalPage - 9))
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={'?page=' + page}
        key={page}
        className={`btn join-item ${
          currentPage === page ? 'btn-active pointer-events-none' : ''
        }`}
      >
        {page}
      </Link>,
    )
  }
  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={'?page=' + (currentPage - 1)} className="btn join-item">
            «
          </Link>
        )}
        <button className="btn join-item pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPage && (
          <Link href={'?page=' + (currentPage + 1)} className="btn join-item">
            »
          </Link>
        )}
      </div>
    </>
  )
}
