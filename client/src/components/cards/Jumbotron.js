export default function Jumbotron({
  title,
  subTitle = "Book your ride today...Best Deals available..",
}) {
  return (
    // <div
    //   className="jumbotron text-white jumbotron-image"
    // // style={{ marginTop: "-8px", height: "710px" }}
    // >
    //   <div className="row">
    //     <div className="col text-center p-5">
    //       <h1 className="fw-bold">{title}</h1>
    //       <p className="lead">{subTitle}</p>
    //     </div>
    //   </div>
    // </div>
    <div className="jumbotron"
      style={{ marginTop: "-8px", backgroundImage: `url('https://i.pinimg.com/736x/25/6f/b3/256fb3fda540d8b3c5ab7888c729610f.jpg')` }}

    >
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col text-center p-5">
            <h1 className="fw-bold text-white">{title}</h1>
            <p className="lead">{subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
