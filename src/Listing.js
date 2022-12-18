import { Button, Card, Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getPageListing } from "./util/axios";

const Listing = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [listingData, setListingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getListing = async (pageNumber, pageSize = 10) => {
    const response = await getPageListing({ pageNumber, pageSize });
    if (response && response.status === 200) {
      setTotalCount(response?.data?.data?.totalCount);
      setListingData(response?.data?.data?.data);
    }
  };

  useEffect(() => {
    setIsUserAuthenticated(localStorage.getItem("isUserAuthenticated")? true: false);
    setFirstRender(false);
  }, []);

  const handlePageChange = (selectedPage) => {
    getListing(selectedPage, 10);
  };
  const handleLogout = () =>{
    localStorage.removeItem('isUserAuthenticated')
    window.location.pathname = '/'
  }

  useEffect(() => {
    if (isUserAuthenticated === true) {
        getListing(1, 10);
    }
    else if (!isUserAuthenticated && !firstRender){
        window.location.pathname = "/";
    }
    if(isUserAuthenticated && !!listingData) setLoading(false);
  }, [isUserAuthenticated, firstRender]);

  if (!loading) {
    return (
      <center className="site-card-wrapper">
        <Row>
            <Col span={8} offset={4}>
          <h1>Listing from the Api</h1>
          </Col>
          <Col span={8} offset={4}><Button type="primary" onClick={handleLogout}>Logout</Button></Col>
        </Row>
        <Row gutter={16}>
          {listingData &&
            listingData.map((item) => {
              return (
                <Col key={item.id} span={8} style={{ marginBottom: "10px" }}>
                  <Card title={item.name} bordered={true} size="small">
                    <p>
                    {item.countryId} -- {item.countryName }
                    </p>
                     Is Active -- {item.isActive ? 'true': 'false'}
                  </Card>
                </Col>
              );
            })}
        </Row>
        <Row>
            { totalCount !== 0 &&
          <Pagination
            span={8}
            style={{ display: "flex", margin: "auto" }}
            current={currentPage}
            total={totalCount}
            onChange={handlePageChange}
            showSizeChanger={false}
          />}
        </Row>
      </center>
    );
  }

  return (
    <center>
      <h1>Loading .....</h1>
    </center>
  );
};

export default Listing;
