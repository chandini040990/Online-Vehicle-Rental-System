export default function Jumbotron({
  title,
  subTitle = "Book your ride today...Best Deals available..",
}) {
  return (
    <div
      className="container-fluid jumbotron"
      style={{ marginTop: "-8px", height: "710px" }}
    >
      <div className="row">
        <div className="col text-center p-5">
          <h1 className="fw-bold">{title}</h1>
          <p className="lead">{subTitle}</p>
        </div>
      </div>
    </div>
  );
}
