import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
  input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Toast } from "flowbite-react";
import { useSpring, animated } from '@react-spring/web';
import LogoutButton from "@/components/LogoutButton";
import Loader from "@/components/Loader";

export function Profile() {
  const [user, setUser] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        ...userData,
        avatar: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userData.firstname}`
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, newPasswordConfirmation } = profileInfo;
    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      setToastMessage("Please fill all input fields");
      setToastType("error");
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      setToastMessage("New passwords do not match");
      setToastType("error");
      return;
    }

    setToastMessage("Profile updated successfully");
    setToastType("success");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let timer;
    if (toastMessage) {
      timer = setTimeout(() => {
        setToastMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [toastMessage]);

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover bg-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        <div className="absolute inset-0 h-full w-full bg-gray-900/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100 shadow-lg">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={user.avatar}
                alt={user.firstname}
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1 font-semibold">
                  {user.firstname} {user.lastname}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {user.role || "User"}
                </Typography>
              </div>
            </div>
            <Button color="green" onClick={openModal} className="transition-transform duration-300 transform hover:scale-105">
              Edit Info
            </Button>
          </div>

          <div className="mb-10">
            <Typography variant="h6" color="blue-gray" className="mb-2 font-semibold">
              Profile Information
            </Typography>
            <div className="space-y-4">
              {[
                { label: 'Full Name', value: `${user.firstname} ${user.lastname}` },
                { label: 'Email', value: user.email },
                { label: 'Status', value: user.status },
              ].map((info, index) => (
                <Card key={index} className="p-4 mb-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Typography variant="h6" color="blue-gray" className="font-semibold text-sm">
                    <strong>{info.label}: </strong>
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="text-xs">
                    {info.value}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>
          <LogoutButton />
        </CardBody>
      </Card>

      <Dialog open={isModalOpen} handler={closeModal} className="transition-transform transform duration-300">
        <DialogHeader>Update Profile Information</DialogHeader>
        <DialogBody divider className="max-h-96 overflow-auto">
          <animated.div style={modalAnimation}>
            <form className="flex flex-col items-center gap-2 p-4 w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="Firstname">Firstname</label>
                  <input
                    placeholder="Firstname"
                    name="firstname"
                    type="text"
                    value={profileInfo.firstname}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="Lastname">Lastname</label>
                  <input
                    label="Lastname"
                    name="lastname"
                    type="text"
                    value={profileInfo.lastname}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col w-full">
                  <label htmlFor="Email">Email</label>
                  <input
                    label="Email"
                    name="email"
                    type="email"
                    value={profileInfo.email}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
                <hr className="m-4"/>
                <div className="flex flex-col w-full">
                  <label htmlFor="Current Password">Current Password</label>
                  <input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={profileInfo.currentPassword}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="New Password">New Password</label>
                  <input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={profileInfo.newPassword}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="Confirm New Password">Confirm New Password</label>
                  <input
                    label="Confirm New Password"
                    name="newPasswordConfirmation"
                    type="password"
                    value={profileInfo.newPasswordConfirmation}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </form>
          </animated.div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" className="bg-green-600" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
        {toastMessage && (
          <div
            className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
            style={{
              backgroundColor: toastType === "error" ? "red" : "green",
            }}
          >
            <Toast
              color={toastType === "error" ? "failure" : "success"}
              onClose={() => setToastMessage("")}
              style={{
                backgroundColor: toastType === "error" ? "red" : "green",
                color: "white",
              }}
            >
              {toastMessage}
            </Toast>
          </div>
        )}
      </Dialog>
    </>
  );
}

export default Profile;
