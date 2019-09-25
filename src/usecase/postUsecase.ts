import { Post } from '../interface/model';
import { IGraphqlClient } from '../interface/driver';

// アプリに必要なリソースを手に入れるためのメソッドが並ぶ
// リクエストに必要なパラメータ等はここで付与することができる

export default class postUsecase {
  private client: IGraphqlClient<Post>;

  constructor(client: IGraphqlClient<Post>) {
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
    return await this.client.getPosts(query);
  }

  async getPostsList(): Promise<Post[]> {
    const query = `{
      posts {
        id
        title
        body
      }
    }`;
    return await this.client.getPostsAll(query);
  }
}
