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

export function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    const { currentPassword, newPassword, newPasswordConfirmation } = profileInfo;
    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      setToastMessage("Please fill all input fields");
      setToastType("error");
      return;
    }

    // Check if new passwords match
    if (newPassword !== newPasswordConfirmation) {
      setToastMessage("New passwords do not match");
      setToastType("error");
      return;
    }

    // Placeholder for form submission logic
    setToastMessage("Profile updated successfully"); // Example success message
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
      }, 3000); // 3 seconds timeout
    }
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
            <Button color="green" ripple="light" onClick={openModal}>
              Edit Info
            </Button>
          </div>

          <div className="mb-10">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Profile Information
            </Typography>
            <Typography variant="body2" color="blue-gray" className="mb-4">
              Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
            </Typography>
            <div className="space-y-2">
              <Typography variant="body2" color="blue-gray">
                <strong>First Name: </strong>Alec M. Thompson
              </Typography>
              <Typography variant="body2" color="blue-gray">
                <strong>Mobile: </strong>(44) 123 1234 123
              </Typography>
              <Typography variant="body2" color="blue-gray">
                <strong>Email: </strong>alecthompson@mail.com
              </Typography>
              <Typography variant="body2" color="blue-gray">
                <strong>Location: </strong>USA
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>

      <Dialog open={isModalOpen} handler={closeModal}>
        <DialogHeader>Update Profile Information</DialogHeader>
        <DialogBody divider>
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
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
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
