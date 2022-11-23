import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>

        <div className="profile">
          <img src="https://placeimg.com/640/480/people" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
