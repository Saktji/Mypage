import LoginForm from "./components/LoginForm";
import Logo from "./assets/lo.jpg";

const onLogin = async ({
  identifier,
  password,
  type,
}: {
  identifier: string;
  password: string;
  type: "email" | "phone" | "username";
}) => {
  if (
    (type === "email" && identifier === "test@gmail.com" && password === "1234") ||
    (type === "phone" && identifier === "9876543210" && password === "1234") ||
    (type === "username" && identifier === "admin" && password === "1234")
  )
    return true;

  return false;
};

function App() {
  return (
    <div>
      <div className="login-card bg-white rounded-lg transition-transform duration-300 
                    hover:-translate-y-1">
      <LoginForm logo={Logo} title="Welcome to My App" onLogin={onLogin} />
      </div>
    </div>
  );
}

export default App;
