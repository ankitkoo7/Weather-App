import React from "react";
import AnimatedNumber from "animated-number-react";

const Detail = (props) => {
	const { text, icon, wind_kph, humidity, pressure_mb } = props.data;
	
	const formatValue = (value) => value.toFixed(0);
	
	return (<div className="detail">
		<div className="detail__wrap">
          <span className="detail__icon">
            <img src={icon}/>
          </span>
			<div className="detail__description">
				{ text }
			</div>
		</div>
		
		<div className="detail__box">
			<div className="detail__indicator">
				<div className="detail__info">
					<AnimatedNumber
						value={ parseFloat(wind_kph) }
						formatValue={ (value) => value.toFixed(2) }
					/>
					<span className="detail__measure">km/s</span>
				</div>
				<div className="detail__name">wind speed</div>
			</div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					<AnimatedNumber
						value={ parseInt(humidity) }
						formatValue={ formatValue }
					/>
					<span className="detail__measure">%</span>
				</div>
				<div className="detail__name">humidity</div></div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					<AnimatedNumber
						value={ parseInt(pressure_mb) }
						formatValue={ formatValue }
					/>
					<span className="detail__measure">hpa</span>
				</div>
				<div className="detail__name">pressure</div>
			</div>
		</div>
	
	</div>);
}


export default Detail;