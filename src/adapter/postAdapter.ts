import { useState, useEffect } from 'react';
import postUsecase from '../usecase/postUsecase';
import restClient from '../driver/restClient';

const initialState = {
  id: 0,
  title: 'No Title',
  body: 'No Body'
};

export default () => {
  // Stateの生成
  const [post, updatePost] = useState(initialState);
  const [loading, updateLoading] = useState(false);

  // 処理は自由に分割してもよい
  const getPostsByID = async (id: number) => {
    updateLoading(true);
    const driver = new restClient();
    const usecase = new postUsecase(driver);

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
  const reload = async (id: number) => await getPostsByID(id);

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
