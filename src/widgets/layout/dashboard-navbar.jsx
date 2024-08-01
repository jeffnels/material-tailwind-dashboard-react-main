import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(`${user.firstname} ${user.lastname}`);

      // Fetch the avatar URL from DiceBear API
      const avatarSeed = user.firstname;
      const avatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${avatarSeed}`;
      setAvatarUrl(avatar);
    }
  }, []);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/dashboard/profile">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case text-base"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="h-[40px] w-[40px] rounded-full "
                />
              ) : (
                <UserCircleIcon className="h-5 w-[40px] text-blue-gray-500" />
              )}
              {userName || "User Name"}
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="h-5 w-5 rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              )}
            </IconButton>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
