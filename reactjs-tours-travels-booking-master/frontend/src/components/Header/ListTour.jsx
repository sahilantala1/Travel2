import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { BASE_URL } from "../../utils/config.js";
import useFetch from "../../hooks/useFetch.js";
import TourCard2 from "./TourCard2.jsx";

const ListTour = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const [reload, setReload] = useState(false);
  const {
    data: tours,
    loading,
    error,
    refetch,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  const handleDeleteTour = async (tourId) => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        refetch();

        setReload(true);
      } else {
        console.error("Failed to delete tour. Status:", response.status);
      }
    } catch (error) {
      console.error("Failed to delete tour:", error);
    }
  };
  useEffect(() => {
    if (reload) {
      const timeout = setTimeout(() => {
        setReload(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [reload]);

  return (
    <>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">LOADING..........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard2
                    tour={tour}
                    onDelete={() => handleDeleteTour(tour._id)}
                  />
                </Col>
              ))}
            </Row>
          )}
          <Row>
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ListTour;
