import React, { useContext } from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'
import loadingImage from '../images/giphyloading1.gif'
import { GithubContext } from '../context/context'
const Dashboard = () => {
  const { loading } = useContext(GithubContext)

  if (loading) {
    return (
      <main>
        <Navbar></Navbar>
        <Search></Search>
        <img src={loadingImage} className="loading-img" alt="Loading..." />
      </main>
    )
  }
  return (
    <main>
      <h4>this is for testing branch</h4>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  )
}

export default Dashboard
