import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeCarousel from "../../components/home/Carousel/Carousel";
import BannerBox from "../../components/home/BannerBox/BannerBox";
import { BtnBlack } from "../../components/shared/button/CustomBtn2";
import ProductCard from "../../components/shared/card/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getBestSellingProduct } from "../../app/productSlice";

export default function Home(props) {
  const [categories, setCategories] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const dispatch = useDispatch();
  const categoryResult = useSelector((state) => state.category.categoryResult);
  useEffect(() => {
    setCategories(categoryResult);
    const loadData = async () => {
      await loadBestSeller();
    };
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadBestSeller = async () => {
    const actionResult = await dispatch(
      getBestSellingProduct({ PageSize: 4, PageIndex: 1 })
    );
    const bestSellerProducts = await unwrapResult(actionResult).result.items;
    await setBestSelling(bestSellerProducts);
  };

  const suppliers = [
    {
      name: "",
      img: "img/company-logo/company-logo-1.png",
    },
    {
      name: "",
      img: "img/company-logo/company-logo-2.png",
    },
    {
      name: "",
      img: "img/company-logo/company-logo-3.png",
    },
    {
      name: "",
      img: "img/company-logo/company-logo-4.png",
    },
    {
      name: "",
      img: "img/company-logo/company-logo-5.png",
    },
    {
      name: "",
      img: "img/company-logo/company-logo-6.png",
    },
  ];

  return (
    <>
      {/*Carousel section*/}
      <HomeCarousel />
      {/*Banner Section*/}
      <div className="banner mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-12">
              <BannerBox
                src={
                  process.env.PUBLIC_URL +
                  "/img/banner/banner-home-1-img-1-wide.jpg"
                }
                textTop="Green vegetable"
                bannerLarge="100% ORGANIC"
                textBottom="Healthy Nutrition"
              />
            </div>
            <div className="col-md-6 col-12">
              <BannerBox
                src={
                  process.env.PUBLIC_URL +
                  "/img/banner/banner-home-1-img-2-wide.jpg"
                }
                textTop="sale off 50%"
                bannerLarge="Spinach"
                textBottom="Healthy Food"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Best Seller section*/}
      <div className="bestSeller m-t-100">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="bestSeller__header d-flex justify-content-between m-b-20">
                <h2 className="bestSeller__header-title ">Best Seller</h2>
                <div className="bestSeller__header-filter"></div>
              </div>
            </Col>
          </Row>
          <Row lg={4} md={3} xs={2}>
            {bestSelling &&
              bestSelling.map((product, index) => (
                <Col xs={12} sm={12} md={6} lg={3} key={index}>
                  <ProductCard
                    productName={product.name}
                    rate={product.averageRate}
                    price={product.unitPrice}
                    imgUrl={`img/product/product/${product?.pictures[0]?.fileName}`}
                    productId={product.id}
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
      {/*  Discount banner section*/}
      <div className="discountBanner m-t-100 position-relative">
        <div className="discountBanner__bg">
          <img
            src={
              process.env.PUBLIC_URL +
              "img/banner/size-extra-large-wide/banner-home-1-img-1-extra-large-wide.jpg"
            }
            alt=""
          />
        </div>
        <div className="discountBanner__box">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="banner__content banner__content-center position-absolute">
                  <h6 className="banner__subtitle">Special Discount</h6>
                  <h2 className="banner__title font-weight-bold">
                    Đơn hàng trên 500.000 VND
                  </h2>
                  <h6 className="banner__subtitle">
                    Giảm ngay <span>20%</span>{" "}
                  </h6>
                  <BtnBlack title={"Shop Now"} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/*  Subscribe section*/}
      <div className="subscribe m-t-100 position-relative">
        <div className="subscribe__bg">
          <img
            src={process.env.PUBLIC_URL + "img/newsletter/newsletter-bg.jpg"}
            alt=""
          />
        </div>
        <div className="subscribe__content position-absolute absolute-center text-center">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="subscribe__title">
                  <h2>Subscribe To Our Newsletter</h2>
                </div>
              </Col>
              <Col xs={{ span: 10, offset: 1 }}>
                <form method="post" action="#" className="subscribe__form">
                  <div className="subscribe__form-content">
                    {/*<label htmlFor="newsletter-mail" className="position-absolute">*/}
                    {/*  <FiMail />*/}
                    {/*</label>*/}
                    <input
                      type="email"
                      name={"newsletter-mail"}
                      id={"newsletter-mail"}
                      placeholder={"Your email address"}
                    />
                    <button
                      className="text-uppercase position-absolute"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/*  Supplier section*/}
      <div className="supplier m-t-100">
        <Container>
          <Row>
            {suppliers.map((supplier, index) => (
              <Col key={index} xs={6} md={4} lg={2}>
                <img src={process.env.PUBLIC_URL + supplier.img} alt="" />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
