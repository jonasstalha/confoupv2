// Minimal in-memory storage with a users interface compatible with db.users.findFirst
type User = {
  id: string;
  firebaseUid?: string;
  email?: string;
  role?: string;
  [key: string]: any;
};

const users: User[] = [
  {
    id: '1',
    firebaseUid: 'firebase-uid-123',
    email: 'alice@example.com',
    role: 'entreprise',
  },
];

export const db = {
  users: {
    // Accepts a simple { where: { firebaseUid } } shape to match example usage
    async findFirst({ where }: { where: Partial<User> }) {
      if (!where) return null;
      const keys = Object.keys(where) as Array<keyof User>;
      return (
        users.find((u) => keys.every((k) => (where as any)[k] == null ? true : u[k] === (where as any)[k])) || null
      );
    },
    async create(data: Partial<User>) {
      const newUser: User = {
        id: String(users.length + 1),
        ...data,
      } as User;
      users.push(newUser);
      return newUser;
    },
    // helper for tests/tools
    __all() {
      return users;
    },
  },
};
