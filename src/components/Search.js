import React, { useContext } from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'
import { GithubContext } from '../context/context'

const Search = () => {
  const { requests, error, searchGithubUser, loading } =
    useContext(GithubContext)
  // console.log(requests)
  const [user, setUser] = React.useState('')
  //get things from global context
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target)
    // console.log(user)
    if (user) {
      searchGithubUser(user)
    }
  }
  // if the input we typed is not empty then we run the searhGithubUser fn that is in the context and pass in the user that we typed

  return (
    <section className="section">
      <Wrapper className="section-center">
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <MdSearch></MdSearch>
            <input
              className="input-txt"
              type="text"
              placeholder="enter github user"
              value={user}
              onChange={(e) => {
                // console.log(e.target)
                // console.log(e.target.value)
                return setUser(e.target.value)
              }}
              // the onchange is setting user to e.target.value which will be what we type
              // so now the user is set to what we typed
              // then we click the submit so onSubmit is triggered which is handle submit
            />
            {requests > 0 &&
              !loading &&(
                <button className="btn" type="submit">
                  Search
                </button>
              )}
          </div>
        </form>
        <h4>requests : {requests}/60</h4>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }
    .input-txt::placeholder {
      color: var(--clr-grey-5);
      opacity: 0.5;
    }
    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h4 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`
export default Search
