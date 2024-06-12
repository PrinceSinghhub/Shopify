import React, { useState } from "react";
import "./App.css";
import UserDataForm from "./Pages//UserDataForm"; // Ensure this path is correct
import Signup from "./Signup";
import LoginHomePage from "./Pages/LoginHomePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [currentView, setCurrentView] = useState("login");
  const fullTitle = "Shopify";

  // useEffect(() => {
  //   if (title.length < fullTitle.length) {
  //     const timeoutId = setTimeout(() => {
  //       setTitle(fullTitle.slice(0, title.length + 1));
  //     }, 150);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [title, fullTitle]);

  const handleLoginSuccess = (
    isLoggedIn: boolean,
    name: string,
    email: string
  ) => {
    setIsAuthenticated(isLoggedIn);
    setCurrentUser({ name, email });
    setCurrentView("home"); // Change view to home upon successful login
  };

  const renderContent = () => {
    if (isAuthenticated) {
      return (
        <LoginHomePage Name={currentUser.name} Email={currentUser.email} />
      );
    } else {
      switch (currentView) {
        case "login":
          // Use UserDataForm here with the onLoginSuccess prop
          return <UserDataForm onLoginSuccess={handleLoginSuccess} />;
        case "signup":
          return <Signup />;
        default:
          return null;
      }
    }
  };

  return (
    <>
      {!isAuthenticated && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <svg
              fill="none"
              role="img"
              viewBox="0 0 56 64"
              className="md:hidden block h-[48px] mx-auto"
              height="64"
              data-component-name="shopify-logo"
            >
              <g clip-path="url(#clip0_198_267)">
                <path
                  d="M37.7102 7.42882C37.7102 7.42882 37.0044 7.6296 35.8448 7.98098C35.6432 7.32843 35.3407 6.57549 34.9374 5.77235C33.6266 3.26255 31.6604 1.90725 29.3414 1.90725C29.1901 1.90725 29.0389 1.90725 28.8372 1.95745C28.7868 1.85706 28.686 1.80686 28.6356 1.70647C27.6273 0.602155 26.3165 0.100194 24.7537 0.15039C21.7288 0.250783 18.7039 2.40921 16.284 6.27431C14.5699 8.9849 13.2591 12.3982 12.9062 15.0586C9.42764 16.1127 7.00774 16.8657 6.95733 16.9159C5.19282 17.468 5.1424 17.5182 4.94075 19.1747C4.7895 20.4296 0.151367 55.7676 0.151367 55.7676L38.2647 62.3433V7.37862C37.9623 7.37862 37.811 7.42882 37.7102 7.42882ZM28.8876 10.1394C26.8711 10.7418 24.6528 11.4445 22.485 12.0971C23.09 9.73784 24.2999 7.37862 25.7115 5.82255C26.2661 5.27039 27.0223 4.61784 27.8794 4.21627C28.7364 6.02333 28.9381 8.48294 28.8876 10.1394ZM24.7537 2.20843C25.4595 2.20843 26.0644 2.35902 26.5686 2.66019C25.7619 3.06176 24.9553 3.71431 24.1991 4.46725C22.2833 6.52529 20.8213 9.73784 20.2163 12.7998C18.4014 13.352 16.5865 13.9041 14.9228 14.4061C16.0319 9.58725 20.1155 2.30882 24.7537 2.20843ZM18.9056 29.8163C19.1072 33.0288 27.6273 33.7316 28.1314 41.3112C28.4843 47.2845 24.9553 51.3504 19.8634 51.6516C13.7129 52.0531 10.3351 48.439 10.3351 48.439L11.6459 42.9174C11.6459 42.9174 15.0237 45.4774 17.746 45.2767C19.5105 45.1763 20.1659 43.7206 20.1155 42.7167C19.8634 38.5002 12.9062 38.7512 12.4525 31.8241C12.0492 26.0014 15.8807 20.1284 24.3503 19.5763C27.6273 19.3755 29.291 20.1786 29.291 20.1786L27.3752 27.4069C27.3752 27.4069 25.2074 26.4029 22.6362 26.6037C18.9056 26.8547 18.8552 29.2139 18.9056 29.8163ZM30.9042 9.53706C30.9042 8.03117 30.7026 5.87274 29.9968 4.06568C32.3158 4.51745 33.4249 7.07745 33.9291 8.63353C33.0216 8.88451 32.0133 9.18568 30.9042 9.53706Z"
                  fill="white"
                ></path>
                <path
                  d="M39.4238 62.2429L55.254 58.3276C55.254 58.3276 48.448 12.4986 48.3976 12.1974C48.3472 11.8963 48.0951 11.6955 47.8431 11.6955C47.591 11.6955 43.1545 11.5951 43.1545 11.5951C43.1545 11.5951 40.4321 8.98488 39.4238 7.98096V62.2429Z"
                  fill="white"
                ></path>
                <path
                  d="M29.2498 20.2129L27.3148 27.4286C27.3148 27.4286 25.1548 26.4426 22.5898 26.6218C18.8098 26.8459 18.8098 29.2213 18.8098 29.8039C19.0348 33.0308 27.5398 33.7479 28.0348 41.3221C28.3948 47.2829 24.8848 51.3613 19.7548 51.6751C13.6348 51.9888 10.2598 48.4034 10.2598 48.4034L11.5648 42.8907C11.5648 42.8907 14.9848 45.4454 17.6848 45.2661C19.4398 45.1765 20.1148 43.6975 20.0248 42.7115C19.7548 38.4986 12.8248 38.7675 12.3748 31.8207C12.0148 25.9944 15.8398 20.1232 24.2998 19.5854C27.5848 19.3613 29.2498 20.2129 29.2498 20.2129Z"
                  fill="transparent"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_198_267">
                  <rect width="225" height="64" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <h1>{fullTitle}</h1>
          </div>
          <div
            className="text-center text-section-dark-text pt-8 pb-6"
            data-mode="dark"
            data-component-name="heading-group"
            style={
              {
                justifyContent: "center",
                justifyItems: "center",
                textAlign: "center",
                color: "rgba(255, 255, 255, 1)",
                paddingTop: "2rem",
                paddingBottom: "1.5rem",
              } as React.CSSProperties
            }
          >
            <h1
              className="richtext text-t1"
              style={{
                color: "rgba(255, 255, 255, 1)",
              }}
            >
              Build your own ecommerce <br />
              website in 3 easy steps
            </h1>
            <p
              className="richtext text-body-lg pt-md"
              style={{
                color: "rgba(255, 255, 255, 1)",
                paddingTop: "1rem",
              }}
            >
              Shopify is trusted by millions of businesses worldwide
            </p>
          </div>
          <div
            className="div"
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <button
              onClick={() => setCurrentView("login")}
              style={{ backgroundColor: "white", color: "black" }}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentView("signup")}
              style={{ backgroundColor: "white", color: "black" }}
            >
              Signup
            </button>
          </div>
        </>
      )}
      {renderContent()}
    </>
  );
}

export default App;
