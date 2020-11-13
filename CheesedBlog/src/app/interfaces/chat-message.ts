export interface ChatMessage {
  username: string;
  text: string;
  date: { seconds: number; nanoseconds: number };
}
