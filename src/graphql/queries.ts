import { gql } from '@apollo/client';

/**
 * Query pour récupérer les actualités (posts)
 */
export const GET_NEWS = gql`
  query GetNews($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: {orderby: {field: DATE, order: DESC}}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        excerpt
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

/**
 * Query pour récupérer un article spécifique
 */
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      excerpt
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          altText
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

/**
 * Query pour récupérer les enseignements (custom post type)
 */
export const GET_TEACHINGS = gql`
  query GetTeachings($first: Int = 10, $after: String) {
    teachings(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        content
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        teachingCategories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

/**
 * Query pour récupérer les documents (custom post type)
 */
export const GET_DOCUMENTS = gql`
  query GetDocuments($first: Int = 10, $after: String) {
    documents(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        excerpt
        date
        documentFile {
          mediaItemUrl
          fileSize
          mimeType
        }
        documentCategories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

/**
 * Query pour récupérer les programmes radio (custom post type)
 */
export const GET_RADIO_PROGRAMS = gql`
  query GetRadioPrograms($first: Int = 10, $after: String) {
    radioPrograms(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        content
        excerpt
        streamingUrl
        schedule
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/**
 * Query pour récupérer les archives
 */
export const GET_ARCHIVES = gql`
  query GetArchives($year: Int, $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        dateQuery: {
          year: $year
        }
        orderby: {field: DATE, order: DESC}
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        excerpt
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

/**
 * Query pour récupérer les catégories
 */
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

/**
 * Query pour récupérer l'utilisateur connecté
 */
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    viewer {
      id
      name
      email
      avatar {
        url
      }
    }
  }
`;
