import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { millify } from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptosDetailsQuery,
  useGetCryptosHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptosHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Typography.Title lever={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.slug}) Price
          </Typography.Title>
          <p>
            {cryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Time Period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Select.Option key={date}>{date}</Select.Option>
          ))}
        </Select>

        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />

        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value=statistics-heading">
              <Typography.Title level={3} className="coin-dtailes-heading">
                {cryptoDetails.name} Value Statistics
              </Typography.Title>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Typography.Text>{icon}</Typography.Text>
                  <Typography.Text>{title}</Typography.Text>
                </Col>
                <Typography.Text className="stats">{value}</Typography.Text>
              </Col>
            ))}
          </Col>

          <Col className="other-stats-info">
            <Col className="coin-value=statistics-heading">
              <Typography.Title level={3} className="coin-dtailes-heading">
                Other Statistics
              </Typography.Title>
              <p>An overview showing the stats of all cryptocurrencies</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Typography.Text>{icon}</Typography.Text>
                  <Typography.Text>{title}</Typography.Text>
                </Col>
                <Typography.Text className="stats">{value}</Typography.Text>
              </Col>
            ))}
          </Col>
        </Col>

        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Typography.Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
            </Typography.Title>
          </Row>
          <Col className="coin-links">
            <Typography.Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Typography.Title>
            {cryptoDetails.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Typography.Title level={5} className="link-name">
                  {link.type}
                </Typography.Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </div>
  );
};

export default CryptoDetails;
