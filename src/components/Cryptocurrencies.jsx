import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <div>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={crypto.title}
                    src={crypto.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
