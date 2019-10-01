import { useState, useEffect } from 'react';
import postUsecase from '../usecase/postUsecase';
import graphqlClient from '../adapter/graphqlClient';

type Post = {
  id: number;
  title: string;
  body: string;
};

// UIへ渡すオブジェクト
interface PickupPostContainer {
  state: {
    post: Post;
    loading: boolean;
  },
  functions: {
    reload: (id: number) => Promise<void>;
  }
}

const initialState: Post = {
  id: 0,
  title: 'No Title',
  body: 'No Body'
};

// UIの構築に必要なオブジェクトを取得して提供する
// この例では「ピックアップ投稿」を表示するために、postデータを手に入れるユースケースを利用する
export default (): PickupPostContainer => {

  // Stateの生成
  const [post, updatePost] = useState(initialState);
  const [loading, updateLoading] = useState(false);

  // 処理は自由に分割してもよい
  const getPostsByID = async (id: number): Promise<void> => {
    updateLoading(true);
    const adapter = new graphqlClient();
    const usecase = new postUsecase(adapter);

    // 状況に応じたエラーハンドリング
    const res = await usecase.getPosts(id).catch(() => initialState);

    updatePost({
      id: res.id,
      title: res.title,
      body: res.body,
    });
    updateLoading(false);
  };

  // 副作用はuseEffectなどを利用する
  useEffect(() => {
    // initial load
    (async () => await getPostsByID(1))()
  }, [])

  // 外部からStateを操作するための関数
  const reload = async (id: number): Promise<void> => await getPostsByID(id);

  // Stateと操作用の関数をexportする
  return {
    state: {
      post,
      loading,
    },
    functions: {
      reload
    }
  }
}
