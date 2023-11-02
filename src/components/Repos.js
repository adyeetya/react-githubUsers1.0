import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  // console.log(repos)

  // reduce has two parameters 1 - callbackfn, 2 - initial value
  // here the initial value is {} an empty obj on with the cbfn is initialised
  // then the cbfn has two arguments 1 - prev value 2 - curnt item
  // we are calling the prev value total which initially is an empty obj
  // all the prev operations gets added onto the total obj
  // so when we find the first lang on the item we check if its null if its notnull
  // we check if it already exists in the total(total is and obj which has objects with two props
  // that are label and value) if that total[language] already exists then we  update its value prop
  // total[languages] creates anobj with the language properties {CSS:{label:,value:},HTML:{},Javascript:{}} like this
  let languages = repos.reduce((total, item) => {
    // console.log(item)
    // console.log(total)
    const { language, stargazers_count } = item
    // console.log(total)
    if (!language) {
      return total
    }
    // console.log(language)
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      // total[language].value = total[language].value + 1
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    // console.log(total)
    return total
  }, {})
  // console.log(languages)
  // languages was an object of objects so we convert it to array of objects by using Object.values method
  // then we sort the values of the languages in descending order so that we display the popular lang first
  //.sort((a, b) => { return b.value - a.value }):
  // The sort() method arranges the elements of the array in ascending or descending
  // order. In this case, it sorts the array in descending order, which means the
  // elements with higher values will appear first. The comparison
  // function (a, b) => { return b.value - a.value } is used to compare
  // the values of two elements a and b. Here, it subtracts the value property
  // of a from the value property of b. If the result is a negative number, a
  // comes before b in the sorted array; if it's positive, b comes before a;
  // and if it's 0, their order remains unchanged.
  // then use the slice(startidx, endid) to slice the languages so we only display top 5 langs
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)
  // console.log(languages);

  // most stars per lang
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  // most popular and most forked
  let { stars, forks } = repos.reduce(
    (total, item) => {
      //total is an obj it has 2 objs inside stars and forks that we are deconstructing

      const { stargazers_count, name, forks } = item
      // we are creating a new obj inside stars with the prop/name stargazers_count and this obj has
      // two props label and values
      //the starcount is a prop in the star obj
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = { label: name, value: forks }
      return total
    },
    { stars: {}, forks: {} }
  )
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()
  // console.log(forks)

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} /> */}
        {/* we are passing the languages list of objects which is similar to the chartdata 
        it has the label and value properties  */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
