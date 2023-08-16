import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "../style";

const CoinsCard = ({ coins }) => {
  const [coinsTotal, setCoinsTotal] = useState(0);

  useEffect(() => {
    setCoinsTotal(coins);
  }, [coins]);

  return (
    <div className="flex justify-between flex-col px-5 py-5 rounded-[30px] bg-white max-w-[380px] mx-5 my-6 popup-effect">
        <h4 className="font-poppins font-semibold text-[18px] text-gray-400 overflow-hidden">Total coins</h4>
      <p>{coinsTotal}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  coins: state.profile.coins,
});

export default connect(mapStateToProps)(CoinsCard);
