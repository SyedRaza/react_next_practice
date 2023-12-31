import Head from 'next/head'
import Layout from "../../components/Layout"
import List from "../../components/List"
import { handler } from "../api";

function Posts(props) {
  // Render post...
  return (
    <Layout>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List {...props}/>
    </Layout>);
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const results = await handler(`https://api.nytimes.com/svc/news/v3/content/section-list.json?`)
  return {
    paths: results.map(result => {
        return { params : { section : result.section }}
    }),
    fallback: false
  };
}


// This also gets called at build time
export async function getStaticProps({ params }) {

  // Pass post data to the page via props
  const results = await handler(`https://api.nytimes.com/svc/news/v3/content/nyt/${params.section}.json?`)
  return {
    props: {
      results,
      title:  params.section
    }
  }
}

export default Posts;
