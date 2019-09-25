import { Post } from '../interface/model';
import { IGraphqlClient } from '../interface/driver';

// アプリに必要なリソースを手に入れるためのメソッドが並ぶ
// リクエストに必要なクエリやパラメータ等はここで扱う

export default class postUsecase {
  private client: IGraphqlClient;

  constructor(client: IGraphqlClient) {
    this.client = client;
  }

  async getPosts(id: number): Promise<Post> {
    const query = `{
      post(postId: ${id}) {
        id
        title
        body
      }
    }`;
    const response = await this.client.fetch<{ post: Post }>(query);
    return Promise.resolve(response.post)
  }

  async getPostsList(): Promise<Post[]> {
    const query = `{
      posts {
        id
        title
        body
      }
    }`;
    const response = await this.client.fetch<{ posts: Post[] }>(query);
    return Promise.resolve(response.posts)
  }
}
