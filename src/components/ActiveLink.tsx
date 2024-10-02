'use client'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  activeClassName: string
  children: React.ReactNode
} & LinkProps

export default function ActiveLink({
  activeClassName,
  children,
  ...props
}: Props) {
  const path = usePathname()

  const className = path === props.href || path === props.as ? activeClassName : ''

  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  )
}
