import React, { useState, useEffect } from "react";
import styles from "../style";
import { Navbar } from "../components";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse } from "../actions/course";
import { fetchImage } from "../actions/imageFetch";
import { star } from "../assets";

const CourseSummary = ({ getCourse }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageSourceUrl, setImageSourceUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getCourse(courseId);
        if (response === null) {
          setNotFound(true); // Set notFound state to true when course is not available
        } else {
          setCourse(response);

          // fetch course's image
          const image = await fetchImage(response.image);
          setImageSourceUrl(URL.createObjectURL(image));

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [getCourse, courseId]);

  if (notFound) {
    return <p>Course not available or not found.</p>; // Display not found message
  }
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
    <div className="bg-primary w-full overflow-hidden h-full">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex flex-row justify-between items-center w-full p-10">
            <h1 className="flex-1 font-poppins font-semibold text-black text-[52px] ss:leading-[100.8px] leading-[75px]">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div
            className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col rounded-[20px] box-shadow`}
          >
            <div className="flex-1 flex md:flex-row flex-col">
              <img
                src={imageSourceUrl}
                alt="image"
                className="object-contain h-[45%] w-[45%] rounded-[15px] mr-16"
              />
              <div className="flex flex-col justify-center">
                <h2 className={`${styles.heading2} text-black mb-3`}>
                  {course.title}
                </h2>
                <p className={`${styles.paragraph} text-black mb-3`}>
                  {course.short_description}
                </p>
                <div className="flex flex-row items-center mb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img
                      key={index}
                      src={star}
                      alt="star"
                      className="w-[20px] h-[20px] object-contain mr-1"
                    />
                  ))}
                  <p className={`${styles.paragraph} text-base mt-1 mr-1`}>
                    {course.rating}
                  </p>
                  <p
                    className={`${styles.paragraph} text-stone-400 text-base mt-1`}
                  >
                    ({course.rating_count})
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className={`${styles.paragraph} mr-2`}>Created by</p>
                  <span className="font-poppins font-semibold cursor-pointer text-secondary text-[16px] leading-[30.8px]">
                    {course.author.username}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <h2 className={`${styles.heading2} text-black`}>Course Summary</h2>
          <p className={`${styles.paragraph} text-left max-w-[980px] mt-5`}>{course.description}</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default connect(null, { getCourse })(CourseSummary);
