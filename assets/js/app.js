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

/* 2. create a function for get value from input date  */
ageButton.addEventListener("click", () => {
    let getUserDate = getUserAgeField.value;
    let today = todayDateField.value;
    if (getUserAgeField.value === '' || todayDateField.value === '') {
        collapsed.classList.add('show')
        collapsed.innerHTML = `<div class="alert alert-danger mb-0">All field are required.</div>`;
    } else if (getUserDate === today) {
        collapsed.classList.add('show')
        collapsed.innerHTML = `<div class="alert alert-danger mb-0">🤣Hahah! You put today date.</div>`;
    } else {
        collapsed.classList.add('show')
        let userDateArr = getUserDate.split('-');
        let [uYear, uMonth, uDay] = userDateArr;


        let todayDateArr = today.split('-');
        let [tYear, tMonth, tDay] = todayDateArr;

        let getYearForUser = parseInt(tYear) - parseInt(uYear);
        let getMonthForUser = Math.abs(parseInt(tMonth) - parseInt(uMonth));
        let getDateForUser = Math.abs(parseInt(tDay) - parseInt(uDay));
        
        let getTotalDaysOfYear = (getYearForUser * 365) + (getMonthForUser * 30) + getDateForUser;
        let getTotalHrOfLife = getTotalDaysOfYear * 24;
        let getTotalMinOfLife = getTotalHrOfLife * 60;
        let getTotalSecOfLife = getTotalMinOfLife * 60;

        collapsed.innerHTML = `
                            <div class="card-header">
                                <h3>Now Your Age ${getYearForUser} Years ${getMonthForUser} Months ${getDateForUser} Days</h3>
                            </div>
                            <div class="card-body" id="age-body">
                                <table class="table">
                                    <tr>
                                        <th>Year</th>
                                        <td>${getYearForUser} Years</td>
                                    </tr>
                                    <tr>
                                        <th>Months</th>
                                        <td>${getMonthForUser} Month</td>
                                    </tr>
                                    <tr>
                                        <th>Day</th>
                                        <td>${getDateForUser} Days</td>
                                    </tr>

                                </table>
                                <table class="table">
                                    <tr>
                                        <th>Total days</th>
                                        <td>${getTotalDaysOfYear} days</td>
                                        <th>Total Hours</th>
                                        <td>${getTotalHrOfLife} hr</td>
                                        <th>Total Minutes</th>
                                        <td>${getTotalMinOfLife} min</td>
                                        <th>Total Seconds</th>
                                        <td>${getTotalSecOfLife} sec</td>
                                    </tr>
                                </table>
                            </div>`;
    }
})

/* calling all necessary function  */
setDefaultDate();