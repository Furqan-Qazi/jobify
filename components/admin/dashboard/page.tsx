// "use client";

// import React from "react";
// import AdminCard from "@/components/admin/AdminCard";
// import { adminStats } from "./stats";
// import ExtraAreaChart from "@/components/admin/dashboard/ExtraAreaChart";
// import NotificationPanel from "@/components/admin/dashboard/NotificationPanel";
// import RecentPosted from "@/components/admin/dashboard/RecentPosted";

// export default function AdminDashboardPage() {
//   return (
//     <div className="space-y-8 ml-4">
//       {/* Page Title */}
//       <h2 className="text-2xl font-bold">Admin Dashboard</h2>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
//         {adminStats.slice(0, 4).map((item: any, index: number) => (
//           <AdminCard
//             key={index}
//             icon={item.icon}
//             iconColor={item.iconColor}
//             iconBg={item.iconBg}
//             iconBorder={item.iconBorder}
//             title={item.title}
//             description={item.description}
//             background={item.background}
//             shadow={item.shadow}
//           />
//         ))}
//       </div>

//       {/* Chart + Notifications */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//         <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
//           <h3 className="text-lg font-semibold mb-4">Extra Area Chart</h3>
//           <ExtraAreaChart />
//         </div>

//         <NotificationPanel maxHeight="450px" />
//       </div>

//       {/* Recent Posts */}
//       <RecentPosted />
//     </div>
//   );
// }
