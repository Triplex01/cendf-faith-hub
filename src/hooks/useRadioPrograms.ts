import { useQuery } from '@apollo/client/react';
import { GET_RADIO_PROGRAMS } from '@/graphql/queries';
import type { GetRadioProgramsResponse, RadioProgram } from '@/graphql/types';

interface UseRadioProgramsOptions {
  first?: number;
  skip?: boolean;
}

interface UseRadioProgramsResult {
  programs: RadioProgram[];
  loading: boolean;
  error: Error | undefined;
  hasNextPage: boolean;
  endCursor: string | null;
  loadMore: () => void;
  refetch: () => void;
}

/**
 * Hook personnalisé pour récupérer les programmes radio
 */
export const useRadioPrograms = (options: UseRadioProgramsOptions = {}): UseRadioProgramsResult => {
  const { first = 10, skip = false } = options;

  const { data, loading, error, fetchMore, refetch } = useQuery<GetRadioProgramsResponse>(GET_RADIO_PROGRAMS, {
    variables: { first },
    skip,
  });

  const programs = data?.radioPrograms?.nodes || [];
  const pageInfo = data?.radioPrograms?.pageInfo;

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
    programs,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage || false,
    endCursor: pageInfo?.endCursor || null,
    loadMore,
    refetch,
  };
};
