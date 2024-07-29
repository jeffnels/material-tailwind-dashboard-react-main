import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Toast } from "flowbite-react";
import { useSpring, animated } from '@react-spring/web';

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
      setUser(JSON.parse(storedUser));
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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover bg-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        <div className="absolute inset-0 h-full w-full bg-gray-900/50" />
      </div>
     <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100 shadow-lg transform transition-transform duration-500 hover:scale-105">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={user.avatar || "/img/default-avatar.png"}
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
            <Button color="green" ripple="light" onClick={openModal} className="transition-transform duration-300 transform hover:scale-105">
              Edit Info
            </Button>
          </div>

          <div className="mb-10">
            <Typography variant="h6" color="blue-gray" className="mb-2 font-semibold">
              Profile Information
            </Typography>
            <div className="space-y-4">
              {[
                { label: 'First Name', value: user.firstname },
                { label: 'Last Name', value: user.lastname },
                { label: 'Email', value: user.email },
                { label: 'Password', value: '••••••••' }, 
                { label: 'Status', value: user.status },
                { label: 'Role', value: user.role },
              ].map((info, index) => (
                <Card key={index} className="p-4 mb-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Typography variant="body2" color="blue-gray" className="font-semibold">
                    <strong>{info.label}: </strong>
                  </Typography>
                  <Typography variant="body2" color="blue-gray">
                    {info.value}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <Dialog open={isModalOpen} handler={closeModal} className="transition-transform transform duration-300">
        <DialogHeader>Update Profile Information</DialogHeader>
        <DialogBody divider>
          <animated.div style={modalAnimation}>
            <form className="flex flex-col gap-4 p-8" onSubmit={handleSubmit}>
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={profileInfo.currentPassword}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0"
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={profileInfo.newPassword}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0"
              />
              <Input
                label="Confirm New Password"
                name="newPasswordConfirmation"
                type="password"
                value={profileInfo.newPasswordConfirmation}
                onChange={handleChange}
                className="focus:outline-none focus:ring-0"
              />
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
