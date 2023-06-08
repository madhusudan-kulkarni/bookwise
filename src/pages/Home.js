import { useDataContext } from "../context/dataContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { heroImage } from "../constants/heroImage";

export function Home() {
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
