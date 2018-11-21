---
layout: page
title: Resume
permalink: /resume/
---

<style>
    .post-header {
        display: none;
    }
    h1, h2 {
        text-align: center;
    }
    h1, h2 {
        margin-top: 15px;
    }
    h3 {
        margin-top: 10px;
    }
    h3, h4, h5, h6, ul {
        margin-bottom: 0px;
    }
</style>

## Education

### Swanson School of Engineering, University of Pittsburgh
* Computer Engineering – **GPA: 3.72** – **Major GPA: 3.98**
* Awarded Honor Student Designation within Swanson School
* Graduated **Dec 2017**

## Skills

### Languages

* Experienced: Python, SQL, HTML/CSS, Javascript
* Prior Exposure: Java, C, C++

### Software
* Django, Git/Github, Docker, Selenium, Sublime Text, Lint, Ansible, Jupyter/iPython, Flask, Numpy, matplotlib

## Experience

### Full Stack Software Engineer at [drchrono][drchrono]
#### Jan 2018 - Present
* Responsible for new feature design, prototyping, development, testing, optimization, and deployment
* Converted stack to use docker containers, orchestrated integration and end to end testing in CircleCI
* Developed internal GraphQL API to simplify the frontend-backend interface
* Developed internal CCDA serialization and parsing framework to meet Meaningful Use 2015 Standards
* Refactored backend code to simplify models, reducing bugs through design and inline documentation
* Tech stack includes Docker, Python, Django, Celery, AngularJS, Vanilla JS

### Software Engineer (Intern) at [Formlabs][formlabs]
#### May 2017-August 2017
* Improved manufacturing sofware that enables automated calibration and testing using Python.
* Analyzed manufacturing data and correlated defects, software changes, device usage, and line operators.
* Wrote, documented, reviewed, and deployed code integrated with Github 
* Projects included:
    - Create netbooting factory architecture that allows safe and easy version control on the factory floor
    - Deploy and develop web-based dashboards using [jupyter dashboards][jupyter-dashboards] for live data analytics
    - Write idempotent data-migration scripts to update legacy system data to current standards
    - Integrate PostgreSQL database with Google Forms using Google App Scripts
    - Flash mmc during chip "burnin" period to decrease manufacture time by 5 minutes
    - Implement Lazy-Loading of python module to speed up system boot times on the manufactureing line by 30 seconds

###  Engineering Data Analyst (Co-op) at [change2target][c2t]
#### August 2016-April 2017
* Invited to continue BMW Manufacturing Co-op as a remote, part-time team-member.
* Designed and developed Django-based automated reporting and analytics software.
* Solved systems-level problems to increase reliability, maintainability, speed.
* Created and maintained detailed documentation for all development goals and software changes.  
 
### Engineering Data Analyst (Co-op) at [BMW Manufacturing][bmw]
#### January-May 2015, January-August 2016
* Designed and developed Django-based automated reporting and analytics software.
* Solved systems-level problems to increase reliability, maintainability, and speed.
* Wrote an automated daily reporting framework using Python.
* Created and maintained detailed documentation for all development goals and software changes.
 
### Research Assistant at [National University of Singapore][nus]
#### Summer 2015
* Implemented a UART-based communication protocol for custom hardware used in nerve-based neuroprosthetics using C.
* Lab developed custom hardware and performed testing on-site using primates.
 
### Computer Engineer (Intern) at [DEKA][deka]
#### Summer 2014
* Developed automated tests for android-based medical device controller in advance of FDA approval submission.
* Created and maintained detailed documentation for all development goals and software changes.

## Projects

#### Elevator Simulation and Analysis (Course Project)

* Implemented an event-based simulator in Python that logs actor's state changes to a local database.
* Implemented various "smart" and simple elevator algorithms.
* Performed analytics using SQLite, Python, and matplotlib to show how the elevator algorithm influenced queue lengths, wait times, service times, and correlations between these elements.

#### Passive Android Notifications for Bus Arrival Times (Individual Project)

* Wrote Flask server that interfaces with Port Authority's API to serve stop predictions as RSS.
* Parsed RSS and created a passive notification that updates while at home using Tasker.
* Writeup available [here]({% post_url 2017-08-22-truetime-rss-android %}
)

<br/>

Download \[[pdf][resume-pdf]\]

[drchrono]: https://www.drchrono.com/
[formlabs]: https://formlabs.com/
[c2t]: http://www.change2target.com/
[bmw]: https://www.bmwusfactory.com/
[nus]: http://www.nus.edu.sg/
[deka]: http://www.dekaresearch.com/
[jupyter-dashboards]: https://github.com/jupyter/dashboards
[resume-pdf]: /static/resume/Alec_Rosenbaum_Resume.pdf
