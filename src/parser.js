function parseWeeks(weeks) {
    const res = [];
    if (!weeks.includes('-')) res.push(parseInt(weeks));
    else {
        const [first, last] = weeks.match(/(\d+)-(\d+)/).slice(1).map(Number);
        const c = weeks.slice(-1);
        let f = -1;
        if (c === "单") f = 0;
        else if (c === "双") f = 1;
        for (let i = first; i <= last; i++)
            if (i % 2 != f) res.push(i);
    }
    return res;
}

function scheduleHtmlParser(providerRes) {
    const data = JSON.parse(providerRes);

    const courseInfos = [];
    for (const item of data.doubleSectionSchedule) {
        const sections = item.time.timeCode.split('_').map(Number);
        const day = parseInt(item.week.weekCode);
        for (const course of item.courseList)
            courseInfos.push({
                name: course.courseName,
                position: course.classroomName,
                teacher: course.teacherName,
                weeks: parseWeeks(course.weeks),
                day,
                sections
            });
    }
    return {
        courseInfos,
        timeInfo: {
            startTime: new Date(data.semesterData.ksrq).getTime(),
            totalWeek: data.weeks.length,
            sections: data.singleSectionSchedule.slice(0, 11)
                .map(x => ({
                    section: parseInt(x.time.timeCode),
                    startTime: x.time.startTime,
                    endTime: x.time.endTime
                }))
        }
    }
}
