import React, { useRef } from 'react';
import postAdapter from '../../adapter/postAdapter'

interface PostItem {
  id: number;
  title: string;
  body: string;
}

const PostItem = (data: PostItem) => (
  <div>
    <p>ID: {data.id}</p>
    <h1>{data.title}</h1>
    <p>{data.body}</p>
  </div>
);


const Post: React.FC = () => {
  // AdapterからStateと関数を取得
  const { state, functions } = postAdapter();

  const inputEl = useRef<HTMLInputElement>(null);
  const handleOnClick = () => {
    if(inputEl.current) {
      functions.reload(inputEl.current.valueAsNumber);
    }
  };

  return (
    <div>
      <input type="number" ref={inputEl} defaultValue={`1`} />
      <button type="button" onClick={handleOnClick}>reload</button>
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        <PostItem {...state.post} />
      )}
    </div>
  )
};

export default Post;
