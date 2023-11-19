document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get("subject");

    if (subject) {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                const teacherInfo = document.getElementById("teacherInfo");
                const day = data.days.find(day => day.periods.some(period => period.subject === subject));
                if (day) {
                    const matchingPeriods = day.periods.filter(period => period.subject === subject);
                    if (matchingPeriods.length > 0) {
                        teacherInfo.innerHTML = "<h2>Teacher for " + subject + "</h2>";
                        matchingPeriods.forEach(period => {
                            if (Array.isArray(period.teacherIds)) {
                                const teachers = data.teachers.filter(teacher => period.teacherIds.includes(teacher.id));
                                teachers.forEach(teacher => {
                                    teacherInfo.innerHTML += `
                                        <div class="teacher">
                                            <img src="${teacher.image}" alt="${teacher.name}">
                                            <p>Name: ${teacher.name}</p>
                                            <p>Phone: <a href="tel:${teacher.phone}">${teacher.phone}</a></p>
                                            <p>Email: ${teacher.email}</p>
                                            <p>Room: ${teacher.room}</p>
                                            <p>Department: ${teacher.department}</p>
                                        </div>
                                    `;
                                });
                            } else if (period.teacherId) {
                                const teacher = data.teachers.find(teacher => teacher.id === period.teacherId);
                                if (teacher) {
                                    teacherInfo.innerHTML += `
                                        <div class="teacher">
                                            <img src="${teacher.image}" alt="${teacher.name}">
                                            <p>Name: ${teacher.name}</p>
                                            <p>Phone: <a href="tel:${teacher.phone}">${teacher.phone}</a></p>
                                            <p>Email: ${teacher.email}</p>
                                            <p>Room: ${teacher.room}</p>
                                            <p>Department: ${teacher.department}</p>
                                        </div>
                                    `;
                                }
                            }
                        });
                    }
                }
            })
            .catch(error => console.error("Error loading JSON data:", error));
    }
});
