const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SIGN_OUT: "/sign-out",
  PROFILE: (id: string) => `/profile/${id}`,
};

export default ROUTES;
