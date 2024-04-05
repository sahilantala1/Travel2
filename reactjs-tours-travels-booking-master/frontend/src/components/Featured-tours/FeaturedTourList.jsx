import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from "./../../hooks/useFetch";
import { BASE_URL } from "./../../utils/config";
import "./Featured.css";

const FeaturedTourList = () => {
  const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours`);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    console.error("Error fetching featured tours:", error);
    return <h4>Error loading featured tours. Please try again later.</h4>;
  }

  if (!featuredTours || featuredTours.length === 0) {
    return <h4>No featured tours available.</h4>;
  }

  console.log("Featured Tours:", featuredTours);

  return (
    <>
      <h2 className="Heading">Flights And Hotels</h2>
      {featuredTours.map((tour) => (
        <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
