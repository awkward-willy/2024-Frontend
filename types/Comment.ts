export interface Comment {
  id: string;
  body: string;
  created_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}
