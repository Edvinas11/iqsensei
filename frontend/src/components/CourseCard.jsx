import React from "react";
import styles from "../style";

const CourseCard = ({ title, description, rating, price }) => {
  return (
    <div className="flex justify-between flex-col px-10 py-12 rounded-[20px] bg-white max-w-[370px] mx-10 my-5 box-shadow">
      <h4 className="font-poppins font-semibold text-[32px] text-black mb-4">
        {title}
      </h4>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p className={`${styles.paragraph} text-base mb-2`}>{description}</p>
          <p className={`${styles.paragraph} text-base mb-2`}>Rating: {rating}</p>
          <p className={`${styles.paragraph} text-base mb-2`}>Price: {price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
