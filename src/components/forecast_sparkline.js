import _ from 'lodash';
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine }  from 'react-sparklines';

function average(data) {
  return _.round(_.sum(data) / data.length);
}

export default (props) => {
  return (
    <div>
      <Sparklines data={props.data} height={145}>
        <SparklinesLine color={props.color}/>
        <SparklinesSpots style={{ fill: props.color }}/>
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div className="notation">
        Average maximum daily temperature: {props.data && average(props.data)}{"\u2103"}
      </div>
    </div>
  );
}
