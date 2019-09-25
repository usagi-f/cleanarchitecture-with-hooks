import { Post } from '../interface/model';
import { IGraphqlClient } from '../interface/driver';

// アプリに必要なリソースを手に入れるためのメソッドが並ぶ
// リクエストに必要なパラメータ等はここで付与することができる

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
    return response.post
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
    return response.posts
  }
}
