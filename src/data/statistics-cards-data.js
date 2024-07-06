import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Balance",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Profits",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Bonus",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Invested amount",
    value: "$23,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than last month",
    },
  },
];

export default statisticsCardsData;
