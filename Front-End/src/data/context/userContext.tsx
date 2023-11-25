import { getUserData } from '../../firebase/firebaseStore';
import { UserInterface } from '../../interfaces/User';
import { PropsWithChildren, createContext, useState } from 'react';

export const UserContext = createContext({
  user: {} as UserInterface,
  getData: async (id: string) => {},
});

export default function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  const getData = async (id: string) => {
    const user = await getUserData(id);
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, getData }}>
      {children}
    </UserContext.Provider>
  );
}
