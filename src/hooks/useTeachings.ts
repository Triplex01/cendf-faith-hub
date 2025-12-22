import { useQuery } from '@apollo/client/react';
import { GET_TEACHINGS } from '@/graphql/queries';
import type { GetTeachingsResponse, Teaching } from '@/graphql/types';

interface UseTeachingsOptions {
  first?: number;
  skip?: boolean;
}

interface UseTeachingsResult {
  teachings: Teaching[];
  loading: boolean;
  error: Error | undefined;
  hasNextPage: boolean;
  endCursor: string | null;
  loadMore: () => void;
  refetch: () => void;
}

/**
 * Hook personnalisé pour récupérer les enseignements
 */
export const useTeachings = (options: UseTeachingsOptions = {}): UseTeachingsResult => {
  const { first = 10, skip = false } = options;

  const { data, loading, error, fetchMore, refetch } = useQuery<GetTeachingsResponse>(GET_TEACHINGS, {
    variables: { first },
    skip,
  });

  const teachings = data?.teachings?.nodes || [];
  const pageInfo = data?.teachings?.pageInfo;

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
    teachings,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage || false,
    endCursor: pageInfo?.endCursor || null,
    loadMore,
    refetch,
  };
};
