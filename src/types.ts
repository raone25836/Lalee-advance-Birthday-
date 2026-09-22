export interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  isDefault?: boolean;
  avatarSeed?: string;
  likes?: number;
}
