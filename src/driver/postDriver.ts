const endpoint = 'https://jsonplaceholder.typicode.com'; // REST API as example

// BFF側が提供しているサービスに沿ってメソッドを定義する
// このソースを見れば、どんなエンドポイントが存在するか・どんなパラメータを受け付けるのかが理解できる

export default class postDriver {
  async getPosts(id: number): Promise<any> {
    const response = await fetch(`${endpoint}/posts/${id}`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      // Status code error
      throw new Error('Network response error');
    }
  }

  async getPostsAll(): Promise<any> {
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
