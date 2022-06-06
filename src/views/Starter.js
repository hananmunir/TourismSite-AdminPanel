import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-success text-success'
            title='Profit'
            subtitle='Yearly Earning'
            earning='$21k'
            icon='bi bi-wallet'
          />
        </Col>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-danger text-danger'
            title='Refunds'
            subtitle='Refund given'
            earning='$1k'
            icon='bi bi-coin'
          />
        </Col>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-warning text-warning'
            title='New Project'
            subtitle='Total Trips Conducted'
            earning='57'
            icon='bi bi-basket3'
          />
        </Col>
        <Col sm='6' lg='3'>
          <TopCards
            bg='bg-light-info text-into'
            title='Sales'
            subtitle='Trips This Month'
            earning='17'
            icon='bi bi-bag'
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col xxl='12'>
          <SalesChart />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
