const plainPayLoadMaker = (user) => {
    let payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        googleAuth: user.googleAuth,
        fullName: user.fullName,
        gender: user.gender,
        isAdmin: user.isAdmin,
        age: user.age,
        subscription: user.subscription,
        country: user.country,
        timeZone: user.timeZone,
        welcomeMessage: user.welcomeMessage,
        language: user.language,
        availability: user.availability,
        calendarAccessToken: user.calendarAccessToken,
        calendarExpiryDate: user.calendarExpiryDate,
        calendarRefreshToken: user.calendarRefreshToken,
        calendarsLink: user.calendarsLink,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }

    return payload;
}

export default plainPayLoadMaker;