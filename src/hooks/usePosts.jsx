import { useCallback, useRef, useState, useEffect } from 'react';
import { getPosts } from '../api/post';
const usePosts = (uid) => {
  const [data, setData] = useState();
  const isLoadingRef = useRef(false);
  const lastRef = useRef(null);
  const [refetching, setRefetching] = useState(false);

  const getList = useCallback(async () => {
    if(!isLoadingRef.current) {
      isLoadingRef.current = true;
      const {list, last} = await getPosts({
        after: lastRef.current,
        uid
      });
      if(list.length > 0) {
        setData((prev) => (lastRef.current ? [...prev, ...list] : list))
        lastRef.current = last;
      }
      isLoadingRef.current = false;
    }
  }, []);

  const refetch = async () => {
    setRefetching(true);
    lastRef.current = null;
    await getList();
    setRefetching(false)
  }

  useEffect(() => {
      getList();
  }, [getList]);

  // 걍 알아보기 쉽게 바꿈
  const fetchNextPage = () => {
    getList()
  }
  const deletePost = ({id}) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  }
  const updatePost = (post) => {
    setData((prev) => 
      prev.map((item) => (item.id === post.id ? post : item))
    )
  }
  return {data, fetchNextPage, refetching, refetch, deletePost, updatePost};
};
export default usePosts;


