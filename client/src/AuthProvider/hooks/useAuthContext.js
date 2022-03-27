import { useContext } from "react";
import { AuthContext } from "..";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
