import { useState, useEffect } from 'react';
import postUsecase from '../usecase/postUsecase';
import postDriver from '../driver/postDriver';

const initialState = {
  id: 0,
  title: 'No Title',
  body: 'No Body'
};

export default () => {
  const [post, updatePost] = useState(initialState);
  const [loading, updateLoading] = useState(false);

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

  useEffect(() => {
    // initial load
    (async () => await getPostsByID(1))()
  }, [])

  const reload = async (id: number) => await getPostsByID(id);

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
