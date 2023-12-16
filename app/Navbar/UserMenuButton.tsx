'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'

interface UserMenuButtonProps {
  session: Session | null
}
export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {user?.image ? (
          <Image
            alt="user image"
            src={user.image}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <FiUser />
        )}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: '/' })}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  )
}
