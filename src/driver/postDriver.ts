const endpoint = 'https://jsonplaceholder.typicode.com'; // REST API as example

export default class postDriver {
  async getPosts(id: number | string = ''): Promise<any> {
    const response = await fetch(`${endpoint}/posts/${id}`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      // Status code error
      throw new Error('Network response error');
    }
  }
}
