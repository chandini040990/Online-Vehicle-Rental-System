import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";
import moment from "moment";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import jsPDF from 'jspdf';


export default function UserBookings() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [bookings, setBookings] = useState([]);

  // state

  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const { data } = await axios.get("/bookings");
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getInvoice = async (bookingId) => {
    try {
      const { data } = await axios.get(`/invoice/${bookingId}`);
      setInvoices(data);
      // console.log("invoices", invoices)
      // if (invoices !== '') {
      handleDownloadPDF(invoices);
      // }

    } catch (err) {
      console.log(err);
    }
  };


  const handleDownloadPDF = () => {

    const pdf = new jsPDF();
    pdf.text('***************************          Invoice           ******************************', 20, 20);

    // Add items to PDF
    {
      invoices.forEach((invoice, index) => {
        const yPos = 30 + index * 10;
        pdf.text(

          `Booking Details: 

        Booking ID                 : ${invoice._id}
    
        Booking Status             : ${invoice?.status}
        Payment                    : ${invoice?.payment.transaction.amount}

        Customer Details:
        Name                       : ${invoice?.buyer.name} 
        Email                      : ${invoice?.buyer.email} 


    ----------------------------------------------------------------------------------------------`, 20, yPos);
        {
          invoice?.productData.forEach((prod, index) => {
            const yPos1 = 120 + index * 80;
            pdf.text(

              `Vehicle Details:

          Brand                      : ${prod?.brand}
          Name                       : ${prod?.name}
          Plate Number               : ${prod?.plateNumber}
          Booking From               : ${prod?.booking_from}
          Booking To                 : ${prod?.booking_to}
          Location From              : ${prod?.from_location}
          Location To                : ${prod?.to_location}

    ----------------------------------------------------------------------------------------------`, 20, yPos1);

          });

        }


      });
    }

    // Save the PDF
    pdf.save('invoice.pdf');
  }

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
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
                          <th scope="col">Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length} products</td>
                          <td><button
                            className="btn btn-outline-primary col card-button"
                            style={{
                              borderBottomRightRadius: "5px",
                              borderBottomLeftRadius: "5px",
                            }}
                            onClick={() => {
                              { getInvoice(o._id) };
                            }}
                          >
                            Invoice
                          </button></td>
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
      </div >
    </>
  );
}



