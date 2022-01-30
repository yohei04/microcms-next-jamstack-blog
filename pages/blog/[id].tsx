import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../libs/client';
import { BlogType } from '../../types/blog';

type BlogIdProps = {
  blog: BlogType;
};

const BlogId = ({ blog }: BlogIdProps) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div style={{'color': 'red'}}>
        {blog.categories?.map((c) => (
          <p key={c.name}>{c.name}</p>
        ))}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });

  const paths = data.contents.map((content: BlogType) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const data = await client.get({ endpoint: 'blog', contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;
