import React, { useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/auth/sign-in'); // Redirect to login page or other page
  };

  return (
    <>
      <Button 
       
        onClick={openModal} 
        className="transition-transform duration-300 transform shadow-md hover:shadow-lg w-full bg-white text-[red] border border-[red]"
      >
        Logout
      </Button>

      <Dialog 
        open={isModalOpen} 
        handler={closeModal} 
        className="max-w-md mx-auto rounded-lg p-6 bg-white shadow-md"
      >
        <DialogHeader className="text-center text-xl font-bold">Confirm Logout</DialogHeader>
        <DialogBody divider className="flex flex-col items-center py-6">
          <p className="text-gray-700 text-center text-lg">Are you sure you want to log out?</p>
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button 
            variant="text" 
            color="gray" 
            onClick={closeModal}
            className="hover:bg-gray-100 text-gray-700"
          >
            Cancel
          </Button>
          <Button 
            variant="gradient" 
            color="red" 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default LogoutButton;
