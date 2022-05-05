import type { NextPage } from 'next'
import Head from 'next/head'
import { allPages, Page } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Counter } from '../components/counter';

export async function getStaticProps({ params: { slug = [] } }) {
  const pagePath = '/' + slug.join('/');

  // TODO get list of path + title for sidebar

  return {
    props: {
      page: allPages.find((p) => p.url === pagePath),
    }
  }
}

export async function getStaticPaths() {
  const paths = allPages.map((p) => p.url);
  
  return { paths, fallback: false  };
}

const Home: NextPage<{ page: Page }> = ({ page }) => {
  const MdxBody = useMDXComponent(page.body.code);

  return (
    <div>
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MdxBody components={{ Counter }} />
      </main>

      <aside>
        <ul>
          {allPages.map((page) => (
            <a key={page._id} href={`/${page._raw.flattenedPath}`}>{page.title}</a>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default Home
