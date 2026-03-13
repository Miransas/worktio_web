import React from 'react'

const DashbaordLaayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
    {children}
    </div>
  )
}

export default DashbaordLaayout