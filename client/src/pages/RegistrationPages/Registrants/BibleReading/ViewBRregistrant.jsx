import React, { useState, useRef, useEffect } from "react";
import "../../Reg.css";
import Navbar from "../../../../components/RegComponents/Navbar";
import Sidebar from "../../../../components/RegComponents/Sidebar";
import { useStateContext } from "../../../../redux/ContextProvider";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { FaArrowUp } from "react-icons/fa6";
import ScrollToTop from "../../../../components/ScrollToTop";

const ViewBRregistrants = () => {
  const { id } = useParams();
  const { activeMenu } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const initialFormData = {
    email: "",
    qualification: "",
    surname: "",
    firstname: "",
    locality: "",
    status: "",
    grade: "",
    attended: "",
    school: "",
    contact: "",
    amen: ""
  };

  const [formData, setRegistrantData] = useState(initialFormData);

  const fetchRegistrantData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registrants/registrant-display/${id}`
      );
      const registrantData = response.data.registrant; // Assuming the response data has a key named 'registrant'
      setRegistrantData({
        email: registrantData.email,
        qualification: registrantData.qualification,
        surname: registrantData.surname,
        firstname: registrantData.firstname,
        locality: registrantData.locality,
        status: registrantData.status,
        grade: registrantData.grade,
        attended: registrantData.attended,
        school: registrantData.school,
        contact: registrantData.contact,
        amen: registrantData.amen
      });
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching registration data:", error);
    }
  };

  useEffect(
    () => {
      fetchRegistrantData();
    },
    [id]
  );

  const [regData, setRegData] = useState({
    formTitle: "",
    description: ""
  });

  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registration/registration-get/65db70f34f3f45521cece27f`
      );
      setRegData({
        ...regData,
        formTitle: response.data.formTitle,
        description: response.data.description
      });
    } catch (error) {
      console.error("Error fetching registration data:", error);
    }
  };

  useEffect(() => {
    fetchRegistrationData();
  }, []);

  const { formTitle, description } = regData;

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/registration/manage-registration", label: "Registration" },
    {
      to: "/registration/manage-registration/BR-registrants",
      label: "View Registrants"
    },
    { to: "", label: "Registrant" }
  ];

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex relative ">
        {activeMenu
          ? <div className="w-64 fixed sidebar drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>
          : <div className="w-0 drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>}
        <div
          className={` bg-gray-100 min-h-screen w-full md:flex-1 md:overflow-hidden ${activeMenu
            ? "lg:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <ScrollToTop />
          <div className="my-28 md:my-16 mx-4 md:mx-16 ">
            {showLoader
              ? <div className="p-16 mt-60 flex flex-col items-center">
                  <ThreeDots
                    visible={true}
                    height={80}
                    width={80}
                    color="#85929E"
                    radius={9}
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  <p>Loading</p>
                </div>
              : <div>
                  <h1 className="text-2xl font-semibold mb-2 ">
                    View Registrant
                  </h1>
                  <Breadcrumbs links={breadcrumbLinks} />
                  <div className="py-4 md:py-10 max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-md shadow-md border border-gray-300  mb-4">
                      <p className=" text-xl sm:text-3xl font-semibold mb-4">
                        {formTitle}
                      </p>
                      <p className="text-sm sm:text-md mb-2">
                        {description}
                      </p>
                    </div>
                    <form>
                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300   text-sm sm:text-lg mb-4">
                        <h1 className="mb-4 font-semibold ">
                          Email<span className="text-red-500"> *</span>
                        </h1>
                        <input
                          type="email"
                          placeholder="Your answer"
                          id="email"
                          className="form-read-only  p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-100 w-full sm:w-1/2 dark:border-gray-400"
                          required
                          autoComplete="off"
                          readOnly
                          value={formData.email}
                        />
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300  sm:text-lg font-normal">
                        <p className="mb-4 font-semibold">
                          Below are the Rizal Young People Bible Reading Basic
                          Qualifications. Thus, these Young People must be:
                        </p>
                        <ol className="list-decimal pl-6 mb-4">
                          <li>A Grade 7 to a 5th-year college student</li>
                          <li>Willing to be trained and adjusted</li>
                          <li>
                            Willing to participate and function in all the
                            sessions
                          </li>
                          <li>Willing to exercise his spirit at all times</li>
                          <li>Willing to coordinate with the saints</li>
                        </ol>
                        <div className="flex flex-col items-left mt-8">
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="qualification"
                              className="mr-2 h-5 w-5"
                              value="Agree"
                              readOnly
                              checked={formData.qualification === "Agree"}
                              required
                            />
                            Agree
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="qualification"
                              className="mr-2 h-5 w-5"
                              value="Disagree"
                              readOnly
                              checked={formData.qualification === "Disagree"}
                              required
                            />
                            Disagree
                          </label>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg mb-4 mt-4">
                        <h1 className="mb-4 font-semibold">
                          Surname<span className="text-red-500"> *</span>
                        </h1>
                        <input
                          type="text"
                          placeholder="Your answer"
                          id="surname"
                          className="form-read-only  p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-200 w-full sm:w-1/2 dark:border-gray-500"
                          required
                          readOnly
                          value={formData.surname}
                        />
                        <h1 className="mb-4 font-semibold mt-4">
                          First Name<span className="text-red-500"> *</span>
                        </h1>
                        <input
                          type="text"
                          placeholder="Your answer"
                          id="firstname"
                          className="form-read-only p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-200 w-full sm:w-1/2 dark:border-gray-500"
                          required
                          readOnly
                          value={formData.firstname}
                        />
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg mb-4 mt-4">
                        <h1 className="mb-4 font-semibold">
                          Locality<span className="text-red-500"> *</span>
                        </h1>
                        <div className="flex flex-col items-left mt-8">
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Rodriguez"
                              checked={formData.locality === "Rodriguez"}
                              required
                            />
                            Rodriguez
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="San Mateo"
                              checked={formData.locality === "San Mateo"}
                              required
                            />
                            San Mateo
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Cainta"
                              checked={formData.locality === "Cainta"}
                              required
                            />
                            Cainta
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Taytay"
                              checked={formData.locality === "Taytay"}
                              required
                            />
                            Taytay
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Angono"
                              checked={formData.locality === "Angono"}
                              required
                            />
                            Angono
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Binangonan"
                              checked={formData.locality === "Binangonan"}
                              required
                            />
                            Binangonan
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Antipolo"
                              checked={formData.locality === "Antipolo"}
                              required
                            />
                            Antipolo
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Teresa"
                              checked={formData.locality === "Teresa"}
                              required
                            />
                            Teresa
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Morong"
                              checked={formData.locality === "Morong"}
                              required
                            />
                            Morong
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Baras"
                              checked={formData.locality === "Baras"}
                              required
                            />
                            Baras
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Tanay"
                              checked={formData.locality === "Tanay"}
                              required
                            />
                            Tanay
                          </label>
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="locality"
                              className="mr-2 h-5 w-5"
                              value="Pililia"
                              checked={formData.locality === "Pililia"}
                              required
                            />
                            Pililia
                          </label>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 text-sm sm:text-lg font-normal">
                        <p className="mb-4 font-semibold">
                          ARE YOU A JUNIOR, A SENIOR YOUNG PEOPLE, OR A SERVING
                          ONE?
                        </p>
                        <p className="italic">JYP - Grades 5 and 6</p>
                        <p className="mb-4 italic">
                          SYP - Grades 7 to 5th Year College
                        </p>
                        <p className="font-semibold">Note:</p>
                        <p className="mb-4 italic">
                          For those Grade 5 and 6 students who want to attend
                          this Bible Reading, you can answer the
                          pre-registration form.
                        </p>
                        <p className="mb-4 italic">
                          Also, kindly fellowship to the serving ones in your
                          locality about your willingness to attend.
                        </p>
                        <p className="mb-8 italic">
                          However, we will still fellowship your desire to join
                          through the coordinating brothers. Please wait for
                          their confirmation about this. Amen!
                        </p>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="status"
                            className="mr-2 h-5 w-5"
                            value="Junior Young People"
                            checked={formData.status === "Junior Young People"}
                            required
                          />
                          Junior Young People
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="status"
                            className="mr-2 h-5 w-5"
                            value="Senior Young People"
                            checked={formData.status === "Senior Young People"}
                            required
                          />
                          Senior Young People
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="status"
                            className="mr-2 h-5 w-5"
                            value="Serving One"
                            checked={formData.status === "Serving One"}
                            required
                          />
                          Serving One
                        </label>
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300  text-sm sm:text-lg mb-4 mt-4">
                        <h1 className="mb-4 font-semibold">
                          Grade / Year Level<span className="text-red-500"> *</span>
                        </h1>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 5"
                            checked={formData.grade === "Grade 5"}
                            required
                          />
                          Grade 5
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 6"
                            checked={formData.grade === "Grade 6"}
                            required
                          />
                          Grade 6
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 7"
                            checked={formData.grade === "Grade 7"}
                            required
                          />
                          Grade 7
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 8"
                            checked={formData.grade === "Grade 8"}
                            required
                          />
                          Grade 8
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 9"
                            checked={formData.grade === "Grade 9"}
                            required
                          />
                          Grade 9
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 10"
                            checked={formData.grade === "Grade 10"}
                            required
                          />
                          Grade 10
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 11"
                            checked={formData.grade === "Grade 11"}
                            required
                          />
                          Grade 11
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Grade 12"
                            checked={formData.grade === "Grade 12"}
                            required
                          />
                          Grade 12
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="First Year College"
                            checked={formData.grade === "First Year College"}
                            required
                          />
                          First Year College
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Second Year College"
                            checked={formData.grade === "Second Year College"}
                            required
                          />
                          Second Year College
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Third Year College"
                            checked={formData.grade === "Third Year College"}
                            required
                          />
                          Third Year College
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Fourth Year College"
                            checked={formData.grade === "Fourth Year College"}
                            required
                          />
                          Fourth Year College
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="grade"
                            className="mr-2 h-5 w-5"
                            value="Fifth Year College"
                            checked={formData.grade === "Fifth Year College"}
                            required
                          />
                          Fifth Year College
                        </label>
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300  text-sm sm:text-lg mb-4 mt-4">
                        <h1 className="mb-4 font-semibold">
                          Times Attended<span className="text-red-500"> *</span>
                        </h1>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="attended"
                            className="mr-2 h-5 w-5"
                            value="1"
                            checked={formData.attended === "1"}
                            required
                          />
                          1
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="attended"
                            className="mr-2 h-5 w-5"
                            value="2"
                            checked={formData.attended === "2"}
                            required
                          />
                          2
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="attended"
                            className="mr-2 h-5 w-5"
                            value="3"
                            checked={formData.attended === "3"}
                            required
                          />
                          3
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="attended"
                            className="mr-2 h-5 w-5"
                            value="4"
                            checked={formData.attended === "4"}
                            required
                          />
                          4
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="attended"
                            className="mr-2 h-5 w-5"
                            value="5"
                            checked={formData.attended === "5"}
                            required
                          />
                          5
                        </label>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="attended"
                            className="mr-2 h-5 w-5"
                            value="More Than 5 Times"
                            checked={formData.attended === "More Than 5 Times"}
                            required
                          />
                          More Than 5 Times
                        </label>
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300  text-sm sm:text-lg mb-4 mt-4">
                        <h1 className="mb-4 font-semibold">
                          School [Kindly Write It Completely]<span className="text-red-500"> *</span>
                        </h1>
                        <input
                          type="text"
                          placeholder="Your answer"
                          id="school"
                          className="form-read-only  p-3 text-sm sm:text-base  w-full sm:w-1/2 "
                          required
                          readOnly
                          value={formData.school}
                        />
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 text-sm sm:text-lg mb-4 mt-4">
                        <h1 className="mb-4 font-semibold">
                          Contact Number
                          <span className="text-red-500"> *</span>
                        </h1>
                        <input
                          type="text"
                          placeholder="Your answer"
                          id="contact"
                          className="form-read-only p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-200 w-full sm:w-1/2 dark:border-gray-500"
                          required
                          readOnly
                          value={formData.contact}
                        />
                      </div>

                      <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg font-normal">
                        <p className="mb-4 font-semibold">
                          [After filling out this form, take a screenshot and
                          send it to your respective serving ones or YP
                          coordinators.]
                        </p>
                        <p className="mb-4 font-semibold">John 14:23</p>
                        <p className="mb-4 font-semibold">
                          "Jesus answered and said to him, if anyone loves me,
                          he will keep My word..."
                        </p>
                        <p className="mb-4 font-semibold">
                          Thank you for registering, saints! See you!
                        </p>
                        <label className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="amen"
                            className="mr-2 h-5 w-5"
                            value="Amen"
                            checked={formData.amen === "Amen"}
                            required
                          />
                          Amen
                        </label>
                      </div>
                    </form>
                  </div>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBRregistrants;
