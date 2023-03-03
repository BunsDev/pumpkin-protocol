import React from "react";
import Link from "next/link";
import { Button } from "@mantine/core";
const about = () => {
  return (
    <section className="section about" id="about">
      <div className="about__container container grid">
        <div className="about__data">
          <h2 className="section__title about__title">
            About Project <br /> Name{" "}
          </h2>
          <p className="about__description">
            Night of all the saints, or all the dead, is celebrated on October
            31 and it is a very fun international celebration, this celebration
            comes from ancient origins, and is already celebrated by everyone.{" "}
          </p>

          <Link href="/create-index-token">
            <Button color="dark" radius="md" size="lg">
              Create Now
            </Button>
          </Link>
        </div>
        <img
          src="https://assets.codepen.io/7773162/about-img.png"
          alt=""
          className="about__img"
        />
      </div>
    </section>
  );
};

export default about;
