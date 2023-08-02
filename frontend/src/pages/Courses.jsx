import React, { useEffect, useState } from "react";
import styles from "../style";
import { Navbar } from "../components";
import { getAllCourses } from "../actions/course";
import { connect } from "react-redux";
import { CourseCard } from "../components";
import { coursesFilterCategories } from "../constants";
import { fetchImage } from "../actions/imageFetch";

const Courses = ({ getAllCourses }) => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("descending");
  const [imageSourceUrls, setImageSourceUrls] = useState("");

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
        return sortOrder === "ascending"
          ? a.price - b.price
          : b.price - a.price;
      case "rating":
        return sortOrder === "ascending"
          ? a.rating - b.rating
          : b.rating - a.rating;
      default:
        return 0; // No filter, maintain original order
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response);

        // Fetch images for all courses
        const imagePromises = response.map(async (course) => {
          const image = await fetchImage(course.image);
          return URL.createObjectURL(image);
        });
        
        // Wait for all image promises to resolve
        const images = await Promise.all(imagePromises);
        setImageSourceUrls(images);
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
            <ul className="list-none items-center flex justify-center flex-row">
              {coursesFilterCategories.map((category) => (
                <li
                  className={`font-poppins font-normal cursor-pointer text-[16px] mr-10`}
                  key={category.id}
                  onClick={() => handleFilterChange(category.id)} // Handle filter change when a category is clicked
                >
                  <span
                    className={`${
                      filter === category.id ? "text-secondary" : "text-black"
                    } hover:text-secondary`}
                  >
                    {category.title}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-row items-center justify-center">
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={handleSortChange}
                  checked={sortOrder === "ascending"}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
              <span className="ml-2 mt-1 text-sm font-poppins text-[16px] font-medium text-gray-900 dark:text-gray-300">
                Toggle Sort
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center w-full feedback-container relative">
            {filteredAndSortedCourses === undefined ||
            filteredAndSortedCourses?.length === 0 ? (
              <p className={`${styles.paragraph} text-base pr-2`}>
                No courses at the moment.
              </p>
            ) : (
              filteredAndSortedCourses?.map((course, index) => (
                <CourseCard
                  key={course.course_id}
                  {...course}
                  image={imageSourceUrls[index]}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getAllCourses })(Courses);
