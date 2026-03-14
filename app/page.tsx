import React from 'react'
import ScrollHorizontal from '../components/hero/cta'
import Navbar from '../components/shared/header'

import EcosystemSection from '../components/hero/EcosystemSection'
import LoginButton from '../components/auth/login-button'
import Footer from '../components/shared/footer'

const page = () => {
  return (
    <div>
      <EcosystemSection />
      <Navbar />
      <div>
        <LoginButton />
      </div>
      {/* <WorktioHero/> */}
      <ScrollHorizontal />
      <Footer />
    </div>
  )
}

export default page