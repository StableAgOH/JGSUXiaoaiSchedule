async function scheduleTimer({ providerRes, parserRes } = {}) {
    const timeInfo = parserRes.timeInfo;
    return {
        totalWeek: timeInfo.totalWeek,
        startSemester: timeInfo.startTime.toString(),
        startWithSunday: false,
        showWeekend: true,
        forenoon: 4,
        afternoon: 4,
        night: 3,
        sections: timeInfo.sections
    }
}
