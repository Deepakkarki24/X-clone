import { FaXmark } from "react-icons/fa6";
import Button from "../ui/Button";
import { useUserContext } from "../../context/hooks/useUserContext";

interface LogoutProps {
  setLogoutModal: (open: boolean) => void;
}

const Logout = ({ setLogoutModal }: LogoutProps) => {
  const { handleLogout } = useUserContext();

  return (
    <div className="logout_modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="logout_inner relative w-full max-w-sm mx-4 bg-black text-white rounded-2xl p-8 flex flex-col items-center shadow-lg">
        <FaXmark
          onClick={() => setLogoutModal(false)}
          className="cursor-pointer absolute top-4 left-4"
        />
        <Button onClick={handleLogout} btnElement="Logout" />
      </div>
    </div>
  );
};

export default Logout;
