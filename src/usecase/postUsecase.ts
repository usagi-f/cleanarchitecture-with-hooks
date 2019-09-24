import postDriver, { Post } from '../driver/restClient'

// アプリに必要なリソースを手に入れるためのメソッドが並ぶ
// リクエストに必要なパラメータ等はここで付与することができる

export default class postUsecase {
  private client: postDriver;

  constructor(client: postDriver) {
    this.client = client;
  }

  async getPosts(id: number): Promise<Post> {
    return await this.client.getPosts(id);
  }

  async getPostsList(): Promise<Post[]> {
    return await this.client.getPostsAll();
  }
}
