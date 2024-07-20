import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import NoTransactionComponent from "@/components/NoTransactionComponent";
import KycButton from "@/components/KycButton";

export function Home() {
  const [projectsTableData, setProjectsTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
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
        setProjectsTableData(data || []);
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectsTableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projectsTableData.length / itemsPerPage);

  return (
    <div className="mt-12">
      <KycButton />
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden col-span-3 border border-blue-gray-100 shadow-sm ">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
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
              <div className="">
                <div className="overflow-x-auto ">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {["Amount", "Type", "Package", "Date / Time"].map((el) => (
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
                          <td colSpan="4" className="py-3 px-5 border-b border-blue-gray-50">
                            <Typography variant="body" className="p-4 text-center text-blue-gray-500">
                              <NoTransactionComponent />
                            </Typography>
                          </td>
                        </tr>
                      ) : (
                        currentItems.map(({ id, amount, type, package_type, created_at }) => {
                          const className = `py-3 px-5 border-b border-blue-gray-50`;
                          return (
                            <tr key={id}>
                              <td className={className}>
                                <Typography variant="small" color="blue-gray">
                                  {amount}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography variant="small" color="blue-gray">
                                  {type}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography variant="small" color="blue-gray">
                                  {package_type}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography variant="small" color="blue-gray">
                                  {created_at}
                                </Typography>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex flex-col items-center mt-4 w-full sm:flex-row sm:justify-between lg:p-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-black text-white rounded-md mb-2 sm:mb-0"
                  >
                    Previous
                  </button>
                  <span className="flex items-center mb-2 sm:mb-0">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-black text-white rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
