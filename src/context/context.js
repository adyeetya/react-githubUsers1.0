import React, { useState, useEffect} from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'
const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  // console.log(children)
  // children is all the elements that are wrapped inside the GithubProvider i.e. <App> component in the index.js
  //   now that component gets wrapped by GithubContext.Provider that provides all the values that are passed from here to those components here that is App
  //   so App and all the children of App have access to those values

  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  // request loading
  const [requests, setRequests] = useState(0)
  const [loading, setLoading] = useState(false)
  //error
  const [error, setError] = useState({ show: false, msg: '' })

  // searchGithubUser is run in the Search comp it gets the user from there
  //
  const searchGithubUser = async (user) => {
    //toggle error
    toggleError()
    setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    // console.log(response)
    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results
          const status = 'fulfilled'
          if (repos.status === status) {
            setRepos(repos.value.data)
            // console.log(repos)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
            // console.log(followers)
          }
        })
        .catch((err) => console.log(err))
    } else {
      toggleError(true, 'there is no user with that username')
    }
    checkRequest()
    setLoading(false)
  }

  // check rate
  const checkRequest = () => {
    // this tracks your remaining from your ip address so even if you change acc your remaining will decrease
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        // remaining = 0
        setRequests(remaining)
        if (remaining === 0) {
          //throw error
          toggleError(true, 'sorry you have exceeded your hourly rate limit!')
        }
        // console.log(remaining)
      })
      .catch((err) => console.log(err))
  }

  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }
  useEffect(checkRequest, [])
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        loading,
        error,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }

// - The GithubProvider component is a custom wrapper component that utilizes the GithubContext.Provider.
// - The value={'hello'} attribute provides the value 'hello' to all the components within the GithubContext
//  (i.e., components wrapped within the GithubContext.Provider).
// - The children prop is used to represent the nested components that will receive the shared context.
// This ensures that any components nested within the GithubProvider have access to the provided context value.
// - The GithubContext.Provider component essentially makes the value provided accessible to all the components that are descendants of it,
//  thereby enabling these components to consume and use the shared context value
