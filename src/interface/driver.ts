// 依存関係整理のために利用するDriverの抽象クラス
export abstract class IRestClient<T> {
  abstract async getPosts(id: number): Promise<T>
  abstract async getPostsAll(): Promise<T[]>
}

export abstract class IGraphqlClient {
  abstract async fetch<T>(query: string): Promise<T>
}
