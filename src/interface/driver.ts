// 依存関係整理のために利用するDriverの抽象クラス
export abstract class IRestClient<T> {
  abstract async getPosts(id: number): Promise<T>
  abstract async getPostsAll(): Promise<T[]>
}

export abstract class IGraphqlClient<T> {
  abstract async getPosts(query: string): Promise<T>
  abstract async getPostsAll(query: string): Promise<T[]>
}
