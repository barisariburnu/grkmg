import { type conversations } from '@/features/chats/data/convo.json';

export type ChatUser = (typeof conversations)[number];
export type Convo = ChatUser['messages'][number];
