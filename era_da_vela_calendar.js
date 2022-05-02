const LEAP_YEAR_INTERVAL = 4;

const githCalendar = [
  ["Empeço", 30],
  ["Segundo", 31],
  ["Terceiro", 30],
  ["Martorrente", 31],
  ["Quinto", 30],
  ["Sexto", 31],
  ["Florescente", 30],
  ["Oitavo", 31],
  ["Nono", 30],
  ["Solar", 31],
  ["Penúltimo", 30],
  ["Mês da Virada", 30, true]
]

const theikonCalendar = [
  ["Tosaigh", 90],
  ["Dosaigh", 91],
  ["Titim", 91],
  ["Reo", 91],
  ["Faoi", 91],
  ["Teas", 91],
  ["Donn", 91],
  ["Oigh", 91],
  ["Rath", 91],
  ["Griamhar", 91],
  ["Deitsa", 91],
  ["Gheim", 91],
  ["Deirangheim", 91],
  ["Téam", 91],
  ["Deirant", 94],
  ["Deireadh", 94],
]

const printDate = ({ day, month, year, post }) => `${day}, ${month}, ${year} ${post}`;

const getDaysInYear = (year, months, hasLeapYear) => {
    const isLeapYear = hasLeapYear ? year % LEAP_YEAR_INTERVAL === 0 : false;

    let days = 0;
    months.forEach(month => {
        const [, daysInMonth, leap] = month;
        if(leap && isLeapYear) days += daysInMonth + 1;
        else days += daysInMonth;
    });
    return days;
}

const getDaysInCurrentYear = (day, month, hasLeapYear, calendar) => {
    const isLeapYear = hasLeapYear ? year % LEAP_YEAR_INTERVAL === 0 : false;
    // count the number of days in this day and month of the given calendar
    let days = 0;
    for(let i = 0; i < calendar.length; i++) {
        const [name, daysInMonth, leapMonth] = calendar[i];
        if(month !== name) {
            days += daysInMonth;
            if(leapMonth && isLeapYear) days += 1;
            continue;
        }

        days += day;
        break;
    }

    return days;
}

const getGithDaysFromYearOne = date => {
    const { day, month, year } = date;
    // calculate the amount of days from year one to the current year
    let days = 0;
    for(let i = 1; i < year; i++) {
        days += getDaysInYear(i, githCalendar, true);
    }
    // add the days from the current month
    days += getDaysInCurrentYear(day, month, true, githCalendar);

    return days;
}

const convertGithDate = (date) => {
    const daysSinceYearOne = getGithDaysFromYearOne(date);
}

const convertTheikonDate = date => {}

const convertDate = (date, calendar) => {
    if(calendar === 'gith') return convertGithDate(date);
    if(calendar === 'theikon') return convertTheikonDate(date);
    throw new Error('Invalid calendar');
}