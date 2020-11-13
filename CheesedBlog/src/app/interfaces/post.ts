export interface Post {
  id?: string;
  title: string;
  tags: string[];
  text: string;
  date?: { seconds: number; nanoseconds: number };
  author?: string;
}
