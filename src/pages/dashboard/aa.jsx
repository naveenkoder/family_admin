// import { Breadcrumb } from "antd";
// import React, { useEffect } from "react";
// import { appconstant } from "../../themes/appconstant";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { dashboard } from '../../redux/actions/index'

// const Dashboard = () => {

//   const dashboardData = useSelector(state => state.dashboard.data)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     document.title = appconstant?.t1d_friends;
//     window.scrollTo(0, 0);
//     dispatch(dashboard())
//   }, []);// eslint-disable-line react-hooks/exhaustive-deps



//   return (
//     <div>
//       <Breadcrumb>
//         <Breadcrumb.Item>
//           {" "}
//           <FontAwesomeIcon icon={faHome} />
//         </Breadcrumb.Item>
//       </Breadcrumb>

//       <div className="main-div-2 dashboard ">
//         <div className="datacenter user-valid-text">
//           <div className="image-fle">
//             <div className="total-num">
//               <h1>{dashboardData?.totalUsers}</h1>
//             </div>
//             <div>

//               <FontAwesomeIcon icon={faUser} className="dashboard-user-icon" />

//             </div>
//           </div>
//           <div className="user-text">
//             <p>{appconstant?.totalUserReg}</p>
//           </div>
//         </div>

//         <div className="datacenter user-valid-text">
//           <div className="image-fle">
//             <div className="total-num">
//               <h1>{dashboardData?.totalHighSchool}</h1>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faUser} className="dashboard-user-icon" />

//             </div>
//           </div>
//           <div className="user-text">
//             <p>{appconstant?.totalHighSchoolUsers}</p>
//           </div>
//         </div>

//         <div className="datacenter user-valid-text">
//           <div className="image-fle">
//             <div className="total-num">
//               <h1>{dashboardData?.totalMiddleSchool}</h1>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faUser} className="dashboard-user-icon" />

//             </div>
//           </div>
//           <div className="user-text">
//             <p>{appconstant?.totalMiddleSchoolUsers}</p>
//           </div>
//         </div>

//         <div className="datacenter user-valid-text">
//           <div className="image-fle">
//             <div className="total-num">
//               <h1>{dashboardData?.totalCollege}</h1>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faUser} className="dashboard-user-icon" />

//             </div>
//           </div>
//           <div className="user-text">
//             <p>{appconstant?.totalCollegeUsers}</p>
//           </div>
//         </div>

//         <div className="datacenter user-valid-text">
//           <div className="image-fle">
//             <div className="total-num">
//               <h1>{dashboardData?.totalGraduates}</h1>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faUser} className="dashboard-user-icon" />

//             </div>
//           </div>
//           <div className="user-text">
//             <p>{appconstant?.totalGraduateUsers}</p>
//           </div>
//         </div>

//         <div className="datacenter user-valid-text">
//           <div className="image-fle">
//             <div className="total-num">
//               <h1>{dashboardData?.totalReports}</h1>
//             </div>
//             <div>
//               <FontAwesomeIcon icon={faUser} className="dashboard-user-icon" />

//             </div>
//           </div>
//           <div className="user-text">
//             <p>{appconstant?.totalReportedUsers}</p>
//           </div>
//         </div>
//       </div>

//       <div className="add-wrapper">
//         <div className="add-container">
//           Adds Section
//         </div>
//       </div>   <div className="add-wrapper">
//         <div className="add-container">
//           Adds Section
//         </div>
//       </div>   <div className="add-wrapper">
//         <div className="add-container">
//           Adds Section
//         </div>
//       </div>   <div className="add-wrapper">
//         <div className="add-container">
//           Adds Section
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Dashboard
