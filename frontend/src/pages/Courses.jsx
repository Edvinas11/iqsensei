import React, { useEffect, useState } from "react";
import styles from "../style";
import { Navbar } from "../components";
import { getAllCourses } from "../actions/course";
import { connect } from "react-redux";
import { CourseCard } from "../components";

const Courses = ({ getAllCourses }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCourses();
        console.log(response);
        setCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [getAllCourses]);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex flex-row justify-between items-center w-full p-10">
            <h1 className="flex-1 font-poppins font-semibold text-black text-[52px] ss:leading-[100.8px] leading-[75px]">
              Featured Courses
            </h1>
          </div>
          <div className='flex flex-wrap items-center justify-start w-full feedback-container relative'>
            {courses.map((course) => (
                <CourseCard key={course.course_id} {...course} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getAllCourses })(Courses);
