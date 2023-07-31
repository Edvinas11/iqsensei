import React from "react";
import styles from "../style";
import Button from "./Button";
import { coin, star } from "../assets";
import { Link } from "react-router-dom";

const CourseCard = ({ course_id, title, description, rating, price, rating_count }) => {
  return (
    <div className="flex justify-between flex-col px-5 py-5 rounded-[30px] bg-transparent max-w-[380px] mx-5 my-5 course-card">
      <div className="flex flex-row absolute mt-3 ml-8 items-center justify-center">
        <img src={star} alt="star" className="w-[20px] h-[20px] object-contain mr-1"/>
        <p className={`${styles.paragraph} text-base mt-1 mr-1`}>{rating}</p>
        <p className={`${styles.paragraph} text-stone-400 text-base mt-1`}>({rating_count})</p>
      </div>

      <Link to={`/course/${course_id}`}>
        <div className="flex flex-col px-8 py-12 bg-white rounded-[15px] h-[400px]">
          <h4 className="font-poppins font-semibold text-[32px] text-black mb-4">
            {title}
          </h4>
          <p className={`${styles.paragraph} text-base mb-10`}>{description}</p>
        </div>
      </Link>
      
      <div className="flex items-center justify-between my-2">
        <div className="flex flex-row items-center bg-white rounded-[15px] px-2 py-2 mt-5">
          <p className={`${styles.paragraph} text-base pr-2`}>Unlocks For</p>
          <img src={coin} alt="coin" className="w-[30px] h-[30px] object-contain pr-2"/>
          <span className="text-3xl font-bold font-poppins text-black">{price}</span>
        </div>
        <Button
          type="submit"
          color="white"
          bgColor="#8c52ff"
          text="Unlock"
          borderRadius="10px"
          styles={`px-10 mt-5`}
        />
      </div>
    </div>
  );
};

export default CourseCard;
