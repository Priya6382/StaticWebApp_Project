document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const timetable = document.getElementById("timetable");

            // Loop through days
            data.days.forEach(day => {
                const row = document.createElement("tr");
                row.innerHTML = `<th>${day.name}</th>`;
                
                // Loop through periods for each day
                day.periods.forEach(period => {
                    row.innerHTML += `<td><a href="teacher.html?subject=${period.subject}">${period.subject}</a></td>`;
                });
                
                timetable.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading JSON data:", error));
});
