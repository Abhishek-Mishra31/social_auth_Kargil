import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
}

export default GoogleCallback;
