import { useState, useEffect } from 'react';
import postUsecase from '../usecase/postUsecase';
import postDriver from '../driver/postDriver';

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
    const driver = new postDriver();
    const usecase = new postUsecase(driver);
    const res = await usecase.getPosts(id);
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

  const reload = async (id: number) => await getPostsByID(id);

  // Stateと更新用の関数などをexportする
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
