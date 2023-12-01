import { LoginRequestDTO } from "domain/DTO/auth/LoginRequestDTO";
import { postLogin } from "helpers/fakebackend_helper";
import { useAppDispatch } from "hooks/redux/useRedux";
import { loadAuthError, loadClearError } from "slices/auth/login/reducer";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const handleClearErrorMessage = () => {
    setTimeout(() => {
      dispatch(loadClearError());
    }, 3000);
  };

  const handleRememberUser = ({ email, remember }: LoginRequestDTO) => {
    if (remember) {
      localStorage.setItem("userEmail", JSON.stringify(email));
    } else {
      return;
    }
  };

  const login = async (loginRequestDTO: LoginRequestDTO) => {
    try {
      const data = await postLogin(loginRequestDTO);
      sessionStorage.setItem("authUser", JSON.stringify(data));
      handleRememberUser(loginRequestDTO);
    } catch (error: any & string) {
      dispatch(loadAuthError({ errorMessage: error, hasError: true }));
      handleClearErrorMessage();
      console.log(error);
    }
  };

  return { login };
};

export default useLogin;
