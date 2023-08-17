import React, { useState, useEffect, useRef } from "react";
// Navigation
import { saveAs } from "file-saver";
// Styles
import "antd/dist/antd.css";
import "./dashboard.scss";
// antd
import { Table, Button as AntButton, Pagination, Modal } from "antd";
import { Card, } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"


// Mui Components
import { Grid, useTheme, useMediaQuery, Box } from "@material-ui/core";
// Custom components
import DashboardLayout from "../../layouts/dashboardLayout";
import {
  AppBar,
  Navbar,
  NavbarSearch,
} from "../../customComponents";
// Constants

import { appConstants } from "../../themes/constants";
// utils methods
import { useStyles } from "../../styles/styles";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  OrderListingAction, OrderStatusUpdateAction, orderDeleteAction,
} from "../../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import JSZip from "jszip";
import JSZipUtils from 'jszip-utils';

export const orderStatusEnum = {
  pending: 'pending',
  inProgress: 'inProgress',
  delivered: 'delivered'
}


export const OrderListing = () => {
  const styleProps = { searchable: true };
  // Hooks declarations
  const classes = useStyles(styleProps);
  const theme = useTheme();

  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.orderManagement);
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const baseUrl = "https://s3.amazonaws.com/static.neostack.com/img/react-slick/"
  // Global state initialization
  // const {sidebarRouteIndex,sidebarNestedRouteIndex} = appState

  // local state initialization
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [viewData, setViewData] = useState([]);

  const [payload, setPayload] = useState({
    offset: 0,
    limit: 10,
    sort: "",
    order: 0,
    search: "",
  });
  //Images destructuring

  //Constants

  //lifecycle hooks
  useEffect(() => {
    document.title = appConstants.title;
    // dispatch(handleNavigationStateAction(1, false))
    dispatch(OrderListingAction(payload));
  }, []);

  const handlePagination = (pagination) => {
    // setCurrentPage(pagination)
    const tempPayload = {
      ...payload,
      offset: pagination == 1 ? 0 : (pagination - 1) * 10,
    };
    setPayload(tempPayload);
    dispatch(OrderListingAction(tempPayload));
    window.scrollTo(0, 0);
  };


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "sr",
      key: "sr",
      ellipsis: false,
      render: (key, data, index) => <>{payload.offset + index + 1}</>,
    },
    {
      title: "Order Id",
      dataIndex: "receiptId",
      key: "receiptId",
      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>#{data.receiptId}</span>
          </>
        );
      },
    },
    {
      title: "Transaction Id",
      dataIndex: "orderId",
      key: "orderId",
      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>{data.orderId}</span>
          </>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "user.name",
      key: "user.name",

      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>{data?.user?.name}</span>
          </>
        );
      },
    },
    {
      title: "Email Address",
      dataIndex: "user.email",
      key: "user.email",
      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>{data?.user?.email}</span>
          </>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",

      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>
              {data?.user?.address?.street + " " + data?.user?.address?.country}
            </span>
          </>
        );
      },
    },
    {
      title: "Order Time",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>{moment(data?.createdAt).format("DD-MM-YYYY HH:mm")}</span>
          </>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>{`₹${data?.totalPrice}`}</span>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: false,
      render: (key, data, index) => {
        return (
          <>
            <span>{data?.status}</span>
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "Action",
      align: "center",
      render: (key, data) => {
        console.log(data?.cart?.picture, "data?.cart?.picture", data);
        return (
          <Grid className={classes.buttons}>
            <button
              className="table-action-button"
              onClick={() => {
                setIsModalVisible(true)
                setViewData(data?.cart)
              }
              }
            >
              {"view"}
            </button>
            <button
              className="table-action-button"
              onClick={() => downloadImage(data?.cart)}
            >
              {"download"}
            </button>
            {data?.status !== orderStatusEnum.delivered && <button
              className="table-action-button2"
              onClick={() => {
                if (data?.status === orderStatusEnum.pending) {
                  dispatch(OrderStatusUpdateAction({
                    id: data?._id,
                    status: orderStatusEnum.inProgress
                  },
                    payload))
                }
                else {
                  dispatch(OrderStatusUpdateAction({
                    id: data?._id,
                    status: orderStatusEnum.delivered
                  }, payload))
                }
              }}
            >
              Change to {data?.status === orderStatusEnum.pending ? orderStatusEnum.inProgress : orderStatusEnum.delivered}
            </button>}

            <button
              className="table-action-button3"
              onClick={() => {
                setSelectedValue(data?._id)
                setModal(true)
              }}
            >
              {"Delete"}
            </button>
          </Grid>
        );
      },
    },
  ];

  async function downloadImage(cart) {
    // for (let i in cart) {
    //   setTimeout(() => {
    //     saveAs(cart[i].frame, "image.jpg");
    //     setTimeout(() => {
    //       saveAs(cart[i].picture, "image.jpg");
    //     }, 200)
    //   }, 100)
    // }

    var zip = new JSZip();
    var count = 0;
    var zipFilename = "frames.zip";
    cart.forEach(function (item, i) {
      var filename = item.frame;
      filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '').replace("httpssequenceimagestaging.blob.core.windows.netretouch", "");
      JSZipUtils.getBinaryContent(item.frame, function (err, data) {
        if (err) {
          throw err;
        }
        zip.file(filename, data, { binary: true });
        var filename2 = item.picture;
        filename2 = filename2.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '').replace("httpssequenceimagestaging.blob.core.windows.netretouch", "");
        JSZipUtils.getBinaryContent(item.picture, function (err2, data2) {
          if (err2) {
            throw err2;
          }
          zip.file(filename2, data2, { binary: true });
          count++;
          if (count == cart.length) {
            zip.generateAsync({ type: 'blob' }).then(function (content) {
              saveAs(content, zipFilename);
            });
          }
        });
      });
    });
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <DashboardLayout>
      <AppBar
        breadcrumbs={[{ route: "Order-Listing", name: "Order Mangement" }]}
      />
      <Navbar title="Orders Mangement" />
      <Card className={classes.card}>
        {matches && (
          <Box className={classes.searchBox}>
            <NavbarSearch />
          </Box>
        )}
        <Grid container>
          <Grid smUp={12} className={classes.tableContainerRow}>
            <Table
              className={classes.tableWrapper}
              scroll
              bordered
              columns={columns}
              dataSource={orderList}
            />
            <Pagination current={1} total={10} className="table-pagination" />
          </Grid>
        </Grid>
      </Card>

      {isModalVisible && <div style={{
        position: 'fixed',
        width: '81%',
        height: '100%',
        top: 0,
        zIndex: 9999,
        backgroundColor: '#00000055',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
        onClick={(e) => {
          e.stopPropagation()
          setIsModalVisible(false)
        }}>
        <div style={{
          width: 400,
          height: 400,
          backgroundColor: 'white'
        }} onClick={(e) => {
          e.stopPropagation()
        }}>
          <Slider {...settings}>
            {viewData.map((v, i) => {
              return (
                <img style={{ padding: 10 }} src={v.frame} />
              )
            })
            }

          </Slider>
        </div></div>}

      <Modal
        visible={modal}
        title="Delete Order"
        closable={false}
        onCancel={() => {
          setSelectedValue(null)
          setModal(false)
        }}
        centered={true}
        footer={[
          <div className="delete-category-modal-footer">
            <button style={{ marginRight: 8 }} onClick={() => {
              setModal(false)
              dispatch(orderDeleteAction({ id: selectedValue }, payload))
              setSelectedValue(null)
            }}>Delete</button>
            <button onClick={() => {
              setSelectedValue(null)
              setModal(false)
            }}>Cancel</button>
          </div>
        ]}

        className="delete-category-modal"
      >
        <div className="delete-category-modal-text">Are you sure to delete this order?</div>
      </Modal>
    </DashboardLayout>
  );
};
