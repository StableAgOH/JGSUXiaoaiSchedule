async function get(url) {
    return (await (await fetch(url)).json()).data;
}

async function post(url, body) {
    return (await (await fetch(url, {
        "headers": {
            "content-type": "application/json;charset=UTF-8",
        },
        "body": JSON.stringify(body),
        "method": "POST"
    })).json()).data;
}

const api = {
    semester: "/api/baseInfo/semester/selectCurrentXnXq",
    weeks: "/api/arrange/teacherServer/queryWeek",
    schedule: "/api/arrange/CourseScheduleAllQuery/studentCourseSchedule"
}

async function scheduleHtmlProvider() {
    try {
        const studentId = document.cookie.match(/"userName":"(\d+)"/)[1];
        const semesterData = await get(api.semester);
        const weeks = await get(`${api.weeks}?schoolYear=${semesterData.semester}`);
        const body_base = { studentId, semester: semesterData.semester, weeks };

        const singleSectionSchedule = await post(api.schedule, { ...body_base, oddOrDouble: 0 });
        const doubleSectionSchedule = await post(api.schedule, { ...body_base, oddOrDouble: 1 });

        return JSON.stringify({ semesterData, weeks, singleSectionSchedule, doubleSectionSchedule });
    }
    catch (error) {
        console.error(error);
        return "do not continue";
    }
}
