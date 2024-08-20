import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { Money } from "@phosphor-icons/react";
import { Coin, CreditCard, StackPlus } from "@phosphor-icons/react";
import NoTransactionComponent from "@/components/NoTransactionComponent";
import KycButton from "@/components/KycButton";
import WithdrawalButton from "@/components/WithdrawalButton";
import DepositButton from "@/components/DepositButton";
import reloadButton from '../../images/reload.png';
import '../../styles.css';
import { useNavigate } from "react-router-dom";

export function Home() {
  const [projectsTableData, setProjectsTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isVerified, setIsVerified] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/auth/sign-in");
        setAuthenticated(false);
        return;
      }

      setIsRotating(true);

      const response = await fetch(
        "https://tradesphere-backend.onrender.com/api/users/me",
        {
          method: "GET",
          headers: {
            "x-auth-token": authToken,
          },
        }
      );
      setIsRotating(false);

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userDetails = await response.json();
      console.log("Fetched user details:", userDetails);

      if (userDetails.amount) {
        setAmount(userDetails.amount);
      }

      setIsVerified(userDetails.isVerified);
      localStorage.setItem("user", JSON.stringify(userDetails)); // Update localStorage with the new details
    } catch (error) {
      setIsRotating(false);
      console.error("Error fetching user info", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();

    const fetchData = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          navigate("/auth/sign-in");
          setAuthenticated(false);
          return;
        }

        const response = await fetch(
          "https://tradesphere-backend.onrender.com/api/users/transactions/client",
          {
            method: "GET",
            headers: {
              "x-auth-token": authToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Sort data by latest date first
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        
        setProjectsTableData(sortedData || []);
        setLoading(false);
        setAuthenticated(true);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/sign-in");
    }
  }, [authenticated, navigate]);

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectsTableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projectsTableData.length / itemsPerPage);

  return (
    <div className="mt-12">
      <div className="flex gap-4">
        <WithdrawalButton />
        <DepositButton />
        <img 
          src={reloadButton} 
          alt="Reload"
          className={`h-[20px] w-[20px] mt-2 cursor-pointer mr-3 ${isRotating ? 'rotate-animation' : ''}`}
          onClick={fetchUserInfo} // Fetch updated user info on reload
        />
      </div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-4">
        <StatisticsCard
          key="amount"
          title="Balance"
          value={amount}
          icon={React.createElement(Money, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">Up</strong> since last month
            </Typography>
          }
        />
        <StatisticsCard
          key="bonus"
          title="Bonus"
          value={0}
          icon={React.createElement(Coin, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">Up</strong> since last month
            </Typography>
          }
        />
        <StatisticsCard
          key="profits"
          title="Profits"
          value={0}
          icon={React.createElement(StackPlus, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">Up</strong> since last month
            </Typography>
          }
        />
        <StatisticsCard
          key="investedAmount"
          title="Invested Amount"
          value={0}
          icon={React.createElement(CreditCard, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">Up</strong> since last month
            </Typography>
          }
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden col-span-3 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="text-base">
                Transactions
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <Typography variant="body" className="p-4 text-center text-blue-gray-500">
                Loading transactions...
              </Typography>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {["Transaction ID", "Amount", "Type", "Date / Time", "Status"].map((el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-3 px-5 border-b border-blue-gray-50">
                            <Typography variant="body" className="p-4 text-center text-blue-gray-500">
                              <NoTransactionComponent />
                            </Typography>
                          </td>
                        </tr>
                      ) : (
                        currentItems.map(({ 
                          transactionsId, amount, type, created_at, status }) => (
                          <tr key={transactionsId}>
                            <td className="py-3 px-5 border-b border-blue-gray-50 whitespace-nowrap">
                              <Typography variant="small" color="blue-gray">
                                {transactionsId}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <Typography variant="small" color="blue-gray">
                                {amount}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <Typography variant="small" color="blue-gray">
                                {type}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <Typography variant="small" color="blue-gray" className=" whitespace-nowrap">
                                {created_at}
                              </Typography>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50 whitespace-nowrap">
                              <Typography variant="small" color="blue-gray">
                                {status}
                              </Typography>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-between items-center py-3 px-5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="text-sm text-blue-500 hover:underline disabled:text-gray-400"
                  >
                    Previous
                  </button>
                  <Typography variant="small" color="blue-gray">
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="text-sm text-blue-500 hover:underline disabled:text-gray-400"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
