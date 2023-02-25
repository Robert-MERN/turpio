const cookingTimeArray = (day, data, meetingTime, inviter, invitee, dayNum, monthNum) => {

    const availableTimes = data[day];

    const hours = Number(availableTimes.time1.hour24.split(":")[0]); // hours of time 1
    const minutes = Number(availableTimes.time1.hour24.split(":")[1]); // minutes of time 1

    const hours2 = Number(availableTimes.time2.hour24.split(":")[0]); // hours of time 2  
    const minutes2 = Number(availableTimes.time2.hour24.split(":")[1]); // minutes of time 2



    const inviterTZ = new Date(new Date().toLocaleString("en-US", { timeZone: inviter }));
    const inviteeTZ = new Date(new Date().toLocaleString("en-US", { timeZone: invitee }));

    const differ = inviteeTZ.getHours() - inviterTZ.getHours();


    const inviterFake = new Date(new Date(new Date(new Date().setHours(hours, minutes)).setDate(dayNum)).setMonth(monthNum));
    const inviterFake2 = new Date(new Date(new Date(new Date().setHours(hours, minutes)).setDate(dayNum)).setMonth(monthNum));

    const inviteeFake = new Date(inviterFake2.setHours(inviterFake.getHours() + differ, inviterFake.getMinutes()))

    let inviterTimesArrayORIGINAL = [inviterTZ];
    let inviteeTimesArrayORIGINAL = [inviteeTZ];
    let inviterTimesArray = [inviterFake];
    let inviteeTimesArray = [inviteeFake];

    let startHours = inviterTimesArray[0].getHours();
    let startMins = inviterTimesArray[0].getMinutes();

    let currentStartTime = (inviterTZ.getHours() * 60) + inviterTZ.getMinutes();

    if (inviteeTZ.getDate() === dayNum && inviterTZ.getMonth() === monthNum) {

        if (currentStartTime > ((hours * 60) + minutes) && currentStartTime < ((hours2 * 60) + minutes2) - (meetingTime)) {

            while ((((hours2 * 60) + minutes2) - (meetingTime) - currentStartTime) >= meetingTime ) {

                const prevTime = inviterTimesArrayORIGINAL[inviterTimesArrayORIGINAL.length - 1];
                currentStartTime = (prevTime.getHours() * 60) + prevTime.getMinutes()
                const d = new Date(prevTime.setMinutes(prevTime.getMinutes() + meetingTime));
                const d2 = new Date(prevTime.setMinutes(prevTime.getMinutes() + meetingTime));
                inviterTimesArrayORIGINAL.push(d);

                const tarTime = new Date(d2.setHours(d.getHours() + differ, d.getMinutes()));
                inviteeTimesArrayORIGINAL.push(tarTime)

            }

            const filt = inviteeTimesArrayORIGINAL.filter(i => {
                return i.getDate() === dayNum
            });
            // filt.pop()
            return filt;

        } else if (currentStartTime > ((hours * 60) + minutes) && currentStartTime > ((hours2 * 60) + minutes2) - (meetingTime)) {
            return [];

        } else {

            while (((startHours * 60) + startMins) < ((hours2 * 60) + minutes2) - (meetingTime * 2)) {

                const prevTime = inviterTimesArray[inviterTimesArray.length - 1]
                startHours = prevTime.getHours();
                startMins = prevTime.getMinutes();


                const d = new Date(prevTime.setMinutes(prevTime.getMinutes() + meetingTime));
                const d2 = new Date(prevTime.setMinutes(prevTime.getMinutes() + meetingTime));
                inviterTimesArray.push(d);

                const tarTime = new Date(d2.setHours(d.getHours() + differ, d.getMinutes()));
                inviteeTimesArray.push(tarTime)

            }

            return inviteeTimesArray.filter(i => {
                return i.getDate() === dayNum
            });
        }


    } else {
        while (((startHours * 60) + startMins) < ((hours2 * 60) + minutes2) - (meetingTime * 2)) {

            const prevTime = inviterTimesArray[inviterTimesArray.length - 1]
            startHours = prevTime.getHours();
            startMins = prevTime.getMinutes();


            const d = new Date(prevTime.setMinutes(prevTime.getMinutes() + meetingTime));
            const d2 = new Date(prevTime.setMinutes(prevTime.getMinutes() + meetingTime));
            inviterTimesArray.push(d);

            const tarTime = new Date(d2.setHours(d.getHours() + differ, d.getMinutes()));
            inviteeTimesArray.push(tarTime)

        }
        return inviteeTimesArray.filter(i => {
            return i.getDate() === dayNum
        });
    }
}

export default cookingTimeArray;