// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar/Sidebar";

// function Layout() {
//   return (
//     <>
//       <div className="sticky top-0">
//         <Header />
//       </div>
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="w-full overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";



function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </header>

      {/* Main Layout */}
      <div className="flex ">
        {/* Sidebar (fixed width, full height) */}
        <aside className="bg-white border-r  border-gray-200 sticky left-0 top-0 scroll-auto">
          <Sidebar />
        </aside>

        {/* Main Content (scrollable) */}
        <main className="h-screen overflow-y-auto bg-gray-50 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
  
export default Layout;
