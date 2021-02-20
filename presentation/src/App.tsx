import { Button, Card, Col, PageHeader, Row, Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import "./App.css";
import { Map } from "./Map";
import { historicYield } from "./averageHistoricYield";

function App() {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  const [content, setContent] = useState("");
  const [year, setYear] = useState("2003");

  return (
    <div
      className="App"
      style={{
        maxHeight: "100vh",
        minHeight: "100vh",
        overflowY: "auto",
        overflow: "hidden",
      }}
    >
      <PageHeader title="Crop Yield Stats" subTitle=";)' DROP TABLE Teams;--" />
      <Row>
        <Col span={6}>
          <Card>
            <Typography style={{ textAlign: "left" }}>
              <Title level={5}>Historic Yield: {year}</Title>
              <Paragraph>Some words</Paragraph>
              {Object.entries(historicYield).map((year) => (
                <Button
                  key={year[0]}
                  value={year[0]}
                  onClick={(e) => {
                    setYear((e.target as any).textContent);
                  }}
                >
                  {year[0]}
                </Button>
              ))}
            </Typography>
          </Card>
          <Card>
            <Typography style={{ textAlign: "left" }}>
              <Title level={5}>2020 Predicted Yield: {year}</Title>
              <Button
                key="2020"
                value="2020"
                onClick={(e) => {
                  setYear("2020");
                }}
              >
                2020
              </Button>
            </Typography>
          </Card>
        </Col>
        <Col span={18}>
          <Card
            style={{
              minHeight: "calc((100vh - 54px)/1.5)",
              maxHeight: "calc((100vh - 54px)/1.05)",
              overflow: "hidden",
              maxWidth: "70vw",
            }}
          >
            <Map setContent={setContent} year={year} data={historicYield} />
          </Card>
        </Col>
      </Row>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
