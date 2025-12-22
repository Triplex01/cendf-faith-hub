import { gql } from '@apollo/client';

/**
 * Mutation pour se connecter
 */
export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: {username: $username, password: $password}) {
      authToken
      refreshToken
      user {
        id
        name
        email
        avatar {
          url
        }
      }
    }
  }
`;

/**
 * Mutation pour rafraîchir le token JWT
 */
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: String!) {
    refreshJwtAuthToken(input: {jwtRefreshToken: $token}) {
      authToken
    }
  }
`;

/**
 * Mutation pour se déconnecter
 */
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout(input: {}) {
      status
    }
  }
`;

/**
 * Mutation pour créer un commentaire
 */
export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $content: String!, $author: String!) {
    createComment(
      input: {
        commentOn: $postId
        content: $content
        author: $author
      }
    ) {
      comment {
        id
        content
        date
        author {
          node {
            name
          }
        }
      }
    }
  }
`;
