import { IGraphqlClient } from '../interface/driver';
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.graphqlplaceholder.com/'; // GraphQL as example

// BFF側が提供しているサービスに沿ってメソッドを定義する
// このソースを見れば、どんなエンドポイントが存在するか・どんなパラメータを受け付けるのかが理解できる
// この例ではgraphql-requestに依存したコードになっている

export default class graphqlClient implements IGraphqlClient {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(endpoint, { mode: 'cors' })
  }

  async fetch<T>(query: string) {
    const response: T = await this.client.request(query).catch(() => {
      throw new Error('Network response error');
    });
    return response;
  }
}
