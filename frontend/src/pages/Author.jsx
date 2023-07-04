import AutoPortrait from "../assets/HCNMT_autoportrait.jpg";

export default function Author() {
  return (
    <div className="author">
      <img
        src={AutoPortrait}
        alt="Auto-portait-author"
        className="img-author "
      />
      <div className="author-paint">
        <h2>Hippolyte Charles Napoléon MORTIER Duc de Trévise</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
          laboriosam eligendi atque nesciunt aliquam ad beatae reiciendis
          possimus iste! Ipsa ad eum ipsum dignissimos, similique esse aperiam
          saepe.
        </p>
      </div>
    </div>
  );
}
