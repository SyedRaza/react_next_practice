import Layout from "../../components/Layout"
import List from "../../components/List"
import { search } from "../api"

export default function News(props) {
    return(
      <Layout>
        <List {...props} />
      </Layout>
    )
}

// to register for a new New York Times API KEY, visit :
const API_KEY = "vdvj56Ry5CrGrXBrvbBSaI8PmtonNnfy"
export async function getServerSideProps({  params }) {
  const results = await search(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params.query}&`
  )
  return { props: { results } }

}
