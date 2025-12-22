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
  refetch: () => void;
}

/**
 * Hook personnalisé pour récupérer les programmes radio
 */
export const useRadioPrograms = (options: UseRadioProgramsOptions = {}): UseRadioProgramsResult => {
  const { first = 10, skip = false } = options;

  const { data, loading, error, refetch } = useQuery<GetRadioProgramsResponse>(GET_RADIO_PROGRAMS, {
    variables: { first },
    skip,
  });

  const programs = data?.radioPrograms?.nodes || [];

  return {
    programs,
    loading,
    error,
    refetch,
  };
};
