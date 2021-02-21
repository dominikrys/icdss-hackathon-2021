import { Button, Card, Col, PageHeader, Row, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import "./App.css";
import { Map } from "./Map";
import { historicYield } from "./averageHistoricYield";
import { ColorScale } from "./colorscale";

function App() {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  const [content, setContent] = useState("");
  const [historicYear, setHistoricYear] = useState("2003");
  const [predictedYear, setPredictedYear] = useState("2020");
  const [showPrediction, setShowPrediction] = useState(false);

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
              <Title level={5}>Historic and predicted corn yield</Title>
              Each datapoint is measured in bushels/acre.
            </Typography> 
            <br />
            <ColorScale />
            <Typography style={{ textAlign: "left" }}>
              For historic data, any county colored red indicates that the dataset did not contain a seperate result for that county. <br />
              For predicted data, we have used red to indicate a county with 0 predicted yield, as our model learnt to predict this from counties with no individual yield.
            </Typography> 
          </Card>
          <Card>
            <Typography style={{ textAlign: "left" }}>
              <Title level={5}>Historic Yield: {historicYear}</Title>
              {Object.entries(historicYield).map((year) => (
                <Button
                  key={year[0]}
                  value={year[0]}
                  onClick={(e) => {
                    setHistoricYear((e.target as any).textContent);
                    setShowPrediction(false);
                  }}
                >
                  {year[0]}
                </Button>
              ))}
            </Typography>
          </Card>
          <Card>
            <Typography style={{ textAlign: "left" }}>
              <Title level={5}>2020 Predicted Yield</Title>
              <Button
                key="2020"
                value="2020"
                onClick={(e) => {
                  setPredictedYear("2020");
                  setShowPrediction(true);
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
              // minHeight: "calc((100vh - 54px)/1.5)",
              // maxHeight: "calc((100vh - 54px)/1.05)",
              height:"calc(100vh-64px)",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            <Map
              setContent={setContent}
              historicYear={historicYear}
              data={historicYield}
              showPrediction={showPrediction}
              predictionYear={predictedYear}
            />
          </Card>
        </Col>
      </Row>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
