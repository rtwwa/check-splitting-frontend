import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fakeApi from "../api/fakeApi";
import OrderAssignment from "../components/OrderAssignment";

const test = {
  name: "Pizza Margherita",
  numberServings: 2,
  price: 450,
  total: 900,
};

const FormedCheck = () => {
  return (
    <div>
      <OrderAssignment />
    </div>
  );
};

export default FormedCheck;
