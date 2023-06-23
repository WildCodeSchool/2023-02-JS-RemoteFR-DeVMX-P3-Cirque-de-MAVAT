import page404 from "../assets/404.png";

export default function Page404() {
  return (
    <div className="noFound">
      <h2>That page couldn't be found. </h2>
      <div className="p404">
        <img src={page404} alt="Page_quatre_cent_quatre" className="img-404 " />
      </div>
    </div>
  );
}
