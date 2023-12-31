import {
  ReactChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface userDataProps {
  avatar: "";
  bio: "";
  email: "";
  id: "";
  name: "";
}

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userData: userDataProps;
  setUserData: (value: userDataProps) => void;
  refresher: boolean;
  handleRefresher: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: ReactChildren | any): ReactNode => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<userDataProps>({
    avatar: "",
    bio: "",
    email: "",
    id: "",
    name: "",
  });

  // refresher
  const [refresher, setRefresher] = useState<boolean>(false);

  const handleRefresher = () => {
    setRefresher(!refresher);
  };

  const value: AuthContextProps = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    refresher,
    handleRefresher,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthProvider;
