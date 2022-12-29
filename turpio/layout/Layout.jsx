import React from 'react'
import Link from "next/link"
import LogoutAskModal from '../utils/modals/LogoutAskModal'
import useStateContext from "../context/ContextProvider";
import DeleteEventAskModal from '../utils/modals/DeleteEventAskModal';
import EventLocationModal from '../utils/modals/EventLocationModal';
import CookieConsent from "react-cookie-consent";
import DiscardEventModal from '../utils/modals/DiscardEventModal';
import style from "../styles/Home.module.css"


const Layout = ({ children }) => {
    const { modals, closeModal } = useStateContext();
    return (
        <div className='relative' >
            <LogoutAskModal open={modals.logout} close={closeModal} />
            <DeleteEventAskModal open={modals.deleteEvent} close={closeModal} />
            <EventLocationModal open={modals.eventLocation} close={closeModal} />
            <DiscardEventModal open={modals.discardEvent} close={closeModal} />
            {children}
            <CookieConsent
                declineButtonText="Cancel"
                enableDeclineButton={true}
                flipButtons
                disableStyles={true}
                declineButtonClasses="text-stone-500 font-semibold hover:underline text-[14px] pr-4 py-2 rounded-full"
                buttonClasses="text-white bg-blue-600 w-[150px] py-2 rounded-full text-[13px] font-bold hover:bg-blue-500"
                containerClasses={`${style.cookieBannerAnime} flex flex-col md:flex-row gap-8 items-end p-6 shadow-md border-t border-gray-300 bg-white`}
                buttonWrapperClasses="flex items-center gap-4"
                contentClasses="text-gray-600 text-[14px]"
                expires={365}
                location="bottom"
            >
                <h1 className='text-[20px] font-medium tracking-wide text-stone-600 mb-3' >We respect your personal privacy</h1>
                We use cookies to provide a proactive support experience, enhance site navigation, analyze site usage, and assist in our marketing efforts. In certain countries, by continuing to use this website and navigating to a different page, you agree that you have read and consented to the use of cookie. <Link href="/terms-conditions" className='text-blue-600 font-bold underline' >Learn more.</Link>
            </CookieConsent>
        </div>
    )
}

export default Layout