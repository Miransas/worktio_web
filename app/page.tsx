import React from 'react'
import ScrollHorizontal from '../components/hero/cta'
import Navbar from '../components/shared/header'
import WorktioHero from '../components/hero/hero'
import Scena from '../components/hero/EcosystemSection'
import EcosystemSection from '../components/hero/EcosystemSection'

const page = () => {
  return (
    <div>
      <EcosystemSection/>
      <Navbar/>
      {/* <WorktioHero/> */}
      <ScrollHorizontal/>     
    </div>
  )
}

export default page