import React from "react";
import styles from "../style";
import Button from "./Button";
import { coin, star } from "../assets";
import { Link } from "react-router-dom";

const CourseCard = ({
  course_id,
  title,
  short_description,
  rating,
  price,
  rating_count,
  image,
}) => {
  return (
    <div className="flex justify-between flex-col px-5 py-5 rounded-[30px] bg-transparent max-w-[380px] mx-5 my-6 course-card">
      <div className="flex flex-col px-8 py-8 justify-center bg-white rounded-[15px] h-[650px]">
        <Link to={`/course/${course_id}`}>
          <div>
            <div className="rounded-[15px] overflow-hidden items-center justify-center">
              <img
                src={image}
                alt="image"
                className="w-[100%] h-[100%] object-contain"
              />
            </div>
            <h4 className="font-poppins font-semibold text-[32px] text-black mt-3">
              {title}
            </h4>
            <div className="flex flex-row items-center mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={index}
                  src={star}
                  alt="star"
                  className="w-[20px] h-[20px] object-contain mr-1"
                />
              ))}
              <p className={`${styles.paragraph} text-base mt-1 mr-1`}>
                {rating}
              </p>
              <p className={`${styles.paragraph} text-stone-400 text-base mt-1`}>
                ({rating_count})
              </p>
            </div>
            <p className={`${styles.paragraph} text-base mt-2 pb-10 mb-2`}>
              {short_description}
            </p>
          </div>
        </Link>
        <Button
          type="submit"
          color="white"
          bgColor="#8c52ff"
          text={`Unlock For ${price}`}
          borderRadius="10px"
          styles={`px-10 mt-2`}
        />
      </div>
    </div>
  );
};

export default CourseCard;
