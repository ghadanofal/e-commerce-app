import React from "react";
import Category from "../category/Category";
import './home.css'

export default function Home() {
  return (
    <>
      
      <section id="hero">
        <h4 className="">trade-in-offer</h4>
        <h3>super value deals</h3>
        <h1>On all products</h1>
        <p>Save with more copoun and up to 60% off!!</p>
        <button>shop now</button>
      </section>
      <Category />
    </>
  );
}
