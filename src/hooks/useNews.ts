import { useQuery } from '@apollo/client/react';
import { GET_NEWS } from '@/graphql/queries';
import type { GetNewsResponse, Post } from '@/graphql/types';

interface UseNewsOptions {
  first?: number;
  skip?: boolean;
}

interface UseNewsResult {
  news: Post[];
  loading: boolean;
  error: any;
  hasNextPage: boolean;
  endCursor: string | null;
  loadMore: () => void;
  refetch: () => void;
}

/**
 * Hook personnalisé pour récupérer les actualités
 */
export const useNews = (options: UseNewsOptions = {}): UseNewsResult => {
  const { first = 10, skip = false } = options;

  const { data, loading, error, fetchMore, refetch } = useQuery<GetNewsResponse>(GET_NEWS, {
    variables: { first },
    skip,
  });

  const news = data?.posts?.nodes || [];
  const pageInfo = data?.posts?.pageInfo;

  const loadMore = () => {
    if (!pageInfo?.hasNextPage || loading) return;

    fetchMore({
      variables: {
        first,
        after: pageInfo.endCursor,
      },
    });
  };

  return {
    news,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage || false,
    endCursor: pageInfo?.endCursor || null,
    loadMore,
    refetch,
  };
};
