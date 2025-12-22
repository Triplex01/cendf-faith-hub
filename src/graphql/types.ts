/**
 * Types pour les données GraphQL WordPress
 */

export interface MediaDetails {
  width: number;
  height: number;
}

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: MediaDetails;
  };
}

export interface Avatar {
  url: string;
}

export interface Author {
  node: {
    name: string;
    avatar: Avatar;
  };
}

export interface Category {
  name: string;
}

export interface Categories {
  nodes: Category[];
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  slug: string;
  featuredImage?: FeaturedImage;
  author: Author;
  categories: Categories;
}

export interface PostsConnection {
  pageInfo: PageInfo;
  nodes: Post[];
}

export interface Teaching {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage?: FeaturedImage;
  teachingCategories: Categories;
}

export interface TeachingsConnection {
  pageInfo: PageInfo;
  nodes: Teaching[];
}

export interface DocumentFile {
  mediaItemUrl: string;
  fileSize: number;
  mimeType: string;
}

export interface Document {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  documentFile: DocumentFile;
  documentCategories: Categories;
}

export interface DocumentsConnection {
  pageInfo: PageInfo;
  nodes: Document[];
}

export interface RadioProgram {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  streamingUrl: string;
  schedule: string;
  featuredImage?: FeaturedImage;
}

export interface RadioProgramsConnection {
  pageInfo: PageInfo;
  nodes: RadioProgram[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: Avatar;
}

export interface LoginResponse {
  login: {
    authToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface RefreshTokenResponse {
  refreshJwtAuthToken: {
    authToken: string;
  };
}

export interface CurrentUserResponse {
  viewer: User;
}

// Query Response Types
export interface GetNewsResponse {
  posts: PostsConnection;
}

export interface GetPostBySlugResponse {
  post: Post;
}

export interface GetTeachingsResponse {
  teachings: TeachingsConnection;
}

export interface GetDocumentsResponse {
  documents: DocumentsConnection;
}

export interface GetRadioProgramsResponse {
  radioPrograms: RadioProgramsConnection;
}

export interface GetArchivesResponse {
  posts: PostsConnection;
}
