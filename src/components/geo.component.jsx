import React from "react";


const Geo = (props) => {
	const { name,region,country,localtime } = props.data;
	return (<div className="geo">
		<div className="geo__location">
			{ name },{region},{country}
		</div>
		<div className="geo__date">{ localtime.substring(0,10) }</div>
	</div>);
}


export default Geo;
