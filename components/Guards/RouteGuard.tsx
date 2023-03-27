import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * RouteGuard component that restricts access to certain pages based on user authentication.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components to render.
 * @returns {ReactNode} Authorized child components.
 */
function RouteGuard({ children }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const router = useRouter();

  // Public paths that do not require authentication.
  const publicPaths = ["/", "/login", "/register"];

  // Admin paths that require authentication as an admin user.
  const adminPaths = ["/management"];

  /**
   * Check if the user is authorized to access the current page and update the state accordingly.
   * If the user is not authorized, redirect to the appropriate page.
   */
  const authCheck = async () => {
    try {
      const response = await axios.get("/api/sessions/user");
      const { userName, rol, coins } = response.data;
      document.cookie = `username=${userName}`;
      document.cookie = `admin=${rol === "ADMIN"}`;
      document.cookie = `coins=${coins}`;
      const path = router.asPath.split("?")[0];

      if (
        publicPaths.includes(path) ||
        (adminPaths.includes(path) && rol !== "ADMIN")
      ) {
        setAuthorized(false);
        await router.push({
          pathname: "/buy",
          query: { returnUrl: router.asPath },
        });
      } else {
        setAuthorized(true);
      }
    } catch (error) {
      const path = router.asPath.split("?")[0];
      setAuthorized(publicPaths.includes(path));
      if (!publicPaths.includes(path)) {
        await router.push({
          pathname: "/",
          query: { returnUrl: router.asPath },
        });
      }
    }
  };

  // Run the auth check on initial load and on route change.
  useEffect(() => {
    authCheck();

    // Hide the child components if the user is not authorized.
    const hideContent = () => setAuthorized(false);

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  return authorized ? children : null;
}

export { RouteGuard };