import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import moment from "moment";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import { Select } from "antd";

const { Option } = Select;

export default function AdminBookings() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Processed",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (auth?.token) getBookings();
  }, [auth?.token]);

  const getBookings = async () => {
    try {
      const { data } = await axios.get("/all-bookings");
      // console.log("allbookings",data);
      setBookings(data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (bookingId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/booking-status/${bookingId}`, {
        status: value,
      });
      getBookings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-blue text-white">Bookings</div>

            {bookings?.map((o, i) => {
              return (
                <div
                  key={o._id}
                  className="border shadow bg-light text-black rounded-4 mb-5"
                >
                  <div class="table-responsive">
                    <table class="table table-striped 
                    table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Booked</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length} products</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="container">
                    <div className="row m-2">
                      {o?.products?.map((p, i) => (
                        <ProductCardHorizontal key={i} p={p} remove={false} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
