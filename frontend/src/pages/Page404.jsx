import page404 from "../assets/404.png";

export default function Page404() {
  return (
    <div className="noFound">
      <h2>
        Tu t'es égaré. "Ti pa, ti pa n'arrivé !" Doucement mais sûrement, on va
        y arriver !
      </h2>
      <div className="p404">
        <img src={page404} alt="Page_quatre_cent_quatre" className="img-404 " />
      </div>
    </div>
  );
}
