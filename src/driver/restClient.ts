const endpoint = 'https://jsonplaceholder.typicode.com'; // REST API as example

// BFF側が提供しているサービスに沿ってメソッドを定義する
// このソースを見れば、どんなエンドポイントが存在するか・どんなパラメータを受け付けるのかが理解できる

// APIから受け取る型
export interface Post {
  userId: number;
  id: number
  title: string;
  body: string;
}

export default class postDriver {
  async getPosts(id: number): Promise<Post> {
    const response = await fetch(`${endpoint}/posts/${id}`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      // Status code error
      throw new Error('Network response error');
    }
  }

  async getPostsAll(): Promise<Post[]> {
    const response = await fetch(`${endpoint}/posts`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      // Status code error
      throw new Error('Network response error');
    }
  }
}
