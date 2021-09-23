import React, { Fragment, useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import themeColorList from "../utils/themeColorList.json";
import { ThemeContext } from "../hock-context/themeContext";
import { Card, Image, Table } from "react-bootstrap";

const Diagram = (props) => {
  const { forecastday, loaded } = props.data;
  const { hour } = forecastday[0];
  const [colorBg, setColorBg] = useState("#fff");
  const [colorText, setColorText] = useState("#495758");
  const [colorPrimary, setColorPrimary] = useState("#1fa69d");
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    try {
      // get data theme from json
      const findTheme = themeColorList.filter(
        (themeColor) => themeColor.theme === theme
      )[0];

      setColorBg(findTheme.bg);
      setColorText(findTheme.text);
      setColorPrimary(findTheme.primary);
    } catch (err) {
      // read data-theme styles variables from body :root index.html
      const getLinkOnBody = document.body;
      const getCssVarContainer = getComputedStyle(getLinkOnBody);

      setColorBg(getCssVarContainer.getPropertyValue("--color-bg"));
      setColorText(getCssVarContainer.getPropertyValue("--color-text"));
      setColorPrimary(getCssVarContainer.getPropertyValue("--color-primary"));
    }
  }, [loaded, theme]);

  return (
    <Fragment>
      <div className="diagram">
        {hour &&
          hour.map((ele, index) => {
            return (
              <Card key={index} style={{ textAlign: "center" }}>
                <Card.Header>{ele.time.substring(11, 16)}</Card.Header>
                <Card.Body>
                  <Image src={ele.condition.icon} />
                  {ele.temp_c}°C
                </Card.Body>
              </Card>
            );
          })}
      </div>
      <div style={{display:"grid"}}>
        <Table striped bordered hover>
          <thead>
              {forecastday && forecastday.map((ele,index)=>{
				  return(
					  <tr>
					{index===0 ? <th>Today</th> : <th>{ele.date}</th>}
					<th><Image src={ele.day.condition.icon} /></th>
					<th>{ele.day.maxtemp_c}/{ele.day.mintemp_c}&deg;C</th>
					</tr>
				  )
			  })}
           
          </thead>
          <tbody>
            
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default Diagram;
