// アプリに必要なリソースを手に入れるためのメソッドが並ぶ
// リクエストに必要なパラメータ等はここで付与することができる

export default class postUsecase {
  private client: any;

  constructor(client: any) {
    this.client = client;
  }

  async getPosts(id: number): Promise<any> {
    return await this.client.getPosts(id);
  }

  async getPostsList(): Promise<any> {
    return await this.client.getPostsAll();
  }
}
