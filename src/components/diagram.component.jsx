import React, { Fragment} from "react";
import { Card, Image, Table } from "react-bootstrap";

const Diagram = (props) => {
  const { forecastday, loaded } = props.data;
  const { hour } = forecastday[0];
 

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
