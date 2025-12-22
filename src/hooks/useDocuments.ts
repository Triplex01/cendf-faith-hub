import { useQuery } from '@apollo/client';
import { GET_DOCUMENTS } from '@/graphql/queries';
import type { GetDocumentsResponse, Document } from '@/graphql/types';

interface UseDocumentsOptions {
  first?: number;
  skip?: boolean;
}

interface UseDocumentsResult {
  documents: Document[];
  loading: boolean;
  error: any;
  hasNextPage: boolean;
  endCursor: string | null;
  loadMore: () => void;
  refetch: () => void;
}

/**
 * Hook personnalisé pour récupérer les documents
 */
export const useDocuments = (options: UseDocumentsOptions = {}): UseDocumentsResult => {
  const { first = 10, skip = false } = options;

  const { data, loading, error, fetchMore, refetch } = useQuery<GetDocumentsResponse>(GET_DOCUMENTS, {
    variables: { first },
    skip,
  });

  const documents = data?.documents?.nodes || [];
  const pageInfo = data?.documents?.pageInfo;

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
    documents,
    loading,
    error,
    hasNextPage: pageInfo?.hasNextPage || false,
    endCursor: pageInfo?.endCursor || null,
    loadMore,
    refetch,
  };
};
