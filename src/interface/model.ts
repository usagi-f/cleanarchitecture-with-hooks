// アプリ上に登場するドメインモデルに沿った型定義
// APIと実際にやりとりする形

export interface Post {
  userId: number;
  id: number
  title: string;
  body: string;
}
