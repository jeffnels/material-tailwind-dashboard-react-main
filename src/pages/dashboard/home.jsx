import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  ordersOverviewData,
} from "@/data";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NoTransactionComponent from "@/components/NoTransactionComponent";
import Tables from "@/pages/dashboard/tables";
import KycButton from "@/components/KycButton";

export function Home() {
  const [projectsTableData, setProjectsTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [authenticated, setAuthenticated] = useState(true); // Track authentication state
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading state
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          // Redirect to sign-in page if token is missing
          navigate("/auth/sign-in");
          setAuthenticated(false); // Update authenticated state
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
        setProjectsTableData(data || []);
        setLoading(false); // Set loading state to false on successful fetch
        setAuthenticated(true); // Update authenticated state
      } catch (error) {
        console.error("Error fetching the data", error);
        // Handle error as needed
        setLoading(false); // Set loading state to false on error
      }
    };

    fetchData();
  }, []); 

  // Redirect to sign-in page if not authenticated
  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/sign-in");
    }
  }, [authenticated, navigate]);

  return (
    <div className="mt-12">
      <KycButton/>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>{" "}
                {footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      
      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon
                  strokeWidth={2}
                  className="h-4 w-4 text-blue-gray-400"
                />
                {" " + props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden col-span-3 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon
                  strokeWidth={3}
                  className="h-4 w-4 text-blue-gray-200"
                />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <Typography variant="body" className="p-4 text-center text-blue-gray-500">
                Loading transactions...
              </Typography>
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["User ID", "Amount", " Type", "Package", "Date / Time"].map((el) => (
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
                  {projectsTableData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography variant="body" className="p-4 text-center text-blue-gray-500">
                <NoTransactionComponent/>
              </Typography>
          
                      </td>
                    </tr>
                  ) : (
                    projectsTableData.map(({ id, user_id, amount, type, package_type, created_at }) => (
                      <tr key={id}>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography variant="small" color="blue-gray">
                            {user_id}
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
                          <Typography variant="small" color="blue-gray">
                            {package_type}
                          </Typography>
                        </td>
                        <td className="py-3 px-5 border-b border-blue-gray-50">
                          <Typography variant="small" color="blue-gray">
                            {created_at}
                          </Typography>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
        {/* <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card> */}
        {/* <Tables /> */}
      </div>
    </div>
  );
}

export default Home;
