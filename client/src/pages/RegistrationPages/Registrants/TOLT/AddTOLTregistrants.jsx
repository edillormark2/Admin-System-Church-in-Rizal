import React, { useState, useRef, useEffect } from "react";
import "../../Reg.css";
import Navbar from "../../../../components/RegComponents/Navbar";
import Sidebar from "../../../../components/RegComponents/Sidebar";
import { useStateContext } from "../../../../redux/ContextProvider";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollToTop from "../../../../components/ScrollToTop";

const AddTOLTregistrants = () => {
  const { id } = useParams();
  const { activeMenu } = useStateContext();

  const initialFormData = {
    email: "",
    qualification: "",
    surname: "",
    firstname: "",
    locality: "",
    grade: "",
    attended: "",
    school: "",
    contact: "",
    amen: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const formRef = useRef(null);

  const handleChange = e => {
    const { id, value, name, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id || name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/server/registrants/tolt-registrants-add",
        formData
      );
      toast.success("Registration submitted");
      clearForm();
    } catch (error) {
      toast.error("Error submitting form:", error);
    }
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const [regData, setRegData] = useState({
    formTitle: "",
    description: ""
  });

  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registration/registration-get/65db71204f3f45521cece280`
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
      to: "/registration/manage-registration/TOLT-registrants",
      label: "View Registrants"
    },
    { to: "", label: "Add Registrants" }
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
          <div className=" my-28 md:my-16 mx-4 md:mx-16 ">
            <h1 className="text-2xl font-semibold mb-2 ">Add Registrants</h1>
            <Breadcrumbs links={breadcrumbLinks} />
            <div className="py-4 md:py-10 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg mb-4">
                <p className="dark:text-gray-200 text-xl sm:text-3xl font-semibold mb-4">
                  {formTitle}
                </p>
                <p className="dark:text-gray-200 text-sm sm:text-md mb-2">
                  {description}
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg  text-sm sm:text-lg mb-4">
                  <h1 className="mb-4 font-semibold dark:text-gray-200">
                    Email<span className="text-red-500"> *</span>
                  </h1>
                  <input
                    type="email"
                    placeholder="Your answer"
                    id="email"
                    className="form-control  p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-100 w-full sm:w-1/2 dark:border-gray-400"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>

                <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg font-normal">
                  <p className="mb-4 font-semibold">
                    Below are the Tour of a Lifetime (Rizal) Basic
                    Qualifications. Thus, these Young People must be:
                  </p>
                  <ol className="list-decimal pl-6 mb-4">
                    <li>A Grade 10 to a 5th-year college student</li>
                    <li>Willing to be trained and adjusted</li>
                    <li>Participative and functioning in all the sessions</li>
                    <li>Exercising his/her spirit at all times</li>
                    <li>Willing to coordinate with the coordinators</li>
                  </ol>
                  <div className="flex flex-col items-left mt-8">
                    <label className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="qualification"
                        className="mr-2 h-5 w-5"
                        onChange={handleChange}
                        value="Agree"
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
                        onChange={handleChange}
                        value="Disagree"
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
                    className="form-control  p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-200 w-full sm:w-1/2 dark:border-gray-500"
                    required
                    onChange={handleChange}
                    value={formData.surname}
                  />
                  <h1 className="mb-4 font-semibold mt-4">
                    First Name<span className="text-red-500"> *</span>
                  </h1>
                  <input
                    type="text"
                    placeholder="Your answer"
                    id="firstname"
                    className="form-control  p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-200 w-full sm:w-1/2 dark:border-gray-500"
                    required
                    onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        value="Pililia"
                        checked={formData.locality === "Pililia"}
                        required
                      />
                      Pililia
                    </label>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg mb-4 mt-4">
                  <h1 className="mb-4 font-semibold">
                    Grade / Year Level<span className="text-red-500"> *</span>
                  </h1>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="grade"
                      className="mr-2 h-5 w-5"
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      value="Fifth Year College"
                      checked={formData.grade === "Fifth Year College"}
                      required
                    />
                    Fifth Year College
                  </label>
                </div>

                <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg mb-4 mt-4">
                  <h1 className="mb-4 font-semibold">
                    How many times have you attended the Tour of a Lifetime?
                    <span className="text-red-500"> *</span>
                  </h1>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="attended"
                      className="mr-2 h-5 w-5"
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      value="More Than 5 Times"
                      checked={formData.attended === "More Than 5 Times"}
                      required
                    />
                    More Than 5 Times
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="attended"
                      className="mr-2 h-5 w-5"
                      onChange={handleChange}
                      value="Not Yet (I am a First-Timer)"
                      checked={
                        formData.attended === "Not Yet (I am a First-Timer)"
                      }
                      required
                    />
                    Not Yet (I am a First-Timer)
                  </label>
                </div>

                <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg mb-4 mt-4">
                  <h1 className="mb-4 font-semibold">
                    School [Kindly Write It Completely]<span className="text-red-500"> *</span>
                  </h1>
                  <input
                    type="text"
                    placeholder="Your answer"
                    id="school"
                    className="form-control  p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-200 w-full sm:w-1/2 dark:border-gray-500"
                    required
                    onChange={handleChange}
                    value={formData.school}
                  />
                </div>

                <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg mb-4 mt-4">
                  <h1 className="mb-4 font-semibold">
                    Contact Number
                    <span className="text-red-500"> *</span>
                  </h1>
                  <input
                    type="text"
                    placeholder="Your answer"
                    id="contact"
                    className="form-control  p-3 text-sm sm:text-base dark:bg-main-dark-bg dark:text-gray-200 w-full sm:w-1/2 dark:border-gray-500"
                    required
                    onChange={handleChange}
                    value={formData.contact}
                  />
                </div>

                <div className="bg-white p-8 rounded-md shadow-md border border-gray-300 dark:border-gray-500 dark:bg-secondary-dark-bg dark:text-gray-200 text-sm sm:text-lg font-normal">
                  <p className="mb-4 font-semibold">
                    [After filling out this form, take a screenshot and send it
                    to your respective serving ones or YP coordinators.]
                  </p>
                  <p className="mb-4 font-semibold">John 14:23</p>
                  <p className="mb-4 font-semibold">
                    "Jesus answered and said to him, if anyone loves me, he will
                    keep My word..."
                  </p>
                  <p className="mb-4 font-semibold">
                    Thank you for registering, saints! See you!
                  </p>
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="amen"
                      className="mr-2 h-5 w-5"
                      onChange={handleChange}
                      value="Amen"
                      checked={formData.amen === "Amen"}
                      required
                    />
                    Amen
                  </label>
                </div>
                <div className="flex justify-between mt-4 mb-16 lg:mb-2">
                  <button
                    type="submit"
                    className="bg-primary text-white text-center p-2 rounded-md hover:opacity-70 disabled:opacity-50 text-sm sm:text-base cursor-pointer w-28"
                  >
                    Submit
                  </button>
                  <div
                    className="font-semibold text-primary p-2 text-sm sm:text-base cursor-pointer hover:opacity-50"
                    onClick={() => setFormData(initialFormData)}
                  >
                    Clear form
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTOLTregistrants;
