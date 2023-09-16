import React, { useState, useEffect } from "react";
import styles from "../style";
import { Navbar, Button } from "../components";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse } from "../actions/course";
import { fetchImage } from "../actions/imageFetch";
import { star } from "../assets";
import { layout } from "../style";
import { LoadingPage } from "../pages";

const ReviewCard = ({ message, author }) => (
  <div className={`flex-1 flex-col p-6 rounded-[20px] box-shadow my-5`}>
    <h4 className="font-poppins font-semibold text-black text-[18px] leading-[23px] mb-2">{author}</h4>
    <p className={`${styles.paragraph}`}>{message}</p>
  </div>
);

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
      <LoadingPage />
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
          <div className="flex md:flex-row flex-col justify-between items-center w-full p-10">
            <h1 className="flex-1 font-poppins font-semibold text-black text-[52px] ss:leading-[100.8px] leading-[75px]">
              {course.title}
            </h1>
            <Button
                  type="submit"
                  color="white"
                  bgColor="#8c52ff"
                  text="Enroll Now"
                  borderRadius="10px"
                  styles={`p-4 md:my-2 mt-10`}
                />
          </div>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col rounded-[20px] box-shadow`}>
            <div className="flex-1 flex md:flex-row flex-col">
              <img
                src={imageSourceUrl}
                alt="image"
                className="object-contain h-[45%] w-[45%] rounded-[15px] mr-16"
              />
              <div className="flex flex-col justify-center">
                <div className="flex flex-row mb-3">
                  {course.warnings.map((warning) => (
                    <span className="bg-red-200 text-red-500 text-[14px] font-poppins font-semibold py-2 px-5 rounded-[25px]">{warning.title}</span>
                  ))}
                </div>
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

      {/* Course Summary Section */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className={`${layout.section}`}>
            <div className={`${layout.sectionInfo}`}>
              <h2 className={`${styles.heading2} text-black`}>Summary</h2>
              <p className={`${styles.paragraph} text-left max-w-[730px] mt-5`}>
                {course.description}
              </p>
            </div>

            <div className={`${layout.sectionReverse} ml-10`}>
              <div className="flex-col p-10 rounded-[20px] box-shadow">
                <h2 className={`${styles.heading2} text-black text-center`}>
                  Course Sections
                </h2>
                <ul className="list-disc flex flex-col items-start ml-10">
                  {course.sections.map((section) => (
                    <li
                      key={section.id}
                      className={`font-poppins font-normal cursor-pointer text-[16px] my-1 text-black hover:text-secondary`}
                    >
                      <span>{section.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Course Summary Section End */}
      {/* Course Reviews Section */}
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <h2 className={`${styles.heading2} text-black`}>Reviews</h2>
          <div className="flex flex-col items-left">
            {course.reviews.map((reviewCard) => (
              <ReviewCard key={reviewCard.id} {...reviewCard}/>
            ))}
          </div>
        </div>
      </div>
      {/* Course Reviews Section End */}
    </div>
  ) : null;
};

export default connect(null, { getCourse })(CourseSummary);
