import React, { useState, useEffect } from "react";
import AuthService from "./Services/AuthService";

const initialFormState = {
  from: "",
  to: "",
  selected_options: [],
};
export default function EcstasySaleReview() {
  const [salesReviews, setSalesReviews] = useState([]);
  const [salesReviewsData, setSalesReviewsdata] = useState(initialFormState);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSalesReviewsdata({
      ...salesReviewsData,
      [name]: value,
    });
  };

  useEffect(() => {
    getSalesReview();
  }, []);

  const getSalesReview = () => {
    var selectedOptions = [
      "total_mtn_sme",
      "total_mtn_dc",
      // "total_mtn_direct",
      "total_mtn_airtime",
      // "total_mtn_cg",
    ];
    const data = {
      from: "2023-12-12",
      to: "2024-11-01",
      selected_options: selectedOptions,
    };
    setSalesReviews([]);
    // console.log("data", data);
    AuthService.getSalesReview(data)
      .then((response) => {
        setSalesReviews(response?.data?.data);
        console.log("getSalesReview", salesReviews);
      })
      .catch((error) => {
        console.log("getSalesReview error", error.response.data.error);
      });
  };
  return (
    <div>
      <h2>MTN Sales Reviews</h2>
      <button onClick={getSalesReview}>View Sales Review</button>
      <hr />
      {salesReviews && salesReviews.length >= 1 ? (
        <div>
          <strong>Total MTN</strong>:{" "}
          {salesReviews && salesReviews["total_mtn"]}
          <br />
          <strong>Total MTN Airtime</strong>:{" "}
          {salesReviews && salesReviews["total_mtn_airtime"]}
          <br />
          <strong>Total MTN SME</strong>:{" "}
          {salesReviews && salesReviews["total_mtn_sme"]}
          <br />
          <strong>Total MTN DC</strong>:{" "}
          {salesReviews && salesReviews["total_mtn_dc"]}
          <br />
          <strong>Total MTN Direct</strong>:{" "}
          {salesReviews && salesReviews["total_mtn_direct"]}
          <br />
          <strong>Total MTN CG</strong>:{" "}
          {salesReviews && salesReviews["total_mtn_cg"]}
          <br />
        </div>
      ) : (
        "Loading MTN sales review"
      )}
    </div>
  );
}
