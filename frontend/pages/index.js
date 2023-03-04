import Head from "next/head";
import Link from "next/link";
import { Button } from "@mantine/core";
export default function Home() {
  return (
    <>
      <main className="main">
        <section className="home container" id="home">
          <div className="swiper home-swiper">
            <div className="swiper-wrapper">
              <section className="swiper-slide">
                <div className="home__content grid">
                  <div className="home__group">
                    <img
                      src="https://assets.codepen.io/7773162/home2-img.png"
                      alt=""
                      className="home__img"
                    />
                    <div className="home__indicator"></div>
                    <div className="home__details-img">
                      <h4 className="home__details-title">Copy popular investment strategies</h4>
                      <span className="home__details-subtitle">
                        or let others follow in your footsteps
                      </span>
                    </div>
                  </div>
                  <div className="home__data">
                    <h3 className="home__subtitle"></h3>
                    <h1 className="home__title">
                      CREATE <br /> YOUR OWN <br /> INDEX FUND{" "}
                    </h1>
                    <p className="home__description">
                      Combine multiple cryptocurrencies into one. Gain exposure for all of them with one token. {" "}
                    </p>
                    <div className="home__buttons">
                      <Link href="/create-index-token">
                        <Button color="dark" radius="md" size="lg">
                          Create Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              <section className="swiper-slide">
                <div className="home__content grid">
                  <div className="home__group">
                    <img
                      src="https://assets.codepen.io/7773162/home1-img.png"
                      alt=""
                      className="home__img"
                    />
                    <div className="home__indicator"></div>
                    <div className="home__details-img">
                      <h4 className="home__details-title">The Labu “Reiza”</h4>
                      <span className="home__details-subtitle">
                        The Living Pumpkin
                      </span>
                    </div>
                  </div>
                  <div className="home__data">
                    <h3 className="pumpkin__subtitle">
                      #2 Top Scariest Ghost 2020
                    </h3>
                    <h1 className="home__title">
                      UOOOO <br /> TRICK OR <br /> TREAT!!{" "}
                    </h1>
                    <p className="home__description">
                      Hi I&apos;m Reiza, people call me “The Labu” currently
                      I&apos;m trying to learn something new, building my own
                      bike with parts only made from Malaysia.{" "}
                    </p>
                    <div className="home__buttons">
                      <Link href="/create-index-token">
                        <Button color="red" radius="md" size="lg">
                          Create Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              <section className="swiper-slide">
                <div className="home__content grid">
                  <div className="home__group">
                    <img
                      src="https://assets.codepen.io/7773162/home3-img.png"
                      alt=""
                      className="home__img"
                    />
                    <div className="home__indicator"></div>
                    <div className="home__details-img">
                      <h4 className="home__details-title">Captain Sem</h4>
                      <span className="home__details-subtitle">
                        Veteran Spooky Ghost
                      </span>
                    </div>
                  </div>
                  <div className="home__data">
                    <h3 className="home__subtitle">#3 Top Scariest Ghost</h3>
                    <h1 className="home__title">
                      RESPAWN <br /> THE SPOOKY <br /> SKULL{" "}
                    </h1>
                    <p className="home__description">
                      In search for cute little puppy, Captain Sem has come back
                      from his tragic death. With his hogwarts certified power
                      he promise to be a hero for all of ghostkind.{" "}
                    </p>
                    <div className="home__buttons">
                      <Link href="/create-index-token">
                        <Button color="red" radius="md" size="lg">
                          Create Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </section>

        {/* Section Category */}
        { <section className="section category">
          <h1 className="section__title">
            Popular Indexes by Sector{" "}
          </h1>
          <div className="category__container container grid">
            <div className="category__data">
              <img
                src="https://assets.codepen.io/7773162/category1-img.png"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Metaverse Index</h3>
              <p className="category__description">
                Composition: APE, ICP, STX, MANA, THETA, AXS, SAND
              </p>
            </div>
            <div className="category__data">
              <img
                src="https://assets.codepen.io/7773162/category2-img.png"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">DeFi Pulse Index</h3>
              <p className="category__description">
                Composition: UNI, LINK, MKR, FXS, SNX, CAKE, CRV, CVX, DYDX, YFI, COMP
              </p>
            </div>
            <div className="category__data">
              <img
                src="https://assets.codepen.io/7773162/category3-img.png"
                alt=""
                className="category__img"
              />
              <h3 className="category__title">Liquid Staking Index</h3>
              <p className="category__description">
                STETH, RETH, FRXETH, MSOL, SAVAX, AKRETH
              </p>
            </div>
          </div>
        </section> }

        <section className="section about" id="about">
          <div className="about__container container grid">
            <div className="about__data">
              <h2 className="section__title about__title">
                Best Performing Index <br /> this month{" "}
                <br/> +19%
              </h2>
             
              <p className="about__description">
                Night of all the saints, or all the dead, is celebrated on
                October 31 and it is a very fun international celebration, this
                celebration comes from ancient origins, and is already
                celebrated by everyone.{" "}
              </p>

              <Link href="/create-index-token">
                <Button color="dark" radius="md" size="lg">
                  Buy on SpookySwap
                </Button>
              </Link>
            </div>
            <img
              //   src="https://assets.codepen.io/7773162/about-img.png"
              src="https://i.ibb.co/Yhk1SQm/businessman.png"
              alt=""
              
            />
          </div>
        </section>

        <section className="section discount">
          <div className="discount__container container grid">
            <div className="discount__data">
              <h2 className="discount__title">
                Create your own index token today! <br />{" "}
              </h2>

              <Link href="/create-index-token">
                <Button color="dark" radius="md" size="lg">
                  Create Now
                </Button>
              </Link>
            </div>
            <img
              src="https://assets.codepen.io/7773162/discount-img.png"
              alt=""
              className="discount__img"
            />
          </div>
        </section>

        {/* <section className="section new" id="view-token">
          <h2 className="section__title">Some Popular Index Tokens</h2>
          <div className="new__container container">
            <div className="swiper new-swiper">
              <div className="swiper-wrapper">
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new1-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Haunted House</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$14.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new2-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Halloween Candle</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$11.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new3-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Witch Hat</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$4.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new4-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Rip</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$24.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new5-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Terrifying Crystal Ball</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$5.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
                <div className="new__content swiper-slide">
                  <img
                    src="https://assets.codepen.io/7773162/new6-img.png"
                    alt=""
                    className="new__img"
                  />
                  <h3 className="new__title">Witch Broom</h3>
                  <span className="new__subtitle">Accessory</span>
                  <div className="new__prices">
                    <span className="new__price">$7.99</span>
                  </div>
                  <button className="button new__button">
                    <i className="bx bx-cart-alt new__icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Link href="#" className="scrollup" id="scroll-up">
        &uarr;
      </Link>
    </>
  );
}
