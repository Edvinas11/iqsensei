import React, { useEffect, useState } from "react";
import styles from "../style";
import { Navbar } from "../components";
import { getAllCourses } from "../actions/course";
import { connect } from "react-redux";
import { CourseCard } from "../components";
import { coursesFilterCategories } from "../constants";

const Courses = ({ getAllCourses }) => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("descending");

  // Function to handle filtering based on selected category
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  // Function to handle sorting based on selected category
  const handleSortChange = () => {
    setSortOrder(sortOrder === "descending" ? "ascending" : "descending");
  };

  // Filter and sort the courses based on the selected category and sort order
  const filteredAndSortedCourses = courses.slice().sort((a, b) => {
    switch (filter) {
      case "price":
        return sortOrder === "ascending" ? a.price - b.price : b.price - a.price;
      case "rating":
        return sortOrder === "ascending" ? a.rating - b.rating : b.rating - a.rating;
      default:
        return 0; // No filter, maintain original order
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCourses();
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

      <div className={`bg-primary ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex flex-row justify-between items-center w-full p-10">
            <h1 className="flex-1 font-poppins font-semibold text-black text-[52px] ss:leading-[100.8px] leading-[75px]">
              Featured Courses
            </h1>
          </div>

          <div className="flex flex-row justify-between items-center w-full px-10 pb-10">
            <ul className="list-none items-center flex flex-row">
              {coursesFilterCategories.map((category) => (
                <li 
                  className={`font-poppins font-normal cursor-pointer text-[16px] mr-10`} 
                  key={category.id}
                  onClick={() => handleFilterChange(category.id)} // Handle filter change when a category is clicked
                >
                  <span className={`${filter === category.id ? "text-secondary" : "text-black"} hover:text-secondary`}>{category.title}</span>
                </li>
              ))}
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 hover:text-secondary`}
                onClick={handleSortChange} // Toggle the sort order when this element is clicked
              >
                Toggle Sort Order
              </li>
            </ul>
          </div>

          <div className='flex flex-wrap items-center justify-center w-full feedback-container relative'>
            {filteredAndSortedCourses === undefined || filteredAndSortedCourses?.length === 0 ? (
              <p className={`${styles.paragraph} text-base pr-2`}>No courses at the moment.</p>
            ) : (
              filteredAndSortedCourses?.map((course) => (
                <CourseCard key={course.course_id} {...course} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getAllCourses })(Courses);
