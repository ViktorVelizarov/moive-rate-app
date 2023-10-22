import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
  <>
    <MaxWidthWrapper>
      <h1>Dashboard</h1>
      <Button>
        <Link href="/dashboard/EditProfile">
          <p>Edit profile</p>
        </Link>
      </Button>
    </MaxWidthWrapper>
  </>
  )
}
