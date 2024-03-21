import Navbar from "@/components/Navbar";
import { auth } from "@lib/auth";

// This is for users who are logged in
const AuthPage = async () => {
  const session = await auth();
  if (session) {
    return (
      <>
        <Navbar />
        <p>Auth Page</p>
      </>
    );
  }
};

export default AuthPage;
