import { Permission } from "./Permission";

export class Role{
  id: string | null = null;
  name: string = '';
  permissions: Permission[] = [];
}
