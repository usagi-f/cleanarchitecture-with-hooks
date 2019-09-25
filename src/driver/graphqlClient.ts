import { Post } from '../interface/model';
import { IGraphqlClient } from '../interface/driver';
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.graphqlplaceholder.com/'; // GraphQL as example

// BFF側が提供しているサービスに沿ってメソッドを定義する
// このソースを見れば、どんなエンドポイントが存在するか・どんなパラメータを受け付けるのかが理解できる

export default class restClient implements IGraphqlClient<Post> {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(endpoint, { mode: 'cors' })
  }

  async getPosts(query: string): Promise<Post> {
    const response = await this.client.request(query);
    if (response.post) {
      return response.post;
    } else {
      throw new Error('Network response error');
    }
  }

  async getPostsAll(query: string): Promise<Post[]> {
    const response = await this.client.request(query);
    if (response.posts) {
      return response.posts;
    } else {
      throw new Error('Network response error');
    }
  }
}
