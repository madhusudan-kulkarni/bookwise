import { useDataContext } from "../context/dataContext";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Home() {
  const heroImage = [
    {
      id: 0,
      image: "/assets/banner-1.jpg",
      _id: "60f7b1b3e6a7b3b4b4f7b1b3",
    },
    {
      id: 1,
      image: "/assets/banner-2.jpg",
      _id: "5f7b1b3e6a7b3b4b4f7b1b3",
    },
    {
      id: 2,
      image: "/assets/banner-3.jpg",
      _id: "4f7b1b3e6a7b3b4b4f7b1b3",
    },
  ];

  const { state, dispatch } = useDataContext();
  const [heroImageId, setHeroImageId] = useState(0);
  const navigate = useNavigate();

  const homePageHandler = (event) => {
    dispatch({ type: "setCategoryHome", payload: event.target.id });
    navigate("/store");
  };

  return (
    <div className="home">
      <div className="hero-container">
        <img
          style={{ cursor: "pointer" }}
          src={heroImage[heroImageId].image}
          onClick={() => navigate(`/store`)}
          alt=""
          className="hero-image"
        ></img>
        <div className="radio-btn">
          {heroImage.map(({ id, image }, index) => {
            if (index === 0) {
              return (
                <input
                  type="radio"
                  className="radio-input accent-color"
                  key={index}
                  name="radio"
                  defaultChecked
                  onChange={(event) => {
                    if (event.target.checked === true) {
                      setHeroImageId(index);
                    }
                  }}
                ></input>
              );
            } else {
              return (
                <input
                  type="radio"
                  className="radio-input accent-color"
                  key={index}
                  name="radio"
                  onChange={(event) => {
                    if (event.target.checked === true) {
                      setHeroImageId(index);
                    }
                  }}
                ></input>
              );
            }
          })}
        </div>
      </div>
      <h2>CATEGORIES</h2>
      <div className="category-container">
        {state.categoryData.map(({ _id, categoryName, image }) => (
          <div className="category-card" key={_id}>
            <p
              className="card-description"
              onClick={homePageHandler}
              id={categoryName}
            >
              {categoryName}
            </p>
          </div>
        ))}
      </div>
      <div
        className="promotion-img-container"
        onClick={() => navigate("/store")}
      >
        <div className="promotion-description-container"></div>
      </div>
    </div>
  );
}
