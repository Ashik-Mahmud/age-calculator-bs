/* 
TODO: 
- select all needy elements from dom 
- set today date as default date
- create a function for get value from input date
- calling all necessary function 
*/

/* 1. select all needy elements from dom  */
const ageButton = document.getElementById("calculate-age-btn");
const getUserAgeField = document.getElementById("yourAge");
const todayDateField = document.getElementById("todayDate");
const collapsed = document.getElementById('collapsed');

/* 2. set today date as default date  */
const setDefaultDate = () => {
    let todayDate = new Date();
    let getYear = todayDate.getFullYear();
    let getMon = todayDate.getMonth() < 10 ? '0' + (todayDate.getMonth() + 1) : (todayDate.getMonth() + 1);
    let getDay = todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate();
    let fullDate = `${getYear}-${getMon}-${getDay}`;
    todayDateField.value = fullDate;
}

// error function 
const getError = (errorText) => {
    collapsed.classList.add('show')
    collapsed.innerHTML = errorText;
}
/* 2. create a function for get value from input date  */
ageButton.addEventListener("click", () => {
    let getUserDate = getUserAgeField.value;
    let today = todayDateField.value;
    const userDate = new Date(getUserDate);
    const getTodayDate = new Date(today);
    if (getUserAgeField.value === '' || todayDateField.value === '') {
        getError(`<div class="alert alert-danger mb-0">All field are required.</div>`)
    } else if (getUserDate === today) {
        getError(`<div class="alert alert-danger mb-0">🤣Hahah! You put invalid date.</div>`)
    } else if ((userDate.getFullYear() === getTodayDate.getFullYear() && userDate.getMonth() > getTodayDate.getMonth())) {
        getError(`<div class="alert alert-danger mb-0">🤣Hahah! Invalid Months</div>`);
    } else if (userDate.getFullYear() === getTodayDate.getFullYear() && userDate.getDate() >= getTodayDate.getDate() && userDate.getMonth() >= getTodayDate.getMonth()) {
        getError(`<div class="alert alert-danger mb-0">🤣Hahah! Invalid Date</div>`);
    } else {
        collapsed.classList.add('show')
        // user input date 
        let inputDate = userDate.getDate();
        let inputMonth = 1 + userDate.getMonth();
        let inputYear = userDate.getFullYear();

        // today default date 
        let todayDate = getTodayDate.getDate();
        let todayMonth = 1 + getTodayDate.getMonth();
        let todayYear = getTodayDate.getFullYear();

        const monthsArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (inputDate > todayDate) {
            todayDate = todayDate + monthsArr[todayMonth - 1];
            todayMonth = todayMonth - 1;
        }

        if (inputMonth > todayMonth) {
            todayMonth = todayMonth + 12;
            todayYear = todayYear - 1;
        }

        let year = todayYear - inputYear;
        let month = todayMonth - inputMonth;
        let date = todayDate - inputDate;
        let getTotalWeeks = Math.floor(((((year * 12) + month) * 30) + date) / 7);
        let getTotalDays = ((((year * 12) + month) * 30) + date);
        let getTotalHours = getTotalDays * 24;
        let getTotalMin = getTotalHours * 60;
        let getTotalSec = getTotalMin * 60;
        collapsed.innerHTML = `
                            <div class="card-header">
                                <h3>Now Your Age ${year} Years ${month} Months ${date} Days</h3>
                            </div>
                            <div class="card-body" id="age-body">
                                <table class="table">
                                    <tr>
                                        <th>Total Year</th>
                                        <td>${year} Years</td>
                                    </tr>
                                    <tr>
                                        <th>Months</th>
                                        <td>${month} Month</td>
                                    </tr>
                                    <tr>
                                        <th>Total Day</th>
                                        <td>${date} Days</td>
                                    </tr>
                                    <tr>
                                        <th>Total Weeks</th>
                                        <td>${getTotalWeeks ? getTotalWeeks: '0'} Weeks</td>
                                    </tr>

                                </table>
                                <table class="table">
                                    <tr>
                                        <th>Total days</th>
                                        <td>${getTotalDays ? getTotalDays: '0'} days (Approx)</td>
                                        <th>Total Hours</th>
                                        <td>${getTotalHours ? getTotalHours: '0'} hr (Approx)</td>
                                        <th>Total Minutes</th>
                                        <td>${getTotalMin ? getTotalMin: '0'} min (Approx)</td>
                                        <th>Total Seconds</th>
                                        <td>${getTotalSec ? getTotalSec: '0'} sec (Approx)</td>
                                    </tr>
                                </table>
                            </div>`;
    }
})

/* calling all necessary function  */
setDefaultDate();