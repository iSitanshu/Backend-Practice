import React from 'react'

const Homepage = () => {
  return (
    <div>
        <div className="nav">
          <div className="inn">
            <img src="/WebD/CodeSM" alt="Kiet College" height="50px" />
          </div>
          <div className="a1">
            <b>Home</b>
          </div>
          <div className="a2">
            <b>Course</b>
          </div>
          <div className="a3">
            <b>Department</b>
          </div>
          <div className="a4">
            <a href='/Signup'>About College</a>
          </div>
          <div className="a5"> 
          </div>
        </div>
        <div className="container">
          <div className="text">
            <p>
              <b>Information Technology</b>
            </p>
          </div>
          <header>
            <nav>
              <div className="navbar">
                <ul>
                  <li>Detail</li>
                  <li>Course</li>
                  <li>Faculty</li>
                  <li>
                    <a className="noLink" href="/WebD/TimeTable.html" target="_blank">
                      Time-Table
                    </a>
                  </li>
                  <li>Links</li>
                </ul>
              </div>
            </nav>
          </header>
        </div>
        <br />
        <div className="box2">
          <h2>Details</h2>
          <br />
          <p>
            The umbrella of Information Technology can envelope numerous aspects of
            computing and technology. The impact of technological advancements on
            human life is not complete without the role of Information Technology,
            along all axes. Hence all-pervading nature of Information Technology is
            culminated. The Department of Information Technology is accredited by NBA
            (National Board of Accreditation). IT department has highly skilled and
            experienced faculty members, who are engaged in various research projects
            in innovating the new-fangled technologies. The department regularly
            conducts various seminars and workshops in emerging topics. It aims to
            provide high quality training to students through the latest Information
            Technology.
          </p>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            p {\n                line-height: 1.5;\n            }\n        "
            }}
          />
          <br />
          <div className="img">
            <img
              src="/WebD/CodeSM/imglocation/it department.jpg"
              alt="IT Department"
            />
          </div>
          <br />
          <h2>Career Opportunities after B. Tech. Information Technology-</h2>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            h2 {\n                color: orange;\n            }\n        "
            }}
          />
          <br />
          <ol type={1} />
          <li>Software Engineers</li>
          <li>System Analysts</li>
          <li>Software Developers</li>
          <li>Media &amp; Computer Graphics</li>
          <li>Cyber Security Managers</li>
          <li>Chip Designing</li>
          <li>Mobile and wireless communication</li>
          <li>Internet &amp; Telecommunication</li>
          <li>Data Science Analysts</li>
          <li>Web Developers</li>
          <li>App Developers(IOS, android and others)</li>
          <li>Data scientists</li>
          <br />
          <h2>What should you expect from a degree in IT at KIET?--</h2>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            h2 {\n                color: orange;\n            }\n        "
            }}
          />
          <br />
          <ol type={1} />
          <li>Be a good engineer with ethical values.</li>
          <li>To apply technical skills to solve the problem of society.</li>
          <li>
            To build the career as web developer and data scientists, researcher.
          </li>
          <li>To learn and apply the concept of project management.</li>
          <li>
            To attain the soft skills for better communication and presentations.
          </li>
          <li>Campus placements at top IT companies</li>
          <li>
            Learn the latest IT Tools and Technologies from Internationally certified
            faculties.
          </li>
          <li>Get certified by Microsoft Academy, NPTEL, Google and others</li>
          <li>
            Seminars, presentations, education yours, Guru lectures, SPRINT, summer
            internships, open electives, clubs, festivals, events and much more.
          </li>
          <li>
            In-house classes by well qualified faculties for GATE, CAT, MAT and
            others.
          </li>
          <li>App Developers(IOS, android and others)</li>
          <li>
            Apart from the academics we also provide the platform to learn and get
            certified for foreign languages.
          </li>
        </div>
        <br />
        <div id="Showmore">
          The world of information technology (IT) has grown significantly in the last
          decade, and is slated to keep growing. The US Bureau of Labor Statistics
          (BLS) reports that computer and information technology occupations are
          expected to grow by 13 percent from 2020 to 2030, which is faster than the
          average for all jobs. It’s an exciting time to consider a job in IT. <br />
          Information technology degrees, also called information systems or computer
          information systems degrees, teach students the fundamental concepts of IT
          and programming. IT degrees are available at the associate, bachelor’s,
          master’s, and doctorate levels.
          <ul>
            <li>Systems analysis</li>
            <li>Web and mobile development</li>
            <li>Database design</li>
            <li>Cybersecurity principles</li>
          </ul>
          More advanced degrees may also cover project management and business
          decision-making in IT contexts.
        </div>
        <br />
        <button id="btn" onClick="toogleHide()">
          Show Less ∧
        </button>
        <br />
        <br />
        <h1>Faculty Head</h1>
        <div className="box3">
          <div className="fac">
            <img
              src="https://www.kiet.edu/uploads/faculty/421801139.jpg"
              alt=""
              height="370px"
            />
          </div>
          <div className="A">
            <div className="B">
              <h1>HOD</h1>
              <h1>Dr. Adesh Kr. Pandey</h1>
              <p>HOD &amp; Professor</p>
              <p>Department of Information Technology</p>
              <p>Email Id :- ak.pandey@kiet.edu</p>
            </div>
          </div>
        </div>
        <footer>
          <div className="foot">
            <div className="t">
              © 2019 KIET Group of Institutions - All Rights Reserved
            </div>
            <div className="subscribe">
              <input
                type="text"
                id="newsletter"
                placeholder="Enter Email to Subscribe for further information"
              />
            </div>
            <div className="web-design">
              <p>
                Design &amp; Development by{" "}
                <a href="http://stercodigitex.com/" target="_blank">
                  Sterco Digitex
                </a>
              </p>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Homepage;