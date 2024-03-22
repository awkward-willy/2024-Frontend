export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface PostUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface Post {
  id: number;
  number: number;
  title: string;
  body: string;
  comments: number;
  labels: Label[];
  state: string;
  created_at: string;
  user: PostUser;
}
