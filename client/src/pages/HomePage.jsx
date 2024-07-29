import React from 'react'
import NavBar from '../components/NavBar'
import Slide from '../components/Slide'
import Categories from '../components/Categories'
import Listings from '../components/Listings'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
    <NavBar />
    <Slide />
    <Categories />
    <Listings />
    <Footer />
    </>
  )
}

export default HomePage