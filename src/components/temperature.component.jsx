import React from "react";
import AnimatedNumber from "animated-number-react";


const Temperature = (props) => {
	const { temp_c, maxtemp_c, mintemp_c } = props.data;
	
	const formatValue = (value) => value.toFixed(0);
	
	return (<div className="temperature">
		<div className="temperature__deg">
			<AnimatedNumber
				value={ parseInt(temp_c) }
				formatValue={ formatValue }
			/>
		</div>
		<div className="temperature__wrap">
			<div className="temperature__mesure">&deg;C</div>
			
			<div className="temperature__box">
				<div className="temperature__max">
					<span className="temperature__mark">{ '\u2191' }</span>
					<p className="temperature__text">
						<AnimatedNumber
							value={ parseInt(maxtemp_c) }
							formatValue={ formatValue }
						/>
					</p>
					<span className="temperature__unit">&deg;C</span>
				</div>
				<div className="temperature__min">
					<span className="temperature__mark">{ '\u2193' }</span>
					<p className="temperature__text">
						<AnimatedNumber
							value={ parseInt(mintemp_c) }
							formatValue={ formatValue }
						/>
					</p>
					<span className="temperature__unit">&deg;C</span>
				</div>
			</div>
		
		</div>
	</div>);
}


export default Temperature;