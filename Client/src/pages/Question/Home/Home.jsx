import { useContext, useEffect, useState } from "react";
import classes from "./Home.module.css";
import { UserLoginInfo } from "../../../App"; // Ensure the correct path to context
import thumnail from "../../../assets/images/thumnail2.jpg";
import { Link } from "react-router-dom";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Home=()=> {
  const { user } = useContext(UserLoginInfo);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search input

  const clickHandler = () => {
    navigate("/question");
  };

  const getQuestions = async () => {
    try {
      const questionData = await axios
        .get("/question/allquestion")
        .then((res) => res.data);
      setQuestions(questionData.allquestions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Filtered questions based on searchTerm
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="root">
      <div className={classes.container}>
        {/* Header Section */}
        <header className={classes.header}>
          <button className={classes.ask_btn} onClick={clickHandler}>
            Ask Question
          </button>
          <div>
            <span className={classes.welcome_text}>Welcome:</span>{" "}
            <span className={classes.username}>{user.username}</span>
          </div>
        </header>

        {/* Search Section */}
        <section className={classes.search_container}>
          <input
            type="text"
            placeholder="Search question"
            className={classes.search_bar}
            value={searchTerm} // Bind input value to searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </section>

        <h2 style={{ color: "#0056b3", paddingLeft: "20px" }}> Questions</h2>
        <hr />

        {/* Question List Section */}
        <section className={classes.question_container}>
          {filteredQuestions.map((question) => (
            <Link
              key={question.questionid}
              to={`/answer/${question.questionid}`}
              className={classes.link}
            >
              <article className={classes.question}>
                <div className="user_info">
                  <div className={classes.avatar}>
                    <img
                      src={thumnail}
                      alt="User Avatar"
                      className={classes.thumbnail}
                      width="25"
                      height="25"
                    />
                  </div>
                  <p className={classes.user_name}>{question.username}</p>
                </div>
                <div className={classes.question_content}>
                  <p className={classes.question_title}>{question.title}</p>
                </div>

                <IoIosArrowForward size={25} />
              </article>
              <hr />
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Home;
