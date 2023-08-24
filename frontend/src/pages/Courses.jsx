import React, { useEffect, useState } from "react";
import styles from "../style";
import { Navbar } from "../components";
import { getAllCourses } from "../actions/course";
import { connect } from "react-redux";
import { CourseCard } from "../components";
import { coursesFilterCategories } from "../constants";
import { fetchImage } from "../actions/imageFetch";
import { load_user } from "../actions/profile";

const Courses = ({ getAllCourses }) => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("descending");
  const [imageSourceUrls, setImageSourceUrls] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
        const response = await getAllCourses();

        if(response === null){
          setNotFound(true);
        } else {
          setCourses(response);

          // Fetch images for all courses
          const imagePromises = response.map(async (course) => {
            const image = await fetchImage(course.image);
            return {
              course_id: course.course_id,
              url: URL.createObjectURL(image),
            };
          });

          // Wait for all image promises to resolve
          const images = await Promise.all(imagePromises);
          setImageSourceUrls(images);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [getAllCourses]);

  if(notFound){
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
              <p>Courses not available or not found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (loading) {
    return (
      <React.Fragment>
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-gray-100"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </React.Fragment>
    );
  }
  return loading === false ? (
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
              filteredAndSortedCourses?.map((course) => {
                // Find the corresponding image URL for the current course
                const imageUrlObj = imageSourceUrls.find(
                  (item) => item.course_id === course.course_id
                );

                if (!imageUrlObj) {
                  // If image URL not found for some reason, handle it here
                  // For example, you can show a placeholder image
                  return <CourseCard key={course.course_id} {...course} />;
                }

                return (
                  <CourseCard
                    key={course.course_id}
                    {...course}
                    image={imageUrlObj.url}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default connect(null, { getAllCourses })(Courses);
