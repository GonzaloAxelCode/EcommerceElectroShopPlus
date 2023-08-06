import React, { FC } from "react";
import { connect } from "react-redux";
import Layout from "../../hocs/Layout";
import { ReducersStateType } from "../../redux/reducers";

import { sendDataToArduino, reset_serial } from "../../redux/actions/product";
interface Props {
  sendDataToArduino: any;
  reset_serial: any;
}
const ArduinoPage: FC<Props> = ({ sendDataToArduino, reset_serial }) => {
  const handleClick = () => {
    reset_serial();
    sendDataToArduino("1123");
  };

  return (
    <Layout>
      <div className="m-5">
        <h1>Zona de pruebas</h1>
        <div onClick={handleClick} className="button sm">
          <input type="checkbox" className="check check-toggle" />1
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = (state: ReducersStateType) => ({});

export default connect(mapStateToProps, {
  sendDataToArduino,
  reset_serial,
})(ArduinoPage);
