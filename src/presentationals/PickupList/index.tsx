import React, { useRef } from 'react';
import pickupPostContainer from '../../containers/pickupPostContainer'

// コンポーネントの内部で利用する型
type PostItem = {
  id: number;
  title: string;
  body: string;
}

const PostItem: React.FC<PostItem> = (data: PostItem) => (
  <div>
    <h3>{data.id}: {data.title}</h3>
    <p>{data.body}</p>
  </div>
);

const PickupList: React.FC = () => {
  // ContainerからStateと関数を取得
  const { state, functions } = pickupPostContainer();

  const inputEl = useRef<HTMLInputElement>(null);
  const handleOnClick = () => {
    if(inputEl.current) {
      functions.reload(inputEl.current.valueAsNumber);
    }
  };

  return (
    <div>
      <h1>Pickup List</h1>
      <h2>Reload Form</h2>
      <input type="number" ref={inputEl} defaultValue={`1`} />
      <button type="button" onClick={handleOnClick}>reload</button>

      <h2>Post Data</h2>
      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <PostItem {...state.post} />
      )}
    </div>
  )
};

export default PickupList;
