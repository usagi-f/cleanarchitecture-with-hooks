export default class postUsecase {
  private client: any;

  constructor(client: any) {
    this.client = client;
  }

  async getPosts(id: number): Promise<any> {
    return await this.client.getPosts(id);
  }

  async getPostsAll(): Promise<any> {
    return await this.client.getPosts();
  }
}
