// Course List
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Programming Building Blocks",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

// HTML Elements
const courseContainer = document.querySelector("#course-container");
const totalCredits = document.querySelector("#totalCredits");

const allButton = document.querySelector("#all");
const cseButton = document.querySelector("#cse");
const wddButton = document.querySelector("#wdd");

// Display Courses
function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.textContent = `${course.subject} ${course.number}`;

        courseContainer.appendChild(card);

    });

    updateCredits(courseList);
}

// Calculate Credits
function updateCredits(courseList) {

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}

// Button Events
allButton.addEventListener("click", () => {
    displayCourses(courses);
});

cseButton.addEventListener("click", () => {
    const filtered = courses.filter(course => course.subject === "CSE");
    displayCourses(filtered);
});

wddButton.addEventListener("click", () => {
    const filtered = courses.filter(course => course.subject === "WDD");
    displayCourses(filtered);
});

// Initial Display
displayCourses(courses);